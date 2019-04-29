/** `POST /search/{entity}`
* @alias BrAPINode.prototype.post_search
* @param {String} entity Entity type to search over
* @param {Object} params Parameters to provide to the call
* @return {BrAPI_Behavior_Node}
*/
export function post_search(entity,params){
    var call = {
        'defaultMethod': 'post',
        'urlTemplate': '/search/'+entity,
        'params': params,
        'behavior': 'map'
    }
    return this.simple_brapi_call(call);
};

/** `GET /search/{entity}/{searchResultsDbId}`
* @alias BrAPINode.prototype.get_search
* @param {String} entity Entity type to search over
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function get_search(entity,params,behavior){
    var call = {
        'defaultMethod': 'post',
        'urlTemplate': '/search/'+entity+'/{searchResultsDbId}',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    return this.simple_brapi_call(call);
};

/** `POST /search/{entity} then GET /search/{entity}/{searchResultsDbId}`
* @alias BrAPINode.prototype.search
* @param {String} entity Entity type to search over
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function search(entity,params,behavior){
    var param_map = this.map(function(d){
        return typeof params === "function" ? params(d) : params;
    });
    var search_ids = param_map.post_search(entity,function(p){
        var pageless_params = Object.assign({}, p);
        delete pageless_params.page;
        delete pageless_params.pageRange;
        delete pageless_params.pageSize;
        return pageless_params;
    });
    return param_map.join(search_ids).get_search(function(j){
        var get_params = {};
        get_params.searchResultDbId = j[1].searchResultDbId;
        if(j[0].page!=undefined) get_params.page = j[0].page;
        if(j[0].pageRange!=undefined) get_params.pageRange = j[0].pageRange;
        if(j[0].pageSize!=undefined) get_params.pageSize = j[0].pageSize;
        return get_params;
    })
};

export function search_germplasm(params,behavior){
    this.version.check(call.urlTemplate,{
        introduced:"v1.3"
    });
    return this.search("germplasm",params,behavior);
}
