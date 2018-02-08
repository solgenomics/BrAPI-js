// GET /markerprofiles & GET /markerprofiles/{markerprofileDbId}
export function markerprofiles(params,behavior){
    var behavior = ((behavior==undefined)?(true):(behavior))?"expand":"map";
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/markerprofiles";
        if(datum_params.markerprofileDbId!=undefined){
            url+="/"+datum_params.markerprofileDbId;
            delete datum_params.markerprofileDbId;
        }
        return {'url':url, 'params':datum_params};
    });
};
