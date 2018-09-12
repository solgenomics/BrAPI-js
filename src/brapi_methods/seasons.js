/** GET /seasons */
export function seasons(params,behavior){
    var behavior = behavior=="map"?behavior:"fork";
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/seasons";
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};
