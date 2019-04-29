export class NodeFrayError extends Error {
    constructor(message) {
        super(message);
        console.log("***Error Occured During BrAPI.js Node Creation*** (Check provided user callback)")
        console.log(message);
        this.name = "NodeFrayError";
    }
}

export class DatumWrapper {
    constructor(val,key){
        this.val = val;
        this.key = key;
    }
    map(result){
        return Promise.resolve(result).then(r=>{
            return new DatumWrapper(r,this.key);
        });
    }
    map_key(result){
        return Promise.resolve(result).then(r=>{
            return new DatumWrapper(this.val,r);
        });
    }
    fork(results){
        return Promise.resolve(results).then(rs=>{
            return rs.map((result,i)=>{
                return new DatumWrapper(result,this.key+","+i);
            })
        });
    }
}

class DatumJoin {
    constructor(key,thread_count){
        this.key = key;
        this.thread_count = thread_count;
        this.joined = [];
        for (var i = 0; i < this.thread_count; i++) {
            this.joined.push(DatumJoin.placeHolder);
        }
        this.promise = new Promise(resolve=>this.resolve=resolve);
    }
    join(value,thread_index){
        this.joined[thread_index] = value;
        if(this.joined.every(j=>j!==DatumJoin.placeHolder)){
            this.resolve(new DatumWrapper(this.joined,this.key));
        }
    }
    complete(){
        this.resolve(new DatumWrapper(this.joined.map(d=>d===DatumJoin.placeHolder?undefined:d),this.key));
    }
}
DatumJoin.placeHolder = {};

class DatumJoinMap {
    constructor(thread_count){
        this.thread_count = thread_count;
        this.keymap = {};
    }
    join(datum,thread_index){
        if(this.keymap[datum.key]!=undefined){
            this.keymap[datum.key].join(datum.val,thread_index);
            return Promise.resolve([]);
        } 
        else {
            this.keymap[datum.key] = new DatumJoin(datum.key,this.thread_count);
            this.keymap[datum.key].join(datum.val,thread_index);
            return this.keymap[datum.key].promise;
        }
    }
    complete(){
        for (var key in this.keymap) {
            if (this.keymap.hasOwnProperty(key)) {
                this.keymap[key].complete();
            }
        }
    }
}

export class ThreadNode {
    constructor() {
        this._filaments = []; // Array of Promises for Arrays of Promises etc

        this._state = {
            'source':{
                'committed':false,
                'initiator':null
            },
            'status':"PENDING"
        };
        this._control = {'flatten':undefined};
        this._state.complete = new Promise(resolve => {
            this._control.flatten = ()=>{                
                this._flatten_filaments(this._filaments).then(data=>{
                    this._state.status = "RESOLVED";
                    resolve(data);
                });
            };
        });

        this._each_callbacks = [];
    }

    _connect(initiator){
        if(this._state.source.committed){
            throw new Error("ThreadNode cannot have two data sources.");
        } else {
            this._state.source.committed = true;
            this._state.source.initiator = initiator?(initiator._state || null):null;
            return {
                'send':(fray)=>{ // add datum or datum promises
                    var filament = Promise.resolve(fray).then(fray_data=>{
                        return fray_data.map(datum=>Promise.resolve(datum));
                    });
                    this._filaments.push(filament);
                    this._each_callbacks.forEach(ec=>ec(filament));
                },
                'finish':()=> this._control.flatten() // call when last filament has been frayed, locks in filament count.
            }
        }
    }
    
    _outputNode(){
        return new ThreadNode();
    }

    all(c){
        this._state.complete.then(data=>{
            try {
                return c(data.map(d=>d.val));
            } catch (e) {
                new NodeFrayError(e);
            }
        });
        return this;
    }

    each(c){
        let fc = fray_data=>fray_data.forEach(d=>{
            Promise.resolve(d).then(datum=>{
                try {
                    return (datum instanceof Array) ? fc(datum) : c(datum.val,datum.key);
                } catch (e) {
                    new NodeFrayError(e)
                    return []
                }
            })
        });
        let ec = filament=>filament.then(fc);
        this._filaments.forEach(ec);
        this._each_callbacks.push(ec);
        return this;
    }
    
    _fray(fray_func){
        let frayed = this._outputNode();
        let edge = frayed._connect(this);
        let fc = fray_data=>fray_data.map(d=>{
            return Promise.resolve(d).then(datum=>{
                if(datum instanceof Array) return fc(datum);
                var returnVal;
                try {
                    returnVal = fray_func(datum,edge.send);
                } catch (e) {
                    returnVal = new DatumWrapper(new NodeFrayError(e), datum.key);
                } finally {
                    return returnVal;
                }
            });
        });
        let ec = filament=>filament.then(fc);
        this._filaments.forEach(ec);
        this._each_callbacks.push(ec);
        this._state.complete.then( ()=> edge.finish() );
        return frayed;
    }
    
    fork(c){
        return this._fray((datum,send)=>send([datum.fork(c(datum.val,datum.key))]))
    }
    map(c){
        return this._fray((datum,send)=>send([datum.map(c(datum.val,datum.key))]))
    }
    keys(c){
        return this._fray((datum,send)=>send([datum.map_key(c(datum.val,datum.key)||datum.key)]))
    }
    filter(c){
        return this._fray((datum,send)=>send(c(datum.val,datum.key)?[datum.map(datum.val)]:[]))
    }
    
    reduce(reduce_func){
        let reduced = this._outputNode();
        let edge = reduced._connect(this);
        this.all( (data) => { 
            try {
                data.reduce(reduce_func).forEach(d=>edge.send([this._wrap_datum(d)]));
            } catch (e) {
                edge.send([new DatumWrapper(new NodeFrayError(e), "0?")]);
            } finally {
                edge.finish();
            }
        } );
        return reduced;
    }
    
    join(OtherThreadNode){
        let otherThreads = Array.prototype.slice.call(arguments);
        let inputThreads = [this].concat(otherThreads);
        
        let joinmap = new DatumJoinMap(inputThreads.length);
        
        let joined = this._outputNode();
        let edge = joined._connect(this);
        let fci = i => fray_data => fray_data.map(d=>{
            return Promise.resolve(d).then(datum=>{
                if(datum instanceof Array) return fci(i)(datum);
                return joinmap.join(datum,i);
            })
        });
        let eci = i => filament=>edge.send(filament.then(fci(i)));
        inputThreads.forEach((thread,i)=>{
            thread._filaments.forEach(eci(i));
            thread._each_callbacks.push(eci(i));
        });
        Promise.all(inputThreads.map(t=>t._state.complete)).then(()=>{
            joinmap.complete();
            edge.finish();
        })
        return joined;
    }
    
    _flatten_filaments(arr){
        return Promise.all(arr).then(res_arr=>{
            return Promise.all(res_arr.map(d=>{
                return Promise.resolve(d).then(d=>(d instanceof Array)?this._flatten_filaments(d):[d])
            })).then(peices=>peices.reduce((a, v)=>a.concat(v),[]))
        })
    }
    
    _wrap_datum(datum,key){
        if(this._datum_key_next==undefined) this._datum_key_next = 0;
        return Promise.resolve(datum).then(d=>{
            return new DatumWrapper(d,""+(this._datum_key_next++));
        })
    }
}

export class EmptyThreadNode extends ThreadNode {
    constructor(){
        super(arguments);
        var ownInput = this._connect(null);
        ownInput.send([this._wrap_datum(null)]);
        ownInput.finish();
    }
    
    data(arr){
        let created = this._outputNode();
        let edge = created._connect(this);
        Promise.resolve(arr).then(data=>{
            data.forEach(item=>edge.send([this._wrap_datum(item)]));
            edge.finish();
        });
        return created;
    }
    
}

// function randDelay(p){
//     return Promise.resolve(p).then(d=>(new Promise(r=>{
//         setTimeout(()=>r(d),Math.floor(Math.random() * Math.floor(5000)))
//     })));
// }
// 
// var mye = (new EmptyThreadNode()).data([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
//     .map(randDelay)
//     .keys(d=>`Key{${d}}`)
//     .each((d,key)=>console.log(d,"initial",key))
//     .all(d=>console.log("DONE::initial",d));
// 
// var j1 = mye.map(d=>d*2)
//     .map(randDelay)
//     .each((d,key)=>console.log(d,"j1",key))
//     .all(d=>console.log("DONE::j1",d));
// 
// var j2 = mye.map(d=>d*3)
//     .map(randDelay)
//     .each((d,key)=>console.log(d,"j2",key))
//     .all(d=>console.log("DONE::j2",d));
// 
// var j3 = mye.map(d=>d*5)
//     .map(randDelay)
//     .each((d,key)=>console.log(d,"j3",key))
//     .all(d=>console.log("DONE::j3",d));
// 
// var join = j1.join(j2,j3)
//     .each((d,key)=>console.log(d,"join",key))
//     .all(d=>console.log("DONE::join",d));
