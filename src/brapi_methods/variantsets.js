/** `GET /variantsets`
 * @alias BrAPINode.prototype.variantsets
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function variantsets (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/variantsets',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `POST /variantsets/extract`
* @alias BrAPINode.prototype.variantsets_extract_store
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function variantsets_extract_store (params,behavior){
    var call = {
        'defaultMethod': 'post',
        'urlTemplate': '/variantsets/extract',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `GET /variantsets/{variantSetDbId}`
 * @alias BrAPINode.prototype.variantsets_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.variantSetDbId variantSetDbId
 * @return {BrAPI_Behavior_Node}
 */
export function variantsets_detail (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/variantsets/{variantSetDbId}',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `GET /variantsets/{variantSetDbId}/calls`
* @alias BrAPINode.prototype.variantsets_calls
* @param {Object} params Parameters to provide to the call
* @param {String} params.variantSetDbId variantSetDbId
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function variantsets_calls (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/variantsets/{variantSetDbId}/calls',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `GET /variantsets/{variantSetDbId}/callsets`
* @alias BrAPINode.prototype.variantsets_callsets
* @param {Object} params Parameters to provide to the call
* @param {String} params.variantSetDbId variantSetDbId
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function variantsets_callsets (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/variantsets/{variantSetDbId}/callsets',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `GET /variantsets/{variantSetDbId}/variants`
* @alias BrAPINode.prototype.variantsets_variants
* @param {Object} params Parameters to provide to the call
* @param {String} params.variantSetDbId variantSetDbId
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function variantsets_variants (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/variantsets/{variantSetDbId}/variants',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `POST /search/variantsets -> GET /search/variantsets`
* @alias BrAPINode.prototype.search_variantsets
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function search_variantsets(params,behavior){
    this.version.check("POST /search/variantsets -> GET /search/variantsets",{
        introduced:"v2.0"
    });
    return this.search("variantsets",params,behavior);
};
