/** `GET /pedigree/`
 * @alias BrAPINode.prototype.pedigree
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.germplasmDbId germplasmDbId
 * @return {BrAPI_Behavior_Node}
 */

export function pedigree (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/pedigree/',
        'params': params,
        'behavior': 'map',
    };
    this.version.check(call.urlTemplate,{
        introduced:"v2.1"
    });
    return this.simple_brapi_call(call);
}


/** `POST /pedigree`
 * @alias BrAPINode.prototype.pedigree_store
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function pedigree_store (params,behavior){
    var call = {
        'defaultMethod': 'post',
        'urlTemplate': '/pedigree',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.1"
    });
    return this.simple_brapi_call(call);
}

/** `PUT /pedigree`
 * @alias BrAPINode.prototype.pedigree_modify_multiple
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function pedigree_modify (params,behavior){
    var call = {
        'defaultMethod': 'put',
        'urlTemplate': '/pedigree',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.1"
    });
    return this.simple_brapi_call(call);
}

/** `POST /search/pedigree -> GET /search/pedigree`
* @alias BrAPINode.prototype.search_pedigree
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function search_pedigree(params,behavior){
    this.version.check("POST /search/pedigree -> GET /search/pedigree",{
        introduced:"v2.0"
    });
    return this.search("pedigree",params,behavior);
};