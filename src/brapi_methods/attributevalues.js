/** `GET /attributevalues`
 * @alias BrAPINode.prototype.attributevalues
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function attributevalues (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/attributevalues',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.3"
    });
    return this.simple_brapi_call(call);
}

/** `POST /attributevalues`
* @alias BrAPINode.prototype.attributevalues_store
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function attributevalues_store (params,behavior){
    var call = {
        'defaultMethod': 'post',
        'urlTemplate': '/attributevalues',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `GET /attributevalues/{attributeValueDbId}`
 * @alias BrAPINode.prototype.attributevalues_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.attributeValueDbId attributeValueDbId
 * @return {BrAPI_Behavior_Node}
 */
export function attributevalues_detail (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/attributevalues/{attributeValueDbId}',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.3"
    });
    return this.simple_brapi_call(call);
}

/** `PUT /attributevalues/{attributeValueDbId}`
* @alias BrAPINode.prototype.attributevalues_modify
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function attributevalues_modify (params,behavior){
    var call = {
        'defaultMethod': 'put',
        'urlTemplate': '/attributevalues/{attributeValueDbId}',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}


/** `POST /search/attributevalues -> GET /search/attributevalues`
* @alias BrAPINode.prototype.search_attributevalues
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function search_attributevalues(params,behavior){
    this.version.check("POST /search/attributevalues -> GET /search/attributevalues",{
        introduced:"v1.3"
    });
    return this.search("attributevalues",params,behavior);
};
