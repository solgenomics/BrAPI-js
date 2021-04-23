/** `GET /crossingprojects`
 * @alias BrAPINode.prototype.crossingprojects
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function crossingprojects (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/crossingprojects',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `POST /crossingprojects`
* @alias BrAPINode.prototype.crossingprojects_store
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function crossingprojects_store (params,behavior){
    var call = {
        'defaultMethod': 'post',
        'urlTemplate': '/crossingprojects',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `GET /crossingprojects/{crossingProjectDbId}`
 * @alias BrAPINode.prototype.crossingprojects_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.crossingProjectDbId crossingProjectDbId
 * @return {BrAPI_Behavior_Node}
 */
export function crossingprojects_detail (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/crossingprojects/{crossingProjectDbId}',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}


/** `PUT /crossingprojects/{crossingProjectDbId}`
* @alias BrAPINode.prototype.crossingprojects_modify
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function crossingprojects_modify (params,behavior){
    var call = {
        'defaultMethod': 'put',
        'urlTemplate': '/crossingprojects/{crossingProjectDbId}',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}
