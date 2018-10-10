/** `GET /ontologies`
 * @alias BrAPINode.prototype.ontologies
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function ontologies (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/ontologies',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0"
    });
    return this.simple_brapi_call(call);
}
