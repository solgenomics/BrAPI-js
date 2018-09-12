/** POST /markers-search */
export function markers_search(params,behavior){
    var behavior = behavior=="map"?behavior:"fork";
    return this.brapi_call(behavior,"post",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/markers-search";
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};

/** GET /markers/{markerDbId} */
export function markers(params){
    return this.brapi_call("map","get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/markers/"+datum_params.markerDbId;
        delete datum_params.markerDbId;
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};


/** GET /markers */
function markers_list(params){
    return this.brapi_call("map","get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/markers";
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
}
markers_list.deprecated = "v1.2";
