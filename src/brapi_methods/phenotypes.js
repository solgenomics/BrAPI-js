/** `POST /phenotypes`
 * @alias Context_Node.prototype.phenotypes
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function phenotypes (params,behavior){
    var call = {
        'defaultMethod': 'post',
        'urlTemplate': '/phenotypes',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0"
    });
    return this.simple_brapi_call(call);
}

/** `POST /phenotypes-search`
 * @alias Context_Node.prototype.phenotypes_search
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function phenotypes_search (params,behavior){
    var call = {
        'defaultMethod': 'post',
        'urlTemplate': '/phenotypes-search',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.0"
    });
    return this.simple_brapi_call(call);
}

/** `POST /phenotypes-search/csv`
 * @alias Context_Node.prototype.phenotypes_search
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function phenotypes_search_csv (params,behavior){
    var call = {
        'defaultMethod': 'post',
        'urlTemplate': '/phenotypes-search/csv',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.2"
    });
    return this.simple_brapi_call(call);
}

/** `POST /phenotypes-search/table`
 * @alias Context_Node.prototype.phenotypes_search
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function phenotypes_search_table (params,behavior){
    var call = {
        'defaultMethod': 'post',
        'urlTemplate': '/phenotypes-search/table',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.2"
    });
    return this.simple_brapi_call(call);
}

/** `POST /phenotypes-search/tsv`
 * @alias Context_Node.prototype.phenotypes_search
 * @param {Object} params Parameters to provide to the call
 * @param {String} [behavior="fork"] Behavior of the node
 * @return {BrAPI_Behavior_Node}
 */
export function phenotypes_search_tsv (params,behavior){
    var call = {
        'defaultMethod': 'post',
        'urlTemplate': '/phenotypes-search/tsv',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    this.version.check(call.urlTemplate,{
        introduced:"v1.2"
    });
    return this.simple_brapi_call(call);
}
