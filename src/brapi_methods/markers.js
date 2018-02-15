// GET /markers
export function markers_list(params,behavior){
    var behavior = behavior=="map"?behavior:"fork";
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/markers";
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};

// GET /markers/{markerDbId}
export function markers(params){
    return this.brapi_call("map","get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/markers/"+datum_params.markerDbId;
        delete datum_params.markerDbId;
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};
