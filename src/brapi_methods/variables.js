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

/** `POST /variables`
* @alias BrAPINode.prototype.variables_store
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function variables_store (params,behavior){
    var call = {
        'defaultMethod': 'post',
        'urlTemplate': '/variables',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `POST /variables-search`
* @alias BrAPINode.prototype.variables_search
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function variables_search(params,behavior){
    return this.search_variables(params,behavior,true);
};

/** `POST /variables-search`, `POST /search/variables -> GET /search/variables`
* @alias BrAPINode.prototype.search_variables
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function search_variables(params,behavior,useOld){
    if (this.version.predates("v1.3")||useOld){
        var call = {
            'params': params,
            'behaviorOptions': ['fork','map'],
            'behavior': behavior,
        }
        call.urlTemplate = "/variables-search";
        call.defaultMethod = "post";
        this.version.check(call.urlTemplate,{
            introduced:"v1.0",
            deprecated:"v1.3"
        });
        return this.simple_brapi_call(call);
    } else {
        this.version.check("POST /search/variables -> GET /search/variables",{
            introduced:"v1.3"
        });
        return this.search("variables",params,behavior);
    }
};

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

/** `PUT /variables/{observationVariableDbId}`
* @alias BrAPINode.prototype.variables_modify
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function variables_modify (params,behavior){
    var call = {
        'defaultMethod': 'put',
        'urlTemplate': '/variables/{observationVariableDbId}',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
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
        introduced:"v1.0",
        deprecated:"v1.3",
        deprecated:"v2.0"
    });
    return this.simple_brapi_call(call);
}
