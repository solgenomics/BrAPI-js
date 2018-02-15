// GET /programs
export function programs(params,behavior){
    var behavior = behavior=="map"?behavior:"fork";
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/programs";
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};

// POST /programs-search
export function programs_search(params,behavior){
    var behavior = behavior=="map"?behavior:"fork";
    return this.brapi_call(behavior,"post",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/programs-search";
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};
