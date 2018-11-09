// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"js/app.js":[function(require,module,exports) {
var currentArtistId = window.location.pathname.split('/')[2];
var albumSubmitButton = document.querySelector('.albumSubmit');
var artistSubmitButton = document.querySelector('.artistSubmit');
var songSubmitButton = document.querySelector('.songSubmit');
var albumName = document.querySelector('#albumName');
var albumImage = document.querySelector('#albumImage');
var artistName = document.querySelector('#artistName');
var artistImage = document.querySelector('#artistImage');
var artistAge = document.querySelector('#artistAge');
var artistHome = document.querySelector('#artistHome');
var songName = document.querySelector('#songName');
var songLength = document.querySelector('#songLength');
var songLink = document.querySelector('#songLink'); //This code might actually do too much, it displays the artists AND their albums. We just want to show the artists. And make it so you can click the artist to see the album.
// let artistSection = document.querySelector('#artists')
// getArtists()
// function getArtists() {
// 	const xhttp = new XMLHttpRequest();
// 	xhttp.onreadystatechange = function() {
// 		if (this.readyState == 4 && this.status == 200) {
// 			let allArtists = JSON.parse(this.responseText) //allArtists is what we got back from the API via AJAX
// 			let listOfAllArtists = document.createElement('ul') //create a list for artists
// 			allArtists.forEach(artist => {
// 				const artistHeader = document.createElement('li')
// 				artistHeader.innerText = artist.name
// 				let artistUl = document.createElement('ul') //create a list for albums
// 				artist.albums.forEach(album => {
// 					let albumLi = document.createElement('li')
// 					albumLi.innerText = album.name
// 					artistUl.appendChild(albumLi)
// 				})
// 				listOfAllArtists.appendChild(artistHeader)
// 				listOfAllArtists.appendChild(artistUl)
// 			})
// 			artistSection.appendChild(listOfAllArtists)
// 		}
// 	}
// 	xhttp.open("GET", '/api/artists', true)
// 	xhttp.send()
// }

var artistSection = document.querySelector('#artists');
var albumSection = document.querySelector('#albums');
var songSection = document.querySelector('#songs');
getArtists();

function getArtists() {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "/api/artists", true);
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var allArtists = JSON.parse(this.responseText); //this.response text is the response from the server

      showArtists(allArtists);
    }
  };
}

function showArtists(allArtists) {
  artistSection.innerHTML = '';
  allArtists.forEach(function (artist) {
    var artistHeader = document.createElement('h1');
    artistHeader.innerText = artist.name;
    artistHeader.addEventListener('click', function () {
      getAlbums(artist.id);
    });
    artistSection.appendChild(artistHeader);
  });
}

function getAlbums(artistId) {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var allAlbums = JSON.parse(this.responseText);
      showAlbums(allAlbums, artistId);
    }
  };

  xhttp.open("GET", "/api/".concat(artistId, "/albums"), true);
  xhttp.send();
}

function showAlbums(allAlbums, artistId) {
  albumSection.innerHTML = '';
  songSection.innerHTML = '';
  allAlbums.forEach(function (album) {
    var albumHeader = document.createElement('h3');
    albumHeader.innerText = album.name;
    albumHeader.addEventListener('click', function () {
      getSongs(album.id, artistId);
    });
    albumSection.appendChild(albumHeader);
  });
}

function getSongs(albumId, artistId) {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var allSongs = JSON.parse(this.responseText);
      showSongs(allSongs);
    }
  };

  xhttp.open("GET", "/api/".concat(artistId, "/albums/").concat(albumId, "/songs"), true);
  xhttp.send();
}

function showSongs(allSongs) {
  songSection.innerHTML = '';
  allSongs.forEach(function (song) {
    var songHeader = document.createElement('h4');
    songHeader.innerText = song.name; //add an event listener here so that songs can display their length, etc...

    songSection.appendChild(songHeader);
  });
} ////////////////////  ADDING NEW DATA //////////////////////////////////////


albumSubmitButton.addEventListener('click', function () {
  addANewAlbum();
});
artistSubmitButton.addEventListener('click', function () {
  addANewArtist();
});
songSubmitButton.addEventListener('click', function () {
  addNewSong();
});

function addANewArtist() {
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/api/artist/add", true); //this is what this.responseText is

  var artist = JSON.stringify({
    name: artistName.value,
    image: artistImage.value,
    age: artistAge.value,
    home: artistHome.value
  });
  xhttp.send(artist);

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      artistName.value = '';
      artistImage.value = '';
      artistAge.value = '';
      artistHome.value = '';
    }
  };
}

function addANewAlbum() {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      albumName.value = '';
      albumImage.value = '';
    }
  };

  xhttp.open("POST", "/api/artists/1/albums/add", true); //this is what "this.responseText" is

  var content = JSON.stringify({
    name: albumName.value,
    image: albumImage.value
  });
  xhttp.send(content);
}

function addNewSong() {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      songName.value = '';
      songLink.value = '';
      songLength.value = '';
    }
  };

  xhttp.open("POST", "/api/artists/1/albums/2/songs/add", true); //1 is Captain Carrion and the Buzzards, 2 is their Album

  var song = JSON.stringify({
    name: songName.value,
    length: songLength.value,
    link: songLink.value
  });
  xhttp.send(song);
}
},{}],"../../../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57249" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/app.js"], null)
//# sourceMappingURL=/app.c3f9f951.map