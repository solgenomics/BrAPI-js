/** `GET /methods`
 * @alias BrAPINode.prototype.methods
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function methods (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/methods',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.3"
    });
    return this.simple_brapi_call(call);
}

/** `GET /methods/{methodDbId}`
 * @alias BrAPINode.prototype.methods_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.methodDbId methodDbId
 * @return {BrAPI_Behavior_Node}
 */
export function methods_detail (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/methods/{methodDbId}',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.3"
    });
    return this.simple_brapi_call(call);
}
