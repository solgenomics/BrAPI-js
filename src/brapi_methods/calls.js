/** `GET /calls`
 * @alias BrAPINode.prototype.calls
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function calls (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/calls',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0"
    });
    return this.simple_brapi_call(call);
}

/** `POST /search/calls -> GET /search/calls`
* @alias BrAPINode.prototype.search_calls
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function search_calls(params,behavior){
    this.version.check("POST /search/calls -> GET /search/calls",{
        introduced:"v2.0"
    });
    return this.search("calls",params,behavior);
};

/** `PUT /calls`
 * @alias BrAPINode.prototype.calls_modify
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function calls_modify (params,behavior){
    var call = {
        'defaultMethod': 'put',
        'urlTemplate': '/calls',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.1"
    });
    return this.simple_brapi_call(call);
}