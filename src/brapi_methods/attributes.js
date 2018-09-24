/** `GET /attributes`
 * @alias Context_Node.prototype.attributes
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function attributes (params,behavior){
    var url = "/attributes";
    this.version.check(url,{
        introduced:"v1.0"
    });
    
    if (behavior!="map") behavior = "fork";
    var isMulticall = typeof params === "function";
    
    return this.brapi_call(behavior,"get",function(datum){
        return {
            'url': url, 
            'params': isMulticall ? params(datum) : Object.assign({}, params)
        };
    }, isMulticall);
}

/** `GET /attributes_categories`
 * @alias Context_Node.prototype.attributes_categories
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function attributes_categories (params,behavior){
    var url = "/attributes/categories";
    this.version.check(url,{
        introduced:"v1.0"
    });
    
    if (behavior!="map") behavior = "fork";
    var isMulticall = typeof params === "function";
    
    return this.brapi_call(behavior,"get",function(datum){
        return {
            'url': url, 
            'params': isMulticall ? params(datum) : Object.assign({}, params)
        };
    }, isMulticall);
}
