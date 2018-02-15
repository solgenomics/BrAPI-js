// GET /traits 
export function traits_list(params,behavior){
    var behavior = behavior=="map"?behavior:"fork";
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/traits";
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
}

// GET /traits/{traitDbId}
export function traits(params){
    return this.brapi_call("map","get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/traits/"+datum_params.traitDbId;
        delete datum_params.traitDbId;
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
}
