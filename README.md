# BrAPI.js

BrAPI.js is a JavaScript client library for [BrAPI](https://brapi.org). It can be used either in the browser or within Node.js. It uses the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) (or [node-fetch]() in Node.js) for AJAX calls. BrAPI.js also uses ES6 classes.

## Build:
```bash
git clone https://github.com/solgenomics/BrAPI.js.git
cd BrAPI.js
npm install .
```

## Include/Require:
```html
<!--Browser-->
<script src="build/BrAPI.js" charset="utf-8"></script>
```
```js
// ES6 import
import BrAPI from './build/BrAPI.js';
```
```js
// Node.js
const BrAPI = require('BrAPI.js');
```

## How it Works / Terminology
BrAPI.js tames REST callback-hell by managing asynchronosity behind context managers (from here on, nodes). Nodes keep track of sets of BrAPI objects (data) and are arranged in a DAG in which edges represent two differnt types of callback hooks, "async" (executed once each datum) and "final" (executed once all calls in the current context node have completed and across the all data from that node).

## Usage
<a name="BrAPI" href="#BrAPI">#</a> **BrAPI**(*address* [, *auth_params*]) [<>](main.js "Source")  
Creates a root *brapi* (context node) object. This is the root of the BrAPI.js dataflow. The *address* should be a string with the base URL of the BrAPI instance that is being queried, i.e. "https://www.yambase.org/brapi/v1". If an *auth_params* object is provided, an authentication call will be made with the provided keys in the call body.  
###### Ex:
```js
var brapi = BrAPI(
    "https://www.yambase.org/brapi/v1",
    {
        'username':'myusername',
        'password':'mysecretpw'
    }
)
```

<a name="BrAPI" href="#BrAPI">#</a> *brapi*.**{brapi_call}**(*params*) [<>](main.js "Source")

## Examples
```js
var germ = BrAPI(
    "http://127.0.0.1:3000/brapi/v1",
    {
        'username':'myusername',
        'password':'mysecretpw'
    }
).germplasm_search({germplasmName:"40"});
var markerprofiles = germ.germplasm_markerprofiles(function(g){
    return {germplasmDbId:g.germplasmDbId};
});

var pedigree = germ.germplasm_pedigree(function(g){
    return {germplasmDbId:g.germplasmDbId};
});

var merge = pedigree.merge(markerprofiles)
    .each(function(pair,index){
        console.log("paired",index,{pdgree:pair[0],mkrpfl:pair[1]})
    });
```
