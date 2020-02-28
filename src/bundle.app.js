/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "src/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./devfile/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./devfile/app.js":
/*!************************!*\
  !*** ./devfile/app.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _class_Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./class/Board */ \"./devfile/class/Board.js\");\n/* harmony import */ var _class_Cheker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./class/Cheker */ \"./devfile/class/Cheker.js\");\n\n\nvar brd = new _class_Board__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nbrd.addNumber();\nbrd.getCells().cell_21.cheker_obj = new _class_Cheker__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('b', brd.getCells().cell_21.xy, brd.getCells.bind(brd));\nbrd.getCells().cell_5.cheker_obj = new _class_Cheker__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('w', brd.getCells().cell_5.xy, brd.getCells.bind(brd));\nbrd.draw();\n$('.black').click(function () {\n  var index = $(this).data('index');\n  var data = brd.getCells()['cell_' + index];\n\n  if (data.cheker_obj !== null) {\n    var current_cheker = data.cheker_obj;\n    var steps = current_cheker.getPossibleSteps();\n    brd.cellLigh(steps);\n    console.log(steps);\n  }\n});\n\n//# sourceURL=webpack:///./devfile/app.js?");

/***/ }),

/***/ "./devfile/class/Board.js":
/*!********************************!*\
  !*** ./devfile/class/Board.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Board; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Board =\n/*#__PURE__*/\nfunction () {\n  function Board() {\n    _classCallCheck(this, Board);\n\n    this._cells = {};\n    this._turn = 'w';\n    var i = 0;\n\n    for (var yi = 0; yi < 8; yi++) {\n      for (var xi = 0; xi < 4; xi++) {\n        this._cells['cell_' + i] = {\n          xy: {\n            x: xi,\n            y: yi,\n            index: i\n          },\n          cheker_obj: null\n        };\n        i++;\n      }\n    }\n  }\n\n  _createClass(Board, [{\n    key: \"getCells\",\n    value: function getCells() {\n      return this._cells;\n    }\n  }, {\n    key: \"draw\",\n    value: function draw() {\n      var cells = this.getCells();\n\n      for (var cell in cells) {\n        if (this.getCells()[cell].cheker_obj !== null) {\n          var cherker = this.getCells()[cell].cheker_obj;\n          var color = cherker.getColor();\n          var elem = this.htmlElem(cell);\n          var className = color === 'b' ? 'dott-b' : 'dott-w';\n          $(elem).addClass(className);\n        }\n      }\n    }\n  }, {\n    key: \"setTurn\",\n    value: function setTurn(turn) {\n      this._turn = turn;\n    }\n  }, {\n    key: \"chekerDestroy\",\n    value: function chekerDestroy(cell) {\n      this.getCells()[cell].cheker_obj = null;\n    }\n  }, {\n    key: \"htmlElem\",\n    value: function htmlElem(cell) {\n      var current_cell = this.getCells()[cell];\n      var x = current_cell.xy.x;\n      var y = current_cell.xy.y;\n      var elem = document.querySelector('[data-x=\"' + x + '\"][data-y=\"' + y + '\"]');\n      return elem;\n    }\n  }, {\n    key: \"addNumber\",\n    value: function addNumber() {\n      var i = 0;\n      var cells = this.getCells();\n\n      for (var key in cells) {\n        var elem = this.htmlElem(key);\n        elem.innerText = i;\n        $(elem).data('index', i);\n        i++;\n      }\n    }\n  }, {\n    key: \"cellLigh\",\n    value: function cellLigh(cells) {\n      var _this = this;\n\n      $('.green').removeClass('green');\n      cells.forEach(function (cell_number) {\n        var elem = _this.htmlElem('cell_' + cell_number);\n\n        elem.classList.add(\"green\");\n      });\n    }\n  }]);\n\n  return Board;\n}();\n\n\n\n//# sourceURL=webpack:///./devfile/class/Board.js?");

/***/ }),

/***/ "./devfile/class/Cheker.js":
/*!*********************************!*\
  !*** ./devfile/class/Cheker.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Cheker; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Cheker =\n/*#__PURE__*/\nfunction () {\n  function Cheker(color, position, callback) {\n    _classCallCheck(this, Cheker);\n\n    this._color = color;\n    this._oldPosition = null;\n    this.getCells = callback;\n    this._type = 0;\n    this._steps = {\n      move: [],\n      attack: []\n    };\n    this._position = position;\n  }\n\n  _createClass(Cheker, [{\n    key: \"getPosition\",\n    value: function getPosition() {\n      return this._position;\n    }\n  }, {\n    key: \"getColor\",\n    value: function getColor() {\n      return this._color;\n    }\n  }, {\n    key: \"setPosition\",\n    value: function setPosition(position) {\n      this._oldPosition = this.getPosition();\n      this._position = position;\n    }\n  }, {\n    key: \"getMathVal\",\n    value: function getMathVal() {\n      var mathval = 0;\n      var color = this.getColor();\n      var y = this.getPosition().y;\n\n      if (y % 2 !== 0) {\n        mathval = 1;\n      }\n\n      if (color === 'b') {\n        mathval -= 8;\n      }\n\n      return parseInt(mathval);\n    }\n  }, {\n    key: \"getSteps\",\n    value: function getSteps() {\n      return this._steps;\n    }\n  }, {\n    key: \"bussyTest\",\n    value: function bussyTest(index) {\n      var obj = this.getCells()['cell_' + index];\n\n      if (obj.cheker_obj === null) {\n        this.getSteps().move.push(index);\n      }\n    }\n  }, {\n    key: \"getPossibleSteps\",\n    value: function getPossibleSteps() {\n      var cells = this.getCells();\n      this.getSteps().move = [];\n      var x = this.getPosition().x;\n      var magicVal = this.getMathVal();\n      var id = parseInt(this.getPosition().index);\n      if (x > 0) this.bussyTest(id + 3 + magicVal);\n      if (x < 3) this.bussyTest(id + 4 + magicVal);\n      return this.getSteps().move;\n    }\n  }]);\n\n  return Cheker;\n}();\n\n\n\n//# sourceURL=webpack:///./devfile/class/Cheker.js?");

/***/ })

/******/ });