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
        introduced:"v1.3"
    });
    return this.search("observationtables",params,behavior);
};
