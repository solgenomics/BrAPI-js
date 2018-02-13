import {Task,Merge_Task} from './tasks'
import * as methods from './brapi_methods';

var fetchRef;
if (typeof window === 'undefined') {
    fetchRef = require('node-fetch');
} else {
    fetchRef = window.fetch;
}

function parse_json_response(response) {
    return response.json();
}

export default class BrAPI_Methods {
    constructor(){}
}
for (var method_name in methods) {
    BrAPI_Methods.prototype[method_name] = methods[method_name];
}

export class Context_Node extends BrAPI_Methods{
    constructor(parent_list,connection_information,node_type){
        super();
        this.isFinished = false;
        this.node_type = node_type;
        this.parents = parent_list;
        this.async_hooks = [];
        this.finish_hooks = [];
        this.tasks = [];
        this.parameters = null;
        this.connect = connection_information || {};
    }
    
    addTask(task){
        this.tasks.push(task);
    }
    
    publishResult(task){
        this.async_hooks.forEach(function(hook){
            hook(task.getResult(),task.getIndex());
        });
        this.checkFinished();
    }
    
    addAsyncHook(hook){
        this.async_hooks.push(hook);
        this.tasks.filter(function(task){
            return task.complete();
        }).forEach(function(task){
            hook(task.getResult(),task.getIndex());
        });
    }
    
    addFinishHook(hook){
        this.finish_hooks.push(hook);
        if(this.isFinished){
            hook(this.tasks
                .sort(function(a,b){
                    return a.index <= b.index ? -1 : 1;
                })
                .map(function(task){
                    return task.getResult();
                })
            );
        }
    }
    
    checkFinished(){
        if (!this.isFinished){
            var parsFin = this.parents.every(function(par){return par.checkFinished()});
            var thisFin = this.tasks.every(function(task){return task.complete()});
            this.isFinished = parsFin && thisFin;
            if (this.isFinished){
                this._onFinish();
            }
        }
        return this.isFinished
    }
    
    _onFinish(){
        var self = this;
        this.finish_hooks.forEach(function(hook){
            hook(self.tasks
                .sort(function(a,b){
                    return a.index <= b.index ? -1 : 1;
                })
                .map(function(task){
                    return task.getResult();
                })
            );
        });
    }
    
    each(func){ this.addAsyncHook(func); return this;}
    all(func){ this.addFinishHook(func); return this;}
    
    merge(/*other,[other]...*/){
        var parent_nodes = [this];
        [].push.apply(parent_nodes,arguments);
        return new Merge_Node(parent_nodes,this.connect);
    }
    
    reduce(reductionFunc){
        return new Reduce_Node(this,this.connect,reductionFunc);
    }
    
    map(mapFunc){
        return new Map_Node(this,this.connect,mapFunc);
    }
    
    filter(mapFunc){
        return new Filter_Node(this,this.connect,mapFunc);
    }
    
    server(server,auth_params){
        return new Connection_Node(this,server,auth_params);
    }
    
    brapi_call(behavior,httpMethod,url_body_func){
        return new BrAPI_Behavior_Node(
            this,this.connect,behavior,httpMethod,url_body_func
        );
    }
};

export class Filter_Node extends Context_Node{
    constructor(parent,connect,mapFunc){
        super([parent],connect,"filter");
        var self = this;
        parent.addAsyncHook(function(datum, index){
            if(filterFunc(datum)){
                var task = new Task(index);
                self.addTask(task);
                task.complete(mapFunc(datum));
                self.publishResult(task);
            } else if (self.tasks.length == 0){
                self.checkFinished();
            }
        });
    }
};

export class Map_Node extends Context_Node{
    constructor(parent,connect,mapFunc){
        super([parent],connect,"map");
        var self = this;
        parent.addAsyncHook(function(datum, index){
            var task = new Task(index);
            self.addTask(task);
            task.complete(mapFunc(datum));
            self.publishResult(task);
        });
    }
};

export class Reduce_Node extends Context_Node{
    constructor(parent,connect,reductionFunc){
        super([parent],connect,"reduce");
        var task = new Task(0);
        this.addTask(task);
        var self = this;
        parent.addFinishHook(function(data, key){
            out_datum = reductionFunc==undefined?data:data.reduce(reductionFunc);
            task.complete(out_datum);
            self.publishResult(task);
        });
    }
};

export class Merge_Node extends Context_Node{
    constructor(parent_nodes,connect){
        super(parent_nodes,connect,"merge");
        this.task_map = {};
        var self = this;
        parent_nodes.forEach(function(parent){
            parent.addAsyncHook(function(datum, key){
                if(self.task_map[key]==undefined){
                    self.task_map[key] = new Merge_Task(key);
                    self.tasks.push(self.task_map[key]);
                    self.task_map[key].result = parent_nodes.map(function(){return undefined})
                }
                var task = self.task_map[key];
                task.result[parent_nodes.indexOf(parent)] = datum;
                if(task.result.filter(function(d){return d!=undefined}).length==parent_nodes.length){
                    task.complete(true);
                    self.publishResult(task);
                }
            });
            parent.addFinishHook(function(datum){
                for (var key in self.task_map) {
                    if (self.task_map.hasOwnProperty(key)) {
                        var task = self.task_map[key];
                        if (!task.complete()){
                            var pindex = parent_nodes.indexOf(parent);
                            if (task.result[pindex]==undefined) {
                                task.result[pindex]=null;
                            }
                            if(task.result.filter(function(d){return d!=undefined}).length==parent_nodes.length){
                                task.complete(true);
                                self.publishResult(task);
                            }
                        }
                    }
                }
            });
        })
    }
};

export class Connection_Node extends Context_Node{
    constructor(parent,server,auth_params){
        super([parent],{'server':server},"map");
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
                .then(function(json){
                    self.connect['auth']=json;
                    forward();
                });
        } else {
            this.connect['auth']=null;
            forward();
        }
        function forward(){
            parent.addAsyncHook(function(datum, index){
                var task = new Task(index);
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
        super([],{},"expand");
        var task = new Task(0);
        this.addTask(task);
        task.complete(this.connect);
        this.publishResult(task);
    }
    server(server,auth_params){
        return new Initial_Connection_Node(this,server,auth_params);
    }
    data(dataArray){
        return new Data_Node(this,this.connect,dataArray);
    }
};

export class Data_Node extends Context_Node{
    constructor(parent,connect,dataArray){
        super([parent],connect,"expand");
        var self = this;
        dataArray.forEach(function(datum,i){
            var task = new Task(i);
            self.addTask(task);
            task.complete(datum);
        });
        parent.addFinishHook(function(){
            self.tasks.forEach(function(t){
                self.publishResult(t);
            })
        });
    }
}

export class BrAPI_Behavior_Node extends Context_Node{
    constructor(parent,connect,behavior,httpMethod,url_body_func){
        super([parent],connect,behavior);
        this.behavior = behavior;
        this.d_func = url_body_func;
        this.method = httpMethod;
        this.expanded_index = 0;
        var self = this;
        parent.addAsyncHook(function(datum, index){
            var d_call = self.d_func(datum);
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
            self.loadPage(pageRange[0],index,d_call,fetch_args,pageRange);
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
    
    loadPage(page_num,unexpanded_index,d_call,fetch_args,pageRange,state){
        if (state==undefined){
            state = {
                'is_paginated': undefined,
                'concatenated': undefined,
                'expanded_index': 0
            }
        }
        var page_url = d_call.url;
        
        if(page_num>0) d_call.params["page"] = page_num;
        
        if (fetch_args.method=="put"||fetch_args.method=="post"){
            fetch_args["body"] = JSON.stringify(d_call.params)
        }
        else{
            page_url+=this.formatURLParams(d_call.params)
        }
        
        var sentry_task = new Task(unexpanded_index);
        this.addTask(sentry_task);
        
        var self = this;
        fetchRef(this.connect.server+page_url,fetch_args)
            .then(parse_json_response) 
            .then(function(json){
                if(state.is_paginated==undefined){
                    if (json.result.data!=undefined && json.result.data instanceof Array){
                        state.is_paginated = true;
                    } else {
                        state.is_paginated = false;
                    }
                }
                if(state.is_paginated){
                    var final_page = Math.min(+json.metadata.pagination.totalPages-1,pageRange[1]);
                    if(self.behavior=="expand"){
                        if (page_num<final_page){
                            self.loadPage(page_num+1,unexpanded_index,d_call,fetch_args,pageRange,state);
                        }
                        json.result.data.slice(0,-1).forEach(function(datum){
                            var task = new Task(self.expanded_index);
                            self.expanded_index+=1;
                            datum["__response"] = json;
                            self.addTask(task);
                            task.complete(datum);
                            self.publishResult(task);
                        });
                        sentry_task.setIndex(self.expanded_index);
                        self.expanded_index+=1;
                        sentry_task.complete(json.result.data[json.result.data.length-1]);
                        self.publishResult(sentry_task);
                    }
                    else {
                        if(state.concatenated==undefined){
                            state.concatenated = json;
                            delete state.concatenated.metadata.pagination;
                        } else {
                            [].push.apply(state.concatenated.result.data, json.result.data);
                        }
                        if (page_num<final_page){
                            self.loadPage(page_num+1,unexpanded_index,d_call,fetch_args,state);
                        } else {
                            state.concatenated.result["__response"] = json;
                            sentry_task.complete(state.concatenated.result);
                            self.publishResult(sentry_task);
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
