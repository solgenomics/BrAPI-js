
/** `GET /callsets`
 * @alias BrAPINode.prototype.callsets
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.germplasmDbId germplasmDbId
 * @return {BrAPI_Behavior_Node}
 */
export function callsets (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/callsets',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}


/** `GET /callsets/{callSetDbId}`
 * @alias BrAPINode.prototype.callsets_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.callSetDbId callSetDbId
 * @return {BrAPI_Behavior_Node}
 */
export function callsets_detail (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/callsets/{callSetDbId}',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}


/** `GET /callsets/{callSetDbId}/calls`
 * @alias BrAPINode.prototype.callsets_detail_calls
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.callSetDbId callSetDbId
 * @return {BrAPI_Behavior_Node}
 */
export function callsets_detail_calls (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/callsets/{callSetDbId}/calls',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}


/** `POST /search/callsets -> GET /search/callsets`
* @alias BrAPINode.prototype.search_callsets
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function search_callsets(params,behavior){
    this.version.check("POST /search/callsets -> GET /search/callsets",{
        introduced:"v2.0"
    });
    return this.search("callsets",params,behavior);
};
