/** `POST /vendor/plates`
 * @alias BrAPINode.prototype.vendor_plates
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function vendor_plates (params,behavior){
    var call = {
        'defaultMethod': 'post',
        'urlTemplate': '/vendor/plates',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.1"
    });
    return this.simple_brapi_call(call);
}

/** `POST /vendor/plates-search`(>=v1.2) or `POST /vendor/plate-search`(<v1.2)
* @alias BrAPINode.prototype.vendor_plates_search
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function vendor_plates_search(params,behavior){
    var call = {
        'defaultMethod': 'post',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    if(this.version.predates("v1.2")){
        call.urlTemplate = '/vendor/plate-search';
        this.version.check(call.urlTemplate,{
            introduced:"v1.1",
            deprecated:"v1.2"
        });
    } else {
        call.urlTemplate = '/vendor/plates-search';
        this.version.check(call.urlTemplate,{
            introduced:"v1.2"
        });
    }
    return this.simple_brapi_call(call);
};

/** `GET /vendor/plates/{vendorPlateDbId}`
 * @alias BrAPINode.prototype.vendor_plates_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.vendorPlateDbId vendorPlateDbId
 * @return {BrAPI_Behavior_Node}
 */
export function vendor_plates_detail (params){
    var call = {
        'defaultMethod': 'get',
        'params': params,
        'behavior': 'map',
    }
    if(this.version.predates("v1.2")){
        call.urlTemplate = '/vendor/plate/{vendorPlateDbId}';
        this.version.check(call.urlTemplate,{
            introduced:"v1.1",
            deprecated:"v1.2"
        });
    } else {
        call.urlTemplate = '/vendor/plates/{vendorPlateDbId}';
        this.version.check(call.urlTemplate,{
            introduced:"v1.2"
        });
    }
    return this.simple_brapi_call(call);
}

/** `GET /vendor/specifications`
 * @alias BrAPINode.prototype.vendor_specifications
 * @param {Object} params Parameters to provide to the call
 * @return {BrAPI_Behavior_Node}
 */
export function vendor_specifications (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/vendor/specifications',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.1"
    });
    return this.simple_brapi_call(call);
}
