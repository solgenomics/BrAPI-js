/** `GET /observations`
 * @alias BrAPINode.prototype.observations
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function observations (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/observations',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `POST /observations`
 * @alias BrAPINode.prototype.observations_store
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function observations_store (params,behavior){
    var call = {
        'defaultMethod': 'post',
        'urlTemplate': '/observations',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `PUT /observations`
 * @alias BrAPINode.prototype.observations_modify_multiple
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function observations_modify_multiple (params,behavior){
    var call = {
        'defaultMethod': 'put',
        'urlTemplate': '/observations',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}


/** `GET /observations/{observationDbId}`
 * @alias BrAPINode.prototype.observations_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.observationDbId observationDbId
 * @return {BrAPI_Behavior_Node}
 */
export function observations_detail (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/observations/{observationDbId}',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}


/** `PUT /observations/{observationDbId}`
* @alias BrAPINode.prototype.observations_modify
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function observations_modify (params,behavior){
    var call = {
        'defaultMethod': 'put',
        'urlTemplate': '/observations/{observationDbId}',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}


/** `GET /observations/table`
 * @alias BrAPINode.prototype.observations_table
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function observations_table (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate':'/observations/table',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    
    return this.simple_brapi_call(call);
}

/** `POST /delete/observations`
* @alias BrAPINode.prototype.observations_delete
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function observations_delete (params,behavior){
    var call = {
        'defaultMethod': 'post',
        'urlTemplate': '/delete/observations',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.1"
    });
    return this.simple_brapi_call(call);
}

/** `POST /search/observations -> GET /search/observations`
* @alias BrAPINode.prototype.search_observations
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function search_observations(params,behavior){
    this.version.check("POST /search/observations -> GET /search/observations",{
        introduced:"v2.0"
    });
    return this.search("observations",params,behavior);
};
