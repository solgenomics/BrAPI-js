/** `GET /variables`
 * @alias BrAPINode.prototype.variables
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function variables (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/variables',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0"
    });
    return this.simple_brapi_call(call);
}

/** `POST /variables-search`
 * @alias BrAPINode.prototype.variables_search
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function variables_search (params,behavior){
    var call = {
        'defaultMethod': 'post',
        'urlTemplate': '/variables-search',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0"
    });
    return this.simple_brapi_call(call);
}

/** `GET /variables/{observationVariableDbId}`
 * @alias BrAPINode.prototype.variables_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.observationVariableDbId observationVariableDbId
 * @return {BrAPI_Behavior_Node}
 */
export function variables_detail (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/variables/{observationVariableDbId}',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0"
    });
    return this.simple_brapi_call(call);
}

/** `GET /variables/datatypes`
 * @alias BrAPINode.prototype.variables_datatypes
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function variables_datatypes (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/variables/datatypes',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0"
    });
    return this.simple_brapi_call(call);
}
