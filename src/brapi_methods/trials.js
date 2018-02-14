// GET /trials & GET /trials/{trialDbId}
export function trials(params,behavior){
    var behavior = ((behavior==undefined)?(true):(behavior))?"fork":"map";
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/trials";
        if(datum_params.trialDbId!=undefined){
            url+="/"+datum_params.trialDbId;
            delete datum_params.trialDbId;
        }
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};
