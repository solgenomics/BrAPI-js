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

/** `POST /people`
* @alias BrAPINode.prototype.people_store
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function people_store (params,behavior){
    var call = {
        'defaultMethod': 'post',
        'urlTemplate': '/people',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
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


/** `PUT /people/{personDbId}`
* @alias BrAPINode.prototype.people_modify
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function people_modify (params,behavior){
    var call = {
        'defaultMethod': 'put',
        'urlTemplate': '/people/{personDbId}',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `POST /search/people`
* @alias BrAPINode.prototype.people_search
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function people_search(params,behavior){
    return this.search_people(params,behavior,true);
};

/** `POST /search/people -> GET /search/people`
* @alias BrAPINode.prototype.search_people
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function search_people(params,behavior,useOld){
    this.version.check("POST /search/people -> GET /search/people",{
        introduced:"v2.0"
    });
    return this.search("people",params,behavior);
};
