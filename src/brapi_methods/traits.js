/** `GET /traits`
 * @alias BrAPINode.prototype.traits
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function traits (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/traits',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0"
    });
    return this.simple_brapi_call(call);
}

/** `GET /traits/{traitDbId}`
 * @alias BrAPINode.prototype.traits_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.traitDbId traitDbId
 * @return {BrAPI_Behavior_Node}
 */
export function traits_detail (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/traits/{traitDbId}',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0"
    });
    return this.simple_brapi_call(call);
}
