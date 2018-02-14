// GET /locations & GET /locations/{locationsDbId}
export function locations(params,behavior){
    var behavior = ((behavior==undefined)?(true):(behavior))?"fork":"map";
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/locations";
        if(datum_params.locationsDbId!=undefined){
            url+="/"+datum_params.locationsDbId;
            delete datum_params.locationsDbId;
        }
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};
