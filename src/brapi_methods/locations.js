/** `GET /locations`
 * @alias BrAPINode.prototype.locations
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function locations (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/locations',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0"
    });
    return this.simple_brapi_call(call);
}

/** `POST /locations`
* @alias BrAPINode.prototype.locations_store
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function locations_store (params,behavior){
    var call = {
        'defaultMethod': 'post',
        'urlTemplate': '/locations',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `GET /locations/{locationDbId}`
 * @alias BrAPINode.prototype.locations_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.locationDbId locationDbId
 * @return {BrAPI_Behavior_Node}
 */
export function locations_detail (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/locations/{locationDbId}',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0"
    });
    return this.simple_brapi_call(call);
}


/** `PUT /locations/{locationDbId}`
* @alias BrAPINode.prototype.locations_modify
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function locations_modify (params,behavior){
    var call = {
        'defaultMethod': 'put',
        'urlTemplate': '/locations/{locationDbId}',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `POST /search/locations`
* @alias BrAPINode.prototype.locations_search
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function locations_search(params,behavior){
    return this.search_locations(params,behavior,true);
};

/** `POST /search/locations -> GET /search/locations`
* @alias BrAPINode.prototype.search_locations
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function search_locations(params,behavior,useOld){
    this.version.check("POST /search/locations -> GET /search/locations",{
        introduced:"v2.0"
    });
    return this.search("locations",params,behavior);
};
