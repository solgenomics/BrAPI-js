// GET /attributes
export function attributes(params,behavior){
    var behavior = ((behavior==undefined)?(true):(behavior))?"fork":"map";
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/attributes";
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};

// GET /attributes/categories
export function attributes_categories(params,behavior){
    var behavior = ((behavior==undefined)?(true):(behavior))?"fork":"map";
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/attributes/categories";
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};
