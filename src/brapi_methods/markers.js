/** `GET /markers`
* @alias BrAPINode.prototype.markers
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function markers(params,behavior){
    var call = {
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    call.urlTemplate = "/markers";
    call.defaultMethod = "get";
    
    if(this.version.predates("v1.3")){
        this.version.check(call.urlTemplate,{
            introduced:"v1.0",
            deprecated:"v1.1",
            deprecated:"v2.0"
        });
    }
    else {
        this.version.check(call.urlTemplate,{
            introduced:"v1.3",
            deprecated:"v2.0"
        });
    }
    return this.simple_brapi_call(call);
};

/** `GET /markers/{markerDbId}`
 * @alias BrAPINode.prototype.markers_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.markerDbId markerDbId
 * @return {BrAPI_Behavior_Node}
 */
export function markers_detail (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/markers/{markerDbId}',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0",
        deprecated:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `GET /markerpositions`
 * @alias BrAPINode.prototype.markerpositions
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function markerpositions (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/markerpositions',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `POST /markers-search`
* @alias BrAPINode.prototype.markers_search
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function markers_search(params,behavior){
    return this.search_markers(params,behavior,true);
};

/** `POST /markers-search`, `POST /search/markers -> GET /search/markers`
* @alias BrAPINode.prototype.search_markers
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function search_markers(params,behavior,useOld){
    if (this.version.predates("v1.3")||useOld){
        var call = {
            'params': params,
            'behaviorOptions': ['fork','map'],
            'behavior': behavior,
        }
        call.urlTemplate = "/markers-search";
        call.defaultMethod = "post";
        this.version.check(call.urlTemplate,{
            introduced:"v1.1",
            deprecated:"v1.3",
            deprecated:"v2.0"
        });
        return this.simple_brapi_call(call);
    } else {
        this.version.check("POST /search/markers -> GET /search/markers",{
            introduced:"v1.3",
            deprecated:"v2.0"
        });
        return this.search("markers",params,behavior);
    }
};


/** `POST /search/markerpositions -> GET /search/markerpositions`
* @alias BrAPINode.prototype.search_markerpositions
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function search_markerpositions(params,behavior){
    this.version.check("POST /search/markerpositions -> GET /search/markerpositions",{
        introduced:"v2.0"
    });
    return this.search("markerpositions",params,behavior);
};
