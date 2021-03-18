/** `GET /images`
 * @alias BrAPINode.prototype.images
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function images (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/images',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.3"
    });
    return this.simple_brapi_call(call);
}

/** `POST /images`
* @alias BrAPINode.prototype.images_store
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function images_store (params,behavior){
    var call = {
        'defaultMethod': 'post',
        'urlTemplate': '/images',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `GET /images/{imageDbId}`
 * @alias BrAPINode.prototype.images_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.imageDbId imageDbId
 * @return {BrAPI_Behavior_Node}
 */
export function images_detail (params){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/images/{imageDbId}',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.3"
    });
    return this.simple_brapi_call(call);
}

/** `PUT /images/{imageDbId}`
* @alias BrAPINode.prototype.images_modify
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function images_modify (params,behavior){
    var call = {
        'defaultMethod': 'put',
        'urlTemplate': '/images/{imageDbId}',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.0"
    });
    return this.simple_brapi_call(call);
}

/** `PUT /images/{imageDbId}/imagecontent`
 * @alias BrAPINode.prototype.images_imagecontent
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.imageDbId imageDbId
 * @return {BrAPI_Behavior_Node}
 */
export function images_imagecontent (params){
    var call = {
        'defaultMethod': 'put',
        'urlTemplate': '/images/{imageDbId}/imagecontent',
        'params': params,
        'behavior': 'map',
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.3"
    });
    return this.simple_brapi_call(call);
}

/** `POST /search/images -> GET /search/images`
* @alias BrAPINode.prototype.search_images
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function search_images(params,behavior){
    this.version.check("POST /search/images -> GET /search/images",{
        introduced:"v1.3"
    });
    return this.search("images",params,behavior);
};
