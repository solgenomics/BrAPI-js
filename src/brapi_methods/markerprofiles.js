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

// POST /allelmatrix-search
export function allelematrix_search(params,behavior){
    var behavior = behavior=="map"?behavior:"fork";
    return this.brapi_call(behavior,"post",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/allelematrix-search";
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};
allelematrix_search.deprecated = "v1.2";
