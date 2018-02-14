// GET /observationLevels
export function observationLevels(params,behavior){
    var behavior = ((behavior==undefined)?(true):(behavior))?"fork":"map";
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/observationLevels";
        return {'url':url, 'params':datum_params};
    });
};
