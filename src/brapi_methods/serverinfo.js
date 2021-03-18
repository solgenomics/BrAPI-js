/** `GET /serverinfo`
 * @alias BrAPINode.prototype.serverinfo
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function serverinfo (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/serverinfo',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}