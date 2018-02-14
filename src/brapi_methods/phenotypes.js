// POST /phenotypes-search
export function phenotypes_search(params,behavior){
    var behavior = ((behavior==undefined)?(true):(behavior))?"fork":"map";
    return this.brapi_call(behavior,"post",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/phenotypes-search";
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};
