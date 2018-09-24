/** `GET /markerprofiles`
 * @alias Context_Node.prototype.markerprofiles
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function markerprofiles (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/markerprofiles',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0"
    });
    return this.simple_brapi_call(call);
}

/** `POST /markerprofiles-search`
* @alias Context_Node.prototype.markerprofiles_search
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function markerprofiles_search(params,behavior){
    var call = {
        'defaultMethod': 'post',
        'urlTemplate': '/markerprofiles-search',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0",
        deprecated:"v1.1"
    });
    return this.simple_brapi_call(call);
}

/** `GET /markerprofiles/{markerprofileDbId}`
 * @alias Context_Node.prototype.markerprofiles_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.markerprofileDbId markerprofileDbId
 * @return {BrAPI_Behavior_Node}
 */
export function markerprofiles_detail (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/markerprofiles/{markerprofileDbId}',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0"
    });
    return this.simple_brapi_call(call);
}
