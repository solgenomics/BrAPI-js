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
