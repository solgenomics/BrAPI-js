/** `GET /lists`
 * @alias BrAPINode.prototype.lists
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function lists (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/lists',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.3"
    });
    return this.simple_brapi_call(call);
}

/** `POST /lists`
* @alias BrAPINode.prototype.lists_store
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function lists_store (params,behavior){
    var call = {
        'defaultMethod': 'post',
        'urlTemplate': '/lists',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `GET /lists/{listDbId}`
 * @alias BrAPINode.prototype.lists_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.listDbId listDbId
 * @return {BrAPI_Behavior_Node}
 */
export function lists_detail (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/lists/{listDbId}',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.3"
    });
    return this.simple_brapi_call(call);
}

/** `PUT /lists/{listDbId}`
* @alias BrAPINode.prototype.lists_modify
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function lists_modify (params,behavior){
    var call = {
        'defaultMethod': 'put',
        'urlTemplate': '/lists/{listDbId}',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `POST /lists/{listDbId}/items`
 * @alias BrAPINode.prototype.lists_items_store
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.imageDbId imageDbId
 * @return {BrAPI_Behavior_Node}
 */
export function lists_items_store (params){
    var call = {
        'defaultMethod': 'post',
        'urlTemplate': '/lists/{listDbId}/items',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.3",
        introduced:"v2.0",
        deprecated:"v2.1"
    });
    return this.simple_brapi_call(call);
}


/** `POST /search/lists`
* @alias BrAPINode.prototype.lists_search
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function lists_search(params,behavior){
    return this.search_lists(params,behavior,true);
};

/** `POST /search/lists -> GET /search/lists`
* @alias BrAPINode.prototype.search_lists
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function search_lists(params,behavior){
    this.version.check("POST /search/lists -> GET /search/lists",{
        introduced:"v2.0"
    });
    return this.search("lists",params,behavior);
};
