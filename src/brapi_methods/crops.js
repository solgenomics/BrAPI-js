// GET /crops
export function crops(params,behavior){
    var behavior = behavior=="map"?behavior:"fork";
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/crops";
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};
crops.deprecated = "v1.2";

// GET /commoncropnames
export function commonCropNames(params,behavior){
    var behavior = behavior=="map"?behavior:"fork";
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/commoncropnames";
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};
commonCropNames.introduced = "v1.2";
