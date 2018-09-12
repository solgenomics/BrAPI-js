/** GET /trials */
export function trials_list(params,behavior){
    var behavior = behavior=="map"?behavior:"fork";
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/trials";
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};

/** GET /trials/{trialDbId} */
export function trials(params){
    return this.brapi_call("map","get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/trials/"+datum_params.trialDbId;
        delete datum_params.trialDbId;
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};
