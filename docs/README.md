# BrAPI.js [![GitHub release](https://img.shields.io/github/release/solgenomics/BrAPI.js.svg)](https://github.com/solgenomics/BrAPI.js/releases) [![GitHub Release Date](https://img.shields.io/github/release-date/solgenomics/BrAPI.js.svg)](https://github.com/solgenomics/BrAPI.js/releases)

BrAPI.js is a JavaScript client library for [BrAPI](https://brapi.org). The call style of this library is inspired by [D3.js](https://d3js.org/). It can be used in either a browser or a Node.js application. It uses the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) (or [node-fetch](https://www.npmjs.com/package/node-fetch) in Node.js) for making AJAX calls. BrAPI.js is dependent on ES6 classes.

### Important To-Dos

- Add option to limit the number of simultaneous requests. Currently there is no limit.

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

BrAPI.js has been designed to allow for many simultaneous and interdependent calls to BrAPI to be performed asynchronously. In order to do this, data are managed by a class of objects called **Context Nodes**. Nodes are organized into a [DAG](https://en.wikipedia.org/wiki/Directed_acyclic_graph "Directed Acyclic Graph") which represents dependancies. Each node represents a transformation on the data. Basic transformations include [fork](#fork), [join](#join), [map](#map), [reduce](#reduce), and [filter](#filter). BrAPI calls are special transformations. Each BrAPI call can be either a fork (calls returning array data) or a map (calls returning single objects). Data interacts through nodes via tasks. When a task completes, it triggers the creation of new task(s) in all child nodes. With the exception of [reduce](#reduce), the operations can be performed independently on each datum. This means one datum can be transformed across multiple nodes while another moves more slowly.

## Usage Reference

### Initialization and Configuration

<a name="root" href="#root">#</a> **BrAPI**(_address_ [, _auth_params_, _version_]) [<>](main.js "Source")  

Creates a root _Context Node_. This is the root of a BrAPI.js [DAG dataflow](#how-it-works). The _address_ should be a string with the base URL of a BrAPI instance that is being queried, i.e. "https://www.yambase.org/brapi/v1". If an _auth_params_ object is provided, an authentication call will be made with the provided keys in the call body. Changing the _version_ determines which deprecation/removal warnings are written the console, it does not restrict functionality.

###### Examples:

```js
var brapi_root = BrAPI("https://www.yambase.org/brapi/v1")
```

```js
var brapi_root = BrAPI("https://www.yambase.org/brapi/v1",null,"1.2")
```

```js
var brapi_root = BrAPI(
    "https://www.yambase.org/brapi/v1",
    {
        'username':'myusername',
        'password':'mysecretpw'
    }
)
```

```js
var brapi_root = BrAPI(
    "https://www.yambase.org/brapi/v1",
    {
        'username':'myusername',
        'password':'mysecretpw'
    },
    "1.1"
)
```

<a name="server" href="#server">#</a> _node_.**server**(_address_ [, _auth_params_, _version_]) [<>](src/BrAPINodes.js "Source")  

Creates and returns a child _Context Node_ which changes the BrAPI instance queried by all descendants.

###### Examples:

```js
BrAPI("https://www.yambase.org/brapi/v1")
    // Query accessions containing "MyAccession" from yambase.org
    .germplasm_search({germplasmName:"MyAccession"})
    // ** Switch to yamMarkerBase.net **
    .server("https://www.CoolerYamBase.net/brapi/v1")
    // Using results from the first query, search the second server
    // (one search for each result from the first)
    .germplasm_search(function(germ){
        return {germplasmName:germ.germplasmName}
    });
```

<a name="data" href="#data">#</a> _node_.**data**(_array_) [<>](src/BrAPINodes.js "Source")  

Creates and returns a child _Context Node_ which ignores any completed tasks from it's parent node and creates a new task in each child node for each datum in the _array_. This is the main way of adding input to the dataflow and is only available as a child of the [root](#root) node, or on a [server](#server) node that is the immediate child of a root node. 

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

<a name="brapi_method_call" href="#brapi_method_call">#</a> _node_.**`$BrAPI_Method`**(_params_ [, _behavior_]) [<>](src/brapi_methods.js "Source")  

A `$BrAPI_Method` is be one of the [available BrAPI methods](#available-brapi-methods). These methods create and return a child _Context Node_ which makes the relevant BrAPI calls. Calls are tracked as tasks and occur asynchronously. `metadata.asynchStatus` asynchronous BrAPI calls are also supported and a polling time of 15 seconds is used. <a name="params" href="#params"></a>Parameters (either URL parameters or body parameters) are specified for the call using the _params_ argument. The _params_ argument can either be an object, or a function. If it is a function, a separate BrAPI call will be made for each datum passed by the parent node. Otherwise, a single call (or series of calls for each page) will be made and the input data will be ignored. For each datum created, the full response from which it was extracted is available via `datum.__response`.

**There are two special parameters specific to BrAPI.js.** The first, **`pageRange`** (an array `[first_page, last_page]`), controls pagination and _must_ be used in place of the usual BrAPI `page` parameter. `pageRange` defaults to `[0,Infinity]`. The second, **`HTTPMethod`**, allows one to override the default HTTP method (e.g. "POST","GET") for a [BrAPI method](#available-brapi-methods). 

<a name="behavior" href="#behavior"></a>
For calls which return a response containing a `data` array, (i.e. _node_.germplasm_search(...) ), the _behavior_ argument determines how that data is handled. The default _behavior_ is `"fork"`.
- If _behavior_ ==`"fork"`, each object in each `page_response.results.data` array will be treated as an individual datum. 
- If _behavior_ ==`"map"`, the `page_response.results.data` array from each response will be concatenated into the initial response's data array and the  resulting `page_response.results` object will be considered a single datum. **For calls which do not return a `data` array, the `response.results` object is always treated as a single datum.**

<a name="brapi_call" href="#brapi_call">#</a> _node_.**brapi_call**(_behavior_, _method_, _queryFunc_, _multicall_) [<>](src/BrAPINodes.js "Source")  

Allows for custom BrAPI calls and should only rarely be used. This method creates and returns a child _Context Node_ which makes a specified BrAPI call not in the official standard or supported by the current version by the client. Responses parsed by thhis method must still be in the BrAPI response format (i.e. use a `response.results.data` array and `metadata.pagination` for paginated data.) 

The _behavior_ argument acts the same as [described above](#behavior). If the behavior of "map" is chosen, but no `response.results.data` array is present, errors may occur.

The _method_ argument indicates which HTTP method to use for a call. ("POST","GET",etc).

The _queryFunc_ should be a function that returns an object of the form `{'url':"/customCall", 'params':paramsObject}` where `obj.url` is the prefix to be appended to the base BrAPI url provided during [initialization](#initialization-and-configuration), and `obj.params` is a parameter object as [described above](#params). 

The _multicall_ argument determines wether the call will be run once for each input, or once for all inputs. 
- When _multicall_ is true, _queryFunc_ will be run once for each datum, with the arguments (_datum_,_key_) where _key_ is the datum's key as [described below](). 
- When _multicall_ is false, _queryFunc_ will be run once for all input data, with a single argument _data_ containing every datum passed through the parent node.

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

Creates and returns a child _Context Node_ which transforms each datum in a manner similar to [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map). The _callback_ function is called with two arguments (_datum_, _key_) for each datum, and may return any value which will be passed to child nodes as a single datum.

<a name="fork" href="#fork">#</a> _node_.**fork**(_node_ [, _node_, ...]) [<>](src/BrAPINodes.js "Source") 

Creates and returns a child _Context Node_ which transforms each datum in a manner similar to [_node_.map()](#map), however, the _callback_ function should return an array. Each item of each returned array will be passed to child nodes as a datum.

<a name="filter" href="#filter">#</a> _node_.**filter**(_callback_) [<>](src/BrAPINodes.js "Source") 

Creates and returns a child _Context Node_ which transforms each datum in a manner similar to [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter). The _callback_ function is called with two arguments (_datum_, _key_) for each datum, returning `true` will pass the datum to child nodes while returning `false` will remove it from the dataflow.

<a name="reduce" href="#reduce">#</a> _node_.**reduce**(_callback_ [, _initialValue_]) [<>](src/BrAPINodes.js "Source") 

Creates and returns a child _Context Node_ which transforms each datum in a manner similar to [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce). The _callback_ function is called with two arguments (_accumulator_, _datum_) and should return the modified _accumulator_. The result from the reduction will be passed to child nodes as a single datum.

<a name="join" href="#join">#</a> _node_.**join**(_node_ [, _node_, ...]) [<>](src/BrAPINodes.js "Source") 

Creates and returns a child _Context Node_ which takes the output datum from multiple _Context Nodes_ and joins them into arrays on their [keys](#keys) which are then passed to child nodes. Datum are assigned keys in two different manners. First, when a key-modifying node (a [fork](#fork) node, a [reduce](reduce) node, or a BrAPI node with the [_behavior_ of "fork"](#behavior) or called with a single parameter object) transforms data, it will assign each datum a new key in order to maintain uniqueness. Second, keys can be manually assigned using [_node_.keys(...)](#keys) to create a keys node. _node_.join(...) will only join nodes which share their most recent key-modifying ancestor, or which have all had their keys manually assigned.

<a name="keys" href="#keys">#</a> _node_.**keys**(_callback_) [<>](src/BrAPINodes.js "Source") 

Creates and returns a child _Context Node_ which transforms each datum in a manner similar to [_node_.map()](#map). However, instead of modifying the data, it will modify the key for each datum. The _callback_ function is called with two arguments (_datum_, _currentKey_) and should return a new key to replace  _currentKey_. Keys returned by the _callback_ function may be any value. If the _callback_ function returns any type other than a string, it will converted to a string before being used as a key. A single key string should not be assigned to two separate datum, doing so _will_ result in errors later in the dataflow.

### Accessing Data Output

<a name="each" href="#each">#</a> _node_.**each**(_callback_) [<>](src/BrAPINodes.js "Source") 

This method registers a callback function which is called each time the node completes the transformation of a datum. The _callback_ function is called with the arguments (_datum_, _key_).

<a name="all" href="#all">#</a> _node_.**all**(_callback_) [<>](src/BrAPINodes.js "Source") 

This method registers a callback function which is called once a node has loaded all data. The _callback_ function is called with a single argument _data_, which is an array of all data sorted by their [keys](#keys) lexicographically.


### Available BrAPI Methods

| BrAPI Call                                                                                                                                                               | BrAPI.js Method                          | Default HTTP Method |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- | ------------------- |
| [`/allelematrix-search`](https://github.com/plantbreeding/API/blob/master/Specification/MarkerProfiles/MarkerProfileAlleleMatrix.md)                                     | _node_.allelematrix_search(...)          | `POST`              |
| [`/attributes`](https://github.com/plantbreeding/API/blob/master/Specification/GermplasmAttributes/ListAttributesByAttributeCategoryDbId.md)                             | _node_.attributes(...)                   | `GET`               |
| [`/attributes/categories`](https://github.com/plantbreeding/API/blob/master/Specification/GermplasmAttributes/ListAttributeCategories.md)                                | _node_.attributes_categories(...)        | `GET`               |
| [`/calls`](https://github.com/plantbreeding/API/blob/master/Specification/Calls/Calls.md)                                                                                | _node_.calls(...)                        | `GET`               |
| [`/crops`](https://github.com/plantbreeding/API/blob/master/Specification/Crops/ListCrops.md)                                                                            | _node_.crops(...)                        | `GET`               |
| [`/germplasm-search`](https://github.com/plantbreeding/API/blob/master/Specification/Germplasm/GermplasmSearchPOST.md)                                                   | _node_.germplasm_search(...)             | `POST`              |
| [`/germplasm/{germplasmDbId}`](https://github.com/plantbreeding/API/blob/master/Specification/Germplasm/GermplasmDetailsByGermplasmDbId.md)                              | _node_.germplasm(...)                    | `GET`               |
| [`/germplasm/{germplasmDbId}/attributes`](https://github.com/plantbreeding/API/blob/master/Specification/GermplasmAttributes/GermplasmAttributeValuesByGermplasmDbId.md) | _node_.germplasm_attributes(...)         | `GET`               |
| [`/germplasm/{germplasmDbId}/markerprofiles`](https://github.com/plantbreeding/API/blob/master/Specification/Germplasm/GermplasmMarkerprofiles.md)                       | _node_.germplasm_markerprofiles(...)     | `GET`               |
| [`/germplasm/{germplasmDbId}/pedigree`](https://github.com/plantbreeding/API/blob/master/Specification/Germplasm/GermplasmPedigree.md)                                   | _node_.germplasm_pedigree(...)           | `GET`               |
| [`/germplasm/{germplasmDbId}/progeny`](https://github.com/plantbreeding/API/issues/151#issuecomment-353117355)                                              | _node_.germplasm_progeny(...)            | `GET`               |
| [`/locations`](https://github.com/plantbreeding/API/blob/master/Specification/Locations/ListLocations.md)                                                                | _node_.locations_list(...)               | `GET`               |
| [`/locations/{locationsDbId}`](https://github.com/plantbreeding/API/blob/master/Specification/Locations/LocationDetails.md)                                              | _node_.locations(...)                    | `GET`               |
| [`/maps`](https://github.com/plantbreeding/API/blob/master/Specification/GenomeMaps/ListOfGenomeMaps.md)                                                                 | _node_.maps_list(...)                    | `GET`               |
| [`/maps/{mapDbId}`](https://github.com/plantbreeding/API/blob/master/Specification/GenomeMaps/GenomeMapDetails.md)                                                       | _node_.maps(...)                         | `GET`               |
| [`/maps/{mapDbId}/positions`](https://github.com/plantbreeding/API/blob/master/Specification/GenomeMaps/GenomeMapData.md)                                                | _node_.maps_positions_list(...)          | `GET`               |
| [`/maps/{mapDbId}/positions/{linkageGroupId}`](https://github.com/plantbreeding/API/blob/master/Specification/GenomeMaps/GenomeMapDataByRangeOnLinkageGroup.md)          | _node_.maps_positions(...)               | `GET`               |
| [`/markerprofiles`](https://github.com/plantbreeding/API/blob/master/Specification/MarkerProfiles/MarkerProfileSearch.md)                                                | _node_.markerprofiles_list(...)          | `GET`               |
| [`/markerprofiles/{markerprofileDbId}`](https://github.com/plantbreeding/API/blob/master/Specification/MarkerProfiles/MarkerProfileData.md)                              | _node_.markerprofiles(...)               | `GET`               |
| [`/markers-search`](https://github.com/plantbreeding/API/blob/master/Specification/Markers/MarkerSearch_POST.md)                                                         | _node_.markers_search(...)               | `POST`              |
| [`/markers/{markerDbId}`](https://github.com/plantbreeding/API/blob/master/Specification/Markers/MarkerDetailsByMarkerDbId.md)                                           | _node_.markers(...)                      | `GET`               |
| [`/observationLevels`](https://github.com/plantbreeding/API/blob/master/Specification/Studies/ObservationLevels_GET.md)                                                  | _node_.observationLevels(...)            | `GET`               |
| [`/ontologies`](https://github.com/plantbreeding/API/blob/master/Specification/ObservationVariables/VariableOntologyList.md)                                             | _node_.ontologies(...)                   | `GET`               |
| [`/phenotypes-search`](https://github.com/plantbreeding/API/blob/master/Specification/Phenotypes/PhenotypeSearch.md)                                                     | _node_.phenotypes_search(...)            | `POST`              |
| [`/programs`](https://github.com/plantbreeding/API/blob/master/Specification/Programs/ListPrograms.md)                                                                   | _node_.programs(...)                     | `GET`               |
| [`/programs-search`](https://github.com/plantbreeding/API/blob/master/Specification/Programs/ProgramSearch.md)                                                           | _node_.programs_search(...)              | `POST`              |
| [`/samples-search`](https://github.com/plantbreeding/API/blob/master/Specification/Samples/SampleSearch_POST.md)                                                         | _node_.samples_search(...)               | `POST`              |
| [`/samples/{samplesDbId}`](https://github.com/plantbreeding/API/blob/master/Specification/Samples/Samples_GET.md)                                                        | _node_.samples(...)                      | `GET`               |
| [`/seasons`](https://github.com/plantbreeding/API/blob/master/Specification/Studies/Seasons_GET.md)                                                                      | _node_.seasons(...)                      | `GET`               |
| [`/studies-search`](https://github.com/plantbreeding/API/blob/master/Specification/Studies/StudiesSearch_POST.md)                                                        | _node_.studies_search(...)               | `POST`              |
| [`/studies/{studiesDbId}`](https://github.com/plantbreeding/API/blob/master/Specification/Studies/Studies_GET.md)                                                        | _node_.studies(...)                      | `GET`               |
| [`/studies/{studiesDbId}/germplasm`](https://github.com/plantbreeding/API/blob/master/Specification/Studies/Studies_Germplasm_GET.md)                                    | _node_.studies_germplasm(...)            | `GET`               |
| [`/studies/{studiesDbId}/layout`](https://github.com/plantbreeding/API/blob/master/Specification/Studies/Studies_Layout_GET.md)                                          | _node_.studies_layout(...)               | `GET`               |
| [`/studies/{studiesDbId}/observations`](https://github.com/plantbreeding/API/blob/master/Specification/Studies/Studies_Observations_GET.md)                              | _node_.studies_observations(...)         | `GET`               |
| [`/studies/{studiesDbId}/observationunits`](https://github.com/plantbreeding/API/blob/master/Specification/Studies/Studies_ObservationUnits_GET.md)                      | _node_.studies_observationunits(...)     | `GET`               |
| [`/studies/{studiesDbId}/observationvariables`](https://github.com/plantbreeding/API/blob/master/Specification/Studies/Studies_ObservationVariables_GET.md)              | _node_.studies_observationvariables(...) | `GET`               |
| [`/studies/{studiesDbId}/table`](https://github.com/plantbreeding/API/blob/master/Specification/Studies/Studies_Table_GET.md)                                            | _node_.studies_table(...)                | `GET`               |
| [`/studytypes`](https://github.com/plantbreeding/API/blob/master/Specification/Studies/StudyTypes_GET.md)                                                                | _node_.studytypes(...)                   | `GET`               |
| [`/traits `](https://github.com/plantbreeding/API/blob/master/Specification/Traits/ListAllTraits.md)                                                                     | _node_.traits_list(...)                  | `GET`               |
| [`/traits/{traitDbId}`](https://github.com/plantbreeding/API/blob/master/Specification/Traits/TraitDetails.md)                                                           | _node_.traits(...)                       | `GET`               |
| [`/trials`](https://github.com/plantbreeding/API/blob/master/Specification/Trials/ListTrialSummaries.md)                                                                 | _node_.trials_list(...)                  | `GET`               |
| [`/trials/{trialDbId}`](https://github.com/plantbreeding/API/blob/master/Specification/Trials/GetTrialById.md)                                                           | _node_.trials(...)                       | `GET`               |
| [`/variables-search`](https://github.com/plantbreeding/API/blob/master/Specification/ObservationVariables/VariableSearch.md)                                             | _node_.variables_search(...)             | `POST`              |
| [`/variables`](https://github.com/plantbreeding/API/blob/master/Specification/ObservationVariables/VariableList.md)                                                      | _node_.variables_list(...)               | `GET`               |
| [`/variables/{variableDbId}`](https://github.com/plantbreeding/API/blob/master/Specification/ObservationVariables/VariableDetails.md)                                    | _node_.variables(...)                    | `GET`               |
| [`/variables/datatypes`](https://github.com/plantbreeding/API/blob/master/Specification/ObservationVariables/VariableDataTypeList.md)                                    | _node_.variables_datatypes(...)          | `GET`               |
