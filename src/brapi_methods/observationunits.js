/** `GET /observationunits`
 * @alias BrAPINode.prototype.observationunits
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function observationunits (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/observationunits',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.3"
    });
    return this.simple_brapi_call(call);
}

/** `POST /observationunits`
* @alias BrAPINode.prototype.observationunits_store
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function observationunits_store (params,behavior){
    var call = {
        'defaultMethod': 'post',
        'urlTemplate': '/observationunits',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `PUT /observationunits`
* @alias BrAPINode.prototype.observationunits_modify
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function observationunits_modify (params,behavior){
    var call = {
        'defaultMethod': 'put',
        'urlTemplate': '/observationunits',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `GET /observationunits/{observationUnitDbId}`
 * @alias BrAPINode.prototype.observationunits_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.observationUnitDbId observationUnitDbId
 * @return {BrAPI_Behavior_Node}
 */
export function observationunits_detail (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/observationunits/{observationUnitDbId}',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0"
    });
    return this.simple_brapi_call(call);
}

/** `PUT /observationunits/{observationUnitDbId}`
* @alias BrAPINode.prototype.observationunits_modify
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function observationunits_detail_modify (params,behavior){
    var call = {
        'defaultMethod': 'put',
        'urlTemplate': '/observationunits/{observationUnitDbId}',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `GET /observationunits/table`
 * @alias BrAPINode.prototype.observationunits_table
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.studyDbId studyDbId
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function observationunits_table (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate':'/observationunits/table',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    
    return this.simple_brapi_call(call);
}


/** `POST /search/observationunits -> GET /search/observationunits`
* @alias BrAPINode.prototype.search_observationunits
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function search_observationunits(params,behavior){
    this.version.check("POST /search/observationunits -> GET /search/observationunits",{
        introduced:"v1.3"
    });
    return this.search("observationunits",params,behavior);
};

/** `POST /search/observationtables -> GET /search/observationtables`
* @alias BrAPINode.prototype.search_observationtables
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function search_observationtables(params,behavior){
    this.version.check("POST /search/observationtables -> GET /search/observationtables",{
        introduced:"v1.3",
        deprecated:"v2.0"
    });
    return this.search("observationtables",params,behavior);
};
