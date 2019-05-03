# BrAPI.js [![](https://img.shields.io/github/release/solgenomics/BrAPI.js.svg)](https://github.com/solgenomics/BrAPI.js/releases) [![](https://img.shields.io/github/release-date/solgenomics/BrAPI.js.svg)](https://github.com/solgenomics/BrAPI.js/releases)

BrAPI.js is a JavaScript client library for [BrAPI](https://brapi.org). The call style of this library is inspired by [D3.js](https://d3js.org/). It can be used in either a browser or a Node.js application. It uses the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) (or [node-fetch](https://www.npmjs.com/package/node-fetch) in Node.js) for making AJAX calls. BrAPI.js is dependent on ES6 classes.

BrAPI.js supports BrAPI versions `v1.0`-`v1.3`. Currently, it expects a server to use a single version.

### Contents

- [Installation](#installation)
- [How it Works](#how-it-works)
- [Usage Reference](#usage-reference)
    - [Initialization and Configuration](#initialization-and-configuration)
    - [BrAPI Call Nodes](#brapi-call-nodes)
    - [Non-BrAPI Nodes](#non-brapi-nodes)
    - [Accessing Data Output](#accessing-data-output)
    - [Available BrAPI Methods](#available-brapi-methods)

## Installation

```bash
# Be sure your version of NPM supports 'prepare' scripts (>=npm@4.0.0)
# Recommended:
npm install @solgenomics/brapijs 
# Otherwise:
npm install git+https://github.com/solgenomics/BrAPI.js.git
# or:
git clone https://github.com/solgenomics/BrAPI.js.git
cd BrAPI.js
npm install . 
```

#### Include/Require

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

## How it Works

BrAPI.js has been designed to allow for many simultaneous and interdependent calls to BrAPI to be performed asynchronously. In order to do this, data are managed by a class of objects called **BrAPINodes**. Nodes are organized into a [DAG](https://en.wikipedia.org/wiki/Directed_acyclic_graph "Directed Acyclic Graph") which represents dependancies. Each node represents a transformation on the data. Basic transformations include [fork](#fork), [join](#join), [map](#map), [reduce](#reduce), and [filter](#filter). BrAPI calls are special transformations. Each BrAPI call can be either a fork (calls returning array data) or a map (calls returning single objects). Data interacts through nodes via tasks. When a task completes, it triggers the creation of new task(s) in all child nodes. With the exception of [reduce](#reduce), the operations can be performed independently on each datum. This means one datum can be transformed across multiple nodes while another moves more slowly.

## Usage Reference

### Initialization and Configuration

<a name="root" href="#root">#</a> **BrAPI**(_address_, [_version_, _auth_token_, _call_limit_]) [<>](main.js "Source")  

Creates a root _BrAPINode_. This is the root of a BrAPI.js [DAG dataflow](#how-it-works). The _address_ should be a string with the base URL of a BrAPI instance that is being queried, i.e. "https://www.yambase.org/brapi/v1". If an _auth_token_ is provided, it will be added as a Bearer header when sending requests over HTTPS. Changing the _version_ determines which deprecation/removal warnings are written the console, it does not restrict functionality.
The _call_limit_ parameter specifies how many simultaneous requests may be run by this node and its descendants against the specified server.

###### Examples:

```js
var brapi_root = BrAPI("https://www.yambase.org/brapi/v1")
```

```js
var brapi_root = BrAPI("https://www.yambase.org/brapi/v1", "v1.2", "myToken")
```

```js
var brapi_root = BrAPI(
    "https://www.yambase.org/brapi/v1",
    null, //Don't specify version
    "myToken",
    18 //Allow 18 simultaneous requests
)
```

If you have multiple different versions of BrAPI for different calls on your server, you may have to create two separate BrAPI handlers. For example, if your search calls are `v1.2` and everything else is `v1.3`, you would have to use one of the following options:
```js
var brapi_root1 = BrAPI("https://www.myserver.org/brapi/v1","v1.2") // for your search calls
var brapi_root2 = BrAPI("https://www.myserver.org/brapi/v1","v1.3") // for your other calls.
```
```js
var brapi_root1 = BrAPI("https://www.myserver.org/brapi/v1","v1.2") // for your search calls
    .germplasm_search(...)
    .server("https://www.myserver.org/brapi/v1","v1.3") // switch for your other calls.
    .germplasm_progeny(...)
    .each(...);
```

<a name="server" href="#server">#</a> _node_.**server**(_address_, [_version_, _auth_token_, _call_limit_]) [<>](src/BrAPINodes.js "Source")  

Creates and returns a child _BrAPINode_ which changes the BrAPI server instance queried by all descendants.

###### Examples:

```js
BrAPI("https://www.yambase.org/brapi/v1")
    // Query accessions containing "MyAccession" from yambase.org
    .germplasm_search({germplasmName:"MyAccession"})
    // ** Switch to yamMarkerBase.net **
    .server("https://www.yamMarkerBase.net/brapi/v1")
    // Using results from the first query, search the second server
    // (one search for each result from the first)
    .germplasm_search(function(germ){
        return {germplasmName:germ.germplasmName}
    });
```

<a name="data" href="#data">#</a> _node_.**data**(_array_) [<>](src/BrAPINodes.js "Source")  

Creates and returns a child _BrAPINode_ which ignores any completed tasks from it's parent node and creates a new task in each child node for each datum in the _array_. This is the main way of adding input to the dataflow and is only available as a child of the [root](#root) node, or on a [server](#server) node that is the immediate child of a root node. 

###### Examples:
```js
BrAPI("https://www.yambase.org/brapi/v1")
    // Set ["344","567","223"] as data
    .data(["344","567","223"])
    // perform a germplasm call with each datum as germplasmDbId
    .germplasm(function(d){
        return {germplasmDbId:d};
    })
    .all(function(germplasm_objects){
        //prints a list of germplasm objects
        console.log(germplasm_objects)
    });
```

### BrAPI Call Nodes

<a name="brapi_method_call" href="#brapi_method_call">#</a> _node_.**`{{BrAPI_Method}}`**(_params_ [, _behavior_]) [<>](src/brapi_methods.js "Source")  

A `{{BrAPI_Method}}` is be one of the [available BrAPI methods](#available-brapi-methods). These methods create and return a child _BrAPINode_ which makes the relevant BrAPI calls. Calls are tracked as tasks and occur asynchronously. `metadata.asynchStatus` asynchronous BrAPI calls are also supported and a polling time of 15 seconds is used. <a name="params" href="#params"></a>Parameters (either URL parameters or body parameters) are specified for the call using the _params_ argument. The _params_ argument can either be an object, or a function. If it is a function, a separate BrAPI call will be made for each datum passed by the parent node. Otherwise, a single call (or series of calls for each page) will be made and the input data will be ignored. For each datum created, the full response from which it was extracted is available via `datum.__response`.

**There are two special parameters specific to BrAPI.js.** The first, **`pageRange`** (an array `[first_page, last_page]`), controls pagination and _must_ be used in place of the usual BrAPI `page` parameter. `pageRange` defaults to `[0,Infinity]`. The second, **`HTTPMethod`**, allows one to override the default HTTP method (e.g. "POST","GET") for a [BrAPI method](#available-brapi-methods). 

<a name="behavior" href="#behavior"></a>
For calls which return a response containing a `data` array, (i.e. _node_.germplasm_search(...) ), the _behavior_ argument determines how that data is handled. The default _behavior_ is `"fork"`.
- If _behavior_ ==`"fork"`, each object in each `page_response.results.data` array will be treated as an individual datum. 
- If _behavior_ ==`"map"`, the `page_response.results.data` array from each response will be concatenated into the initial response's data array and the  resulting `page_response.results` object will be considered a single datum. **For calls which do not return a `data` array, the `response.results` object is always treated as a single datum.**

<a href="#brapi_method_poll">#</a> _node_.**poll**(_callback_) [<>](src/BrAPINodes.js "Source")

Wether a call is a BrAPI 'asynch' call will be determined automatically from the response. By default, polling occurs every 15 seconds. To vary the polling times, or check the status, one can use this method which is available only on <a href="#brapi_method_call">brapi call nodes.</a> The _callback_ function receives the full json response as the only argument. If it returns a non-null value greater than zero, the next poll with occur after that many milliseconds. If multiple poll methods are chained, they will execute in order and the last non-null return value greater than zero will be used as the polling time.
```js
//to poll the allelematrix_search call every 10 seconds
BrAPI("https://www.yambase.org/brapi/v1")
    .data(["1038","4542","45534"])
    .allelematrices_search(function(d){
        return {markerprofileDbId:d};
    }).poll(function(response){
        console.log(response.metadata);
        return 10000;
    });
```

### Non-BrAPI Nodes

<a name="map" href="#map">#</a> _node_.**map**(_callback_) [<>](src/BrAPINodes.js "Source") 

Creates and returns a child _BrAPINode_ which transforms each datum in a manner similar to [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map). The _callback_ function is called with two arguments (_datum_, _key_) for each datum, and may return any value which will be passed to child nodes as a single datum.

<a name="fork" href="#fork">#</a> _node_.**fork**(_node_ [, _node_, ...]) [<>](src/BrAPINodes.js "Source") 

Creates and returns a child _BrAPINode_ which transforms each datum in a manner similar to [_node_.map()](#map), however, the _callback_ function should return an array. Each item of each returned array will be passed to child nodes as a datum.

<a name="filter" href="#filter">#</a> _node_.**filter**(_callback_) [<>](src/BrAPINodes.js "Source") 

Creates and returns a child _BrAPINode_ which transforms each datum in a manner similar to [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter). The _callback_ function is called with two arguments (_datum_, _key_) for each datum, returning `true` will pass the datum to child nodes while returning `false` will remove it from the dataflow.

<a name="reduce" href="#reduce">#</a> _node_.**reduce**(_callback_ [, _initialValue_]) [<>](src/BrAPINodes.js "Source") 

Creates and returns a child _BrAPINode_ which transforms each datum in a manner similar to [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce). The _callback_ function is called with two arguments (_accumulator_, _datum_) and should return the modified _accumulator_. The result from the reduction will be passed to child nodes as a single datum.

<a name="join" href="#join">#</a> _node_.**join**(_node_ [, _node_, ...]) [<>](src/BrAPINodes.js "Source") 

Creates and returns a child _BrAPINode_ which takes the output datum from multiple _BrAPINodes_ and joins them into arrays on their [keys](#keys) which are then passed to child nodes. Datum are assigned keys in two different manners. First, when a key-modifying node (a [fork](#fork) node, a [reduce](reduce) node, or a BrAPI node with the [_behavior_ of "fork"](#behavior) or called with a single parameter object) transforms data, it will assign each datum a new key in order to maintain uniqueness. Second, keys can be manually assigned using [_node_.keys(...)](#keys) to create a keys node. _node_.join(...) will only join nodes which share their most recent key-modifying ancestor, or which have all had their keys manually assigned.

<a name="keys" href="#keys">#</a> _node_.**keys**(_callback_) [<>](src/BrAPINodes.js "Source") 

Creates and returns a child _BrAPINode_ which transforms each datum in a manner similar to [_node_.map()](#map). However, instead of modifying the data, it will modify the key for each datum. The _callback_ function is called with two arguments (_datum_, _currentKey_) and should return a new key to replace  _currentKey_. Keys returned by the _callback_ function may be any value. If the _callback_ function returns any type other than a string, it will converted to a string before being used as a key. A single key string should not be assigned to two separate datum, doing so _will_ result in errors later in the dataflow.

### Accessing Data Output

<a name="each" href="#each">#</a> _node_.**each**(_callback_) [<>](src/BrAPINodes.js "Source") 

This method registers a callback function which is called each time the node completes the transformation of a datum. The _callback_ function is called with the arguments (_datum_, _key_).

<a name="all" href="#all">#</a> _node_.**all**(_callback_) [<>](src/BrAPINodes.js "Source") 

This method registers a callback function which is called once a node has loaded all data. The _callback_ function is called with a single argument _data_, which is an array of all data sorted by their [keys](#keys) lexicographically.


### Available BrAPI Methods

| BrAPI.js Method | BrAPI Call | Default HTTPMethod |
| --------------- | ---------- | ------------------ |
| _node_.allelematrices_search(_params_,...) | `/allelematrices-search`(>=v1.2) or `/allelematrix-search`(<v1.2) | `POST` |
| _node_.allelematrices(_params_,...) | `/allelematrices` | `GET` |
| _node_.attributes_categories(_params_,...) | `/attributes_categories` | `GET` |
| _node_.attributes(_params_,...) | `/attributes` | `GET` |
| _node_.breedingmethods_detail(_params_,...) | `/breedingmethods/{breedingMethodDbId}` | `GET` |
| _node_.breedingmethods(_params_,...) | `/breedingmethods` | `GET` |
| _node_.calls(_params_,...) | `/calls` | `GET` |
| _node_.commoncropnames(_params_,...) | `/commoncropnames`(>=v1.2) or `/crops`(<v1.2) | `GET` |
| _node_.germplasm_attributes(_params_,...) | `/germplasm/{germplasmDbId}/attributes` | `GET` |
| _node_.germplasm_detail(_params_,...) | `/germplasm/{germplasmDbId}` | `GET` |
| _node_.germplasm_markerprofiles(_params_,...) | `/germplasm/{germplasmDbId}/markerprofiles` | `GET` |
| _node_.germplasm_mcpd(_params_,...) | `/germplasm/{germplasmDbId}/mcpd` | `GET` |
| _node_.germplasm_pedigree(_params_,...) | `/germplasm/{germplasmDbId}/pedigree` | `GET` |
| _node_.germplasm_progeny(_params_,...) | `/germplasm/{germplasmDbId}/progeny` | `GET` |
| _node_.germplasm_search(_params_,...) | `/germplasm-search` | `POST` |
| _node_.germplasm(_params_,...) | `/germplasm` | `GET` |
| _node_.images_detail(_params_,...) | `/images/{imageDbId}` | `GET` |
| _node_.images_imagecontent(_params_,...) | `/images/{imageDbId}/imagecontent` | `PUT` |
| _node_.images(_params_,...) | `/images` | `GET` |
| _node_.lists_detail(_params_,...) | `/lists/{listDbId}` | `GET` |
| _node_.lists_items(_params_,...) | `/lists/{listDbId}/items` | `PUT` |
| _node_.lists(_params_,...) | `/lists` | `GET` |
| _node_.locations_detail(_params_,...) | `/locations/{locationDbId}` | `GET` |
| _node_.locations(_params_,...) | `/locations` | `GET` |
| _node_.maps_detail(_params_,...) | `/maps/{mapDbId}` | `GET` |
| _node_.maps_linkagegroups_detail(_params_,...) | `/maps/{mapsDbId}/positions/{linkageGroupId}` | `GET` |
| _node_.maps_positions(_params_,...) | `/maps/{mapsDbId}/positions` | `GET` |
| _node_.maps(_params_,...) | `/maps` | `GET` |
| _node_.markerprofiles_detail(_params_,...) | `/markerprofiles/{markerprofileDbId}` | `GET` |
| _node_.markerprofiles_search(_params_,...) | `/markerprofiles-search` | `POST` |
| _node_.markerprofiles(_params_,...) | `/markerprofiles` | `GET` |
| _node_.markers_detail(_params_,...) | `/markers/{markerDbId}` | `GET` |
| _node_.markers_search(_params_,...) | `/markers-search` | `POST` |
| _node_.markers(_params_,...) | `/markers` | `GET` |
| _node_.methods_detail(_params_,...) | `/methods/{methodDbId}` | `GET` |
| _node_.methods(_params_,...) | `/methods` | `GET` |
| _node_.observationlevels(_params_,...) | `/observationlevels`(>=v1.2) or `/observationLevels`(<v1.2) | `GET` |
| _node_.observationunits(_params_,...) | `/observationunits` | `GET` |
| _node_.ontologies(_params_,...) | `/ontologies` | `GET` |
| _node_.people_detail(_params_,...) | `/people/{personDbId}` | `GET` |
| _node_.people(_params_,...) | `/people` | `GET` |
| _node_.phenotypes_search(_params_,...) | `/phenotypes-search/csv` | `POST` |
| _node_.phenotypes_search(_params_,...) | `/phenotypes-search/table` | `POST` |
| _node_.phenotypes_search(_params_,...) | `/phenotypes-search/tsv` | `POST` |
| _node_.phenotypes_search(_params_,...) | `/phenotypes-search` | `POST` |
| _node_.phenotypes(_params_,...) | `/phenotypes` | `POST` |
| _node_.programs_search(_params_,...) | `/programs-search` | `POST` |
| _node_.programs(_params_,...) | `/programs` | `GET` |
| _node_.samples_detail(_params_,...) | `/samples/{sampleId}` | `GET` |
| _node_.samples_search(_params_,...) | `/samples-search` | `POST` |
| _node_.samples(_params_,...) | `/samples` | `GET` |
| _node_.scales_detail(_params_,...) | `/scales/{scaleDbId}` | `GET` |
| _node_.scales(_params_,...) | `/scales` | `GET` |
| _node_.search_germplasm(_params_,...) | `/germplasm-search`, `/search/germplasm` | `POST-->GET` |
| _node_.search_images(_params_,...) | `/search/images` | `POST-->GET` |
| _node_.search_markers(_params_,...) | `/markers-search`, `/search/markers` | `POST-->GET` |
| _node_.search_observationtables(_params_,...) | `/search/observationtables` | `POST-->GET` |
| _node_.search_observationunits(_params_,...) | `/search/observationunits` | `POST-->GET` |
| _node_.search_programs(_params_,...) | `/programs-search`, `/search/programs` | `POST-->GET` |
| _node_.search_samples(_params_,...) | `/samples-search`, `/search/samples` | `POST-->GET` |
| _node_.search_studies(_params_,...) | `/studies-search`, `/search/studies` | `POST-->GET` |
| _node_.search_variables(_params_,...) | `/variables-search`, `/search/variables` | `POST-->GET` |
| _node_.search(_entity_, _params_,...) | `/search/{entity-->search/{entity}/{searchResultDbId}` | `POST-->GET` |
| _node_.search_POST(_entity_, _params_,...)| `/search/{entity}` | `POST` |
| _node_.search_GET(_entity_, _params_,...)| `/search/{entity}/{searchResultDbId}` | `GET` |
| _node_.seasons(_params_,...) | `/seasons` | `GET` |
| _node_.studies_detail(_params_,...) | `/studies/{studyDbId}` | `GET` |
| _node_.studies_germplasm(_params_,...) | `/studies/{studyDbId}/germplasm` | `GET` |
| _node_.studies_layouts(_params_,...) | `/studies/{studyDbId}/layouts`, `/studies/{studyDbId}/layout` | `GET` |
| _node_.studies_observations_modify(_params_,...) | `/studies/{studyDbId}/observations/zip` | `POST` |
| _node_.studies_observations_modify(_params_,...) | `PUT /studies/{studyDbId}/observations`(>=v1.1) or `/studies/{studyDbId}/observations`(<v1.1) | `POST` |
| _node_.studies_observations(_params_,...) | `/studies/{studyDbId}/observations` | `GET` |
| _node_.studies_observationvariables(_params_,...) | `/studies/{studyDbId}/observationvariables` | `GET` |
| _node_.studies_search(_params_,...) | `/studies-search` | `POST` |
| _node_.studies_table_add(_params_,...) | `/studies/{studyDbId}/table` | `POST` |
| _node_.studies_table(_params_,...) | `/studies/{studyDbId}/table` | `GET` |
| _node_.studies(_params_,...) | `/studies` | `GET` |
| _node_.studytypes(_params_,...) | `/studytypes`(>=v1.1) or `/studyTypes`(<v1.1) | `GET` |
| _node_.traits_detail(_params_,...) | `/traits/{traitDbId}` | `GET` |
| _node_.traits(_params_,...) | `/traits` | `GET` |
| _node_.trials_detail(_params_,...) | `/trials/{trialDbId}` | `GET` |
| _node_.trials(_params_,...) | `/trials` | `GET` |
| _node_.variables_datats(_params_,...) | `/variables/datatypes` | `GET` |
| _node_.variables_detail(_params_,...) | `/variables/{observationVariableDbId}` | `GET` |
| _node_.variables_search(_params_,...) | `/variables-search` | `POST` |
| _node_.variables(_params_,...) | `/variables` | `GET` |
| _node_.vendor_orders_plates(_params_,...) | `/vendor/orders/{orderId}/plates` | `GET` |
| _node_.vendor_orders_results(_params_,...) | `/vendor/orders/{orderId}/results` | `GET` |
| _node_.vendor_orders_status(_params_,...) | `/vendor/orders/{orderId}/status` | `GET` |
| _node_.vendor_orders(_params_,...) | `/vendor/orders` | `GET` |
| _node_.vendor_plates_detail(_params_,...) | `/vendor/plates/{submissionId}` | `GET` |
| _node_.vendor_plates_search(_params_,...) | `/vendor/plates-search`(>=v1.2) or `/vendor/plate-search`(<v1.2) | `POST` |
| _node_.vendor_plates(_params_,...) | `/vendor/plates` | `POST` |
| _node_.vendor_specifications(_params_,...) | `/vendor/specifications` | `GET` |
