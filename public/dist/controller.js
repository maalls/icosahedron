/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ var __webpack_modules__ = ({

/***/ "./src/Controller.js":
/*!***************************!*\
  !*** ./src/Controller.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Controller\": () => (/* binding */ Controller)\n/* harmony export */ });\n/* harmony import */ var _implementation_Impl1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./implementation/Impl1 */ \"./src/implementation/Impl1.js\");\n/* harmony import */ var _implementation_Impl2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./implementation/Impl2 */ \"./src/implementation/Impl2.js\");\n/* harmony import */ var _implementation_Impl3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./implementation/Impl3 */ \"./src/implementation/Impl3.js\");\n/* harmony import */ var _implementation_Impl4__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./implementation/Impl4 */ \"./src/implementation/Impl4.js\");\n/* harmony import */ var _implementation_Impl5__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./implementation/Impl5 */ \"./src/implementation/Impl5.js\");\n\n\n\n\n\n\nclass Controller {\n\n\n    constructor(engine) {\n\n        let impls = [new _implementation_Impl5__WEBPACK_IMPORTED_MODULE_4__.Impl5(), new _implementation_Impl1__WEBPACK_IMPORTED_MODULE_0__.Impl1(), new _implementation_Impl2__WEBPACK_IMPORTED_MODULE_1__.Impl2(), new _implementation_Impl3__WEBPACK_IMPORTED_MODULE_2__.Impl3(), new _implementation_Impl4__WEBPACK_IMPORTED_MODULE_3__.Impl4()];\n        let params = new URLSearchParams(window.location.search);\n        \n        let implIndex = params.has('impl') ? params.get('impl') : 0;\n        let impl = impls[implIndex];\n\n        engine.setImplementation(impl);\n\n        let play = params.has('autoplay') && parseInt(params.get('autoplay')) ? true : false;\n\n        if (play) {\n            engine.play();\n        }\n\n        const implSelect = document.createElement('select');\n\n\n        impls.forEach((impl, key) => {\n            console.log(impl);\n            const option = document.createElement('option');\n            option.value = key;\n            option.innerHTML = impl.ui.name;\n            if (key == implIndex) {\n                option.selected = \"selected\";\n            }\n            implSelect.appendChild(option);\n        });\n        implSelect.onchange = function (event) {\n            console.log(this.selectedIndex);\n            impl = impls[this.selectedIndex];\n            params.set('impl', this.selectedIndex);\n            var newRelativePathQuery = window.location.pathname + '?' + params.toString();\n            history.pushState(null, '', newRelativePathQuery);\n            engine.setImplementation(impl);\n            engine.reset();\n        }\n\n        \n        document.getElementById('impl-settings').appendChild(implSelect);\n\n        \n\n        const mainDiv = document.createElement('div');\n        mainDiv.style.position = 'absolute';\n        mainDiv.style.top = 0;\n        mainDiv.style.left = 0;\n        mainDiv.style.padding = 5;\n        document.body.appendChild(mainDiv);\n        const playButton = document.createElement('button');\n        playButton.innerText = engine.isPlaying ? 'pause' : 'play';\n        playButton.onclick = (event) => {\n            event.preventDefault();\n            if (engine.isPlaying) {\n                engine.pause(); \n                playButton.innerText = 'play';\n            }\n            else {\n                engine.play();\n                playButton.innerText = 'pause';\n            }\n        }\n        mainDiv.appendChild(playButton);\n\n\n        ['step', 'undo', 'reset', 'clear'].forEach(action => {\n            let button = document.createElement('button');\n            button.innerText = action;\n            button.onclick = e => {\n                e.preventDefault();\n                engine[action]();\n            }\n            mainDiv.appendChild(button);\n            //alert(\"OK\");\n        });\n\n        /*document.getElementById('step').onclick = (event) => {\n            event.preventDefault();\n            engine.update();\n        }\n\n        document.getElementById('undo').onclick = (event) => {\n            event.preventDefault();\n            engine.undo();\n        }\n        \n\n        document.getElementById('reset').onclick = (event) => {\n            engine.reset();\n            \n        }\n        document.getElementById('clear').onclick = (event) => {\n            engine.clear();\n            engine.applyColors();\n            \n        }*/\n\n\n    }\n\n    \n\n}\n\n//# sourceURL=webpack:///./src/Controller.js?");

/***/ }),

/***/ "./src/implementation/Impl1.js":
/*!*************************************!*\
  !*** ./src/implementation/Impl1.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Impl1\": () => (/* binding */ Impl1)\n/* harmony export */ });\nclass Impl1 {\n    constructor() {\n        this.fps = 20;\n        this.n = 100;\n\n        this.ui = {\n            name: \"Heat diffusion\"\n        }\n    }\n\n    \n\n\n    init(ca) {\n        ca.setColor(1, 100);\n    }\n    update(ca, i) {\n\n        let color = ca.getColor(i);\n        let neighbor = ca.getNeigborCount(i);\n\n        //console.log('col',ca.faceCount, i, color);\n        // get the color value, divide by 4\n        let newColor = color / 10 * 7;\n\n        ca.getNeigbors(i).forEach(el => {\n            newColor += ca.getColor(el) / 10;\n        });\n        ca.setColor(i, newColor);\n\n    }\n}\n\n\n//# sourceURL=webpack:///./src/implementation/Impl1.js?");

/***/ }),

/***/ "./src/implementation/Impl2.js":
/*!*************************************!*\
  !*** ./src/implementation/Impl2.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Impl2\": () => (/* binding */ Impl2)\n/* harmony export */ });\nclass Impl2 {\n    constructor() {\n        this.fps = 2;\n        this.n = 100;\n\n        this.ui = {\n            name: \"Game of life\"\n        }\n    }\n    onClick(ca, i) {\n        ca.setColor( i, ca.getColor(i) ? 0 : 1);\n    }\n    init(ca) {\n        for(let i = 1; i <= ca.faceCount; i++) {\n            let ran = Math.random();\n            if(ran > 0.05) {\n                ca.setColor(i, 1);\n            }\n            \n        }\n        ca.setColor(1, 1);\n        \n    }\n    update(ca, i) {\n\n        let color = ca.getColor(i);\n        let neighbor = ca.getNeigborCount(i);\n        \n        if (neighbor == 0 || neighbor == 3) {\n\n            ca.setColor(i, 0);\n\n        }\n        else if (neighbor == 2) {\n\n            ca.setColor(i, 1);\n\n        }\n        else {\n            ca.setColor(i, color);\n        }\n\n    }\n}\n\n//# sourceURL=webpack:///./src/implementation/Impl2.js?");

/***/ }),

/***/ "./src/implementation/Impl3.js":
/*!*************************************!*\
  !*** ./src/implementation/Impl3.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Impl3\": () => (/* binding */ Impl3)\n/* harmony export */ });\nclass Impl3 {\n    constructor() {\n        this.fps = 12;\n        this.n = 100;\n\n        this.ui = {\n            name: \"Game of life 2\"\n        }\n    }\n    onClick(ca, i) {\n        console.log(\"click\", i);\n        ca.setColor(i, !ca.getColor(i));\n        return;\n\n    }\n\n    getUiSetting() {\n        return [\n            {\n                type: 'select',\n                options: [0, 10, 20, 30]\n            }\n        ];\n    }\n    init(ca) {\n        ca.setColor(1, 1);\n        return;\n        \n    }\n    update(ca, i) {\n\n        let color = ca.getColor(i);\n        let neighbor = ca.getNeigborCount(i);\n        \n        if (neighbor == 0 || neighbor == 3) {\n\n            ca.setColor(i, 0);\n\n        }\n        else if (neighbor == 2) {\n\n            ca.setColor(i, 1);\n\n        }\n        else {\n            ca.setColor(i, 1);\n        }\n\n    }\n}\n\n//# sourceURL=webpack:///./src/implementation/Impl3.js?");

/***/ }),

/***/ "./src/implementation/Impl4.js":
/*!*************************************!*\
  !*** ./src/implementation/Impl4.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Impl4\": () => (/* binding */ Impl4)\n/* harmony export */ });\nclass Impl4 {\n    constructor() {\n        this.fps = 4;\n        this.n = 10;\n\n        this.ui = {\n            name: \"Debug\"\n        }\n    }\n    onClick(ca, i) {\n        console.log(i, ca.getNeigbors(i));\n    }\n\n    init(ca) {\n        this.current = 0;\n        this.currentNeihbors = [];\n        return;\n    }\n\n    \n    loop(ca) {\n\n        this.current++;\n        console.log(\"current\", this.current);\n        for(let i = 1; i <= ca.faceCount; i++) {\n            ca.setColor(i, 0);\n        }\n        \n\n        ca.setColorRGB(this.current, 0, 1, 0);\n        let neighbors = ca.getNeigbors(this.current);\n        neighbors.forEach(element => {\n            ca.setColor(element, 1);\n        });\n        \n    }\n    update(ca, i) {\n\n        let neighbors = ca.getNeigbors(i);\n        //console.log('check', i, this.current, neighbors);\n        if(neighbors.includes(this.current)) {\n            \n            ca.setColor(i, 1);\n        }\n        else {\n            ca.setColor(i, 0);\n        }\n    }\n}\n\n//# sourceURL=webpack:///./src/implementation/Impl4.js?");

/***/ }),

/***/ "./src/implementation/Impl5.js":
/*!*************************************!*\
  !*** ./src/implementation/Impl5.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Impl5\": () => (/* binding */ Impl5)\n/* harmony export */ });\nclass Impl5 {\n    constructor() {\n        this.fps = 12;\n        this.n = 100;\n\n        this.ui = {\n            name: \"Rock Paper Scisor\"\n        }\n\n        this.walls = [];\n    }\n\n    \n    onClick(ca, i) {\n        console.log(\"click\", ca);\n        let ind = this.walls.indexOf(i);\n        if(ind >= 0) {\n            ca.setColorRGB(i, 0, 0, 0);\n            this.walls.splice(ind, 1);\n        }\n        else {\n            let color = ca.getColorRGB(i);\n            let ind = color.indexOf(1);\n            if(ind == -1) {\n                ca.setColorRGB(i, 1,0,0);\n            }\n            else if(ind == 0) {\n                ca.setColorRGB(i, 0, 1, 0);\n            }\n            else if(ind == 1) {\n                ca.setColorRGB(i, 0, 0, 1);\n            }\n            else if(ind == 2) {\n                //ca.setColorRGB(i, 0, 0, 0);\n                this.walls.push(i);\n                ca.setColorRGB(i, 1,0,1);\n            }\n        }\n\n    }\n\n    init(ca) {\n        \n        for(let i = 1; i <= ca.faceCount; i++) {\n\n            let val = Math.random() * 3;\n            let r,g,b;\n            if(val < 2.8) {\n                \n                    r = 1;\n                    g = b = 0;\n            }\n            else if(val < 2.90) {\n                g = 1;\n                r = b = 0;\n            }\n            else {\n                b = 1;\n                r = g = 0;\n            }\n\n            ca.setColorRGB(i, r,g,b)\n\n        }\n\n    }\n    update(ca, i) {\n\n        let color = ca.getColorRGB(i);\n        let newColor;\n\n        if(this.walls.includes(i)) {\n            ca.setColorRGB(i, 1,0,1);\n            return;\n        }\n        else if(color[0] == color[1] == color[2] == 0) {\n            \n            let stop = false;\n            let count = [0,0,0];\n            ca.getNeigbors(i).forEach(el => {\n                let rgb = ca.getColorRGB(el);\n                \n                if(rgb[0]) {\n                    count[0]++;\n                }\n                else if(rgb[1]) {\n                    count[1]++;\n                }\n                else if(rgb[2]) {\n                    count[2]++;\n                }\n            });\n            //console.log(count);\n            if(count[0] > count[1] && count[0] > count[2]) {\n                ca.setColorRGB(i, 1,0,0);\n            }\n            else if(count[1] > count[0] && count[1] > count[2]) {\n                ca.setColorRGB(i, 0,1,0);\n            }\n            else if(count[2] > count[0] && count[2] > count[1]) {\n                ca.setColorRGB(i, 0,0, 1);\n            }\n            else {\n                ca.setColorRGB(i, 0,0, 0);\n            }\n            return;\n        }\n        \n\n        let stop = false;\n        ca.getNeigbors(i).forEach(el => {\n            \n            let rgb = ca.getColorRGB(el);\n            if(stop) return;\n            if(rgb[0] && color[1]) {\n                ca.setColorRGB(i, 1,0,0);\n                stop = true;\n            }\n\n            else if(rgb[1] && color[2]) {\n                ca.setColorRGB(i, 0,1,0);\n                stop = true;\n            }\n\n            else if(rgb[2] && color[0]) {\n                ca.setColorRGB(i, 0,0,1);\n                stop = true;\n            }\n            else {\n                ca.setColorRGB(i, color[0], color[1], color[2]);\n            }\n            \n\n        });\n        \n\n    }\n}\n\n\n//# sourceURL=webpack:///./src/implementation/Impl5.js?");

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module can't be inlined because the eval devtool is used.
/******/ var __webpack_exports__ = __webpack_require__("./src/Controller.js");
/******/ var __webpack_exports__Controller = __webpack_exports__.Controller;
/******/ export { __webpack_exports__Controller as Controller };
/******/ 
