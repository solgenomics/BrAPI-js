// GET /attributes
export function attributes(params,behavior){
    var behavior = behavior=="map"?behavior:"fork";
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/attributes";
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};

// GET /attributes/categories
export function attributes_categories(params,behavior){
    var behavior = behavior=="map"?behavior:"fork";
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/attributes/categories";
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};

// GET /germplasm/{germplasmDbId}/attributes
export function germplasm_attributes(params,behavior){
    var behavior = behavior=="map"?behavior:"fork";
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/germplasm/"+(datum_params.germplasmDbId)+"/attributes";
        delete datum_params.germplasmDbId;
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};
