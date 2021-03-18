/** `GET /samples`
 * @alias BrAPINode.prototype.samples
 * @param {Object} params Parameters to provide to the call
 * @return {BrAPI_Behavior_Node}
 */
export function samples (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/samples',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0"
    });
    return this.simple_brapi_call(call);
}

/** `POST /samples`
* @alias BrAPINode.prototype.samples_store
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function samples_store (params,behavior){
    var call = {
        'defaultMethod': 'post',
        'urlTemplate': '/samples',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `GET /samples/{sampleDbId}`
 * @alias BrAPINode.prototype.samples_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.sampleDbId sampleDbId
 * @return {BrAPI_Behavior_Node}
 */
export function samples_detail (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/samples/{sampleDbId}',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0"
    });
    return this.simple_brapi_call(call);
}

/** `PUT /samples/{sampleDbId}`
 * @alias BrAPINode.prototype.samples_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.sampleDbId sampleDbId
 * @return {BrAPI_Behavior_Node}
 */
export function samples_modify (params){
    var call = {
        'defaultMethod': 'put',
        'urlTemplate': '/samples/{sampleDbId}',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `POST /samples-search`
* @alias BrAPINode.prototype.samples_search
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function samples_search(params,behavior){
    return this.search_samples(params,behavior,true);
};

/** `POST /samples-search`, `POST /search/samples -> GET /search/samples`
* @alias BrAPINode.prototype.search_samples
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function search_samples(params,behavior,useOld){
    if (this.version.predates("v1.3")||useOld){
        var call = {
            'params': params,
            'behaviorOptions': ['fork','map'],
            'behavior': behavior,
        }
        call.urlTemplate = "/samples-search";
        call.defaultMethod = "post";
        this.version.check(call.urlTemplate,{
            introduced:"v1.1",
            deprecated:"v1.3",
            deprecated:"v2.0"
        });
        return this.simple_brapi_call(call);
    } else {
        this.version.check("POST /search/samples -> GET /search/samples",{
            introduced:"v1.3"
        });
        return this.search("samples",params,behavior);
    }
};
