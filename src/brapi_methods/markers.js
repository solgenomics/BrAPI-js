import {version} from "./_method_utils.js"

/** `POST /markers-search`(>=v1.1) or `GET /markers`(<v1.1)
* @alias Context_Node.prototype.markers_search
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function markers_search(params,behavior){
    var url;
    var method;
    if(this.version.predates("v1.1")){
        url = "/markers";
        method = "get";
        version(this,url,{
            introduced:"v1.0",
            deprecated:"v1.1"
        });
    } else {
        url = "/markers-search";
        method = "post";
        version(this,url,{
            introduced:"v1.1"
        });
    }
    
    if (behavior!="map") behavior = "fork";
    var isMulticall = typeof params === "function";
        
    return this.brapi_call(behavior,method,function(datum){
        return {
            'url': url,
            'params': isMulticall ? params(datum) : Object.assign({}, params)
        };
    }, isMulticall);
};

/** `GET /markers/{markerDbId}`
 * @alias Context_Node.prototype.markers_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.markerDbId markerDbId
 * @return {BrAPI_Behavior_Node}
 */
export function markers_detail (params){
    version(this,"/markers/{markerDbId}",{
        introduced:"v1.0"
    });
    var isMulticall = typeof params === "function";
    return this.brapi_call("map","get",function(datum){
        var datum_params = isMulticall ? params(datum) : Object.assign({}, params);
        var url = "/markers/"+datum_params["markerDbId"];
        delete datum_params["markerDbId"];
        return {
            'url': url, 
            'params': datum_params
        };
    }, isMulticall);
}
