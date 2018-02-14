export class Task {
    constructor(index) {
        this.status = 0
        this.index = index
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
    getIndex(){
        return this.index;
    }
    setIndex(index){
        this.index = index;
    }
}

export class Merge_Task extends Task{
    constructor(index) {
        super(index)
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
