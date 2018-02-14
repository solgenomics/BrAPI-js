// GET /markers & GET /markers/{markerDbId}
export function markers(params,behavior){
    var behavior = ((behavior==undefined)?(true):(behavior))?"fork":"map";
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/markers";
        if(datum_params.markerDbId!=undefined){
            url+="/"+datum_params.markerDbId;
            delete datum_params.markerDbId;
        }
        return {'url':url, 'params':datum_params};
    });
};
