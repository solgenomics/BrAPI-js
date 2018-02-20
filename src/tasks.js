export class Task {
    constructor(key, parentKey) {
        this.status = 0;
        this.setKey(key,parentKey);
        this.result = null;
    }
    complete(result){
        if (result===undefined){
            return this.status==1;
        }
        else {
            this.result = result;
            this.status = 1;
            return true;
        }
    }
    getResult(){
        return this.status==1 ? this.result : undefined;
    }
    getKey(){
        return this.key;
    }
    setKey(key,parentKey){
        if (parentKey!=undefined){
            this.key = parentKey+encodeNumberKey(key);
        } else {
            this.key = ""+key;
        }
    }
}

export class Join_Task extends Task{
    constructor(key,size) {
        super(key)
        this.result = Array.apply(undefined, Array(size));
    }
    complete(perform_check){
        if (perform_check==true){
            this.status = this.result.every(function(datum){
                return datum!==undefined;
            });
        }
        return this.status==1;
    }
    addResult(result,index){
        this.result[index] = result;
    }
}

// makes numbers sort lexicographically, really should only be used for numbers 
// up to 10^26-1, which is far higher than we need anyway
function encodeNumberKey(num){
    var str = ""+num;
    var oom = str.length;
    return String.fromCharCode(oom+64)+str;
}
