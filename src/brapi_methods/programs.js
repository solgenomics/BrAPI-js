/** `GET /programs`
 * @alias BrAPINode.prototype.programs
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function programs (params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/programs',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0"
    });
    return this.simple_brapi_call(call);
}

/** `POST /programs-search`
* @alias BrAPINode.prototype.programs_search
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function programs_search(params,behavior){
    return this.search_programs(params,behavior);
};

/** `POST /programs-search`, `POST /search/programs -> GET /search/programs`
* @alias BrAPINode.prototype.search_programs
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function search_programs(params,behavior){
    if (this.version.predates("v1.3")){
        var call = {
            'params': params,
            'behaviorOptions': ['fork','map'],
            'behavior': behavior,
        }
        call.urlTemplate = "/programs-search";
        call.defaultMethod = "post";
        this.version.check(call.urlTemplate,{
            introduced:"v1.0",
            deprecated:"v1.3"
        });
        return this.simple_brapi_call(call);
    } else {
        this.version.check("POST /search/programs -> GET /search/programs",{
            introduced:"v1.3"
        });
        return this.search("programs",params,behavior);
    }
};
