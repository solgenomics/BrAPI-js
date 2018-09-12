/** POST /variables-search */
export function variables_search(params,behavior){
    var behavior = behavior=="map"?behavior:"fork";
    return this.brapi_call(behavior,"post",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/variables-search";
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};

/** GET /variables */
export function variables_list(params,behavior){
    var behavior = behavior=="map"?behavior:"fork";
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/variables";
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};

/** GET /variables/{variableDbId} */
export function variables(params){
    return this.brapi_call("map","get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/variables/"+datum_params.variableDbId;
        delete datum_params.variableDbId;
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};

/** GET /variables/datatypes */
export function variables_datatypes(params,behavior){
    var behavior = behavior=="map"?behavior:"fork";
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/variables/datatypes";
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};
