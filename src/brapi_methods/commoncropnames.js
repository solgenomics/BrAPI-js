import {version} from "./_method_utils.js"

/** `GET /commoncropnames`
 * @alias Context_Node.prototype.commoncropnames
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function commoncropnames (params,behavior){
    var url;
    if this.version.predates("v1.2"){
        url = "/crops"
        version(this,url,{
            introduced:"v1.0",
            deprecated:"v1.2"
        });
    } else {
        url = "/commonCropNames"
        version(this,url,{
            introduced:"v1.2"
        });
    }
    
    if (behavior!="map") behavior = "fork";
    var isMulticall = typeof params === "function";
    
    return this.brapi_call(behavior,"get",function(datum){
        return {
            'url': url, 
            'params': isMulticall ? params(datum) : Object.assign({}, params)
        };
    }, isMulticall);
}
