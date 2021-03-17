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

/** `POST /trials`
* @alias BrAPINode.prototype.trials_store
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function trials_store (params,behavior){
    var call = {
        'defaultMethod': 'post',
        'urlTemplate': '/trials',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
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


/** `PUT /trials/{trialDbId}`
* @alias BrAPINode.prototype.trials_modify
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function trials_modify (params,behavior){
    var call = {
        'defaultMethod': 'put',
        'urlTemplate': '/trials/{trialDbId}',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `POST /search/trials`
* @alias BrAPINode.prototype.trials_search
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function trials_search(params,behavior){
    return this.search_trials(params,behavior,true);
};

/** `POST /search/trials -> GET /search/trials`
* @alias BrAPINode.prototype.search_trials
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function search_trials(params,behavior,useOld){
    this.version.check("POST /search/trials -> GET /search/trials",{
        introduced:"v2.0"
    });
    return this.search("trials",params,behavior);
};
