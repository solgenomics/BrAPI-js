import * as cnodes from './src/Context_Nodes';
    
export default function BrAPI(server,auth_params){
    return new cnodes.Root_Node(server,auth_params);
};
