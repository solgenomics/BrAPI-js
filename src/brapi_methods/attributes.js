/** `GET /attributes`
 * @alias BrAPINode.prototype.attributes
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function attributes (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/attributes',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0"
    });
    return this.simple_brapi_call(call);
}

/** `POST /attributes`
* @alias BrAPINode.prototype.attributes_store
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function attributes_store (params,behavior){
    var call = {
        'defaultMethod': 'post',
        'urlTemplate': '/attributes',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}


/** `GET /attributes/{attributeDbId}`
 * @alias BrAPINode.prototype.attributes_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.attributeDbId attributeDbId
 * @return {BrAPI_Behavior_Node}
 */
export function attributes_detail (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/attributes/{attributeDbId}',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}


/** `PUT /attributes/{attributeDbId}`
* @alias BrAPINode.prototype.attributes_modify
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function attributes_modify (params,behavior){
    var call = {
        'defaultMethod': 'put',
        'urlTemplate': '/attributes/{attributeDbId}',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `GET /attributes_categories`
 * @alias BrAPINode.prototype.attributes_categories
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function attributes_categories (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/attributes/categories',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0"
    });
    return this.simple_brapi_call(call);
}


/** `POST /search/attributes -> GET /search/attributes`
* @alias BrAPINode.prototype.search_attributes
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function search_attributes(params,behavior){
    this.version.check("POST /search/attributes -> GET /search/attributes",{
        introduced:"v2.0"
    });
    return this.search("attributes",params,behavior);
};
