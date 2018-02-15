// GET /markerprofiles
export function markerprofiles_list(params,behavior){
    var behavior = behavior=="map"?behavior:"fork";
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/markerprofiles";
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};

// GET /markerprofiles/{markerprofileDbId}
export function markerprofiles(params){
    return this.brapi_call("map","get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/markerprofiles/"+datum_params.markerprofileDbId;
        delete datum_params.markerprofileDbId;
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};
