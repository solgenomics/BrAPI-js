/** `GET /germplasm`
 * @alias BrAPINode.prototype.germplasm
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function germplasm (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/germplasm',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.3"
    });
    return this.simple_brapi_call(call);
}

/** `POST /germplasm`
* @alias BrAPINode.prototype.germplasm_store
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function germplasm_store (params,behavior){
    var call = {
        'defaultMethod': 'post',
        'urlTemplate': '/germplasm',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}


/** `POST /germplasm-search`
* @alias BrAPINode.prototype.germplasm_search
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function germplasm_search(params,behavior){
    return this.search_germplasm(params,behavior,true);
};

/** `GET /germplasm/{germplasmDbId}`
 * @alias BrAPINode.prototype.germplasm_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.germplasmDbId germplasmDbId
 * @return {BrAPI_Behavior_Node}
 */
export function germplasm_detail (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/germplasm/{germplasmDbId}',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0"
    });
    return this.simple_brapi_call(call);
}

/** `PUT /germplasm/{germplasmDbId}`
* @alias BrAPINode.prototype.germplasm_modify
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function germplasm_modify (params,behavior){
    var call = {
        'defaultMethod': 'put',
        'urlTemplate': '/germplasm/{germplasmDbId}',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `GET /germplasm/{germplasmDbId}/mcpd`
 * @alias BrAPINode.prototype.germplasm_mcpd
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.germplasmDbId germplasmDbId
 * @return {BrAPI_Behavior_Node}
 */
export function germplasm_mcpd (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/germplasm/{germplasmDbId}/mcpd',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.3"
    });
    return this.simple_brapi_call(call);
}

/** `GET /germplasm/{germplasmDbId}/attributes`
 * @alias BrAPINode.prototype.germplasm_attributes
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.germplasmDbId germplasmDbId
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function germplasm_attributes (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/germplasm/{germplasmDbId}/attributes',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0",
        deprecated:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `GET /germplasm/{germplasmDbId}/pedigree`
 * @alias BrAPINode.prototype.germplasm_pedigree
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.germplasmDbId germplasmDbId
 * @return {BrAPI_Behavior_Node}
 */
export function germplasm_pedigree (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/germplasm/{germplasmDbId}/pedigree',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0",
        deprecated:"v2.1"
    });
    return this.simple_brapi_call(call);
}

/** `GET /germplasm/{germplasmDbId}/progeny`
 * @alias BrAPINode.prototype.germplasm_progeny
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.germplasmDbId germplasmDbId
 * @param {String} [behavior="map"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function germplasm_progeny (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/germplasm/{germplasmDbId}/progeny',
        'params': params,
        'behaviorOptions': ['map','fork'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.2",
        deprecated:"v2.1"
    });
    return this.simple_brapi_call(call);
}

/** `GET /germplasm/{germplasmDbId}/markerprofiles`
 * @alias BrAPINode.prototype.germplasm_markerprofiles
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.germplasmDbId germplasmDbId
 * @return {BrAPI_Behavior_Node}
 */
export function germplasm_markerprofiles (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/germplasm/{germplasmDbId}/markerprofiles',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0",
        deprecated:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `POST /germplasm-search`, `POST /search/germplasm -> GET /search/germplasm`
* @alias BrAPINode.prototype.search_germplasm
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function search_germplasm(params,behavior,useOld){
    if (this.version.predates("v1.3")||useOld){
        var call = {
            'defaultMethod': 'post',
            'urlTemplate': '/germplasm-search',
            'params': params,
            'behaviorOptions': ['fork','map'],
            'behavior': behavior,
        }
        this.version.check(call.urlTemplate,{
            introduced:"v1.0",
            deprecated:"v1.3",
            deprecated:"v2.0"
        });
        return this.simple_brapi_call(call);
    }
    else {
        this.version.check("POST /search/germplasm -> GET /search/germplasm",{
            introduced:"v1.3"
        });
        return this.search("germplasm",params,behavior);
    }
}
