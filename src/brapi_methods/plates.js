/** `GET /plates`
 * @alias BrAPINode.prototype.plates
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function plates (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/plates',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.1"
    });
    return this.simple_brapi_call(call);
}

/** `POST /plates`
 * @alias BrAPINode.prototype.plates_store
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function plates_store (params,behavior){
    var call = {
        'defaultMethod': 'post',
        'urlTemplate': '/plates',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.1"
    });
    return this.simple_brapi_call(call);
}

/** `PUT /plates`
 * @alias BrAPINode.prototype.plates_modify_multiple
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function plates_modify_multiple (params,behavior){
    var call = {
        'defaultMethod': 'put',
        'urlTemplate': '/plates',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.1"
    });
    return this.simple_brapi_call(call);
}


/** `GET /plates/{plateDbId}`
 * @alias BrAPINode.prototype.plates_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.plateDbId plateDbId
 * @return {BrAPI_Behavior_Node}
 */
export function plates_detail (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/plates/{plateDbId}',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.1"
    });
    return this.simple_brapi_call(call);
}
