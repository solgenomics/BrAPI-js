/** `GET /observationlevels`(>=v1.2) or `GET /observationLevels`(<v1.2)
 * @alias Context_Node.prototype.observationlevels
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function observationlevels (params,behavior){
    var url;
    if (this.version.predates("v1.2")){
        url = "/observationLevels"
        this.version.check(url,{
            introduced:"v1.0",
            deprecated:"v1.2"
        });
    } else {
        url = "/observationlevels"
        this.version.check(url,{
            introduced:"v1.2"
        });
    }
    
    if (behavior!="map") behavior = "fork";
    var isMulticall = typeof params === "function";
    
    return this.brapi_call(behavior,"get",function(datum){
        return {
            'url': "/observationlevels", 
            'params': isMulticall ? params(datum) : Object.assign({}, params)
        };
    }, isMulticall);
}
