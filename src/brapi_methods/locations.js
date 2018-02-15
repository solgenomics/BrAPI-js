// GET /locations
export function locations_list(params,behavior){
    var behavior = behavior=="map"?behavior:"fork";
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/locations";
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};

// GET /locations/{locationsDbId}
export function locations(params){
    return this.brapi_call("map","get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/locations/"+datum_params.locationsDbId;
        delete datum_params.locationsDbId;
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};
