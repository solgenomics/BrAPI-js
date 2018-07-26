// POST /germplasm-search
export function germplasm_search(params,behavior){
    var behavior = behavior=="map"?behavior:"fork";
    return this.brapi_call(behavior,"post",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/germplasm-search";
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};

// GET /germplasm/{germplasmDbId}
export function germplasm(params){
    return this.brapi_call("map","get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/germplasm/"+(datum_params.germplasmDbId);
        delete datum_params.germplasmDbId;
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};

// GET /germplasm/{germplasmDbId}/markerprofiles
export function germplasm_markerprofiles(params){
    return this.brapi_call("map","get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/germplasm/"+(datum_params.germplasmDbId)+"/markerprofiles";
        delete datum_params.germplasmDbId;
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};

// GET /germplasm/{germplasmDbId}/pedigree
export function germplasm_pedigree(params){
    return this.brapi_call("map","get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/germplasm/"+(datum_params.germplasmDbId)+"/pedigree";
        delete datum_params.germplasmDbId;
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};

// GET /germplasm/{germplasmDbId}/progeny
export function germplasm_progeny(params,behavior){
    var behavior = behavior=="map"?behavior:"fork";
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/germplasm/"+(datum_params.germplasmDbId)+"/progeny";
        delete datum_params.germplasmDbId;
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};

// GET /breedingmethods
function breedingMethods_list(params,behavior){
    var behavior = behavior=="map"?behavior:"fork";
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/breedingmethods";
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
}
breedingMethods_list.introduced = "v1.2";

// GET /breedingmethods/{breedingMethodDbId}
function breedingMethods(params){
    return this.brapi_call("map","get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/breedingmethods/"+datum_params.breedingMethodDbId;
        delete datum_params.breedingMethodDbId;
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
}
breedingMethods.introduced = "v1.2";
