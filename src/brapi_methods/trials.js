/** `GET /trials`
 * @alias BrAPINode.prototype.trials
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function trials (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/trials',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0"
    });
    return this.simple_brapi_call(call);
}

/** `GET /trials/{trialDbId}`
 * @alias BrAPINode.prototype.trials_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.trialDbId trialDbId
 * @return {BrAPI_Behavior_Node}
 */
export function trials_detail (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/trials/{trialDbId}',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0"
    });
    return this.simple_brapi_call(call);
}
