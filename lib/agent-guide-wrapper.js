(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("rxjs"));
	else if(typeof define === 'function' && define.amd)
		define("agent-guide-wrapper", ["rxjs"], factory);
	else if(typeof exports === 'object')
		exports["agent-guide-wrapper"] = factory(require("rxjs"));
	else
		root["agent-guide-wrapper"] = factory(root["rxjs"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _rxjs = __webpack_require__(0);

var _rxjs2 = _interopRequireDefault(_rxjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AgentGuide(socket) {
    this.sock = socket;
}

AgentGuide.prototype.resolveIncMessage = function (dataObj) {
    //assuming dataObj.evType
    console.log('AG obj received inc message: ' + dataObj.evType);
    //  const evType = dataObj.evType;
    //    this.emitter.send(evType, dataObj);
};

AgentGuide.prototype.getStream = function () {
    var _this = this;

    var streamQuery = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var evStreamsArr = streamQuery.map(function (queryStr) {
        return _rxjs2.default.Observable.create(function (thisAg, expectedType) {
            return function (observer) {
                thisAg.sock.on('message', function (obs, expectedType) {
                    return function (sockMess) {
                        var jsonObj = (typeof sockMess === 'undefined' ? 'undefined' : _typeof(sockMess)) === 'object' ? sockMess : JSON.parse(sockMess);
                        if (jsonObj.evType === expectedType) obs.onNext(jsonObj);
                    };
                }(observer, expectedType));

                //return unsub() { ... }
            };
        }(_this, queryStr));
    });
    return _rxjs2.default.Observable.merge.apply(undefined, evStreamsArr);
};

AgentGuide.prototype.sendMessage = function (mess) {
    this.sock.send((typeof mess === 'undefined' ? 'undefined' : _typeof(mess)) === 'object' ? JSON.stringify(mess) : mess);
};

exports.default = AgentGuide;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=agent-guide-wrapper.js.map