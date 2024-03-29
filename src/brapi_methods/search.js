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
    var search_ids = param_map.search_POST(entity,function(p){
        var pageless_params = Object.assign({}, p);
        delete pageless_params.page;
        delete pageless_params.pageRange;
        //delete pageless_params.pageSize;
        return pageless_params;
    });
    return param_map.join(search_ids).search_GET(entity,function(joined){
        var get_params = {};
        // searchResultDbId for v1 compatibility
        get_params.searchResultsDbId = joined[1].searchResultsDbId || joined[1].searchResultDbId;
        if(joined[0].page!=undefined) get_params.page = joined[0].page;
        if(joined[0].pageRange!=undefined) get_params.pageRange = joined[0].pageRange;
        if(joined[0].pageSize!=undefined) get_params.pageSize = joined[0].pageSize;
        return get_params;
    })
};

/** `POST /search/{entity}`
* @alias BrAPINode.prototype.search_POST
* @param {String} entity Entity type to search over
* @param {Object} params Parameters to provide to the call
* @return {BrAPI_Behavior_Node}
*/
export function search_POST(entity,params){
    var call = {
        'defaultMethod': 'post',
        'urlTemplate': '/search/'+entity,
        'params': params,
        'behavior': 'map'
    }
    return this.simple_brapi_call(call);
};
/** `GET /search/{entity}/{searchResultsDbId}`
* @alias BrAPINode.prototype.search_GET
* @param {String} entity Entity type to search over
* @param {Object} params Parameters to provide to the call
* @param {String} [behavior="fork"] Behavior of the node
* @return {BrAPI_Behavior_Node}
*/
export function search_GET(entity,params,behavior){
    var call = {
        'defaultMethod': 'get',
        'urlTemplate': '/search/'+entity+'/{searchResultsDbId}',
        'params': params,
        'behaviorOptions': ['fork','map'],
        'behavior': behavior,
    }
    return this.simple_brapi_call(call);
};
