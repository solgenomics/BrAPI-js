import {ThreadNode, EmptyThreadNode, DatumWrapper, NodeFrayError} from "./ThreadNode.js";
import * as brapiMethods from './brapi_methods.js';
import brapiVersion from './brapiVersion.js';

try {
    var fetch = window.fetch;
} catch(e){
    var fetch = require('node-fetch');
}

class BrAPINode extends ThreadNode {
    constructor(brapi_controller) {
        super(Array.prototype.slice.call(arguments,1));
        this.brapi = brapi_controller;
        this.version = this.brapi.version;
        this.pollFunc = function(){return 15000};
    }
    _outputNode(){
        return new BrAPINode(this.brapi);
    }
    poll(callback){
        var last = this.pollFunc;
        this.pollFunc = function(response){
            var last_result = last(response);
            return callback(response) || last_result;
        }
        return this;
    }
    server(address,version,auth_token,call_limit){
        var newNode = this.map(d=>d);
        newNode.brapi = new BrAPICallController(address,version,auth_token,call_limit||5);
        newNode.version = newNode.brapi.version;
        return newNode;
    }
    simple_brapi_call(call){
        // {
        //     'defaultMethod': 'get',
        //     'urlTemplate': '/breedingmethods',
        //     'params': params,
        //     'behaviorOptions': ['fork','map'],
        //     'behavior': behavior,
        // }
        
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
        if(!multicall) {
            var _callparams = call.params;
            call.params = function(){return _callparams};
        }
        
        var self = this;
        
        var fray = function(){
            var target = multicall?self:(new EmptyBrAPINode(self.brapi));
            return self._fray.apply(target,arguments);
        }
        
        var frayed = fray(function(datum, send){
            var datum_raw_params = Object.assign({}, call.params(datum.val));
            var datum_call = self.consumeUrlParams(
                call.urlTemplate,
                datum_raw_params
            );
            var method = datum_call.params.HTTPMethod?
                datum_call.params.HTTPMethod:
                call.defaultMethod;
            if(datum_call.params.HTTPMethod) delete datum_call.params.HTTPMethod;
            
            var pageRange = datum_call.params.pageRange?
                datum_call.params.pageRange:
                null;
            if(datum_call.params.pageRange) delete datum_call.params.pageRange;
            
            var loaded = [];
            
            var loadPage = function(page){
                return self.brapi.call(
                    method,
                    datum_call.url,
                    datum_call.params,
                    page,
                    self.pollFunc
                )
            }
            
            var loadFurther;
            
            if(behavior=="map"){
                loadFurther = function(initialResult){
                    if(!initialResult.isPaginated){
                        return [new DatumWrapper(
                            initialResult.result, 
                            datum.key
                        )];
                    }
                    else {
                        if(!pageRange){
                            pageRange = initialResult.furtherPageRange;
                        }
                        var further_pages = [];
                        for (var i = pageRange[0]+1; i < pageRange[1]; i++) {
                            further_pages.push(
                                loadPage(i)
                            )
                        }
                        return Promise.all(further_pages).then(function(furtherResults){
                            initialResult.metadata.currentPage = [initialResult.metadata.currentPage];
                            furtherResults.forEach(function(furtherResponse){
                                Array.prototype.push.apply(
                                    initialResult.result.data,
                                    furtherResponse.result.data
                                );
                                initialResult.metadata.currentPage.push(
                                    furtherResponse.metadata.currentPage
                                )
                            });
                            initialResult.metadata.currentPage.sort();
                            return [new DatumWrapper(
                                initialResult.result, 
                                datum.key
                            )];
                        })
                    }
                }
            }
            else if(behavior=="fork"){
                var fray_index = 0;
                var fray_key = function(){return datum.key+","+(fray_index++)};
                var frayResult = function(result){
                    return result.data.map(function(d){
                        d.__response = result.__response;
                        return (new DatumWrapper(d,fray_key()));
                    })
                };
                loadFurther = function(initialResult){
                    if(!initialResult.isPaginated){
                        return [new DatumWrapper(
                            initialResult.result, 
                            fray_key()
                        )];
                    }
                    else {
                        if(!pageRange){
                            pageRange = initialResult.furtherPageRange;
                        }
                        var further_pages = [];
                        for (var i = pageRange[0]+1; i < pageRange[1]; i++) {
                            further_pages.push(
                                loadPage(i)
                            )
                        }
                        return [frayResult(initialResult.result)].concat(further_pages.map(function(pg){
                            return pg.then(function(furtherResult){return frayResult(furtherResult.result)})
                        }));
                    }
                }
            }
            
            send(loadPage(pageRange?pageRange[0]:undefined).then(loadFurther))
            
        })
        return frayed;

        // // create a brapi call
        // return this.brapi_call(behavior,call.defaultMethod,function(datum){
        //   // create or duplicate the parameters for this datum (create shallow copy to protect original parmeter object)
        //   var datum_params = Object.assign({}, multicall ? call.params(datum) : call.params);
        //   // fill urlTemplate with specified parameters and remove them from the datum_params
        //   return this.consumeUrlParams(call.urlTemplate,datum_params);
        // }, multicall)
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
}

class EmptyBrAPINode extends BrAPINode{
    constructor(brapi_controller) {
        super(...arguments);
        var ownInput = this._connect(null);
        ownInput.send([this._wrap_datum(null)]);
        ownInput.finish();
    }
}
EmptyBrAPINode.prototype.data = EmptyThreadNode.prototype.data;

class BrAPICallController {
    constructor(brapi_base_url,version,brapi_auth_token,max_calls){
        this.max_calls = max_calls || 5;
        this.call_queue = [];
        this.version = brapiVersion(version||1.2);
        this.running = 0;
        this.brapi_base_url = brapi_base_url;
        this.brapi_auth_token = brapi_auth_token;
    }
    call(){
        var self = this;
        var callArgs = arguments;
        var queue_item = {};
        var result_promise = new Promise(function(resolve,reject){
            queue_item.run = function(){
                self._call.apply(self, callArgs).then(resolve);
            }
        });
        this.call_queue.push(queue_item);
        this._run_from_queue();
        return result_promise;
    }
    _run_from_queue(){
        while(this.call_queue.length>0 && this.running<this.max_calls){
            var call = this.call_queue.shift();
            call.run();
            this.running += 1;
        }
    }
    _call(method, url, params, page, pollFunc){
        if(page) params.page = page;
        var body = undefined;
        url = this.brapi_base_url+url
        if (method=="patch" || method=="put" || method=="post"){
            body = JSON.stringify(params);
        }
        else{
            url = url+BrAPICallController.formatURLParams(params)
        }
        if (method == "patch") {
            // fetch spec doesn't normalize patch so we do it here
            method = "PATCH";
        }
        var fetch_opts = {
            method: method,
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: body
        };
        if(this.brapi_auth_token){
            if(this.brapi_base_url.startsWith("https")){
                console.log("auth",this.brapi_auth_token);
                fetch_opts.headers.Authorization = "Bearer "+this.brapi_auth_token;
            } else {
                console.warn("BrAPI.js will only send authentication token over https!")
            }
        }
        // console.log("fetch(",url,",",fetch_opts,")")
        var self = this;
        return fetch(url,fetch_opts)
            .then(function(resp){
                self.running -= 1;
                self._run_from_queue();
                return resp
            })
            .then(function(response) { 
                return response.json(); 
            })
            .then(function(response) { 
                return self.checkAsync(url,fetch_opts,pollFunc,response); 
            })
            .then(BrAPICallController.parseBrAPIResponse);
    }
    
    static parseBrAPIResponse(resp){
        var brapiInfo = {
            result: resp.result || {},
            metadata:resp.metadata
        };
        // console.log(resp);
        if(resp.metadata.pagination && resp.metadata.pagination.pageSize){
            brapiInfo.isPaginated = true;
            brapiInfo.furtherPageRange = [
                resp.metadata.pagination.currentPage,
                resp.metadata.pagination.totalPages
            ];
        } else {
            brapiInfo.isPaginated = false;
        }
        
        brapiInfo.result.__response = resp;
        return brapiInfo;
    }
    
    checkAsync(url,fetch_opts,pollFunc,response,isPolling){
        var self = this;
        //<v1.2 asynch initiate
        if(!isPolling && response.metadata.status && Array.isArray(response.metadata.status)){
            for (var i = 0; i < response.metadata.status.length; i++) {
                if(response.metadata.status[i].code=="asynchid"){
                    url = url.split(/\?(.+)/)[0];
                    url += "/status/"+response.metadata.status[i].message;
                    fetch_opts.method = "get";
                    delete fetch_opts.body;
                    isPolling = true;
                }
            }
        }
        //>=v1.2 asynch initiate
        if(!isPolling && response.metadata.asynchStatus && response.metadata.asynchStatus.asynchId && response.metadata.asynchStatus.status != "FINISHED"){
            url = url.split(/\?(.+)/)[0];
            url += "/"+response.metadata.asynchStatus.asynchId;
            fetch_opts.method = "get";
            delete fetch_opts.body;
            isPolling = true;
        }
        if(isPolling){
            var pollAgain = false;
            //>=v1.2 asynch poll
            if(response.metadata.asynchStatus && response.metadata.asynchStatus.status != "FINISHED"){
                pollAgain = true;
            }
            //<v1.2 asynch poll
            if(response.metadata.status && Array.isArray(response.metadata.status)){
                for (var i = 0; i < response.metadata.status.length; i++) {
                    if(response.metadata.status[i].code=="asynchid" || response.metadata.status[i].code=="asynchstatus" && response.metadata.status[i].message!="FINISHED"){
                        pollAgain = true;
                    }
                }
            }
            //If we are still polling, queue the next poll
            if(pollAgain){
                var self = this;
                return new Promise(function(resolve,reject){
                    setTimeout(function(){
                        var queue_item = {run:function(){
                            resolve(fetch(url,fetch_opts)
                                .then(function(resp){
                                    self.running -= 1;
                                    self._run_from_queue();
                                    return resp
                                })
                                .then(function(response){return response.json();})
                                .then(function(response) { 
                                    return self.checkAsync(url,fetch_opts,pollFunc,response,true); 
                                }))
                        }};
                        self.call_queue.push(queue_item);
                        self._run_from_queue();
                    },pollFunc(response))
                })
            }
        }
        return response
    }
    
    static formatURLParams(params){
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
}

// Apply each brapi method to BrAPINode
Object.keys(brapiMethods).forEach(function(method_name){
    BrAPINode.prototype[method_name] = brapiMethods[method_name];
    EmptyBrAPINode.prototype[method_name] = brapiMethods[method_name];
});

/**
 * BrAPI - initializes a BrAPI client handler
 *  
 * @param   {String} server      URL without trailing '/' to the BrAPI endpoint 
 * @param   {String} version     Optional. BrAPI version of endpoint (e.g. "1.2" or "v1.1") 
 * @param   {String} auth_token  Optional. BrAPI Auth Bearer token.
 * @param   {Int}    call_limit  Optional. Maximum number of simultanious calls the server which can be running.
 * @returns {EmptyBrAPINode}            
 */ 
export function BrAPI(address, version, auth_token, call_limit){
    return new EmptyBrAPINode(
        new BrAPICallController(address,version,auth_token,call_limit||5)
    );
}

// BrAPI("https://cassavabase.org/brapi/v1",null,null,5)
// .data(["00122","00135"]).germplasm_search(function(d){
//     return {'germplasmNames':d}
// }).each(function(d,key){console.log(key,d.germplasmName)}).germplasm_pedigree(d=>{
//     return {germplasmDbId:d.germplasmDbId}
// })
// .each(function(d,key){console.log(key,d.parent1DbId)})
// .filter(function(d){return d.parent1DbId})
// .each(function(d,key){console.log(key, "Not Null", d.parent1DbId)})
// .germplasm_detail(function(d){return {germplasmDbId:d.parent1DbId}})
// .each(function(d,key){console.log(key,d.germplasmName)})
// .all(da=>console.log(da.map(d=>d.germplasmName)))
