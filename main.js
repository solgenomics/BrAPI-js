import * as cnodes from './src/Context_Nodes';

/**
 * BrAPI - initializes a BrAPI client handler
 *  
 * @param   {string} server      URL without trailing '/' to the BrAPI endpoint 
 * @param   {object} auth_params  
 * @param   {string} version     BrAPI version of endpoint (e.g. "1.2" or "v1.1") 
 * @returns {Context_Node}            
 */ 
export default function BrAPI(server,auth_params,version){
    var root = new cnodes.Root_Node()
    return root.server(server,auth_params,version);
};
