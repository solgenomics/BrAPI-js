// POST /studies-search
export function studies_search(params,behavior){
    var behavior = behavior=="map"?behavior:"fork";
    return this.brapi_call(behavior,"post",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/studies-search";
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};

// GET /studies/{studiesDbId}
export function studies(params){
    return this.brapi_call("map","get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/studies/"+(datum_params.studiesDbId);
        delete datum_params.studiesDbId;
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};

// GET /studies/{studiesDbId}/germplasm
export function studies_germplasm(params,behavior){
    var behavior = behavior=="map"?behavior:"fork";
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/studies/"+datum_params.studiesDbId+"/germplasm";
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};

// GET /studies/{studiesDbId}/layout
export function studies_layout(params,behavior){
    var behavior = behavior=="map"?behavior:"fork";
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/studies/"+datum_params.studiesDbId+"/layout";
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};

// GET /studies/{studiesDbId}/observations
export function studies_observations(params,behavior){
    var behavior = behavior=="map"?behavior:"fork";
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/studies/"+datum_params.studiesDbId+"/observations";
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};

// GET /studies/{studiesDbId}/observationunits
export function studies_observationunits(params,behavior){
    var behavior = behavior=="map"?behavior:"fork";
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/studies/"+datum_params.studiesDbId+"/observationunits";
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};

// GET /studies/{studiesDbId}/observationvariables
export function studies_observationvariables(params,behavior){
    var behavior = behavior=="map"?behavior:"fork";
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/studies/"+datum_params.studiesDbId+"/observationvariables";
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};

// GET /studies/{studiesDbId}/table
export function studies_table(params){
    return this.brapi_call("map","get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/studies/"+(datum_params.studiesDbId)+"/table";
        delete datum_params.studiesDbId;
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};

// GET /studytypes
export function studytypes(params,behavior){
    var behavior = behavior=="map"?behavior:"fork";
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = typeof params === "function" ? params(datum) 
                            : Object.assign({}, params);
        var url = "/studytypes";
        return {'url':url, 'params':datum_params};
    }, typeof params === "function");
};
