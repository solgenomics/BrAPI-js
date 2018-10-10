/** `GET /maps`
 * @alias BrAPINode.prototype.maps
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function maps (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/maps',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0"
    });
    return this.simple_brapi_call(call);
}

/** `GET /maps/{mapDbId}`
 * @alias BrAPINode.prototype.maps_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.mapDbId mapDbId
 * @param {String} [behavior=this.version.predates("v1.1")?"map":"fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function maps_detail (params, behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/maps/{mapDbId}',
        'params': params,
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0"
    });
    
    //added data array in v1.1, so default behavior changes
    if (this.version.predates("v1.1")){
        call.behaviorOptions = ['map'];
    } else {
        call.behaviorOptions = ['fork','map'];
    }
        
    return this.simple_brapi_call(call);
}

/** `GET /maps/{mapsDbId}/positions`
 * @alias BrAPINode.prototype.maps_positions
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.mapsDbId mapsDbId
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function maps_positions (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/maps/{mapsDbId}/positions',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0"
    });
    return this.simple_brapi_call(call);
}

/** `GET /maps/{mapsDbId}/positions/{linkageGroupId}`
 * @alias BrAPINode.prototype.maps_linkagegroups_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.mapsDbId mapsDbId
 * @param {String} params.linkageGroupId linkageGroupId
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function maps_linkagegroups_detail (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/maps/{mapsDbId}/positions/{linkageGroupId}',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0"
    });
    return this.simple_brapi_call(call);
}
