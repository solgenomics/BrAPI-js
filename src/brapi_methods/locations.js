/** `GET /locations`
 * @alias Context_Node.prototype.locations
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function locations (params,behavior){
    this.version.check("/locations",{
        introduced:"v1.0"
    });
    
    if (behavior!="map") behavior = "fork";
    var isMulticall = typeof params === "function";
    
    return this.brapi_call(behavior,"get",function(datum){
        return {
            'url': "/locations", 
            'params': isMulticall ? params(datum) : Object.assign({}, params)
        };
    }, isMulticall);
}

/** `GET /locations/{locationDbId}`
 * @alias Context_Node.prototype.locations_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.locationDbId locationDbId
 * @return {BrAPI_Behavior_Node}
 */
export function locations_detail (params){
    this.version.check("/locations/{locationDbId}",{
        introduced:"v1.0"
    });
    var isMulticall = typeof params === "function";
    return this.brapi_call("map","get",function(datum){
        var datum_params = isMulticall ? params(datum) : Object.assign({}, params);
        var url = "/locations/"+datum_params["locationDbId"];
        delete datum_params["locationDbId"];
        return {
            'url': url, 
            'params': datum_params
        };
    }, isMulticall);
}
