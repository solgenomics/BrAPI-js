/** `POST /markers-search`(>=v1.1) or `GET /markers`(<v1.1)
* @alias Context_Node.prototype.markers_search
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function markers_search(params,behavior){
    var call = {
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    if(this.version.predates("v1.1")){
        call.urlTemplate = "/markers";
        call.defaultMethod = "get";
        this.version.check(call.urlTemplate,{
            introduced:"v1.0",
            deprecated:"v1.1"
        });
    } else {
        call.urlTemplate = "/markers-search";
        call.defaultMethod = "post";
        this.version.check(call.urlTemplate,{
            introduced:"v1.1"
        });
    }
    return this.simple_brapi_call(call);
};

/** `GET /markers/{markerDbId}`
 * @alias Context_Node.prototype.markers_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.markerDbId markerDbId
 * @return {BrAPI_Behavior_Node}
 */
export function markers_detail (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/markers/{markerDbId}',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0"
    });
    return this.simple_brapi_call(call);
}
