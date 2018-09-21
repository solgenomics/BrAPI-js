import {version} from "./_method_utils.js"

/** `POST /germplasm-search`
* @alias Context_Node.prototype.germplasm_search
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function germplasm_search(params,behavior){
    version(this,"/germplasm-search",{
        introduced:"v1.0"
    });
    
    if (behavior!="map") behavior = "fork";
    var isMulticall = typeof params === "function";
        
    return this.brapi_call(behavior,"post",function(datum){
        return {
            'url': "/germplasm-search",
            'params': isMulticall ? params(datum) : Object.assign({}, params)
        };
    }, isMulticall);
};

/** `GET /germplasm/{germplasmDbId}`
 * @alias Context_Node.prototype.germplasm_detail
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.germplasmDbId germplasmDbId
 * @return {BrAPI_Behavior_Node}
 */
export function germplasm_detail (params){
    version(this,"/germplasm/{germplasmDbId}",{
        introduced:"v1.0"
    });
    var isMulticall = typeof params === "function";
    return this.brapi_call("map","get",function(datum){
        var datum_params = isMulticall ? params(datum) : Object.assign({}, params);
        var url = "/germplasm/"+datum_params["germplasmDbId"];
        delete datum_params["germplasmDbId"];
        return {
            'url': url, 
            'params': datum_params
        };
    }, isMulticall);
}

/** `GET /germplasm/{germplasmDbId}/attributes`
 * @alias Context_Node.prototype.germplasm_attributes
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.germplasmDbId germplasmDbId
 * @return {BrAPI_Behavior_Node}
 */
export function germplasm_attributes (params,behavior){
    version(this,"/germplasm/{germplasmDbId}/attributes",{
        introduced:"v1.0"
    });
    
    if (behavior!="map") behavior = "fork";
    var isMulticall = typeof params === "function";
    
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = isMulticall ? params(datum) : Object.assign({}, params);
        var url = "/germplasm/"+datum_params["germplasmDbId"]+"/attributes";
        delete datum_params["germplasmDbId"];
        return {
            'url': url, 
            'params': datum_params
        };
    }, isMulticall);
}

/** `GET /germplasm/{germplasmDbId}/pedigree`
 * @alias Context_Node.prototype.germplasm_pedigree
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.germplasmDbId germplasmDbId
 * @return {BrAPI_Behavior_Node}
 */
export function germplasm_pedigree (params){
    version(this,"/germplasm/{germplasmDbId}/pedigree",{
        introduced:"v1.0"
    });
    
    var isMulticall = typeof params === "function";
    
    return this.brapi_call("map","get",function(datum){
        var datum_params = isMulticall ? params(datum) : Object.assign({}, params);
        var url = "/germplasm/"+datum_params["germplasmDbId"]+"/pedigree";
        delete datum_params["germplasmDbId"];
        return {
            'url': url, 
            'params': datum_params
        };
    }, isMulticall);
}

/** `GET /germplasm/{germplasmDbId}/progeny`
 * @alias Context_Node.prototype.germplasm_progeny
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.germplasmDbId germplasmDbId
 * @param {String} [behavior="map"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function germplasm_progeny (params,behavior){
    version(this,"/germplasm/{germplasmDbId}/progeny",{
        introduced:"v1.2"
    });
    
    if (behavior!="fork") behavior = "map";
    var isMulticall = typeof params === "function";
    
    return this.brapi_call(behavior,"get",function(datum){
        var datum_params = isMulticall ? params(datum) : Object.assign({}, params);
        var url = "/germplasm/"+datum_params["germplasmDbId"]+"/progeny";
        delete datum_params["germplasmDbId"];
        return {
            'url': url, 
            'params': datum_params
        };
    }, isMulticall);
}

/** `GET /germplasm/{germplasmDbId}/markerprofiles`
 * @alias Context_Node.prototype.germplasm_markerprofiles
 * @param {Object} params Parameters to provide to the call
 * @param {String} params.germplasmDbId germplasmDbId
 * @return {BrAPI_Behavior_Node}
 */
export function germplasm_markerprofiles (params){
    version(this,"/germplasm/{germplasmDbId}/markerprofiles",{
        introduced:"v1.0"
    });
    
    var isMulticall = typeof params === "function";
    
    return this.brapi_call("map","get",function(datum){
        var datum_params = isMulticall ? params(datum) : Object.assign({}, params);
        var url = "/germplasm/"+datum_params["germplasmDbId"]+"/markerprofiles";
        delete datum_params["germplasmDbId"];
        return {
            'url': url, 
            'params': datum_params
        };
    }, isMulticall);
}
