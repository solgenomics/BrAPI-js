// POST /samples-search
export function samples_search(params,behavior){
    var behavior = ((behavior==undefined)?(true):(behavior))?"fork":"map";
    return this.brapi_call(behavior,"post",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/samples-search";
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
}

// GET /samples/{samplesDbId}
export function samples(params){
    return this.brapi_call("map","get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/samples/"+(datum_params.samplesDbId);
        delete datum_params.samplesDbId;
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
}
