(function(){(function(){var a={}.hasOwnProperty,b=[].slice;null!=this.L&&(this.OverlappingMarkerSpiderfier=function(){function c(b,c){var d,e,f,g,h=this;this.map=b,null==c&&(c={});for(d in c)a.call(c,d)&&(e=c[d],this[d]=e);for(this.initMarkerArrays(),this.listeners={},g=["click","zoomend"],e=0,f=g.length;f>e;e++)d=g[e],this.map.addEventListener(d,function(){return h.unspiderfy()})}var d,e;return d=c.prototype,d.VERSION="0.2.6",e=2*Math.PI,d.keepSpiderfied=!1,d.nearbyDistance=20,d.circleSpiralSwitchover=9,d.circleFootSeparation=25,d.circleStartAngle=e/12,d.spiralFootSeparation=28,d.spiralLengthStart=11,d.spiralLengthFactor=5,d.legWeight=1.5,d.legColors={usual:"#222",highlighted:"#f00"},d.initMarkerArrays=function(){return this.markers=[],this.markerListeners=[]},d.addMarker=function(a){var b,c=this;return null!=a._oms?this:(a._oms=!0,b=function(){return c.spiderListener(a)},a.addEventListener("click",b),this.markerListeners.push(b),this.markers.push(a),this)},d.getMarkers=function(){return this.markers.slice(0)},d.removeMarker=function(a){var b,c;return null!=a._omsData&&this.unspiderfy(),b=this.arrIndexOf(this.markers,a),0>b?this:(c=this.markerListeners.splice(b,1)[0],a.removeEventListener("click",c),delete a._oms,this.markers.splice(b,1),this)},d.clearMarkers=function(){var a,b,c,d,e;for(this.unspiderfy(),e=this.markers,a=c=0,d=e.length;d>c;a=++c)b=e[a],a=this.markerListeners[a],b.removeEventListener("click",a),delete b._oms;return this.initMarkerArrays(),this},d.addListener=function(a,b){var c,d;return(null!=(d=(c=this.listeners)[a])?d:c[a]=[]).push(b),this},d.removeListener=function(a,b){var c;return c=this.arrIndexOf(this.listeners[a],b),0>c||this.listeners[a].splice(c,1),this},d.clearListeners=function(a){return this.listeners[a]=[],this},d.trigger=function(){var a,c,d,e,f,g;for(c=arguments[0],a=2<=arguments.length?b.call(arguments,1):[],c=null!=(d=this.listeners[c])?d:[],g=[],e=0,f=c.length;f>e;e++)d=c[e],g.push(d.apply(null,a));return g},d.generatePtsCircle=function(a,b){var c,d,f,g,h;for(f=this.circleFootSeparation*(2+a)/e,d=e/a,h=[],c=g=0;a>=0?a>g:g>a;c=a>=0?++g:--g)c=this.circleStartAngle+c*d,h.push(new L.Point(b.x+f*Math.cos(c),b.y+f*Math.sin(c)));return h},d.generatePtsSpiral=function(a,b){var c,d,f,g,h;for(f=this.spiralLengthStart,c=0,h=[],d=g=0;a>=0?a>g:g>a;d=a>=0?++g:--g)c+=this.spiralFootSeparation/f+5e-4*d,d=new L.Point(b.x+f*Math.cos(c),b.y+f*Math.sin(c)),f+=e*this.spiralLengthFactor/c,h.push(d);return h},d.spiderListener=function(a){var b,c,d,e,f,g,h,i,j;if((b=null!=a._omsData)&&this.keepSpiderfied||this.unspiderfy(),b)return this.trigger("click",a);for(e=[],f=[],g=this.nearbyDistance*this.nearbyDistance,d=this.map.latLngToLayerPoint(a.getLatLng()),j=this.markers,h=0,i=j.length;i>h;h++)b=j[h],this.map.hasLayer(b)&&(c=this.map.latLngToLayerPoint(b.getLatLng()),this.ptDistanceSq(c,d)<g?e.push({marker:b,markerPt:c}):f.push(b));return 1===e.length?this.trigger("click",a):this.spiderfy(e,f)},d.makeHighlightListeners=function(a){var b=this;return{highlight:function(){return a._omsData.leg.setStyle({color:b.legColors.highlighted})},unhighlight:function(){return a._omsData.leg.setStyle({color:b.legColors.usual})}}},d.spiderfy=function(a,b){var c,d,e,f,g,h,i,j,k,l;return this.spiderfying=!0,l=a.length,c=this.ptAverage(function(){var b,c,d;for(d=[],b=0,c=a.length;c>b;b++)i=a[b],d.push(i.markerPt);return d}()),f=l>=this.circleSpiralSwitchover?this.generatePtsSpiral(l,c).reverse():this.generatePtsCircle(l,c),c=function(){var b,c,i,l=this;for(i=[],b=0,c=f.length;c>b;b++)e=f[b],d=this.map.layerPointToLatLng(e),k=this.minExtract(a,function(a){return l.ptDistanceSq(a.markerPt,e)}),h=k.marker,g=new L.Polyline([h.getLatLng(),d],{color:this.legColors.usual,weight:this.legWeight,clickable:!1}),this.map.addLayer(g),h._omsData={usualPosition:h.getLatLng(),leg:g},this.legColors.highlighted!==this.legColors.usual&&(j=this.makeHighlightListeners(h),h._omsData.highlightListeners=j,h.addEventListener("mouseover",j.highlight),h.addEventListener("mouseout",j.unhighlight)),h.setLatLng(d),h.setZIndexOffset(1e6),i.push(h);return i}.call(this),delete this.spiderfying,this.spiderfied=!0,this.trigger("spiderfy",c,b)},d.unspiderfy=function(a){var b,c,d,e,f,g,h;if(null==a&&(a=null),null==this.spiderfied)return this;for(this.unspiderfying=!0,e=[],d=[],h=this.markers,f=0,g=h.length;g>f;f++)b=h[f],null!=b._omsData?(this.map.removeLayer(b._omsData.leg),b!==a&&b.setLatLng(b._omsData.usualPosition),b.setZIndexOffset(0),c=b._omsData.highlightListeners,null!=c&&(b.removeEventListener("mouseover",c.highlight),b.removeEventListener("mouseout",c.unhighlight)),delete b._omsData,e.push(b)):d.push(b);return delete this.unspiderfying,delete this.spiderfied,this.trigger("unspiderfy",e,d),this},d.ptDistanceSq=function(a,b){var c,d;return c=a.x-b.x,d=a.y-b.y,c*c+d*d},d.ptAverage=function(a){var b,c,d,e,f;for(e=c=d=0,f=a.length;f>e;e++)b=a[e],c+=b.x,d+=b.y;return a=a.length,new L.Point(c/a,d/a)},d.minExtract=function(a,b){var c,d,e,f,g,h;for(e=g=0,h=a.length;h>g;e=++g)f=a[e],f=b(f),("undefined"==typeof c||null===c||d>f)&&(d=f,c=e);return a.splice(c,1)[0]},d.arrIndexOf=function(a,b){var c,d,e,f;if(null!=a.indexOf)return a.indexOf(b);for(c=e=0,f=a.length;f>e;c=++e)if(d=a[c],d===b)return c;return-1},c}())}).call(this)}).call(this);var L=L,google=google,markers=[];$(document).ready(function(){var a=function(c){markers[c].closePopup(),b.setView(markers[c].getLatLng(),5),c++,21===c&&location.reload(),setTimeout(function(){b.setView(markers[c].getLatLng(),3),setTimeout(function(){b.setView(markers[c].getLatLng(),5),setTimeout(function(){markers[c].openPopup(),b.setView(markers[c].getLatLng(),8),setTimeout(function(){a(c)},5e3)},1e3)},1e3)},1e3)},b=L.map("map").setView([52.3731,4.8922],4);L.tileLayer("http://{s}.tile.cloudmade.com/8E10386EF81C4270B374C76464C939C2/113231/256/{z}/{x}/{y}.png",{attribution:'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'}).addTo(b),$.getJSON("https://spreadsheets.google.com/feeds/cells/0AqA2xvkYssxvdGg3WW1oc2JsZ3dBRUdwUmVLRmt5LUE/od6/public/basic?alt=json-in-script&callback=?",function(c){var d=7,e=[],f={};$.each(c.feed.entry,function(a,b){console.log(b.content.$t);var c=a%d;void 0===e[c]&&(e[c]=[]),e[c].push(b.content.$t)}),console.log(e),$.each(e,function(a,b){f[b.shift().replace(/ /g,"_").toLowerCase()]=b}),console.log(f),$.each(f.first_name,function(a,c){var d=L.marker([f.lat[a],f.lon[a]]).bindPopup('<img src="'+f.photo[a]+'"><p>'+c+'<span class="label label-inverse">'+f.role[a]+'</span></p><p class="muted">'+f.city[a]+", "+f.country[a]+"</p>",{offset:[0,0],autoPanPaddingTopLeft:10,autoPanPaddingBottomRight:10}).openPopup();markers.push(d),b.addLayer(d)}),"#play"===window.location.hash&&a(0)})});