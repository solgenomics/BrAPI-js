/** `GET /referencesets`
 * @alias BrAPINode.prototype.referencesets
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function referencesets (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/referencesets',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `GET /referencesets/{referenceSetDbId}`
 * @alias BrAPINode.prototype.referencesets_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.referenceSetDbId referenceSetDbId
 * @return {BrAPI_Behavior_Node}
 */
export function referencesets_detail (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/referencesets/{referenceSetDbId}',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `POST /search/referencesets -> GET /search/referencesets`
* @alias BrAPINode.prototype.search_referencesets
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function search_referencesets(params,behavior){
    this.version.check("POST /search/referencesets -> GET /search/referencesets",{
        introduced:"v2.0"
    });
    return this.search("referencesets",params,behavior);
};
