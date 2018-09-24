import {Task,Join_Task} from './tasks'
import * as methods from './brapi_methods';
import brapiVersion from './brapiVersion.js';

// Use node-fetch or browser fetch API depending on enviroment.
var fetchRef;
if (typeof window === 'undefined') {
    fetchRef = require('node-fetch');
} else {
    fetchRef = window.fetch;
}

function parse_json_response(response) {
    return response.json();
}

/** Protoype to which all BrAPI API methods will be applied. */
export default class BrAPI_Methods {
    constructor(){}
}

// Apply each method to BrAPI_Methods
Object.keys(methods).forEach(function(method_name){
    BrAPI_Methods.prototype[method_name] = methods[method_name];
});

/** This is the main handler class and contains the control-flow logic for handling interdependant async requests */
export class Context_Node extends BrAPI_Methods{
    constructor(parent_list,connection_information,node_type){
        super();
        this.isFinished = false;
        this.ranFinishHooks = false;
        this.node_type = node_type;
        this.parents = parent_list;
        this.async_hooks = [];
        this.catch_hooks = [];
        this.finish_hooks = [];
        this.task_map = {};
        this.connect = connection_information || {};
        this.version = this.connect.version;
    }
    
    /**
     * Constructs a url from a url_template and clears the used params from the
     * parameter object.
     * @param  {String} url_template template of form "/urlpath/{param_name}/blah/{other_param_name}"
     * @param  {Object} params       Object containing properties matching the url params
     * @return {Object}              Object with url and params properties
     */
    consumeUrlParams(url_template,params){
        return {
            'url': url_template.replace(/\{([a-z_$]+?)\}/gi, function(match,param_name){
                var val = encodeURIComponent(params[param_name]);
                delete params[param_name];
                return val;
            }),
            'params': params
        }
    }
    
    /**
     * Adds an new async tasks
     * @param {task} task task to add
     */
    addTask(task){
        this.task_map[task.getKey()] = task;
    }
    
    /**
     * Gets a task from `this.task_map` with some `key`
     * @param  {String} key
     * @return {Task}
     */
    getTask(key){
        return this.task_map[key];
    }
    
    /**
     * Gets a list of all tasks in `this.task_map`
     * @return {Array<Task>}
     */
    getTasks(){
        var self = this;
        return Object.keys(self.task_map).map(function(key) {
			return self.task_map[key];
    	});
    }
    
    /**
     * Once a task is completed, this function can be used to publish the
     * result of that task to downstream `Context_Node`s
     * @param  {Task} task
     */
    publishResult(task){
        this.async_hooks.forEach(function(hook){
            hook(task.getResult(),task.getKey());
        });
        this.checkFinished(true);
    }
    
    /**
     * AsyncHook callback
     *
     * @callback Context_Node~asyncHookCallback
     * @param result The published result of the completed task.
     * @param key    The key of the completed task.
     */
    
    /**
     * Adds a callback hook which is triggered each time the result of a task 
     * is published.
     * @param {Context_Node~asyncHookCallback} hook callback
     */
    addAsyncHook(hook){
        this.async_hooks.push(hook);
        this.getTasks().filter(function(task){
            return task.complete();
        }).forEach(function(task){
            hook(task.getResult(),task.getKey());
        });
    }
    
    /**
     * CatchHook callback
     *
     * @callback Context_Node~asyncHookCallback
     */
    
    /**
     * Adds a callback hook which is triggered when an error is caught.
     * @param {Context_Node~catchHookCallback} hook callback
     */
    addCatchHook(hook){
        this.catch_hooks.push(hook);
    }
    
    /**
     * FinishHook callback
     *
     * @callback Context_Node~finishHookCallback
     * @param {Array} results The published result of the completed tasks.
     */
    
    /**
     * Adds a callback hook which is trigged once all tasks in `this.task_map` 
     * are completed and published.
     * @param {Context_Node~finishHookCallback} hook callback
     */
    addFinishHook(hook){
        this.finish_hooks.push(hook);
        if(this.ranFinishHooks){
            hook(this.getTasks()
                .sort(function(a,b){
                    return a.key <= b.key ? -1 : 1;
                })
                .map(function(task){
                    return task.getResult();
                })
            );
        }
    }
    
    /**
     * Checks if all tasks in `this.task_map` have completed
     * @param  {Boolean} run_on_finish wether to run hooked `Context_Node~finishHookCallback`s if complete.
     * @return {Boolean}               true if all tasks complete.
     */
    checkFinished(run_on_finish){
        if (!this.isFinished){
            var parsFin = this.parents.every(function(par){return par.checkFinished(false)});
            var thisFin = this.getTasks().every(function(task){return task.complete()});
            this.isFinished = parsFin && thisFin;
        }
        if (run_on_finish && !this.ranFinishHooks && this.isFinished){
            this.ranFinishHooks=true;
            this._onFinish();
        }
        return this.isFinished
    }
    
    /**
     * Runs all hooked `Context_Node~finishHookCallback`s
     */
    _onFinish(){
        var self = this;
        this.finish_hooks.forEach(function(hook){
            hook(self.getTasks()
                .sort(function(a,b){
                    return a.key <= b.key ? -1 : 1;
                })
                .map(function(task){
                    return task.getResult();
                })
            );
        });
    }
    
    /**
     * Runs all hooked `Context_Node~catchHookCallback`s
     */
    fail(reason){
        if (this.catch_hooks.length<1) throw reason;
        else {
            var self = this;
            this.catch_hooks.forEach(function(hook){
                hook(reason,self);
            });
        }
    }
    
    /**
     * Finds the last Context_Node which modified the keys of it's tasks
     * In most situations, task keys track the flow of a single datum throughout
     * the Context_Node flow. However, when data is introduced, reduced, or 
     * forked, new keys are assigned in order to indicate that change.
     * @return {Context_Node} the last `Context_Node` which modified the keys of it's tasks
     */
    getTaskKeyOrigin(){
        if (this.parents.length<1 
                || this.node_type=="key"
                || this.node_type=="fork" 
                || this.node_type=="reduce"){
            return this;
        } else {
            return this.parents[0].getTaskKeyOrigin();
        }
    }
    
    /**
     * Adds an `Context_Node~asyncHookCallback` and returns `this`.
     * @param  {Context_Node~asyncHookCallback} func
     * @return {Context_Node}
     */
    each(func){ this.addAsyncHook(func); return this;}
    
    /**
     * Adds an `Context_Node~finishHookCallback` and returns `this`.
     * @param  {Context_Node~finishHookCallback} func
     * @return {Context_Node}
     */
    all(func){ this.addFinishHook(func); return this;}
    
    /**
     * Adds an `Context_Node~catchHookCallback` and returns `this`.
     * @param  {Context_Node~catchHookCallback} func
     * @return {Context_Node}
     */
    catch(func){ this.addCatchHook(func); return this;}
    
    /** Adds an decendent `Context_Node` of class `Key_Node` */
    keys(keyFunc){
        return new Key_Node(this,this.connect,keyFunc);
    }
    
    /** Adds an decendent `Context_Node` of class `Fork_Node` */
    fork(forkFunc){
        return new Fork_Node(this,this.connect,forkFunc);
    }
    
    /** Adds an decendent `Context_Node` of class `Join_Node` */
    join(/*other,[other]...*/){
        var parent_nodes = [this];
        [].push.apply(parent_nodes,arguments);
        return new Join_Node(parent_nodes,this.connect);
    }
    
    /** Adds an decendent `Context_Node` of class `Reduce_Node` */
    reduce(reductionFunc,initialValue){
        return new Reduce_Node(this,this.connect,reductionFunc,initialValue);
    }
    
    /** Adds an decendent `Context_Node` of class `Map_Node` */
    map(mapFunc){
        return new Map_Node(this,this.connect,mapFunc);
    }
    
    /** Adds an decendent `Context_Node` of class `Filter_Node` */
    filter(filterFunc){
        return new Filter_Node(this,this.connect,filterFunc);
    }
    
    /** Adds an decendent `Context_Node` of class `Connection_Node` */
    server(server,auth_params,version){
        return new Connection_Node(this,server,auth_params,version);
    }
    
    /** Adds an decendent `Context_Node` of class `BrAPI_Behavior_Node` */
    brapi_call(behavior,httpMethod,url_body_func,multicall){
        return new BrAPI_Behavior_Node(
            this,this.connect,behavior,httpMethod,url_body_func,multicall
        );
    }
    
    simple_brapi_call(call){
        // check if behavior is specified and in behaviorOptions if 
        // behaviorOptions exists, otherwise use behaviorOptions[0] if 
        // behaviorOptions exists, otherwise deafult to "map"
        var behavior = call.behaviorOptions ? 
            (call.behaviorOptions.indexOf(call.behavior) >= 0 ? 
                call.behavior : 
                call.behaviorOptions[0]) :
            (call.behavior || "map");
        // check if the parameters are specified as a function or an object
        var multicall = typeof call.params === "function";
        // create a brapi call
        return this.brapi_call(behavior,call.defaultMethod,function(datum){
            // create or duplicate the parameters for this datum (create shallow copy to protect original parmeter object)
            var datum_params = Object.assign({}, multicall ? params(datum) : call.params);
            // fill urlTemplate with specified parameters and remove them from the datum_params
            return this.consumeUrlParams(call.urlTemplate,datum_params);
        }, multicall)
    }
};

export class Filter_Node extends Context_Node{
    constructor(parent,connect,filterFunc){
        super([parent],connect,"filter");
        var self = this;
        parent.addAsyncHook(function(datum, key){
            if(filterFunc(datum)){
                var task = new Task(key);
                self.addTask(task);
                task.complete(datum);
                self.publishResult(task);
            } else if (self.getTasks().length == 0){
                self.checkFinished(true);
            }
        });
    }
};

export class Key_Node extends Context_Node{
    constructor(parent,connect,keyFunc){
        super([parent],connect,"key");
        var self = this;
        parent.addAsyncHook(function(datum, previous){
            var task = new Task(keyFunc(datum, previous));
            self.addTask(task);
            task.complete(datum);
            self.publishResult(task);
        });
    }
};

export class Map_Node extends Context_Node{
    constructor(parent,connect,mapFunc){
        super([parent],connect,"map");
        var self = this;
        parent.addAsyncHook(function(datum, key){
            var task = new Task(key);
            self.addTask(task);
            task.complete(mapFunc(datum,key));
            self.publishResult(task);
        });
    }
};

export class Reduce_Node extends Context_Node{
    constructor(parent,connect,reductionFunc,initialValue){
        super([parent],connect,"reduce");
        var task = new Task(0, "");
        this.addTask(task);
        var self = this;
        parent.addFinishHook(function(data, key){
            var out_datum = reductionFunc==undefined?data:data.reduce(reductionFunc,initialValue);
            task.complete(out_datum);
            self.publishResult(task);
        });
    }
};

export class Fork_Node extends Context_Node{
    constructor(parent,connect,forkFunc){
        super([parent],connect,"fork");
        var self = this;
        var forked_key = 0;
        parent.addAsyncHook(function(datum, key){
            var newData = forkFunc(datum);
            var newTasks = [];
            newData.forEach(function(newDatum){
                var task = new Task(forked_key, key);
                forked_key+=1;
                self.addTask(task);
                task.stored_result = newDatum;
                newTasks.push(task);
            });
            newTasks.forEach(function(task){
                task.complete(task.stored_result);
                self.publishResult(task);
            });
        });
    }
};

export class Join_Node extends Context_Node{
    constructor(parent_nodes,connect){
        super(parent_nodes,connect,"join");
        var key_origin = parent_nodes[0].getTaskKeyOrigin();
        var different_origins = parent_nodes.some(function(p){
            return p.getTaskKeyOrigin()!==key_origin
        });
        var all_user_keyed = parent_nodes.every(function(p){
            return p.getTaskKeyOrigin().node_type=="key";
        });
        if(different_origins && !all_user_keyed){
            throw "Cannot perform join due to contexts having different key origins!";
            return;
        }
        var self = this;
        parent_nodes.forEach(function(parent,parent_index){
            parent.addAsyncHook(function(datum, key){
                var task = self.getTask(key);
                if(task==undefined){
                    task = new Join_Task(key,parent_nodes.length)
                    self.addTask(task);
                }
                task.addResult(datum,parent_index)
                if (task.complete(true)){
                    self.publishResult(task);
                }
            });
            parent.addFinishHook(function(data){
                self.getTasks().forEach(function(task){
                    if (!task.complete()){
                        var pindex = parent_nodes.indexOf(parent);
                        if (task.result[pindex]===undefined) {
                            task.addResult(null,pindex)
                        }
                        if (task.complete(true)){
                            self.publishResult(task);
                        }
                    }
                });
            });
        });
    }
};

export class Connection_Node extends Context_Node{
    constructor(parent,server,auth_params,version){
        var base_url = server;
        if (base_url.slice(-1)=="/"){
            base_url=base_url.slice(0,-1);
        }
        super([parent],{'server':base_url, 'version':brapiVersion(version||1.2)},"map");
        var requrl = this.connect.server+"/token";
        var self = this;
        if (auth_params){
            fetchRef(requrl, {
                    method: 'post',
                    headers: {
                      'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(auth_params)
                })
                .then(parse_json_response)
                .catch(function(reason){
                    self.fail(reason);
                    return null;
                })
                .then(function(json){
                    self.connect['auth']=json;
                    forward();
                });
        } else {
            this.connect['auth']=null;
            forward();
        }
        function forward(){
            parent.addAsyncHook(function(datum, key){
                var task = new Task(key);
                self.addTask(task);
                task.complete(datum);
                self.publishResult(task);
            });
        }
    }
}

export class Initial_Connection_Node extends Connection_Node{
    data(dataArray){
        return new Data_Node(this,this.connect,dataArray);
    }
}

export class Root_Node extends Context_Node{
    constructor(){
        super([],{},"fork");
        var task = new Task(0, "");
        this.addTask(task);
        task.complete(this.connect);
        this.publishResult(task);
    }
    server(server,auth_params,version){
        return new Initial_Connection_Node(this,server,auth_params,version);
    }
};

export class Data_Node extends Context_Node{
    constructor(parent,connect,dataArray){
        super([parent],connect,"fork");
        var self = this;
        dataArray.forEach(function(datum,i){
            var task = new Task(i, "");
            self.addTask(task);
            task.stored_result = datum;
        });
        parent.addFinishHook(function(){
            self.getTasks().forEach(function(task){
                task.complete(task.stored_result);
                self.publishResult(task);
            })
        });
    }
}

export class BrAPI_Behavior_Node extends Context_Node{
    constructor(parent,connect,behavior,httpMethod,url_body_func,multicall){
        super([parent],connect,behavior);
        this.behavior = behavior;
        this.d_func = url_body_func;
        this.method = httpMethod;
        var self = this;
        var hookTo = multicall ? parent.addAsyncHook : parent.addFinishHook;
        hookTo.call(parent,function(dat, key){
            var d_call = self.d_func(dat, key);
            if (self.connect.auth!=null && self.connect.auth.access_token){
                d_call.params['access_token'] = self.connect.auth.access_token
            }
            var pageRange = [0,Infinity];
            if (d_call.params.pageRange){
                pageRange = d_call.params.pageRange;
                delete d_call.params.pageRange;
            }
            var fetch_args = {
                method: d_call.params.HTTPMethod || self.method, 
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            };
            key = multicall ? key : 0;
            self.loadPage(pageRange[0],key,d_call,fetch_args,pageRange);
        });
    }
    
    formatURLParams(params){
        var start = true;
        var param_string = "";
        for (var param in params) {
            if (start) {
                param_string+="?"
                start = false
            } else {
                param_string+="&"
            }
            param_string+=param+"=";
            if (params[param] instanceof Array){
                param_string+=params[param].map(String).join("%2C")
            }
            else {
                param_string+=String(params[param]);
            }
        }
        return param_string
    }
    
    loadPage(page_num,unforked_key,d_call,fetch_args,pageRange,state){
        if (state==undefined){
            state = {
                'is_paginated': undefined,
                'concatenated': undefined,
                'sentry': undefined,
                'forked_key': 0
            }
        }
        var page_url = d_call.url;
        
        if(page_num>0) d_call.params["page"] = page_num;
        
        if (fetch_args.method=="patch"||fetch_args.method=="put"||fetch_args.method=="post"){
            fetch_args["body"] = JSON.stringify(d_call.params)
        }
        else{
            page_url+=this.formatURLParams(d_call.params)
        }
        
        var sentry_task = state.sentry || new Task((page_num==pageRange[0]?"":"SENTRY"+page_num)+unforked_key);
        this.addTask(sentry_task);
        
        var self = this;
        fetchRef(this.connect.server+page_url,fetch_args)
            .then(parse_json_response)
            .catch(function(reason){
                self.fail(reason);
                return null;
            })
            .then(function(json){
                if(json==null){
                    sentry_task.complete(null);
                    self.publishResult(sentry_task);
                    return;
                }
                if(state.is_paginated==undefined){
                    if (json.result.data!=undefined && json.result.data instanceof Array){
                        state.is_paginated = true;
                    } else {
                        state.is_paginated = false;
                    }
                }
                if(json.metadata.asynchStatus && json.metadata.asynchStatus.status != "FINISHED"){
                    d_call.url = d_call.url.split(/\?(.+)/)[0];
                    d_call.url += "/"+json.metadata.asynchStatus.asynchId;
                    d_call.params = {};
                    fetch_args.method = "get";
                    delete fetch_args.body;
                    setTimeout(function(){
                        self.loadPage(page_num,unforked_key,d_call,fetch_args,pageRange,state);
                    },15000);
                    return
                }
                if(state.is_paginated){
                    var final_page = Math.min(+json.metadata.pagination.totalPages-1,pageRange[1]);
                    if(self.behavior=="fork"){
                        if (page_num<final_page){
                            self.loadPage(page_num+1,unforked_key,d_call,fetch_args,pageRange,state);
                        }
                        json.result.data.slice(0,-1).forEach(function(datum){
                            var task = new Task(state.forked_key, unforked_key);
                            state.forked_key+=1;
                            datum["__response"] = json;
                            self.addTask(task);
                            task.complete(datum);
                            self.publishResult(task);
                        });
                        sentry_task.setKey(state.forked_key, unforked_key);
                        state.forked_key+=1;
                        var sent_res = json.result.data[json.result.data.length-1];
                        sent_res["__response"] = json;
                        sentry_task.complete(sent_res);
                        self.publishResult(sentry_task);
                    }
                    else {
                        if(state.concatenated==undefined){
                            state.concatenated = json;
                            state.sentry = sentry_task;
                            state.concatenated.result["__response"] = state.concatenated;
                            delete state.concatenated.metadata.pagination;
                        } else {
                            [].push.apply(state.concatenated.result.data, json.result.data);
                        }
                        if (page_num<final_page){
                            self.loadPage(page_num+1,unforked_key,d_call,fetch_args,pageRange,state);
                        } else {
                            state.sentry.complete(state.concatenated.result);
                            self.publishResult(state.sentry);
                        }
                    }
                }
                else {
                    json.result["__response"] = json;
                    sentry_task.complete(json.result);
                    self.publishResult(sentry_task);
                }
            });
    };
};
