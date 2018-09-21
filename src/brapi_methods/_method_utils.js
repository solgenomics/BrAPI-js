import brapiVersion from '../brapiVersion.js';

/**
 * Checks that the version of a BrAPI call matches the connected server version.
 * @private 
 * @param  {Context_Node} node Current node
 * @param  {String} name   Name of BrAPI call
 * @param  {Object} v_info Versions to check
 * @param  {String} v_info.introduced When the call was introduced
 * @param  {String} v_info.deprecated When the call was deprecated
 * @param  {String} v_info.removed    When the call was removed
 */
export function version(node,name,v_info){
    if (v_info.introduced) v_info.introduced = brapiVersion(v_info.introduced);
    if (v_info.deprecated) v_info.deprecated = brapiVersion(v_info.deprecated);
    if (v_info.removed) v_info.removed = brapiVersion(v_info.removed);
    
    if (v_info.introduced && node.version.predates(v_info.introduced)){
        console.warn(method_name+" is unintroduced in BrAPI@"+node.version.string()+" before BrAPI@"+v_info.introduced.string());
    }
    else if (v_info.deprecated && !node.version.predates(v_info.deprecated)){
        console.warn(method_name+" is deprecated in BrAPI@"+node.version.string()+" since BrAPI@"+v_info.deprecated.string());
    }
    else if (v_info.removed && v_info.removed.predates(node.version)){
        console.warn(method_name+" was removed from BrAPI@"+node.version.string()+" since BrAPI@"+v_info.removed.string());
    }
}
