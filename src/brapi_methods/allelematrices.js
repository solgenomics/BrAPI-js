/** `GET /allelematrices`
 * @alias BrAPINode.prototype.allelematrices
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function allelematrices (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/allelematrices',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0",
        deprecated:"v2.0" 
    });
    return this.simple_brapi_call(call);
}

/** `POST /allelematrices-search`(>=v1.2) or `POST /allelematrix-search`(<v1.2)
* @alias BrAPINode.prototype.allelematrices_search
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function allelematrices_search(params,behavior){
    var call = {
        'defaultMethod': 'post',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    
    if (this.version.predates("v1.2")){
        call.urlTemplate = "/allelematrix-search"
        this.version.check(call.urlTemplate,{
            introduced:"v1.0",
            deprecated:"v1.2"
        });
    } else {
        call.urlTemplate = "/allelematrices-search"
        this.version.check(call.urlTemplate,{
            introduced:"v1.2",
            deprecated:"v2.0"
        });
    }
    
    return this.simple_brapi_call(call);
};

/** `GET /allelematrix`
 * @alias BrAPINode.prototype.allelematrix
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function allelematrix (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/allelematrix',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v2.1"
    });
    return this.simple_brapi_call(call);
}