/** `GET /ontologies`
 * @alias Context_Node.prototype.ontologies
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function ontologies (params,behavior){
    this.version.check("/ontologies",{
        introduced:"v1.0"
    });
    
    if (behavior!="map") behavior = "fork";
    var isMulticall = typeof params === "function";
    
    return this.brapi_call(behavior,"get",function(datum){
        return {
            'url': "/ontologies", 
            'params': isMulticall ? params(datum) : Object.assign({}, params)
        };
    }, isMulticall);
}
