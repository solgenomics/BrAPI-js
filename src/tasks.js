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

export class Merge_Task extends Task{
    constructor(key) {
        super(key)
        this.result = [];
    }
    complete(set){
        if (set==undefined){
            return this.status==1;
        }
        else {
            this.status = set==true?1:0;
            return true;
        }
    }
    addResult(result){
        this.result.push(result);
    }
}
