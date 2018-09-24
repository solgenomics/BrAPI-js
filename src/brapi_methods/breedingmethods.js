/** `GET /breedingmethods`
 * @alias Context_Node.prototype.breedingmethods
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function breedingmethods (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/breedingmethods',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.2"
    });
    return this.simple_brapi_call(call);
}

/** `GET /breedingmethods/{breedingMethodDbId}`
 * @alias Context_Node.prototype.breedingmethods_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.breedingMethodDbId breedingMethodDbId
 * @return {BrAPI_Behavior_Node}
 */
export function breedingmethods_detail (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/breedingmethods/{breedingMethodDbId}',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.2"
    });
    return this.simple_brapi_call(call);
}
