// POST /variables-search
export function variables_search(params,behavior){
    var behavior = ((behavior==undefined)?(true):(behavior))?"fork":"map";
    return this.brapi_call(behavior,"post",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/variables-search";
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};

// GET /variables & GET /variables/{variableDbId}
export function variables(params,behavior){
    var behavior = ((behavior==undefined)?(true):(behavior))?"fork":"map";
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/variables";
        if(datum_params.variableDbId!=undefined){
            url+="/"+datum_params.variableDbId;
            delete datum_params.variableDbId;
        }
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};

// GET /variables/datatypes
export function variables_datatypes(params,behavior){
    var behavior = ((behavior==undefined)?(true):(behavior))?"fork":"map";
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/variables/datatypes";
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};
