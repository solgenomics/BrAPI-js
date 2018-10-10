/** `POST /germplasm-search`
* @alias BrAPINode.prototype.germplasm_search
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function germplasm_search(params,behavior){
    var call = {
        'defaultMethod': 'post',
        'urlTemplate': '/germplasm-search',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0"
    });
    return this.simple_brapi_call(call);
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
        introduced:"v1.0"
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
        introduced:"v1.0"
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
        introduced:"v1.2"
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
        introduced:"v1.0"
    });
    return this.simple_brapi_call(call);
}
