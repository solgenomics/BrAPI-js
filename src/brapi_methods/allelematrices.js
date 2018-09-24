/** `GET /allelematrices`
 * @alias Context_Node.prototype.allelematrices
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function allelematrices (params,behavior){
    var url = "/allelematrices";
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

/** `POST /allelematrices-search`(>=v1.2) or `POST /allelematrix-search`(<v1.2)
* @alias Context_Node.prototype.allelematrices_search
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function allelematrices_search(params,behavior){
    var url;
    if (this.version.predates("v1.2")){
        url = "/allelematrix-search"
        this.version.check(url,{
            introduced:"v1.0",
            deprecated:"v1.2"
        });
    } else {
        url = "/allelematrices-search"
        this.version.check(url,{
            introduced:"v1.2"
        });
    }
    
    if (behavior!="map") behavior = "fork";
    var isMulticall = typeof params === "function";
        
    return this.brapi_call(behavior,"post",function(datum){
        return {
            'url': url,
            'params': isMulticall ? params(datum) : Object.assign({}, params)
        };
    }, isMulticall);
};
