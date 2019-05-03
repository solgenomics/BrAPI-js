/** `GET /scales`
 * @alias BrAPINode.prototype.scales
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function scales (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/scales',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.3"
    });
    return this.simple_brapi_call(call);
}

/** `GET /scales/{scaleDbId}`
 * @alias BrAPINode.prototype.scales_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.scaleDbId scaleDbId
 * @return {BrAPI_Behavior_Node}
 */
export function scales_detail (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/scales/{scaleDbId}',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.3"
    });
    return this.simple_brapi_call(call);
}
