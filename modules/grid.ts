export class Grid {
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Vector.ts":
/*!***********************!*\
  !*** ./src/Vector.ts ***!
  \***********************/
/*! exports provided: Vector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector", function() { return Vector; });
var Vector = (function () {
    function Vector(i, j) {
        this.i = i;
        this.j = j;
    }
    Vector.prototype.copy = function () {
        return new Vector(this.i, this.j);
    };
    Vector.prototype.magnitude = function () {
        return Math.sqrt(Math.pow(this.i, 2) + Math.pow(this.j, 2));
    };
    Vector.prototype.normalized = function () {
        return this.divide(this.magnitude());
    };
    Vector.prototype.add = function (vector) {
        var result = this.copy();
        result.i += vector.i;
        result.j += vector.j;
        return result;
    };
    Vector.prototype.subtract = function (vector) {
        var result = this.copy();
        result.i -= vector.i;
        result.j -= vector.j;
        return result;
    };
    Vector.prototype.divide = function (scalar) {
        var result = this.copy();
        result.i /= scalar;
        result.j /= scalar;
        return result;
    };
    Vector.prototype.multiply = function (scalar) {
        var result = this.copy();
        result.i *= scalar;
        result.j *= scalar;
        return result;
    };
    Vector.prototype.perpendicular = function () {
        return new Vector(-this.j, this.i);
    };
    Vector.prototype.transform = function (matrix) {
        var i = (matrix.data[0][0] * this.i) + (matrix.data[0][1] * this.j);
        var j = (matrix.data[1][0] * this.i) + (matrix.data[1][1] * this.j);
        return new Vector(i, j);
    };
    Vector.prototype.toString = function () {
        return "(" + this.i + ", " + this.j + ")";
    };
    return Vector;
}());



/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector */ "./src/Vector.ts");

function drawGrid () {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;
    var scale = 50;
    var pixelOffset = {
        x: 0,
        y: 0
    };
    var darkGray = "#222";
    var offwhite = "#EBEBEB";
    var lightGreen = "#90DCB5";
    var darkGreen = "#6BBCAC";
    ctx.font = "14px Roboto";
    var bgColor = darkGray;
    var fontColor = offwhite;
    var axisColor = lightGreen;
    var gridColor = darkGreen;
    function drawScreen() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = bgColor;
        ctx.strokeStyle = bgColor;
        ctx.fillRect(0, 0, width, height);
        var pixelOrigin = {
            x: width / 2 - pixelOffset.x,
            y: height / 2 - pixelOffset.y
        };
        function drawHorizontalAxis() {
            ctx.beginPath();
            ctx.moveTo(0, pixelOrigin.y);
            ctx.lineTo(width, pixelOrigin.y);
            ctx.strokeStyle = axisColor;
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        function drawVerticalAxis() {
            ctx.beginPath();
            ctx.moveTo(pixelOrigin.x, 0);
            ctx.lineTo(pixelOrigin.x, height);
            ctx.strokeStyle = axisColor;
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        function drawGrid() {
            ctx.strokeStyle = gridColor;
            ctx.fillStyle = fontColor;
            var leftEdge = Math.floor(-(width / 2 - pixelOffset.x) / scale);
            var rightEdge = Math.ceil((width / 2 + pixelOffset.x) / scale);
            for (var x = leftEdge; x <= rightEdge; x++) {
                var px = pixelOrigin.x + scale * x;
                ctx.beginPath();
                ctx.moveTo(px, 0);
                ctx.lineTo(px, height);
                ctx.lineWidth = 0.25;
                ctx.stroke();
                if (x !== 0 && x % 5 === 0) {
                    ctx.fillText(x.toString(), px, pixelOrigin.y);
                }
            }
            var topEdge = Math.floor(-(height / 2 - pixelOffset.y) / scale);
            var bottomEdge = Math.ceil((height / 2 + pixelOffset.y) / scale);
            for (var y = topEdge; y <= bottomEdge; y++) {
                var py = pixelOrigin.y + scale * y;
                ctx.beginPath();
                ctx.moveTo(0, py);
                ctx.lineTo(width, py);
                ctx.lineWidth = 0.25;
                ctx.stroke();
                if (y !== 0 && y % 5 === 0) {
                    ctx.fillText((-y).toString(), pixelOrigin.x, py);
                }
            }
        }
        function drawFunction(mathFunction, color, doSubPixel) {
            if (doSubPixel === void 0) { doSubPixel = false; }
            var previousX = undefined;
            var previousY = undefined;
            ctx.beginPath();
            if (doSubPixel) {
                for (var px = 0; px < width; px += (1 / scale)) {
                    for (var subX = 0; subX < 1 / scale; subX += (1 / scale) / 10) {
                        var x = (((px + subX) + pixelOffset.x) / scale) - ((width / scale) / 2);
                        var y = -mathFunction(x);
                        var py = pixelOrigin.y + scale * y;
                        if (previousY !== undefined) {
                            if (py < 0 || py >= height) {
                                if (previousY >= 0 && previousY < height) {
                                    ctx.lineTo(px + subX, py);
                                }
                            }
                            else {
                                if (previousY < 0 || previousY >= height) {
                                    ctx.moveTo(previousX, previousY);
                                }
                                if (subX === 0) {
                                    if (py >= 0 && py < height) {
                                        if (Math.abs(previousY - py) > (height)) {
                                            ctx.moveTo(px, py);
                                        }
                                        else {
                                            ctx.lineTo(px, py);
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            if (subX === 0) {
                                ctx.moveTo(px, py);
                            }
                        }
                        previousY = py;
                        previousX = px + subX;
                    }
                }
            }
            else {
                for (var px = 0; px < width; px++) {
                    var x = (((px) + pixelOffset.x) / scale) - ((width / scale) / 2);
                    var y = -mathFunction(x);
                    var py = pixelOrigin.y + scale * y;
                    if (previousY !== undefined) {
                        if (py < 0 || py >= height) {
                            if (previousY >= 0 && previousY < height) {
                                ctx.lineTo(px, py);
                            }
                        }
                        else {
                            if (previousY < 0 || previousY >= height) {
                                ctx.moveTo(previousX, previousY);
                            }
                            if (py >= 0 && py < height) {
                                if (Math.abs(previousY - py) > (height)) {
                                    ctx.moveTo(px, py);
                                }
                                else {
                                    ctx.lineTo(px, py);
                                }
                            }
                        }
                    }
                    else {
                        ctx.moveTo(px, py);
                    }
                    previousY = py;
                    previousX = px;
                }
            }
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 1;
        }
        function drawParametric(Xfunct, Yfunct, ti, tf, color, fill) {
            if (fill === void 0) { fill = false; }
            var previousX = undefined;
            var previousY = undefined;
            ctx.beginPath();
            for (var t = ti; t <= tf; t += (1 / scale)) {
                var x = Xfunct(t);
                var y = -Yfunct(t);
                var px = pixelOrigin.x + scale * x;
                var py = pixelOrigin.y + scale * y;
                if (previousY !== undefined) {
                    if (py < 0 || py >= height) {
                        if (previousY >= 0 && previousY < height) {
                            ctx.lineTo(px, py);
                        }
                    }
                    else {
                        if (previousY < 0 || previousY >= height) {
                            ctx.moveTo(previousX, previousY);
                        }
                        if (py >= 0 && py < height) {
                            if (Math.abs(previousY - py) > (height)) {
                                ctx.moveTo(px, py);
                            }
                            else {
                                ctx.lineTo(px, py);
                            }
                        }
                    }
                }
                else {
                    ctx.moveTo(px, py);
                }
                previousY = py;
                previousX = px;
            }
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.lineWidth = 2;
            if (fill) {
                ctx.fill();
            }
            else {
                ctx.stroke();
            }
            ctx.strokeStyle = "#000";
            ctx.fillStyle = "#000";
            ctx.lineWidth = 1;
        }
        function drawVector(vector, color, originX, originY, arrow) {
            if (originX === void 0) { originX = 0; }
            if (originY === void 0) { originY = 0; }
            if (arrow === void 0) { arrow = true; }
            var pixelVector = new _Vector__WEBPACK_IMPORTED_MODULE_0__["Vector"](scale * vector.i, scale * -vector.j);
            var a = pixelVector.normalized().multiply(20);
            var c = pixelVector.subtract(a);
            var b = pixelVector.perpendicular().normalized().multiply(10);
            var d = c.add(b);
            var e = c.subtract(b);
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo((originX * scale) + pixelOrigin.x, (-originY * scale) + pixelOrigin.y);
            if (arrow) {
                ctx.lineTo((originX * scale) + pixelOrigin.x + c.i, (-originY * scale) + pixelOrigin.y + c.j);
            }
            else {
                ctx.lineTo((originX * scale) + pixelOrigin.x + pixelVector.i, (-originY * scale) + pixelOrigin.y + pixelVector.j);
            }
            ctx.stroke();
            if (arrow) {
                ctx.beginPath();
                ctx.moveTo((originX * scale) + pixelOrigin.x + pixelVector.i, (-originY * scale) + pixelOrigin.y + pixelVector.j);
                ctx.lineTo((originX * scale) + pixelOrigin.x + d.i, (-originY * scale) + pixelOrigin.y + d.j);
                ctx.lineTo((originX * scale) + pixelOrigin.x + e.i, (-originY * scale) + pixelOrigin.y + e.j);
                ctx.fill();
            }
            ctx.strokeStyle = "#000";
            ctx.fillStyle = "#000";
            ctx.lineWidth = 1;
        }
        drawHorizontalAxis();
        drawVerticalAxis();
        drawGrid();
        {
            var white = "#ffffff";
            var yellow = "#DDCA6F";
            var blue = "#3197FF";
            var red = "#EA5356";
            var orange = "#FFA500";
            var a = Math.sin(Date.now() / 10000) * 10;
            var V1 = new _Vector__WEBPACK_IMPORTED_MODULE_0__["Vector"](5, 5);
            drawVector(V1, red, 0, 0, true);
            var V2 = new _Vector__WEBPACK_IMPORTED_MODULE_0__["Vector"](3, -1);
            drawVector(V2, yellow, V1.i, V1.j, true);
            var V3 = V1.add(V2);
            drawVector(V3, blue, 0, 0, true);
        }
        requestAnimationFrame(drawScreen);
    }
    ;
    window.onresize = function () {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };
    canvas.onwheel = function (event) {
        var beforeOffsetX = pixelOffset.x;
        var beforeOffsetY = pixelOffset.y;
        var beforeOffsetXCart = pixelOffset.x / scale;
        var beforeOffsetYCart = pixelOffset.y / scale;
        scale -= event.deltaY * scale / 2500;
        pixelOffset.x = beforeOffsetXCart * scale;
        pixelOffset.y = beforeOffsetYCart * scale;
        if (scale < 8) {
            scale = 8;
            pixelOffset.x = beforeOffsetX;
            pixelOffset.y = beforeOffsetY;
        }
    };
    {
        var drag_1 = false;
        var mouseX_1 = 0;
        var mouseY_1 = 0;
        canvas.onmousedown = function (event) {
            drag_1 = true;
            mouseX_1 = event.clientX + pixelOffset.x;
            mouseY_1 = event.clientY + pixelOffset.y;
        };
        canvas.onmousemove = function (event) {
            var currentMouseX = event.clientX;
            var currentMouseY = event.clientY;
            if (drag_1) {
                pixelOffset.x = mouseX_1 - currentMouseX;
                pixelOffset.y = mouseY_1 - currentMouseY;
            }
        };
        canvas.onmouseup = function (event) {
            drag_1 = false;
        };
    }
    drawScreen();
};


/***/ })

/******/ });
}
}
