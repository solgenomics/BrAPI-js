/** `GET /seasons`
 * @alias Context_Node.prototype.seasons
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function seasons (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/seasons',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0"
    });
    return this.simple_brapi_call(call);
}
