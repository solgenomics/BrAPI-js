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

/** `POST /scales`
* @alias BrAPINode.prototype.scales_store
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function scales_store (params,behavior){
    var call = {
        'defaultMethod': 'post',
        'urlTemplate': '/scales',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
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

/** `PUT /scales/{scaleDbId}`
* @alias BrAPINode.prototype.scales_modify
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function scales_modify (params,behavior){
    var call = {
        'defaultMethod': 'put',
        'urlTemplate': '/scales/{scaleDbId}',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}