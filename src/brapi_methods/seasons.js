/** `GET /seasons`
 * @alias BrAPINode.prototype.seasons
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function seasons (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/seasons',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0"
    });
    return this.simple_brapi_call(call);
}

/** `POST /seasons`
* @alias BrAPINode.prototype.seasons_store
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function seasons_store (params,behavior){
    var call = {
        'defaultMethod': 'post',
        'urlTemplate': '/seasons',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `GET /seasons/{seasonDbId}`
 * @alias BrAPINode.prototype.seasons_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.seasonDbId seasonDbId
 * @return {BrAPI_Behavior_Node}
 */
export function seasons_detail (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/seasons/{seasonDbId}',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `PUT /seasons/{seasonDbId}`
* @alias BrAPINode.prototype.seasons_modify
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function seasons_modify (params,behavior){
    var call = {
        'defaultMethod': 'put',
        'urlTemplate': '/seasons/{seasonDbId}',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}
