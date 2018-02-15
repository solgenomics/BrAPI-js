// GET /maps & GET /maps/{mapDbId}
export function maps(params,behavior){
    var behavior = behavior=="map"?behavior:"fork";
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/maps";
        if(datum_params.mapDbId!=undefined){
            url+="/"+datum_params.mapDbId;
            delete datum_params.mapDbId;
        }
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};

// GET /maps/{mapDbId}/positions & GET /maps/{mapDbId}/positions/{linkageGroupId}
export function maps_positions(params,behavior){
    var behavior = behavior=="map"?behavior:"fork";
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/maps/"+datum_params.mapDbId+"/positions";
        delete datum_params.mapDbId;
        if(datum_params.linkageGroupId!=undefined){
            url+="/"+datum_params.linkageGroupId;
            delete datum_params.linkageGroupId;
        }
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};
