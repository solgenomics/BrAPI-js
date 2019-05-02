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

/** `PUT /lists/{listDbId}/items`
 * @alias BrAPINode.prototype.lists_items
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.imageDbId imageDbId
 * @return {BrAPI_Behavior_Node}
 */
export function lists_items (params){
    var call = {
        'defaultMethod': 'put',
        'urlTemplate': '/lists/{listDbId}/items',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.3"
    });
    return this.simple_brapi_call(call);
}
