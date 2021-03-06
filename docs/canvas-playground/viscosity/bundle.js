/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _classCallCheck2 = __webpack_require__(8);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(9);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var canvas = document.querySelector('canvas'),
	    ctx = canvas.getContext('2d'),
	    leftColor = '#98f',
	    rightColor = '#4e88b4',
	    totalPoints = 6,
	    threshold = 200,
	    viscosity = 10,
	    damping = 0.1;
	var timer = void 0,
	    mouseTimer = void 0,
	    points = void 0,
	    gutter = void 0,
	    mouseX = 0,
	    mouseY = 0,
	    lastMouseX = 0,
	    lastMouseY = 0,
	    mouseVelX = 0,
	    mouseVelY = 0,
	    mouseDirectionX = 'none';

	var Point = function () {
		function Point(x, y) {
			(0, _classCallCheck3.default)(this, Point);

			this.x = x;
			this.originX = x;
			this.velX = 0;
			this.y = y;
			this.originY = y;
		}

		(0, _createClass3.default)(Point, [{
			key: 'update',
			value: function update() {
				var distanceX = this.x - mouseX,
				    distanceY = this.y - mouseY;

				this.velX += (this.originX - this.x) / viscosity;
				if (mouseDirectionX === 'right' && mouseX > this.x || mouseDirectionX === 'left' && mouseX < this.x) {
					if (Math.abs(distanceX) < threshold && Math.abs(distanceY) < gutter) {
						this.velX = mouseVelX / 2;
					}
				}
				this.velX *= 1 - damping;
				this.x += this.velX;
			}
		}]);
		return Point;
	}();

	function init() {
		initCanvas();
		bindEvents();
	}

	function initCanvas() {
		var i = void 0;

		cancelAnimationFrame(timer);
		cancelAnimationFrame(mouseTimer);
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		points = [];
		gutter = canvas.height / (totalPoints - 1);
		for (i = 0; i < totalPoints; i++) {
			points.push(new Point(canvas.width / 2, i * gutter));
		}
		updateMouseDirection();
		update();
	}

	function update() {
		points.forEach(function (point) {
			point.update();
		});
		draw();
		timer = requestAnimationFrame(update);
	}

	function draw() {
		var midx = void 0,
		    midy = void 0,
		    i = void 0;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = leftColor;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = rightColor;
		ctx.beginPath();
		ctx.moveTo(canvas.width / 2, 0);
		for (i in points) {
			if (+i !== points.length - 1) {
				midx = (points[i].x + points[+i + 1].x) / 2;
				midy = (points[i].y + points[+i + 1].y) / 2;
			} else {
				midx = points[i].originX;
				midy = points[i].originY;
			}
			ctx.quadraticCurveTo(points[i].x, points[i].y, midx, midy);
		}
		ctx.lineTo(canvas.width, canvas.height);
		ctx.lineTo(canvas.width, 0);
		ctx.fill();
	}

	function mousemove(e) {
		if (mouseX !== 0) {
			mouseVelX = e.pageX - mouseX;
			mouseVelY = e.pageY - mouseY;
		}
		mouseX = e.pageX;
		mouseY = e.pageY;
	}

	function updateMouseDirection() {
		if (mouseX < lastMouseX) {
			mouseDirectionX = 'left';
		} else if (mouseX > lastMouseX) {
			mouseDirectionX = 'right';
		} else {
			mouseDirectionX = 'none';
		}
		lastMouseX = mouseX;
		lastMouseY = mouseY;
		mouseTimer = requestAnimationFrame(updateMouseDirection);
	}

	function bindEvents() {
		window.addEventListener('resize', initCanvas);
		window.addEventListener('mousemove', mousemove);
	}

	init();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(4)(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	var core = module.exports = { version: '2.5.3' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(12);
	var IE8_DOM_DEFINE = __webpack_require__(17);
	var toPrimitive = __webpack_require__(19);
	var dP = Object.defineProperty;

	exports.f = __webpack_require__(1) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(10), __esModule: true };

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(7);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(20);
	var $Object = __webpack_require__(3).Object;
	module.exports = function defineProperty(it, key, desc) {
	  return $Object.defineProperty(it, key, desc);
	};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(2);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(11);
	module.exports = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(2);
	var document = __webpack_require__(5).document;
	// typeof document.createElement is 'object' in old IE
	var is = isObject(document) && isObject(document.createElement);
	module.exports = function (it) {
	  return is ? document.createElement(it) : {};
	};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(5);
	var core = __webpack_require__(3);
	var ctx = __webpack_require__(13);
	var hide = __webpack_require__(16);
	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var IS_WRAP = type & $export.W;
	  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
	  var expProto = exports[PROTOTYPE];
	  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && key in exports) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	module.exports = $export;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(6);
	var createDesc = __webpack_require__(18);
	module.exports = __webpack_require__(1) ? function (object, key, value) {
	  return dP.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(1) && !__webpack_require__(4)(function () {
	  return Object.defineProperty(__webpack_require__(14)('div'), 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),
/* 18 */
/***/ (function(module, exports) {

	module.exports = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(2);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function (it, S) {
	  if (!isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(15);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(1), 'Object', { defineProperty: __webpack_require__(6).f });


/***/ })
/******/ ]);