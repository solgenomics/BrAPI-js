/** `GET /commoncropnames`(>=v1.2) or `GET /crops`(<v1.2)
 * @alias BrAPINode.prototype.commoncropnames
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function commoncropnames (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    if (this.version.predates("v1.2")){
        call.urlTemplate = "/crops"
        this.version.check(call.urlTemplate,{
            introduced:"v1.0",
            deprecated:"v1.2"
        });
    } else {
        call.urlTemplate = "/commonCropNames"
        this.version.check(call.urlTemplate,{
            introduced:"v1.2"
        });
    }
    return this.simple_brapi_call(call);
}
