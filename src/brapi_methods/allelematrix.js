// POST /allelmatrix-search
export function allelematrix_search(params,behavior){
    var behavior = behavior=="map"?behavior:"fork";
    return this.brapi_call(behavior,"post",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/allelematrix-search";
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};
