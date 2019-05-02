/** `GET /people`
 * @alias BrAPINode.prototype.people
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function people (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/people',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.3"
    });
    return this.simple_brapi_call(call);
}

/** `GET /people/{personDbId}`
 * @alias BrAPINode.prototype.people_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.personDbId personDbId
 * @return {BrAPI_Behavior_Node}
 */
export function people_detail (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/people/{personDbId}',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.3"
    });
    return this.simple_brapi_call(call);
}
