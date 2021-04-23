/** `GET /references`
 * @alias BrAPINode.prototype.references
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function references (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/references',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `GET /references/{referenceDbId}`
 * @alias BrAPINode.prototype.references_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.referenceDbId referenceDbId
 * @return {BrAPI_Behavior_Node}
 */
export function references_detail (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/references/{referenceDbId}',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `GET /references/{referenceDbId}/bases`
 * @alias BrAPINode.prototype.references_bases
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.referenceDbId referenceDbId
 * @return {BrAPI_Behavior_Node}
 */
export function references_bases (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/references/{referenceDbId}/bases',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `POST /search/references -> GET /search/references`
* @alias BrAPINode.prototype.search_references
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function search_references(params,behavior){
    this.version.check("POST /search/references -> GET /search/references",{
        introduced:"v2.0"
    });
    return this.search("references",params,behavior);
};
