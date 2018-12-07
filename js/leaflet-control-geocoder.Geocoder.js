!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).leafletControlGeocoder=e()}}(function(){return function i(r,a,l){function c(o,e){if(!a[o]){if(!r[o]){var t="function"==typeof require&&require;if(!e&&t)return t(o,!0);if(d)return d(o,!0);var n=new Error("Cannot find module '"+o+"'");throw n.code="MODULE_NOT_FOUND",n}var s=a[o]={exports:{}};r[o][0].call(s.exports,function(e){var t=r[o][1][e];return c(t||e)},s,s.exports,i,r,a,l)}return a[o].exports}for(var d="function"==typeof require&&require,e=0;e<l.length;e++)c(l[e]);return c}({1:[function(o,n,e){(function(e){var r="undefined"!=typeof window?window.L:void 0!==e?e.L:null,t=o("./geocoders/nominatim").class;n.exports={class:r.Control.extend({options:{showResultIcons:!1,collapsed:!0,expand:"touch",position:"topright",placeholder:"Search...",errorMessage:"Nothing found.",suggestMinLength:3,suggestTimeout:250,defaultMarkGeocode:!0},includes:r.Evented.prototype||r.Mixin.Events,initialize:function(e){r.Util.setOptions(this,e),this.options.geocoder||(this.options.geocoder=new t),this._requestCount=0},onAdd:function(e){var t,o="leaflet-control-geocoder",n=r.DomUtil.create("div",o+" leaflet-bar"),s=r.DomUtil.create("button",o+"-icon",n),i=this._form=r.DomUtil.create("div",o+"-form",n);return this._map=e,this._container=n,s.innerHTML="&nbsp;",s.type="button",(t=this._input=r.DomUtil.create("input","",i)).type="text",t.placeholder=this.options.placeholder,this._errorElement=r.DomUtil.create("div",o+"-form-no-error",n),this._errorElement.innerHTML=this.options.errorMessage,this._alts=r.DomUtil.create("ul",o+"-alternatives leaflet-control-geocoder-alternatives-minimized",n),r.DomEvent.disableClickPropagation(this._alts),r.DomEvent.addListener(t,"keydown",this._keydown,this),this.options.geocoder.suggest&&r.DomEvent.addListener(t,"input",this._change,this),r.DomEvent.addListener(t,"blur",function(){this.options.collapsed&&!this._preventBlurCollapse&&this._collapse(),this._preventBlurCollapse=!1},this),this.options.collapsed?"click"===this.options.expand?r.DomEvent.addListener(n,"click",function(e){0===e.button&&2!==e.detail&&this._toggle()},this):r.Browser.touch&&"touch"===this.options.expand?r.DomEvent.addListener(n,"touchstart mousedown",function(e){this._toggle(),e.preventDefault(),e.stopPropagation()},this):(r.DomEvent.addListener(n,"mouseover",this._expand,this),r.DomEvent.addListener(n,"mouseout",this._collapse,this),this._map.on("movestart",this._collapse,this)):(this._expand(),r.Browser.touch?r.DomEvent.addListener(n,"touchstart",function(e){this._geocode(e)},this):r.DomEvent.addListener(n,"click",function(e){this._geocode(e)},this)),this.options.defaultMarkGeocode&&this.on("markgeocode",this.markGeocode,this),this.on("startgeocode",function(){r.DomUtil.addClass(this._container,"leaflet-control-geocoder-throbber")},this),this.on("finishgeocode",function(){r.DomUtil.removeClass(this._container,"leaflet-control-geocoder-throbber")},this),r.DomEvent.disableClickPropagation(n),n},_geocodeResult:function(e,t){if(t||1!==e.length)if(0<e.length){this._alts.innerHTML="",this._results=e,r.DomUtil.removeClass(this._alts,"leaflet-control-geocoder-alternatives-minimized");for(var o=0;o<e.length;o++)this._alts.appendChild(this._createAlt(e[o],o))}else r.DomUtil.addClass(this._errorElement,"leaflet-control-geocoder-error");else this._geocodeResultSelected(e[0])},markGeocode:function(e){return e=e.geocode||e,this._map.fitBounds(e.bbox),this._geocodeMarker&&this._map.removeLayer(this._geocodeMarker),this._geocodeMarker=new r.Marker(e.center).bindPopup(e.html||e.name).addTo(this._map).openPopup(),this},_geocode:function(t){var o=++this._requestCount,n=t?"suggest":"geocode",s={input:this._input.value};this._lastGeocode=this._input.value,t||this._clearResults(),this.fire("start"+n,s),this.options.geocoder[n](this._input.value,function(e){o===this._requestCount&&(s.results=e,this.fire("finish"+n,s),this._geocodeResult(e,t))},this)},_geocodeResultSelected:function(e){this.fire("markgeocode",{geocode:e})},_toggle:function(){r.DomUtil.hasClass(this._container,"leaflet-control-geocoder-expanded")?this._collapse():this._expand()},_expand:function(){r.DomUtil.addClass(this._container,"leaflet-control-geocoder-expanded"),this._input.select(),this.fire("expand")},_collapse:function(){r.DomUtil.removeClass(this._container,"leaflet-control-geocoder-expanded"),r.DomUtil.addClass(this._alts,"leaflet-control-geocoder-alternatives-minimized"),r.DomUtil.removeClass(this._errorElement,"leaflet-control-geocoder-error"),this._input.blur(),this.fire("collapse")},_clearResults:function(){r.DomUtil.addClass(this._alts,"leaflet-control-geocoder-alternatives-minimized"),this._selection=null,r.DomUtil.removeClass(this._errorElement,"leaflet-control-geocoder-error")},_createAlt:function(t,e){var o=r.DomUtil.create("li",""),n=r.DomUtil.create("a","",o),s=this.options.showResultIcons&&t.icon?r.DomUtil.create("img","",n):null,i=t.html?void 0:document.createTextNode(t.name);return s&&(s.src=t.icon),o.setAttribute("data-result-index",e),t.html?n.innerHTML=n.innerHTML+t.html:n.appendChild(i),r.DomEvent.addListener(o,"mousedown touchstart",function(e){this._preventBlurCollapse=!0,r.DomEvent.stop(e),this._geocodeResultSelected(t),r.DomEvent.on(o,"click",function(){this.options.collapsed?this._collapse():this._clearResults()},this)},this),o},_keydown:function(e){var t=this,o=function(e){t._selection&&(r.DomUtil.removeClass(t._selection,"leaflet-control-geocoder-selected"),t._selection=t._selection[0<e?"nextSibling":"previousSibling"]),t._selection||(t._selection=t._alts[0<e?"firstChild":"lastChild"]),t._selection&&r.DomUtil.addClass(t._selection,"leaflet-control-geocoder-selected")};switch(e.keyCode){case 27:this.options.collapsed&&this._collapse();break;case 38:o(-1);break;case 40:o(1);break;case 13:if(this._selection){var n=parseInt(this._selection.getAttribute("data-result-index"),10);this._geocodeResultSelected(this._results[n]),this._clearResults()}else this._geocode()}},_change:function(e){var t=this._input.value;t!==this._lastGeocode&&(clearTimeout(this._suggestTimeout),t.length>=this.options.suggestMinLength?this._suggestTimeout=setTimeout(r.bind(function(){this._geocode(!0)},this),this.options.suggestTimeout):this._clearResults())}}),factory:function(e){return new r.Control.Geocoder(e)}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./geocoders/nominatim":9}],2:[function(t,o,e){(function(e){var l="undefined"!=typeof window?window.L:void 0!==e?e.L:null,i=t("../util");o.exports={class:l.Class.extend({options:{service_url:"http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"},initialize:function(e,t){l.setOptions(this,t),this._accessToken=e},geocode:function(e,r,a){var t={SingleLine:e,outFields:"Addr_Type",forStorage:!1,maxLocations:10,f:"json"};this._key&&this._key.length&&(t.token=this._key),i.getJSON(this.options.service_url+"/findAddressCandidates",t,function(e){var t,o,n,s=[];if(e.candidates&&e.candidates.length)for(var i=0;i<=e.candidates.length-1;i++)t=e.candidates[i],o=l.latLng(t.location.y,t.location.x),n=l.latLngBounds(l.latLng(t.extent.ymax,t.extent.xmax),l.latLng(t.extent.ymin,t.extent.xmin)),s[i]={name:t.address,bbox:n,center:o};r.call(a,s)})},suggest:function(e,t,o){return this.geocode(e,t,o)},reverse:function(e,t,n,s){var o={location:encodeURIComponent(e.lng)+","+encodeURIComponent(e.lat),distance:100,f:"json"};i.getJSON(this.options.service_url+"/reverseGeocode",o,function(e){var t,o=[];e&&!e.error&&(t=l.latLng(e.location.y,e.location.x),o.push({name:e.address.Match_addr,center:t,bounds:l.latLngBounds(t,t)})),n.call(s,o)})}}),factory:function(e,t){return new l.Control.Geocoder.ArcGis(e,t)}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../util":13}],3:[function(t,n,e){(function(e){var a="undefined"!=typeof window?window.L:void 0!==e?e.L:null,o=t("../util");n.exports={class:a.Class.extend({initialize:function(e){this.key=e},geocode:function(e,i,r){o.jsonp("https://dev.virtualearth.net/REST/v1/Locations",{query:e,key:this.key},function(e){var t=[];if(0<e.resourceSets.length)for(var o=e.resourceSets[0].resources.length-1;0<=o;o--){var n=e.resourceSets[0].resources[o],s=n.bbox;t[o]={name:n.name,bbox:a.latLngBounds([s[0],s[1]],[s[2],s[3]]),center:a.latLng(n.point.coordinates)}}i.call(r,t)},this,"jsonp")},reverse:function(e,t,i,r){o.jsonp("//dev.virtualearth.net/REST/v1/Locations/"+e.lat+","+e.lng,{key:this.key},function(e){for(var t=[],o=e.resourceSets[0].resources.length-1;0<=o;o--){var n=e.resourceSets[0].resources[o],s=n.bbox;t[o]={name:n.name,bbox:a.latLngBounds([s[0],s[1]],[s[2],s[3]]),center:a.latLng(n.point.coordinates)}}i.call(r,t)},this,"jsonp")}}),factory:function(e){return new a.Control.Geocoder.Bing(e)}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../util":13}],4:[function(t,o,e){(function(e){var l="undefined"!=typeof window?window.L:void 0!==e?e.L:null,n=t("../util");o.exports={class:l.Class.extend({options:{serviceUrl:"https://maps.googleapis.com/maps/api/geocode/json",geocodingQueryParams:{},reverseQueryParams:{}},initialize:function(e,t){this._key=e,l.setOptions(this,t),this.options.serviceUrl=this.options.service_url||this.options.serviceUrl},geocode:function(e,r,a){var t={address:e};this._key&&this._key.length&&(t.key=this._key),t=l.Util.extend(t,this.options.geocodingQueryParams),n.getJSON(this.options.serviceUrl,t,function(e){var t,o,n,s=[];if(e.results&&e.results.length)for(var i=0;i<=e.results.length-1;i++)t=e.results[i],o=l.latLng(t.geometry.location),n=l.latLngBounds(l.latLng(t.geometry.viewport.northeast),l.latLng(t.geometry.viewport.southwest)),s[i]={name:t.formatted_address,bbox:n,center:o,properties:t.address_components};r.call(a,s)})},reverse:function(e,t,r,a){var o={latlng:encodeURIComponent(e.lat)+","+encodeURIComponent(e.lng)};o=l.Util.extend(o,this.options.reverseQueryParams),this._key&&this._key.length&&(o.key=this._key),n.getJSON(this.options.serviceUrl,o,function(e){var t,o,n,s=[];if(e.results&&e.results.length)for(var i=0;i<=e.results.length-1;i++)t=e.results[i],o=l.latLng(t.geometry.location),n=l.latLngBounds(l.latLng(t.geometry.viewport.northeast),l.latLng(t.geometry.viewport.southwest)),s[i]={name:t.formatted_address,bbox:n,center:o,properties:t.address_components};r.call(a,s)})}}),factory:function(e,t){return new l.Control.Geocoder.Google(e,t)}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../util":13}],5:[function(t,n,e){(function(e){var l="undefined"!=typeof window?window.L:void 0!==e?e.L:null,o=t("../util");n.exports={class:l.Class.extend({options:{geocodeUrl:"http://geocoder.api.here.com/6.2/geocode.json",reverseGeocodeUrl:"http://reverse.geocoder.api.here.com/6.2/reversegeocode.json",app_id:"<insert your app_id here>",app_code:"<insert your app_code here>",geocodingQueryParams:{},reverseQueryParams:{}},initialize:function(e){l.setOptions(this,e)},geocode:function(e,t,o){var n={searchtext:e,gen:9,app_id:this.options.app_id,app_code:this.options.app_code,jsonattributes:1};n=l.Util.extend(n,this.options.geocodingQueryParams),this.getJSON(this.options.geocodeUrl,n,t,o)},reverse:function(e,t,o,n){var s={prox:encodeURIComponent(e.lat)+","+encodeURIComponent(e.lng),mode:"retrieveAddresses",app_id:this.options.app_id,app_code:this.options.app_code,gen:9,jsonattributes:1};s=l.Util.extend(s,this.options.reverseQueryParams),this.getJSON(this.options.reverseGeocodeUrl,s,o,n)},getJSON:function(e,t,r,a){o.getJSON(e,t,function(e){var t,o,n,s=[];if(e.response.view&&e.response.view.length)for(var i=0;i<=e.response.view[0].result.length-1;i++)t=e.response.view[0].result[i].location,o=l.latLng(t.displayPosition.latitude,t.displayPosition.longitude),n=l.latLngBounds(l.latLng(t.mapView.topLeft.latitude,t.mapView.topLeft.longitude),l.latLng(t.mapView.bottomRight.latitude,t.mapView.bottomRight.longitude)),s[i]={name:t.address.label,bbox:n,center:o};r.call(a,s)})}}),factory:function(e){return new l.Control.Geocoder.HERE(e)}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../util":13}],6:[function(t,n,e){(function(e){var l="undefined"!=typeof window?window.L:void 0!==e?e.L:null,o=t("../util");n.exports={class:l.Class.extend({options:{serviceUrl:"https://api.tiles.mapbox.com/v4/geocode/mapbox.places-v1/",geocodingQueryParams:{},reverseQueryParams:{}},initialize:function(e,t){l.setOptions(this,t),this.options.geocodingQueryParams.access_token=e,this.options.reverseQueryParams.access_token=e},geocode:function(e,r,a){var t=this.options.geocodingQueryParams;void 0!==t.proximity&&t.proximity.hasOwnProperty("lat")&&t.proximity.hasOwnProperty("lng")&&(t.proximity=t.proximity.lng+","+t.proximity.lat),o.getJSON(this.options.serviceUrl+encodeURIComponent(e)+".json",t,function(e){var t,o,n,s=[];if(e.features&&e.features.length)for(var i=0;i<=e.features.length-1;i++)t=e.features[i],o=l.latLng(t.center.reverse()),n=t.hasOwnProperty("bbox")?l.latLngBounds(l.latLng(t.bbox.slice(0,2).reverse()),l.latLng(t.bbox.slice(2,4).reverse())):l.latLngBounds(o,o),s[i]={name:t.place_name,bbox:n,center:o};r.call(a,s)})},suggest:function(e,t,o){return this.geocode(e,t,o)},reverse:function(e,t,r,a){o.getJSON(this.options.serviceUrl+encodeURIComponent(e.lng)+","+encodeURIComponent(e.lat)+".json",this.options.reverseQueryParams,function(e){var t,o,n,s=[];if(e.features&&e.features.length)for(var i=0;i<=e.features.length-1;i++)t=e.features[i],o=l.latLng(t.center.reverse()),n=t.hasOwnProperty("bbox")?l.latLngBounds(l.latLng(t.bbox.slice(0,2).reverse()),l.latLng(t.bbox.slice(2,4).reverse())):l.latLngBounds(o,o),s[i]={name:t.place_name,bbox:n,center:o};r.call(a,s)})}}),factory:function(e,t){return new l.Control.Geocoder.Mapbox(e,t)}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../util":13}],7:[function(t,n,e){(function(e){var a="undefined"!=typeof window?window.L:void 0!==e?e.L:null,o=t("../util");n.exports={class:a.Class.extend({options:{serviceUrl:"https://www.mapquestapi.com/geocoding/v1"},initialize:function(e,t){this._key=decodeURIComponent(e),a.Util.setOptions(this,t)},_formatName:function(){var e,t=[];for(e=0;e<arguments.length;e++)arguments[e]&&t.push(arguments[e]);return t.join(", ")},geocode:function(e,i,r){o.jsonp(this.options.serviceUrl+"/address",{key:this._key,location:e,limit:5,outFormat:"json"},function(e){var t,o,n=[];if(e.results&&e.results[0].locations)for(var s=e.results[0].locations.length-1;0<=s;s--)t=e.results[0].locations[s],o=a.latLng(t.latLng),n[s]={name:this._formatName(t.street,t.adminArea4,t.adminArea3,t.adminArea1),bbox:a.latLngBounds(o,o),center:o};i.call(r,n)},this)},reverse:function(e,t,i,r){o.jsonp(this.options.serviceUrl+"/reverse",{key:this._key,location:e.lat+","+e.lng,outputFormat:"json"},function(e){var t,o,n=[];if(e.results&&e.results[0].locations)for(var s=e.results[0].locations.length-1;0<=s;s--)t=e.results[0].locations[s],o=a.latLng(t.latLng),n[s]={name:this._formatName(t.street,t.adminArea4,t.adminArea3,t.adminArea1),bbox:a.latLngBounds(o,o),center:o};i.call(r,n)},this)}}),factory:function(e,t){return new a.Control.Geocoder.MapQuest(e,t)}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../util":13}],8:[function(t,o,e){(function(e){var a="undefined"!=typeof window?window.L:void 0!==e?e.L:null,i=t("../util");o.exports={class:a.Class.extend({options:{serviceUrl:"https://search.mapzen.com/v1",geocodingQueryParams:{},reverseQueryParams:{}},initialize:function(e,t){a.Util.setOptions(this,t),this._apiKey=e,this._lastSuggest=0},geocode:function(e,t,o){var n=this;i.getJSON(this.options.serviceUrl+"/search",a.extend({api_key:this._apiKey,text:e},this.options.geocodingQueryParams),function(e){t.call(o,n._parseResults(e,"bbox"))})},suggest:function(e,t,o){var n=this;i.getJSON(this.options.serviceUrl+"/autocomplete",a.extend({api_key:this._apiKey,text:e},this.options.geocodingQueryParams),a.bind(function(e){e.geocoding.timestamp>this._lastSuggest&&(this._lastSuggest=e.geocoding.timestamp,t.call(o,n._parseResults(e,"bbox")))},this))},reverse:function(e,t,o,n){var s=this;i.getJSON(this.options.serviceUrl+"/reverse",a.extend({api_key:this._apiKey,"point.lat":e.lat,"point.lon":e.lng},this.options.reverseQueryParams),function(e){o.call(n,s._parseResults(e,"bounds"))})},_parseResults:function(e,i){var r=[];return a.geoJson(e,{pointToLayer:function(e,t){return a.circleMarker(t)},onEachFeature:function(e,t){var o,n,s={};t.getBounds?n=(o=t.getBounds()).getCenter():(n=t.getLatLng(),o=a.latLngBounds(n,n)),s.name=t.feature.properties.label,s.center=n,s[i]=o,s.properties=t.feature.properties,r.push(s)}}),r}}),factory:function(e,t){return new a.Control.Geocoder.Mapzen(e,t)}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../util":13}],9:[function(t,o,e){(function(e){var a="undefined"!=typeof window?window.L:void 0!==e?e.L:null,l=t("../util");o.exports={class:a.Class.extend({options:{serviceUrl:"https://nominatim.openstreetmap.org/",geocodingQueryParams:{},reverseQueryParams:{},htmlTemplate:function(e){var t=e.address,o=[];return(t.road||t.building)&&o.push("{building} {road} {house_number}"),(t.city||t.town||t.village||t.hamlet)&&o.push('<span class="'+(0<o.length?"leaflet-control-geocoder-address-detail":"")+'">{postcode} {city} {town} {village} {hamlet}</span>'),(t.state||t.country)&&o.push('<span class="'+(0<o.length?"leaflet-control-geocoder-address-context":"")+'">{state} {country}</span>'),l.template(o.join("<br/>"),t,!0)}},initialize:function(e){a.Util.setOptions(this,e)},geocode:function(e,i,r){l.jsonp(this.options.serviceUrl+"search",a.extend({q:e,limit:5,format:"json",addressdetails:1},this.options.geocodingQueryParams),function(e){for(var t=[],o=e.length-1;0<=o;o--){for(var n=e[o].boundingbox,s=0;s<4;s++)n[s]=parseFloat(n[s]);t[o]={icon:e[o].icon,name:e[o].display_name,html:this.options.htmlTemplate?this.options.htmlTemplate(e[o]):void 0,bbox:a.latLngBounds([n[0],n[2]],[n[1],n[3]]),center:a.latLng(e[o].lat,e[o].lon),properties:e[o]}}i.call(r,t)},this,"json_callback")},reverse:function(e,t,n,s){l.jsonp(this.options.serviceUrl+"reverse",a.extend({lat:e.lat,lon:e.lng,zoom:Math.round(Math.log(t/256)/Math.log(2)),addressdetails:1,format:"json"},this.options.reverseQueryParams),function(e){var t,o=[];e&&e.lat&&e.lon&&(t=a.latLng(e.lat,e.lon),o.push({name:e.display_name,html:this.options.htmlTemplate?this.options.htmlTemplate(e):void 0,center:t,bounds:a.latLngBounds(t,t),properties:e})),n.call(s,o)},this,"json_callback")}}),factory:function(e){return new a.Control.Geocoder.Nominatim(e)}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../util":13}],10:[function(t,o,e){(function(e){var l="undefined"!=typeof window?window.L:void 0!==e?e.L:null,i=t("../util");o.exports={class:l.Class.extend({options:{serviceUrl:"https://photon.komoot.de/api/",reverseUrl:"https://photon.komoot.de/reverse/",nameProperties:["name","street","suburb","hamlet","town","city","state","country"]},initialize:function(e){l.setOptions(this,e)},geocode:function(e,t,o){var n=l.extend({q:e},this.options.geocodingQueryParams);i.getJSON(this.options.serviceUrl,n,l.bind(function(e){t.call(o,this._decodeFeatures(e))},this))},suggest:function(e,t,o){return this.geocode(e,t,o)},reverse:function(e,t,o,n){var s=l.extend({lat:e.lat,lon:e.lng},this.options.geocodingQueryParams);i.getJSON(this.options.reverseUrl,s,l.bind(function(e){o.call(n,this._decodeFeatures(e))},this))},_decodeFeatures:function(e){var t,o,n,s,i,r,a=[];if(e&&e.features)for(t=0;t<e.features.length;t++)n=(o=e.features[t]).geometry.coordinates,s=l.latLng(n[1],n[0]),r=(i=o.properties.extent)?l.latLngBounds([i[1],i[0]],[i[3],i[2]]):l.latLngBounds(s,s),a.push({name:this._deocodeFeatureName(o),html:this.options.htmlTemplate?this.options.htmlTemplate(o):void 0,center:s,bbox:r,properties:o.properties});return a},_deocodeFeatureName:function(e){var t,o;for(t=0;!o&&t<this.options.nameProperties.length;t++)o=e.properties[this.options.nameProperties[t]];return o}}),factory:function(e){return new l.Control.Geocoder.Photon(e)}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../util":13}],11:[function(t,n,e){(function(e){var r="undefined"!=typeof window?window.L:void 0!==e?e.L:null,o=t("../util");n.exports={class:r.Class.extend({options:{serviceUrl:"https://api.what3words.com/v2/"},initialize:function(e){this._accessToken=e},geocode:function(e,s,i){o.getJSON(this.options.serviceUrl+"forward",{key:this._accessToken,addr:e.split(/\s+/).join(".")},function(e){var t,o,n=[];e.hasOwnProperty("geometry")&&(t=r.latLng(e.geometry.lat,e.geometry.lng),o=r.latLngBounds(t,t),n[0]={name:e.words,bbox:o,center:t}),s.call(i,n)})},suggest:function(e,t,o){return this.geocode(e,t,o)},reverse:function(e,t,s,i){o.getJSON(this.options.serviceUrl+"reverse",{key:this._accessToken,coords:[e.lat,e.lng].join(",")},function(e){var t,o,n=[];200==e.status.status&&(t=r.latLng(e.geometry.lat,e.geometry.lng),o=r.latLngBounds(t,t),n[0]={name:e.words,bbox:o,center:t}),s.call(i,n)})}}),factory:function(e){return new r.Control.Geocoder.What3Words(e)}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../util":13}],12:[function(f,h,e){(function(e){var t="undefined"!=typeof window?window.L:void 0!==e?e.L:null,o=f("./control"),n=f("./geocoders/nominatim"),s=f("./geocoders/bing"),i=f("./geocoders/mapquest"),r=f("./geocoders/mapbox"),a=f("./geocoders/what3words"),l=f("./geocoders/google"),c=f("./geocoders/photon"),d=f("./geocoders/mapzen"),u=f("./geocoders/arcgis"),p=f("./geocoders/here");h.exports=t.Util.extend(o.class,{Nominatim:n.class,nominatim:n.factory,Bing:s.class,bing:s.factory,MapQuest:i.class,mapQuest:i.factory,Mapbox:r.class,mapbox:r.factory,What3Words:a.class,what3words:a.factory,Google:l.class,google:l.factory,Photon:c.class,photon:c.factory,Mapzen:d.class,mapzen:d.factory,ArcGis:u.class,arcgis:u.factory,HERE:p.class,here:p.factory}),t.Util.extend(t.Control,{Geocoder:h.exports,geocoder:o.factory})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./control":1,"./geocoders/arcgis":2,"./geocoders/bing":3,"./geocoders/google":4,"./geocoders/here":5,"./geocoders/mapbox":6,"./geocoders/mapquest":7,"./geocoders/mapzen":8,"./geocoders/nominatim":9,"./geocoders/photon":10,"./geocoders/what3words":11}],13:[function(e,t,o){(function(e){var a="undefined"!=typeof window?window.L:void 0!==e?e.L:null,l=0,s=function(){var t=/[&<>"'`]/g,o=/[&<>"'`]/,n={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"};function s(e){return n[e]}return function(e){return null==e?"":e?(e=""+e,o.test(e)?e.replace(t,s):e):e+""}}();t.exports={jsonp:function(e,t,o,n,s){var i="_l_geocoder_"+l++;t[s||"callback"]=i,window[i]=a.Util.bind(o,n);var r=document.createElement("script");r.type="text/javascript",r.src=e+a.Util.getParamString(t),r.id=i,document.getElementsByTagName("head")[0].appendChild(r)},getJSON:function(e,t,o){var n=new XMLHttpRequest;n.onreadystatechange=function(){4===n.readyState&&(200===n.status||304===n.status?o(JSON.parse(n.response)):o(""))},n.open("GET",e+a.Util.getParamString(t),!0),n.setRequestHeader("Accept","application/json"),n.send(null)},template:function(e,n){return e.replace(/\{ *([\w_]+) *\}/g,function(e,t){var o=n[t];return void 0===o?o="":"function"==typeof o&&(o=o(n)),s(o)})},htmlEscape:s}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[12])(12)});