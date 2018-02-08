import * as cnodes from './src/Context_Nodes';
    
export default function BrAPI(server,auth_params){
    return new cnodes.Root_Node(server,auth_params);
};

var germ = BrAPI("http://127.0.0.1:3000/brapi/v1",
        {'username':'janedoe','password':'secretpw'})
    .germplasm_search({germplasmName:"40"});

var markerprofiles = germ.germplasm_markerprofiles(function(g){
    return {germplasmDbId:g.germplasmDbId};
});

var pedigree = germ.germplasm_pedigree(function(g){
    return {germplasmDbId:g.germplasmDbId};
});

var merge = pedigree.merge(markerprofiles)
    .each(function(pair,index){
        console.log("pair",index,{pdgree:pair[0],mkrpfl:pair[1]})
    })
    .all(console.log);
