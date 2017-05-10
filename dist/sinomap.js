var Sinomap=function(){"use strict";function t(t,e){var n=w*t*b,r=Math.max(Math.min(S,e),-S)*b;return r=w*Math.log(Math.tan(Math.PI/4+r/2)),[n,r]}function e(e){var n=[];return e.features.forEach(function(e){"Polygon"===e.geometry.type?e.geometry.coordinates.forEach(function(e){n=n.concat(e.map(function(e){return t(e[0],e[1])}))}):e.geometry.coordinates.forEach(function(e){e.forEach(function(e){n=n.concat(e.map(function(e){return t(e[0],e[1])}))})})}),n}function n(t){var e=t.reduce(function(t,e){return t[0]<e[0]?t:e})[0],n=t.reduce(function(t,e){return t[0]>e[0]?t:e})[0],r=t.reduce(function(t,e){return t[1]<e[1]?t:e})[1];return{w:n-e,h:t.reduce(function(t,e){return t[1]>e[1]?t:e})[1]-r,minX:e,minY:r}}function r(t,e){var n=y(t,2),r=n[0],i=n[1],a=y(e,2),o=a[0],h=a[1],s=r/i/(o/h)>1,c=s?o/r:h/i;return[s?0:(o-r*c)/2,s?(h-i*c)/2:0,c]}function i(e,n,r){return r.map(function(r){var i=t(r[0],r[1]),a=y(i,2),o=a[0],h=a[1];return[o-e,h-n]})}function a(t,i,a){var o=e(t),h=n(o),s=r([h.w,h.h],[i,a]),c=y(s,3),u=c[0],f=c[1],l=c[2];return{offsetX:u,offsetY:f,minX:h.minX,minY:h.minY,areaScale:l}}function o(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.minX,r=e.minY,a=e.offsetX,o=e.offsetY,h=e.areaScale,s=e.height;return i(n,r,t).map(function(t){return[t[0]*h+a,s-t[1]*h-o]})}function h(){var t,e=Array.from(arguments),n=e.splice(0,1);this.layer[n]&&(t=this.layer)[n].apply(t,[this].concat(g(e)))}function s(t,e){var n=e.features.filter(function(e){return e.properties.name===t});if(n.length)return n[0].properties}function c(){return"devicePixelRatio"in window&&window.devicePixelRatio>1?window.devicePixelRatio:1}function u(t,e,n){var r=document.createElement("canvas");return r.width=t*n,r.height=e*n,r.style.width=t+"px",r.style.height=e+"px",r.getContext("2d").scale(n,n),r}function f(t){var e=this;t.addEventListener("mousemove",function(t){var n=e.mapCanvas.getBoundingClientRect();e.mouseX=(t.clientX-n.left)*e.mapCanvas.width/n.width,e.mouseY=(t.clientY-n.top)*e.mapCanvas.height/n.height,e.updateMap()})}function l(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=n.offsetX,i=n.offsetY,a=n.minX,h=n.minY,s=n.areaScale,c=o(t,{minX:a,minY:h,offsetX:r,offsetY:i,areaScale:s,height:this.height});this.ctx.fillStyle=this.color,this.ctx.strokeStyle=this.borderColor,m(this.ctx,c),this.ctx.stroke(),this.callLayer("afterDrawArea",c,e);var u=this.ctx.isPointInPath(this.mouseX,this.mouseY);return u&&(this.callLayer("onHoverArea",c,e),this.hoverName!==e.name&&(null!==this.hoverName&&this.callLayer("onLeaveArea",e),this.callLayer("onEnterArea",e),this.hoverName=e.name)),u}function m(t,e){e.forEach(function(n,r){var i=[e[r][0],e[r][1]],a=i[0],o=i[1];0===r&&t.beginPath(),t.lineTo(a,o)}),t.closePath(),t.fill()}function v(t,e,n){var r="string"==typeof this.el?document.querySelector(this.el):this.el;if(!r)throw new Error("[Sinomap] Target element not found.");this.mouseX=0,this.mouseY=0,this.hoverName=null,this.canvasScale=c(),this.mapCanvas=u(this.width,this.height,this.canvasScale),this.ctx=this.mapCanvas.getContext("2d"),this.utils={drawPath:m},r.appendChild(this.mapCanvas),f.bind(this)(this.mapCanvas)}function d(){var t=this,e=a(this.geoJSON,this.width,this.height),n=!1;this.geoJSON.features.forEach(function(r){"Polygon"===r.geometry.type?r.geometry.coordinates.forEach(function(i){l.bind(t)(i,r.properties,e)&&(n=!0)}):r.geometry.coordinates.forEach(function(i){return i.forEach(function(i){l.bind(t)(i,r.properties,e)&&(n=!0)})})}),n||null===this.hoverName||(this.callLayer("onLeaveArea",s(this.hoverName,this.geoJSON)),this.hoverName=null)}var p=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},y=function(){function t(t,e){var n=[],r=!0,i=!1,a=void 0;try{for(var o,h=t[Symbol.iterator]();!(r=(o=h.next()).done)&&(n.push(o.value),!e||n.length!==e);r=!0);}catch(t){i=!0,a=t}finally{try{!r&&h.return&&h.return()}finally{if(i)throw a}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),g=function(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)},w=6378137,S=85.0511287798,b=Math.PI/180,E={el:null,width:600,height:400,layer:{},color:"#ddd",hoverColor:"rgba(255, 255, 255, 0.5)",borderColor:"white",geoJSON:null};return function t(e){var n=this;p(this,t),this.updateMap=d.bind(this),this.callLayer=h.bind(this),e=Object.assign({},E,e),Object.keys(e).forEach(function(t){n[t]=e[t]}),v.bind(this)(),this.updateMap()}}();
