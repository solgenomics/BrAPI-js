/** `GET /variants`
 * @alias BrAPINode.prototype.variants
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function variants (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/variants',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `GET /variants/{variantDbId}`
 * @alias BrAPINode.prototype.variants_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.variantDbId variantDbId
 * @return {BrAPI_Behavior_Node}
 */
export function variants_detail (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/variants/{variantDbId}',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `GET /variants/{variantDbId}/calls`
 * @alias BrAPINode.prototype.variants_calls
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.variantDbId variantDbId
 * @return {BrAPI_Behavior_Node}
 */
export function variants_calls (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/variants/{variantDbId}/calls',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `POST /search/variants -> GET /search/variants`
* @alias BrAPINode.prototype.search_variants
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function search_variants(params,behavior){
    this.version.check("POST /search/variants -> GET /search/variants",{
        introduced:"v2.0"
    });
    return this.search("variants",params,behavior);
};
