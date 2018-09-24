/** `GET /maps`
 * @alias Context_Node.prototype.maps
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function maps (params,behavior){
    this.version.check("/maps",{
        introduced:"v1.0"
    });
    
    if (behavior!="map") behavior = "fork";
    var isMulticall = typeof params === "function";
    
    return this.brapi_call(behavior,"get",function(datum){
        return {
            'url': "/maps", 
            'params': isMulticall ? params(datum) : Object.assign({}, params)
        };
    }, isMulticall);
}

/** `GET /maps/{locationDbId}`
 * @alias Context_Node.prototype.maps_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.locationDbId locationDbId
 * @param {String} [behavior=this.version.predates("v1.1")?"map":"fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function maps_detail (params, behavior){
    this.version.check("/maps/{locationDbId}",{
        introduced:"v1.0"
    });
    
    //added data array in v1.1, so default behavior changes
    if (this.version.predates("v1.1")){
        if (behavior!="fork") behavior = "map";
    } else {
        if (behavior!="map") behavior = "fork";
    }
    
    var isMulticall = typeof params === "function";
    
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = isMulticall ? params(datum) : Object.assign({}, params);
        var url = "/maps/"+datum_params["locationDbId"];
        delete datum_params["locationDbId"];
        return {
            'url': url, 
            'params': datum_params
        };
    }, isMulticall);
}

/** `GET /maps/{mapsDbId}/positions`
 * @alias Context_Node.prototype.maps_positions
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.mapsDbId mapsDbId
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function maps_positions (params,behavior){
    this.version.check("/maps/{mapsDbId}/positions",{
        introduced:"v1.0"
    });
    
    if (behavior!="map") behavior = "fork";
    var isMulticall = typeof params === "function";
    
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = isMulticall ? params(datum) : Object.assign({}, params);
        var url = "/maps/"+datum_params["mapsDbId"]+"/positions";
        delete datum_params["mapsDbId"];
        return {
            'url': url, 
            'params': datum_params
        };
    }, isMulticall);
}

/** `GET /maps/{mapsDbId}/positions/{linkageGroupId}`
 * @alias Context_Node.prototype.maps_linkagegroups_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.mapsDbId mapsDbId
 * @param {String} params.linkageGroupId linkageGroupId
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function maps_linkagegroups_detail (params,behavior){
    this.version.check("/maps/{mapsDbId}/positions/{linkageGroupId}",{
        introduced:"v1.0"
    });
    
    if (behavior!="map") behavior = "fork";
    var isMulticall = typeof params === "function";
    
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = isMulticall ? params(datum) : Object.assign({}, params);
        var url = "/maps/"+datum_params["mapsDbId"]+"/positions/"+datum_params["linkageGroupId"];
        delete datum_params["mapsDbId"];
        delete datum_params["linkageGroupId"];
        return {
            'url': url, 
            'params': datum_params
        };
    }, isMulticall);
}
