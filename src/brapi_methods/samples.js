/** `PUT /samples`
 * @alias BrAPINode.prototype.samples_add
 * @param {Object} params Parameters to provide to the call
 * @return {BrAPI_Behavior_Node}
 */
export function samples_add (params){
    var call = {
        'defaultMethod': 'put',
        'urlTemplate': '/samples',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0"
    });
    return this.simple_brapi_call(call);
}

/** `POST /samples-search`
 * @alias BrAPINode.prototype.samples_search
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function samples_search (params,behavior){
    var call = {
        'defaultMethod': 'post',
        'urlTemplate': '/samples-search',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.1"
    });
    return this.simple_brapi_call(call);
}

/** `GET /samples/{sampleId}`
 * @alias BrAPINode.prototype.samples_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.sampleId sampleId
 * @return {BrAPI_Behavior_Node}
 */
export function samples_detail (params){
    var call = {
        'defaultMethod': 'put',
        'urlTemplate': '/samples/{sampleId}',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0"
    });
    return this.simple_brapi_call(call);
}
