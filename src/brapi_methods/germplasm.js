// POST /germplasm-search
export function germplasm_search(params,behavior){
    var behavior = ((behavior==undefined)?(true):(behavior))?"expand":"map";
    return this.brapi_call(behavior,"post",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/germplasm-search";
        return {'url':url, 'params':datum_params};
    });
};

// GET /germplasm/{germplasmDbId}
export function germplasm(params){
    return this.brapi_call("map","get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/germplasm/"+(datum_params.germplasmDbId);
        delete datum_params.germplasmDbId;
        return {'url':url, 'params':datum_params};
    });
};

// GET /germplasm/{germplasmDbId}/attributes
export function germplasm_attributes(params,behavior){
    var behavior = ((behavior==undefined)?(true):(behavior))?"expand":"map";
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/germplasm/"+(datum_params.germplasmDbId)+"/attributes";
        delete datum_params.germplasmDbId;
        return {'url':url, 'params':datum_params};
    });
};

// GET /germplasm/{germplasmDbId}/markerprofiles
export function germplasm_markerprofiles(params){
    return this.brapi_call("map","get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/germplasm/"+(datum_params.germplasmDbId)+"/markerprofiles";
        delete datum_params.germplasmDbId;
        return {'url':url, 'params':datum_params};
    });
};

// GET /germplasm/{germplasmDbId}/pedigree
export function germplasm_pedigree(params){
    return this.brapi_call("map","get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/germplasm/"+(datum_params.germplasmDbId)+"/pedigree";
        delete datum_params.germplasmDbId;
        return {'url':url, 'params':datum_params};
    });
};
