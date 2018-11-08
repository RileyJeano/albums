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
})({"appWrapper.js":[function(require,module,exports) {
var AppWrapper = function () {
  var appWrapper = document.createElement('div');
  appWrapper.classList.add('wrapper');
  return appWrapper;
}();

module.exports = {
  AppWrapper: AppWrapper
};
},{}],"addArtist.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// const addArtist = (function() {
// 	function addArtist() {}
// 	addArtist.prototype = {
// 		render: function() {
// 			return `
// 				<section class="addArtist"> 
// 					<p>Add Artist: </p>
// 					<label> Artist Name: <input id="artistName" type="text" name="artistName"/> </label>
// 					<label> Artist Image: <input id="artistImage" type="text" name="artistImage"/> </label>
// 					<label> Artist Age: <input id="artistAge" type="text" name="artistAge"/> </label>
// 					<label> Artist Home: <input id="artistHome" type="text" name="artistHome"/> </label>
// 					<button class="artistSubmit">Submit</button>
// 				</section>
// 			`
// 		}
// 	}
// 	return addArtist
// })()
// module.exports = {
// 	addArtist
// }
var AddArtist =
/*#__PURE__*/
function () {
  function AddArtist() {
    _classCallCheck(this, AddArtist);
  }

  _createClass(AddArtist, [{
    key: "render",
    value: function render() {
      return "\n\t\t\t\t<section class=\"addArtist\"> \n\t\t\t\t\t<p>Add Artist: </p>\n\t\t\t\t\t<label> Artist Name: <input id=\"artistName\" type=\"text\" name=\"artistName\"/> </label>\n\t\t\t\t\t<label> Artist Image: <input id=\"artistImage\" type=\"text\" name=\"artistImage\"/> </label>\n\t\t\t\t\t<label> Artist Age: <input id=\"artistAge\" type=\"text\" name=\"artistAge\"/> </label>\n\t\t\t\t\t<label> Artist Home: <input id=\"artistHome\" type=\"text\" name=\"artistHome\"/> </label>\n\t\t\t\t\t<button class=\"artistSubmit\">Submit</button>\n\t\t\t\t</section>\n\t\t";
    }
  }]);

  return AddArtist;
}();

module.exports = {
  AddArtist: AddArtist
};
},{}],"addAlbum.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AddAlbum =
/*#__PURE__*/
function () {
  function AddAlbum() {
    _classCallCheck(this, AddAlbum);
  }

  _createClass(AddAlbum, [{
    key: "render",
    value: function render() {
      return "\n\t\t\t<section class=\"addAlbum\"> \n\t\t\t\t<p>Add Album: </p>\n\t\t\t\t<label> Album Name: <input id=\"albumName\" type=\"text\" name=\"albumName\"/> </label>\n\t\t\t\t<label> Album Image: <input id=\"albumImage\" type=\"text\" name=\"albumImage\"/> </label>\n\t\t\t\t<button class=\"albumSubmit\">Submit</button>\n\t\t\t</section>\n\t\t";
    }
  }]);

  return AddAlbum;
}();

module.exports = {
  AddAlbum: AddAlbum
};
},{}],"addSong.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AddSong =
/*#__PURE__*/
function () {
  function AddSong() {
    _classCallCheck(this, AddSong);
  }

  _createClass(AddSong, [{
    key: "render",
    value: function render() {
      return "\n\t\t\t<section class=\"addSong\">\n\t\t\t\t<p>Add Song:</p>\n\t\t\t\t<label> Song Name: <input id=\"songName\" type=\"text\" name=\"songName\"/> </label>\n\t\t\t\t<label> Song Length: <input id=\"songLength\" type=\"text\" name=\"songLength\"/> </label>\n\t\t\t\t<label> Song Link: <input id=\"songLink\" type=\"text\" name=\"songLink\"/> </label>\n\t\t\t\t<button class=\"songSubmit\">Submit</button>\n\t\t\t</section>\n\t\t";
    }
  }]);

  return AddSong;
}();

module.exports = {
  AddSong: AddSong
};
},{}],"index.js":[function(require,module,exports) {
var entry = document.querySelector('#app'); //Imports

var _require = require('./appWrapper.js'),
    AppWrapper = _require.AppWrapper;

var _require2 = require('./addArtist.js'),
    AddArtist = _require2.AddArtist;

var _require3 = require('./addAlbum'),
    AddAlbum = _require3.AddAlbum;

var _require4 = require('./addSong'),
    AddSong = _require4.AddSong; //App Components


var addArtist = new AddArtist();
var addAlbum = new AddAlbum();
var addSong = new AddSong(); //Build App

AppWrapper.innerHTML += addArtist.render();
AppWrapper.innerHTML += addAlbum.render();
AppWrapper.innerHTML += addSong.render();
entry.appendChild(AppWrapper);
},{"./appWrapper.js":"appWrapper.js","./addArtist.js":"addArtist.js","./addAlbum":"addAlbum.js","./addSong":"addSong.js"}],"../../../../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49357" + '/');

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
},{}]},{},["../../../../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/index.map