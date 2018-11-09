parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"lD1s":[function(require,module,exports) {
var e=function(){var e=document.createElement("div");return e.classList.add("wrapper"),e}();module.exports={AppWrapper:e};
},{}],"3Dko":[function(require,module,exports) {
function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function n(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}var a=function(){function e(){t(this,e)}return n(e,[{key:"render",value:function(){return'\n\t\t\t\t<section class="addArtist"> \n\t\t\t\t\t<p>Add Artist: </p>\n\t\t\t\t\t<label> Artist Name: <input id="artistName" type="text" name="artistName"/> </label>\n\t\t\t\t\t<label> Artist Image: <input id="artistImage" type="text" name="artistImage"/> </label>\n\t\t\t\t\t<label> Artist Age: <input id="artistAge" type="text" name="artistAge"/> </label>\n\t\t\t\t\t<label> Artist Home: <input id="artistHome" type="text" name="artistHome"/> </label>\n\t\t\t\t\t<button class="artistSubmit">Submit</button>\n\t\t\t\t</section>\n\t\t'}}]),e}();module.exports={AddArtist:a};
},{}],"UyHQ":[function(require,module,exports) {
function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function n(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}var a=function(){function e(){t(this,e)}return n(e,[{key:"render",value:function(){return'\n\t\t\t<section class="addAlbum"> \n\t\t\t\t<p>Add Album: </p>\n\t\t\t\t<label> Album Name: <input id="albumName" type="text" name="albumName"/> </label>\n\t\t\t\t<label> Album Image: <input id="albumImage" type="text" name="albumImage"/> </label>\n\t\t\t\t<button class="albumSubmit">Submit</button>\n\t\t\t</section>\n\t\t'}}]),e}();module.exports={AddAlbum:a};
},{}],"4kO8":[function(require,module,exports) {
function t(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function n(t,n){for(var e=0;e<n.length;e++){var o=n[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function e(t,e,o){return e&&n(t.prototype,e),o&&n(t,o),t}var o=function(){function n(){t(this,n)}return e(n,[{key:"render",value:function(){return'\n\t\t\t<section class="addSong">\n\t\t\t\t<p>Add Song:</p>\n\t\t\t\t<label> Song Name: <input id="songName" type="text" name="songName"/> </label>\n\t\t\t\t<label> Song Length: <input id="songLength" type="text" name="songLength"/> </label>\n\t\t\t\t<label> Song Link: <input id="songLink" type="text" name="songLink"/> </label>\n\t\t\t\t<button class="songSubmit">Submit</button>\n\t\t\t</section>\n\t\t'}}]),n}();module.exports={AddSong:o};
},{}],"Tc4M":[function(require,module,exports) {
function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function n(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}var r=function(){function t(n){e(this,t),this.artistSection=n}return n(t,[{key:"render",value:function(){return"heeey"}},{key:"getArtists",value:function(){var e=new XMLHttpRequest;e.open("GET","/api/artists",!0),e.send(),e.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var e=JSON.parse(this.responseText);showArtists(e)}}}},{key:"showArtists",value:function(e){artistSection.innerHTML="",e.forEach(function(e){var t=document.createElement("h1");t.innerText=e.name,t.addEventListener("click",function(){getAlbums(e.id)}),artistSection.appendChild(t),console.log(artistSection),console.log("we went all the way")})}}]),t}();module.exports={ShowArtists:r};
},{}],"ppbk":[function(require,module,exports) {
function t(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function n(t,n){for(var e=0;e<n.length;e++){var o=n[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function e(t,e,o){return e&&n(t.prototype,e),o&&n(t,o),t}var o=function(){function n(e){t(this,n),this.section=e}return e(n,[{key:"render",value:function(){return'\n\t\t\t<button id="toggle-input-display-button">Toggle Input Display</button>\n\t\t'}},{key:"activateButton",value:function(t){t.addEventListener("click",function(){section.style.display==none?section.style.display=block:section.style.display=none})}}]),n}();module.exports={AddStuffDisplay:o};
},{}],"Focm":[function(require,module,exports) {
var e=document.querySelector("#app"),r=require("./appWrapper.js"),t=r.AppWrapper,n=require("./addArtist.js"),d=n.AddArtist,u=require("./addAlbum"),i=u.AddAlbum,o=require("./addSong"),s=o.AddSong,a=require("./showArtists"),p=a.ShowArtists,c=require("./AddStuffDisplay"),l=c.AddStuffDisplay,A=document.querySelector("#artists"),q=document.querySelector("#albums"),S=document.querySelector("#songs"),m=document.querySelector("#adding-stuff-section"),y=new d,g=new i,w=new s,f=new p(A),b=new l(m);f.getArtists(),t.innerHTML+=b.render();var H=document.querySelector("#toggle-input-display-button");b.activateButton(H),m.innerHTML+=y.render(),m.innerHTML+=g.render(),m.innerHTML+=w.render(),e.appendChild(t);
},{"./appWrapper.js":"lD1s","./addArtist.js":"3Dko","./addAlbum":"UyHQ","./addSong":"4kO8","./showArtists":"Tc4M","./AddStuffDisplay":"ppbk"}]},{},["Focm"], null)
//# sourceMappingURL=/index.map