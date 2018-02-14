export class Task {
    constructor(key) {
        this.status = 0
        this.setKey(key);
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
    setKey(key){
        this.key = (key !== Object(key)) ? key : ""+key;
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
