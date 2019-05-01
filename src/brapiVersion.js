class BrAPI_Version_Class {
    constructor(version) {
        var varr  = (""+version).trim().replace(/^(v|V)/,"").split(".");
        if (varr.length<1) throw Error("not a version");
        this.major = varr[0];
        this.minor = varr.length>1 ? varr[1] : null;
        this.patch = varr.length>2 ? varr[2] : null;
    }
    within(other){
        if (typeof other == "string") other = brapiVersion(other);
        
        if (this.major!=other.major) {
            return false;
        }
        else if (this.minor!=other.minor && other.minor) {
            return false;
        }
        else if (this.patch!=other.patch && other.patch) {
            return false;
        }
        
        return true;
    }
    predates(other){
        if (typeof other == "string") other = brapiVersion(other);
        
        if (this.major < other.major) {
            return true;
        }
        else if (this.major > other.major) {
            return false;
        }
        else if (this.minor < other.minor) {
            return true;
        }
        else if (this.minor > other.minor) {
            return false;
        }
        else if (this.patch < other.patch) {
            return true;
        }
        else if (this.patch > other.patch) {
            return false;
        }
        
        return false;
    }
    string(){
        var s = "v"+this.major;
        if (this.minor) {
            s+="."+this.minor;
            if (this.patch) {
                s+="."+this.patch;
            }
        }
        return s;
    }
    /**
     * Checks that the version of a BrAPI call matches the connected server version.
     * @private 
     * @param  {String} name   Name of BrAPI call
     * @param  {Object} check Versions to check
     * @param  {String} check.introduced When the call was introduced
     * @param  {String} check.deprecated When the call was deprecated
     * @param  {String} check.removed    When the call was removed
     */
    check(name,check){
        if (check.introduced) check.introduced = brapiVersion(check.introduced);
        if (check.deprecated) check.deprecated = brapiVersion(check.deprecated);
        if (check.removed) check.removed = brapiVersion(check.removed);
        
        if (check.introduced && this.predates(check.introduced)){
            console.warn(method_name+" is unintroduced in BrAPI@"+this.string()+" before BrAPI@"+check.introduced.string());
        }
        else if (check.deprecated && !this.predates(check.deprecated)){
            console.warn(method_name+" is deprecated in BrAPI@"+this.string()+" since BrAPI@"+check.deprecated.string());
        }
        else if (check.removed && check.removed.predates(this)){
            console.warn(method_name+" was removed from BrAPI@"+this.string()+" since BrAPI@"+check.removed.string());
        }
    }
}

export default function brapiVersion(version_string){
    return new BrAPI_Version_Class(version_string);
}
