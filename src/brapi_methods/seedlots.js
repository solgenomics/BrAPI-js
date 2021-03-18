/** `GET /seedlots`
 * @alias BrAPINode.prototype.seedlots
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function seedlots (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/seedlots',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `POST /seedlots`
* @alias BrAPINode.prototype.seedlots_store
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function seedlots_store (params,behavior){
    var call = {
        'defaultMethod': 'post',
        'urlTemplate': '/seedlots',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `GET /seedlots/{seedLotDbId}`
 * @alias BrAPINode.prototype.seedlots_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.seedLotDbId seedLotDbId
 * @return {BrAPI_Behavior_Node}
 */
export function seedlots_detail (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/seedlots/{seedLotDbId}',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `PUT /seedlots/{seedLotDbId}`
* @alias BrAPINode.prototype.seedlots_modify
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function seedlots_modify (params,behavior){
    var call = {
        'defaultMethod': 'put',
        'urlTemplate': '/seedlots/{seedLotDbId}',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `GET /seedlots/transactions`
 * @alias BrAPINode.prototype.seedlots_transactions
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function seedlots_transactions (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/seedlots/transactions',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `POST /seedlots/transactions`
* @alias BrAPINode.prototype.seedlots_transactions_store
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/

export function seedlots_transactions_store (params,behavior){
    var call = {
        'defaultMethod': 'post',
        'urlTemplate': '/seedlots/transactions',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `GET /seedlots/{seedLotDbId}/transactions`
 * @alias BrAPINode.prototype.seedlots_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.seedLotDbId seedLotDbId
 * @return {BrAPI_Behavior_Node}
 */

export function seedlots_detail_transactions (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/seedlots/{seedLotDbId}/transactions',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}
