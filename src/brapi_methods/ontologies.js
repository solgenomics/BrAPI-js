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

/** `POST /ontologies`
* @alias BrAPINode.prototype.ontologies_store
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function ontologies_store (params,behavior){
    var call = {
        'defaultMethod': 'post',
        'urlTemplate': '/ontologies',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.1"
    });
    return this.simple_brapi_call(call);
}

/** `GET /ontologies/{ontologyDbId}`
 * @alias BrAPINode.prototype.ontologies_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.ontologyDbId ontologyDbId
 * @return {BrAPI_Behavior_Node}
 */
export function ontologies_detail (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/ontologies/{ontologyDbId}',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.1"
    });
    return this.simple_brapi_call(call);
}

/** `PUT /ontologies/{ontologyDbId}`
* @alias BrAPINode.prototype.ontologies_modify
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function ontologies_modify (params,behavior){
    var call = {
        'defaultMethod': 'put',
        'urlTemplate': '/ontologies/{ontologyDbId}',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.1"
    });
    return this.simple_brapi_call(call);
}
