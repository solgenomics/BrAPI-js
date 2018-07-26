class BrAPI_Version_Class {
    constructor(version_string) {
        var varr  = version_string.trim().replace(/^(v|V)/,"").split(".");
        if (varr.length<1) throw Error("not a version");
        this.major = varr[0];
        this.minor = varr.length>1 ? varr[1] : null;
        this.patch = varr.length>2 ? varr[2] : null;
    }
    within(other){
        if (typeof other == "string") other = version(other);
        
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
        if (typeof other == "string") other = version(other);
        
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
}

export default function brapiVersion(version_string){
    return new BrAPI_Version_Class(version_string);
}
