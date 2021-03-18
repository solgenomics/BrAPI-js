/** `GET /plannedcrosses`
 * @alias BrAPINode.prototype.plannedcrosses
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function plannedcrosses (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/plannedcrosses',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `POST /plannedcrosses`
* @alias BrAPINode.prototype.plannedcrosses_store
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function plannedcrosses_store (params,behavior){
    var call = {
        'defaultMethod': 'post',
        'urlTemplate': '/plannedcrosses',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}


/** `PUT /plannedcrosses`
* @alias BrAPINode.prototype.plannedcrosses_modify
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function plannedcrosses_modify (params,behavior){
    var call = {
        'defaultMethod': 'put',
        'urlTemplate': '/plannedcrosses',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}