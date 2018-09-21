import {version} from "./_method_utils.js"

/** `GET /markerprofiles`
 * @alias Context_Node.prototype.markerprofiles
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function markerprofiles (params,behavior){
    version(this,"/markerprofiles",{
        introduced:"v1.0"
    });
    
    if (behavior!="map") behavior = "fork";
    var isMulticall = typeof params === "function";
    
    return this.brapi_call(behavior,"get",function(datum){
        return {
            'url': "/markerprofiles", 
            'params': isMulticall ? params(datum) : Object.assign({}, params)
        };
    }, isMulticall);
}

/** `POST /markerprofiles-search`
* @alias Context_Node.prototype.markerprofiles_search
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function markerprofiles_search(params,behavior){
    version(this,"/markerprofiles-search",{
        introduced:"v1.0",
        deprecated:"v1.1"
    });
    
    if (behavior!="map") behavior = "fork";
    var isMulticall = typeof params === "function";
        
    return this.brapi_call(behavior,"post",function(datum){
        return {
            'url': "/markerprofiles-search",
            'params': isMulticall ? params(datum) : Object.assign({}, params)
        };
    }, isMulticall);
}

/** `GET /markerprofiles/{markerprofileDbId}`
 * @alias Context_Node.prototype.markerprofiles_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.markerprofileDbId markerprofileDbId
 * @return {BrAPI_Behavior_Node}
 */
export function markerprofiles_detail (params){
    version(this,"/markerprofiles/{markerprofileDbId}",{
        introduced:"v1.0"
    });
    var isMulticall = typeof params === "function";
    return this.brapi_call("map","get",function(datum){
        var datum_params = isMulticall ? params(datum) : Object.assign({}, params);
        var url = "/markerprofiles/"+datum_params["markerprofileDbId"];
        delete datum_params["markerprofileDbId"];
        return {
            'url': url, 
            'params': datum_params
        };
    }, isMulticall);
}
