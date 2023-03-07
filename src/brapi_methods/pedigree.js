/** `GET /pedigree/{germplasmDbId}`
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
