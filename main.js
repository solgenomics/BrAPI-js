import * as cnodes from './src/Context_Nodes';
    
export default function BrAPI(server,auth_params,version){
    var root = new cnodes.Root_Node()
    return root.server(server,auth_params,version);
};
