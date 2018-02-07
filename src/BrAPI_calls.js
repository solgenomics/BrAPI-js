export default class BrAPI_Calls {
    constructor(){}
    
    // POST /allelmatrix-search
    allelematrix_search(params,behavior){
        var behavior = ((behavior==undefined)?(true):(behavior))?"expand":"map";
        return this.brapi_call(behavior,"post",function(datum){
            var datum_params = typeof params === "function" ? params(datum) 
                                : Object.assign({}, params);
            var url = "/allelematrix-search";
            return {'url':url, 'params':datum_params};
        });
    }

    // GET /attributes
    attributes(params,behavior){
        var behavior = ((behavior==undefined)?(true):(behavior))?"expand":"map";
        return this.brapi_call(behavior,"get",function(datum){
            var datum_params = typeof params === "function" ? params(datum) 
                                : Object.assign({}, params);
            var url = "/attributes";
            return {'url':url, 'params':datum_params};
        });
    }

    // GET /attributes/categories
    attributes_categories(params,behavior){
        var behavior = ((behavior==undefined)?(true):(behavior))?"expand":"map";
        return this.brapi_call(behavior,"get",function(datum){
            var datum_params = typeof params === "function" ? params(datum) 
                                : Object.assign({}, params);
            var url = "/attributes/categories";
            return {'url':url, 'params':datum_params};
        });
    }

    // GET /calls
    calls(params,behavior){
        var behavior = ((behavior==undefined)?(true):(behavior))?"expand":"map";
        return this.brapi_call(behavior,"get",function(datum){
            var datum_params = typeof params === "function" ? params(datum) 
                                : Object.assign({}, params);
            var url = "/calls";
            return {'url':url, 'params':datum_params};
        });
    }

    // GET /crops
    crops(params,behavior){
        var behavior = ((behavior==undefined)?(true):(behavior))?"expand":"map";
        return this.brapi_call(behavior,"get",function(datum){
            var datum_params = typeof params === "function" ? params(datum) 
                                : Object.assign({}, params);
            var url = "/crops";
            return {'url':url, 'params':datum_params};
        });
    }

    // POST /germplasm-search
    germplasm_search(params,behavior){
        var behavior = ((behavior==undefined)?(true):(behavior))?"expand":"map";
        return this.brapi_call(behavior,"post",function(datum){
            var datum_params = typeof params === "function" ? params(datum) 
                                : Object.assign({}, params);
            var url = "/germplasm-search";
            return {'url':url, 'params':datum_params};
        });
    }

    // GET /germplasm/{germplasmDbId}
    germplasm(params){
        return this.brapi_call("map","get",function(datum){
            var datum_params = typeof params === "function" ? params(datum) 
                                : Object.assign({}, params);
            var url = "/germplasm/"+(datum_params.germplasmDbId);
            delete datum_params.germplasmDbId;
            return {'url':url, 'params':datum_params};
        });
    }

    // GET /germplasm/{germplasmDbId}/attributes
    germplasm_attributes(params,behavior){
        var behavior = ((behavior==undefined)?(true):(behavior))?"expand":"map";
        return this.brapi_call(behavior,"get",function(datum){
            var datum_params = typeof params === "function" ? params(datum) 
                                : Object.assign({}, params);
            var url = "/germplasm/"+(datum_params.germplasmDbId)+"/attributes";
            delete datum_params.germplasmDbId;
            return {'url':url, 'params':datum_params};
        });
    }

    // GET /germplasm/{germplasmDbId}/markerprofiles
    germplasm_markerprofiles(params,behavior){
        var behavior = ((behavior==undefined)?(true):(behavior))?"expand":"map";
        return this.brapi_call(behavior,"get",function(datum){
            var datum_params = typeof params === "function" ? params(datum) 
                                : Object.assign({}, params);
            var url = "/germplasm/"+(datum_params.germplasmDbId)+"/markerprofiles";
            delete datum_params.germplasmDbId;
            return {'url':url, 'params':datum_params};
        });
    }

    // GET /germplasm/{germplasmDbId}/pedigree
    germplasm_pedigree(params){
        return this.brapi_call("map","get",function(datum){
            var datum_params = typeof params === "function" ? params(datum) 
                                : Object.assign({}, params);
            var url = "/germplasm/"+(datum_params.germplasmDbId)+"/pedigree";
            delete datum_params.germplasmDbId;
            return {'url':url, 'params':datum_params};
        });
    }

    // GET /locations & GET /locations/{locationsDbId}
    locations(params,behavior){
        var behavior = ((behavior==undefined)?(true):(behavior))?"expand":"map";
        return this.brapi_call(behavior,"get",function(datum){
            var datum_params = typeof params === "function" ? params(datum) 
                                : Object.assign({}, params);
            var url = "/locations";
            if(datum_params.locationsDbId!=undefined){
                url+="/"+datum_params.locationsDbId;
                delete datum_params.locationsDbId;
            }
            return {'url':url, 'params':datum_params};
        });
    }

    // GET /maps & GET /maps/{mapDbId}
    maps(params,behavior){
        var behavior = ((behavior==undefined)?(true):(behavior))?"expand":"map";
        return this.brapi_call(behavior,"get",function(datum){
            var datum_params = typeof params === "function" ? params(datum) 
                                : Object.assign({}, params);
            var url = "/maps";
            if(datum_params.mapDbId!=undefined){
                url+="/"+datum_params.mapDbId;
                delete datum_params.mapDbId;
            }
            return {'url':url, 'params':datum_params};
        });
    }

    // GET /maps/{mapDbId}/positions & GET /maps/{mapDbId}/positions/{linkageGroupId}
    maps_positions(params,behavior){
        var behavior = ((behavior==undefined)?(true):(behavior))?"expand":"map";
        return this.brapi_call(behavior,"get",function(datum){
            var datum_params = typeof params === "function" ? params(datum) 
                                : Object.assign({}, params);
            var url = "/maps/"+datum_params.mapDbId+"/positions";
            delete datum_params.mapDbId;
            if(datum_params.linkageGroupId!=undefined){
                url+="/"+datum_params.linkageGroupId;
                delete datum_params.linkageGroupId;
            }
            return {'url':url, 'params':datum_params};
        });
    }

    // GET /markerprofiles & GET /markerprofiles/{markerprofileDbId}
    markerprofiles(params,behavior){
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
    }

    // GET /markers & GET /markers/{markerDbId}
    markers(params,behavior){
        var behavior = ((behavior==undefined)?(true):(behavior))?"expand":"map";
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
    }


    // GET /observationLevels
    observationLevels(params,behavior){
        var behavior = ((behavior==undefined)?(true):(behavior))?"expand":"map";
        return this.brapi_call(behavior,"get",function(datum){
            var datum_params = typeof params === "function" ? params(datum) 
                                : Object.assign({}, params);
            var url = "/observationLevels";
            return {'url':url, 'params':datum_params};
        });
    }

    // GET /ontologies
    ontologies(params,behavior){
        var behavior = ((behavior==undefined)?(true):(behavior))?"expand":"map";
        return this.brapi_call(behavior,"get",function(datum){
            var datum_params = typeof params === "function" ? params(datum) 
                                : Object.assign({}, params);
            var url = "/ontologies";
            return {'url':url, 'params':datum_params};
        });
    }

    // POST /phenotypes-search
    phenotypes_search(params,behavior){
        var behavior = ((behavior==undefined)?(true):(behavior))?"expand":"map";
        return this.brapi_call(behavior,"post",function(datum){
            var datum_params = typeof params === "function" ? params(datum) 
                                : Object.assign({}, params);
            var url = "/phenotypes-search";
            return {'url':url, 'params':datum_params};
        });
    }
    
    // GET /programs
    programs(params,behavior){
        var behavior = ((behavior==undefined)?(true):(behavior))?"expand":"map";
        return this.brapi_call(behavior,"get",function(datum){
            var datum_params = typeof params === "function" ? params(datum) 
                                : Object.assign({}, params);
            var url = "/programs";
            return {'url':url, 'params':datum_params};
        });
    }
    
    // POST /programs-search
    programs_search(params,behavior){
        var behavior = ((behavior==undefined)?(true):(behavior))?"expand":"map";
        return this.brapi_call(behavior,"post",function(datum){
            var datum_params = typeof params === "function" ? params(datum) 
                                : Object.assign({}, params);
            var url = "/programs-search";
            return {'url':url, 'params':datum_params};
        });
    }
    
    // POST /samples-search
    samples_search(params,behavior){
        var behavior = ((behavior==undefined)?(true):(behavior))?"expand":"map";
        return this.brapi_call(behavior,"post",function(datum){
            var datum_params = typeof params === "function" ? params(datum) 
                                : Object.assign({}, params);
            var url = "/samples-search";
            return {'url':url, 'params':datum_params};
        });
    }

    // GET /samples/{samplesDbId}
    samples(params){
        return this.brapi_call("map","get",function(datum){
            var datum_params = typeof params === "function" ? params(datum) 
                                : Object.assign({}, params);
            var url = "/samples/"+(datum_params.samplesDbId);
            delete datum_params.samplesDbId;
            return {'url':url, 'params':datum_params};
        });
    }

    // GET /seasons
    seasons(params,behavior){
        var behavior = ((behavior==undefined)?(true):(behavior))?"expand":"map";
        return this.brapi_call(behavior,"get",function(datum){
            var datum_params = typeof params === "function" ? params(datum) 
                                : Object.assign({}, params);
            var url = "/seasons";
            return {'url':url, 'params':datum_params};
        });
    }

    // POST /studies-search
    studies_search(params,behavior){
        var behavior = ((behavior==undefined)?(true):(behavior))?"expand":"map";
        return this.brapi_call(behavior,"post",function(datum){
            var datum_params = typeof params === "function" ? params(datum) 
                                : Object.assign({}, params);
            var url = "/studies-search";
            return {'url':url, 'params':datum_params};
        });
    }

    // GET /studies/{studiesDbId}
    studies(params){
        return this.brapi_call("map","get",function(datum){
            var datum_params = typeof params === "function" ? params(datum) 
                                : Object.assign({}, params);
            var url = "/studies/"+(datum_params.studiesDbId);
            delete datum_params.studiesDbId;
            return {'url':url, 'params':datum_params};
        });
    }

    // GET /studies/{studiesDbId}/germplasm
    studies_germplasm(params,behavior){
        var behavior = ((behavior==undefined)?(true):(behavior))?"expand":"map";
        return this.brapi_call(behavior,"get",function(datum){
            var datum_params = typeof params === "function" ? params(datum) 
                                : Object.assign({}, params);
            var url = "/studies/"+datum_params.studiesDbId+"/germplasm";
            return {'url':url, 'params':datum_params};
        });
    }

    // GET /studies/{studiesDbId}/layout
    studies_layout(params,behavior){
        var behavior = ((behavior==undefined)?(true):(behavior))?"expand":"map";
        return this.brapi_call(behavior,"get",function(datum){
            var datum_params = typeof params === "function" ? params(datum) 
                                : Object.assign({}, params);
            var url = "/studies/"+datum_params.studiesDbId+"/layout";
            return {'url':url, 'params':datum_params};
        });
    }

    // GET /studies/{studiesDbId}/observations
    studies_observations(params,behavior){
        var behavior = ((behavior==undefined)?(true):(behavior))?"expand":"map";
        return this.brapi_call(behavior,"get",function(datum){
            var datum_params = typeof params === "function" ? params(datum) 
                                : Object.assign({}, params);
            var url = "/studies/"+datum_params.studiesDbId+"/observations";
            return {'url':url, 'params':datum_params};
        });
    }

    // GET /studies/{studiesDbId}/observationunits
    studies_observationunits(params,behavior){
        var behavior = ((behavior==undefined)?(true):(behavior))?"expand":"map";
        return this.brapi_call(behavior,"get",function(datum){
            var datum_params = typeof params === "function" ? params(datum) 
                                : Object.assign({}, params);
            var url = "/studies/"+datum_params.studiesDbId+"/observationunits";
            return {'url':url, 'params':datum_params};
        });
    }

    // GET /studies/{studiesDbId}/observationvariables
    studies_observationvariables(params,behavior){
        var behavior = ((behavior==undefined)?(true):(behavior))?"expand":"map";
        return this.brapi_call(behavior,"get",function(datum){
            var datum_params = typeof params === "function" ? params(datum) 
                                : Object.assign({}, params);
            var url = "/studies/"+datum_params.studiesDbId+"/observationvariables";
            return {'url':url, 'params':datum_params};
        });
    }

    // GET /studies/{studiesDbId}/table
    studies_table(params){
        return this.brapi_call("map","get",function(datum){
            var datum_params = typeof params === "function" ? params(datum) 
                                : Object.assign({}, params);
            var url = "/studies/"+(datum_params.studiesDbId)+"/table";
            delete datum_params.studiesDbId;
            return {'url':url, 'params':datum_params};
        });
    }

    // GET /studytypes
    studytypes(params,behavior){
        var behavior = ((behavior==undefined)?(true):(behavior))?"expand":"map";
        return this.brapi_call(behavior,"get",function(datum){
            var datum_params = typeof params === "function" ? params(datum) 
                                : Object.assign({}, params);
            var url = "/studytypes";
            return {'url':url, 'params':datum_params};
        });
    }

    // GET /traits & GET /traits/{traitDbId}
    traits(params,behavior){
        var behavior = ((behavior==undefined)?(true):(behavior))?"expand":"map";
        return this.brapi_call(behavior,"get",function(datum){
            var datum_params = typeof params === "function" ? params(datum) 
                                : Object.assign({}, params);
            var url = "/traits";
            if(datum_params.traitDbId!=undefined){
                url+="/"+datum_params.traitDbId;
                delete datum_params.traitDbId;
            }
            return {'url':url, 'params':datum_params};
        });
    }

    // GET /trials & GET /trials/{trialDbId}
    trials(params,behavior){
        var behavior = ((behavior==undefined)?(true):(behavior))?"expand":"map";
        return this.brapi_call(behavior,"get",function(datum){
            var datum_params = typeof params === "function" ? params(datum) 
                                : Object.assign({}, params);
            var url = "/trials";
            if(datum_params.trialDbId!=undefined){
                url+="/"+datum_params.trialDbId;
                delete datum_params.trialDbId;
            }
            return {'url':url, 'params':datum_params};
        });
    }

    // POST /variables-search
    variables_search(params,behavior){
        var behavior = ((behavior==undefined)?(true):(behavior))?"expand":"map";
        return this.brapi_call(behavior,"post",function(datum){
            var datum_params = typeof params === "function" ? params(datum) 
                                : Object.assign({}, params);
            var url = "/variables-search";
            return {'url':url, 'params':datum_params};
        });
    }

    // GET /variables & GET /variables/{variableDbId}
    variables(params,behavior){
        var behavior = ((behavior==undefined)?(true):(behavior))?"expand":"map";
        return this.brapi_call(behavior,"get",function(datum){
            var datum_params = typeof params === "function" ? params(datum) 
                                : Object.assign({}, params);
            var url = "/variables";
            if(datum_params.variableDbId!=undefined){
                url+="/"+datum_params.variableDbId;
                delete datum_params.variableDbId;
            }
            return {'url':url, 'params':datum_params};
        });
    }

    // GET /variables/datatypes
    variables_datatypes(params,behavior){
        var behavior = ((behavior==undefined)?(true):(behavior))?"expand":"map";
        return this.brapi_call(behavior,"get",function(datum){
            var datum_params = typeof params === "function" ? params(datum) 
                                : Object.assign({}, params);
            var url = "/variables/datatypes";
            return {'url':url, 'params':datum_params};
        });
    }
    
}
