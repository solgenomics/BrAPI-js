/** `GET /breedingmethods`
 * @alias Context_Node.prototype.breedingmethods
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function breedingmethods (params,behavior){
    var url = "/breedingmethods";
    this.version.check(url,{
        introduced:"v1.0"
    });
    
    if (behavior!="map") behavior = "fork";
    var isMulticall = typeof params === "function";
    
    return this.brapi_call(behavior,"get",function(datum){
        return {
            'url': url, 
            'params': isMulticall ? params(datum) : Object.assign({}, params)
        };
    }, isMulticall);
}

/** `GET /breedingmethods/{breedingMethodDbId}`
 * @alias Context_Node.prototype.breedingmethods_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.breedingMethodDbId breedingMethodDbId
 * @return {BrAPI_Behavior_Node}
 */
export function breedingmethods_detail (params){
    this.version.check("/breedingmethods/{breedingMethodDbId}",{
        introduced:"v1.0"
    });
    var isMulticall = typeof params === "function";
    return this.brapi_call("map","get",function(datum){
        var datum_params = isMulticall ? params(datum) : Object.assign({}, params);
        var url = "/breedingmethods/"+datum_params["breedingMethodDbId"];
        delete datum_params["breedingMethodDbId"];
        return {
            'url': url, 
            'params': datum_params
        };
    }, isMulticall);
}
