/** `GET /locations`
 * @alias BrAPINode.prototype.locations
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function locations (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/locations',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0"
    });
    return this.simple_brapi_call(call);
}

/** `GET /locations/{locationDbId}`
 * @alias BrAPINode.prototype.locations_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.locationDbId locationDbId
 * @return {BrAPI_Behavior_Node}
 */
export function locations_detail (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/locations/{locationDbId}',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0"
    });
    return this.simple_brapi_call(call);
}
