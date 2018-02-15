// GET /maps
export function maps_list(params,behavior){
    var behavior = behavior=="map"?behavior:"fork";
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/maps";
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};

// GET /maps/{mapDbId}
export function maps(params){
    return this.brapi_call("map","get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/maps/"+datum_params.mapDbId;
        delete datum_params.mapDbId;
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};

// GET /maps/{mapDbId}/positions
export function maps_positions_list(params,behavior){
    var behavior = behavior=="map"?behavior:"fork";
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/maps/"+datum_params.mapDbId+"/positions";
        delete datum_params.mapDbId;
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};

// GET /maps/{mapDbId}/positions/{linkageGroupId}
export function maps_positions(params,behavior){
    var behavior = behavior=="map"?behavior:"fork";
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/maps/"+datum_params.mapDbId+"/positions/"+datum_params.linkageGroupId;
        delete datum_params.mapDbId;
        delete datum_params.linkageGroupId;
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};
