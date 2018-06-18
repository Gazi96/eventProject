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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

var _event = __webpack_require__(2);

var _event2 = _interopRequireDefault(_event);

var _eventList = __webpack_require__(3);

var _eventList2 = _interopRequireDefault(_eventList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

// Open (or create) the database
var open = indexedDB.open("MyDatabase", 1);

// Create the schema
open.onupgradeneeded = function () {
    var db = open.result;
    var store = db.createObjectStore("MyObjectStore");

    store.createIndex('by_id', 'id');
};

startApp();

function startApp() {
    var eventList = new _eventList2.default();

    addEventListenerButton(eventList);
    addEventListenerForm(eventList);
}

function addEventListenerButton(eventList) {
    var createButton = document.getElementsByClassName("nav__create")[0];
    var searchButton = document.getElementsByClassName("nav__search")[0];

    createButton.addEventListener("click", function () {
        showCreateForm();
    });

    searchButton.addEventListener("click", function () {
        createEventsElements(eventList);
        showEvents();
    });
}

function showCreateForm(eventList) {
    var eventForm = document.getElementsByClassName("event")[0];
    var listOfEvents = document.getElementsByClassName("list")[0];

    eventForm.classList.add("show--flex");
    listOfEvents.classList.add("hide");
}

function showEvents(eventList) {
    var eventForm = document.getElementsByClassName("event")[0];
    var listOfEvents = document.getElementsByClassName("list")[0];

    eventForm.classList.remove("show--flex");
    listOfEvents.classList.remove("hide");
}

function addEventListenerForm(eventList) {
    var eventButton = document.getElementsByClassName("event__button")[0];

    eventButton.addEventListener("click", function () {
        validateData(eventList);
    });
}

function validateData(eventList) {
    var eventInput = document.getElementsByClassName("event__input");
    var countError = 0;

    for (var i = 0; i < eventInput.length; i++) {
        if (eventInput[i].value == 0) {
            errorMessage("Pole nie zostało wypełnione", i);
            countError++;
        } else if (eventInput[3].value > eventInput[4].value && i == 3) {
            errorMessage("Niepoprawnie wprowadzona data", i);
            countError++;
        } else {
            errorMessage("", i);
        }
    }

    if (countError == 0) {
        getData(eventInput, eventList);
    }
}

function errorMessage(errorText, i) {
    var warningMsg = document.getElementsByClassName("event__warning");

    warningMsg[i].textContent = errorText;
}

function getData(eventInput, eventList) {
    var title = eventInput[0].value;
    var description = eventInput[1].value;

    var location = eventInput[2];
    var locationName = location.value;
    var locationLat = location.getAttribute("lat");
    var locationLng = location.getAttribute("lng");

    var dateFrom = eventInput[3].value;
    var dateTo = eventInput[4].value;

    var eventImage = eventInput[5].value;
    var eventCategory = eventInput[6].value;

    clearInputs(eventInput);
    inputData(title, description, locationName, locationLat, locationLng, dateFrom, dateTo, eventImage, eventCategory, eventList);
}

function clearInputs(eventInput) {
    for (var i = 0; i < eventInput.length; i++) {
        eventInput[i].value = "";
    }
}

function inputData(title, description, locationName, locationLat, locationLng, dateFrom, dateTo, eventImage, eventCategory, eventList) {

    var event = new _event2.default(title, description, [locationName, locationLat, locationLng], [dateFrom, dateTo], eventImage, eventCategory);
    eventList.addEvent(event);

    console.log(eventList);
    saveData(eventList);
}

function createEventsElements(eventList) {
    var list = document.getElementsByClassName("list")[0];
    var listEvents = document.getElementsByClassName("list");
    list.textContent = "";

    for (var i = 0; i < eventList.list.length; i++) {
        createEventElement(eventList.list[i], list);
    }
}

function createEventElement(eventElement, list) {
    var listItem = document.createElement("div");
    listItem.classList += "list__item";

    var listPhoto = document.createElement("div");
    listPhoto.classList += "list__photo";

    var listImg = document.createElement("img");
    listImg.classList += "list__img";

    var listBody = document.createElement("div");
    listBody.classList += "list__body";

    var listDate = document.createElement("div");
    listDate.classList += "list__date";

    var listTitle = document.createElement("div");
    listTitle.classList += "list__title";

    var listLocation = document.createElement("div");
    listLocation.classList += "list__location";

    var listCategory = document.createElement("div");
    listCategory.classList += "list__category";

    inputContent(eventElement, list, listItem, listPhoto, listImg, listBody, listDate, listTitle, listLocation, listCategory);
}

function inputContent(eventElement, list, listItem, listPhoto, listImg, listBody, listDate, listTitle, listLocation, listCategory) {

    listImg.src = eventElement.photo;
    listDate.textContent = eventElement.date[0] + " - " + eventElement.date[1];
    listTitle.textContent = "" + eventElement.title;
    listLocation.textContent = "" + eventElement.location[0];
    listCategory.textContent = "#" + eventElement.category;

    appendElements(listItem, list, listPhoto, listImg, listBody, listDate, listTitle, listLocation, listCategory);
}

function appendElements(listItem, list, listPhoto, listImg, listBody, listDate, listTitle, listLocation, listCategory) {

    listBody.appendChild(listDate);
    listBody.appendChild(listTitle);
    listBody.appendChild(listLocation);
    listBody.appendChild(listCategory);

    listPhoto.appendChild(listImg);

    listItem.appendChild(listPhoto);
    listItem.appendChild(listBody);

    list.appendChild(listItem);
}

function saveData(eventList) {
    // This works on all devices/browsers, and uses IndexedDBShim as a final fallback 
    open.onsuccess = function () {
        // Start a new transaction
        var db = open.result;
        var tx = db.transaction("MyObjectStore", "readwrite");
        var store = tx.objectStore("MyObjectStore");
        var idIndex = store.index('by_id');

        store.clear("MyObjectStore");

        for (var i = 0; i < eventList.list.length; i++) {
            store.put(eventList.list[i]);
        }
    };
}

function getDataFromDatabase(eventList) {
    var transaction = db.transaction(["customers"]);
    var objectStore = transaction.objectStore("customers");
    var request = objectStore.get("444-44-4444");
    request.onerror = function (event) {
        // Handle errors!
    };
    request.onsuccess = function (event) {
        // Do something with the request.result!

    };
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
       value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Event = function Event(title, description, location, date, photo, category) {
       _classCallCheck(this, Event);

       this.id = 1;
       this.title = title;
       this.description = description;
       this.location = location;
       this.date = date;
       this.photo = photo;
       this.category = category;
};

exports.default = Event;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventList = function () {
    function EventList() {
        _classCallCheck(this, EventList);

        this.list = [];
    }

    _createClass(EventList, [{
        key: "addEvent",
        value: function addEvent(event) {
            event.id = this.list.length;
            this.list.push(event);
        }
    }]);

    return EventList;
}();

exports.default = EventList;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTNiNDRiNjgyMDZlM2QyODQ0ZDIiLCJ3ZWJwYWNrOi8vLy4vYXBwLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zY3NzL2FwcC5zY3NzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9ldmVudC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvZXZlbnRMaXN0LmpzIl0sIm5hbWVzIjpbImluZGV4ZWREQiIsIndpbmRvdyIsIm1vekluZGV4ZWREQiIsIndlYmtpdEluZGV4ZWREQiIsIm1zSW5kZXhlZERCIiwic2hpbUluZGV4ZWREQiIsIm9wZW4iLCJvbnVwZ3JhZGVuZWVkZWQiLCJkYiIsInJlc3VsdCIsInN0b3JlIiwiY3JlYXRlT2JqZWN0U3RvcmUiLCJjcmVhdGVJbmRleCIsInN0YXJ0QXBwIiwiZXZlbnRMaXN0IiwiRXZlbnRMaXN0IiwiYWRkRXZlbnRMaXN0ZW5lckJ1dHRvbiIsImFkZEV2ZW50TGlzdGVuZXJGb3JtIiwiY3JlYXRlQnV0dG9uIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwic2VhcmNoQnV0dG9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsInNob3dDcmVhdGVGb3JtIiwiY3JlYXRlRXZlbnRzRWxlbWVudHMiLCJzaG93RXZlbnRzIiwiZXZlbnRGb3JtIiwibGlzdE9mRXZlbnRzIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiZXZlbnRCdXR0b24iLCJ2YWxpZGF0ZURhdGEiLCJldmVudElucHV0IiwiY291bnRFcnJvciIsImkiLCJsZW5ndGgiLCJ2YWx1ZSIsImVycm9yTWVzc2FnZSIsImdldERhdGEiLCJlcnJvclRleHQiLCJ3YXJuaW5nTXNnIiwidGV4dENvbnRlbnQiLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwibG9jYXRpb24iLCJsb2NhdGlvbk5hbWUiLCJsb2NhdGlvbkxhdCIsImdldEF0dHJpYnV0ZSIsImxvY2F0aW9uTG5nIiwiZGF0ZUZyb20iLCJkYXRlVG8iLCJldmVudEltYWdlIiwiZXZlbnRDYXRlZ29yeSIsImNsZWFySW5wdXRzIiwiaW5wdXREYXRhIiwiZXZlbnQiLCJFdmVudCIsImFkZEV2ZW50IiwiY29uc29sZSIsImxvZyIsInNhdmVEYXRhIiwibGlzdCIsImxpc3RFdmVudHMiLCJjcmVhdGVFdmVudEVsZW1lbnQiLCJldmVudEVsZW1lbnQiLCJsaXN0SXRlbSIsImNyZWF0ZUVsZW1lbnQiLCJsaXN0UGhvdG8iLCJsaXN0SW1nIiwibGlzdEJvZHkiLCJsaXN0RGF0ZSIsImxpc3RUaXRsZSIsImxpc3RMb2NhdGlvbiIsImxpc3RDYXRlZ29yeSIsImlucHV0Q29udGVudCIsInNyYyIsInBob3RvIiwiZGF0ZSIsImNhdGVnb3J5IiwiYXBwZW5kRWxlbWVudHMiLCJhcHBlbmRDaGlsZCIsIm9uc3VjY2VzcyIsInR4IiwidHJhbnNhY3Rpb24iLCJvYmplY3RTdG9yZSIsImlkSW5kZXgiLCJpbmRleCIsImNsZWFyIiwicHV0IiwiZ2V0RGF0YUZyb21EYXRhYmFzZSIsInJlcXVlc3QiLCJnZXQiLCJvbmVycm9yIiwiaWQiLCJwdXNoIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUM3REE7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSUEsWUFBWUMsT0FBT0QsU0FBUCxJQUFvQkMsT0FBT0Ms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Q0EsWUFBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxZQUFLaUMsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsWUFBS0QsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsWUFBS0UsUUFBTCxHQUFnQkEsUUFBaEI7QUFDTixDOztrQkFUbUJ0QixLOzs7Ozs7Ozs7Ozs7Ozs7OztJQ0FBMUMsUztBQUNwQix5QkFBYTtBQUFBOztBQUNOLGFBQUsrQyxJQUFMLEdBQVksRUFBWjtBQUNOOzs7O2lDQUVXTixLLEVBQU07QUFDWEEsa0JBQU1zQyxFQUFOLEdBQVcsS0FBS2hDLElBQUwsQ0FBVTFCLE1BQXJCO0FBQ0EsaUJBQUswQixJQUFMLENBQVVpQyxJQUFWLENBQWV2QyxLQUFmO0FBQ0g7Ozs7OztrQkFSZ0J6QyxTIiwiZmlsZSI6Ii4vYXNzZXRzL2pzL2FwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA1M2I0NGI2ODIwNmUzZDI4NDRkMiIsImltcG9ydCAnLi9hc3NldHMvc2Nzcy9hcHAuc2Nzcyc7XG5pbXBvcnQgRXZlbnQgZnJvbSBcIi4vYXNzZXRzL2pzL2V2ZW50LmpzXCI7XG5pbXBvcnQgRXZlbnRMaXN0IGZyb20gXCIuL2Fzc2V0cy9qcy9ldmVudExpc3QuanNcIjtcblxudmFyIGluZGV4ZWREQiA9IHdpbmRvdy5pbmRleGVkREIgfHwgd2luZG93Lm1vekluZGV4ZWREQiB8fCB3aW5kb3cud2Via2l0SW5kZXhlZERCIHx8IHdpbmRvdy5tc0luZGV4ZWREQiB8fCB3aW5kb3cuc2hpbUluZGV4ZWREQjtcblxuLy8gT3BlbiAob3IgY3JlYXRlKSB0aGUgZGF0YWJhc2VcbnZhciBvcGVuID0gaW5kZXhlZERCLm9wZW4oXCJNeURhdGFiYXNlXCIsIDEpOyAgXG4gICAgXG4gICAgLy8gQ3JlYXRlIHRoZSBzY2hlbWFcbm9wZW4ub251cGdyYWRlbmVlZGVkID0gZnVuY3Rpb24oKXtcbiAgICB2YXIgZGIgPSBvcGVuLnJlc3VsdDtcbiAgICB2YXIgc3RvcmUgPSBkYi5jcmVhdGVPYmplY3RTdG9yZShcIk15T2JqZWN0U3RvcmVcIik7XG4gICAgICAgIFxuICAgIHN0b3JlLmNyZWF0ZUluZGV4KCdieV9pZCcsICdpZCcpO1xuICAgIFxufTtcblxuXG5zdGFydEFwcCgpOyBcblxuZnVuY3Rpb24gc3RhcnRBcHAoKXtcbiAgICBjb25zdCBldmVudExpc3QgPSBuZXcgRXZlbnRMaXN0KCk7XG4gICAgXG4gICAgXG4gICAgYWRkRXZlbnRMaXN0ZW5lckJ1dHRvbihldmVudExpc3QpO1xuICAgIGFkZEV2ZW50TGlzdGVuZXJGb3JtKGV2ZW50TGlzdCk7XG59XG5cbmZ1bmN0aW9uICBhZGRFdmVudExpc3RlbmVyQnV0dG9uKGV2ZW50TGlzdCl7XG4gICAgY29uc3QgY3JlYXRlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm5hdl9fY3JlYXRlXCIpWzBdO1xuICAgIGNvbnN0IHNlYXJjaEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJuYXZfX3NlYXJjaFwiKVswXTtcbiAgICBcbiAgICBjcmVhdGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgc2hvd0NyZWF0ZUZvcm0oKTtcbiAgICB9KTtcbiAgICBcbiAgICBzZWFyY2hCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgY3JlYXRlRXZlbnRzRWxlbWVudHMoZXZlbnRMaXN0KTtcbiAgICAgICAgc2hvd0V2ZW50cygpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBzaG93Q3JlYXRlRm9ybShldmVudExpc3Qpe1xuICAgIGNvbnN0IGV2ZW50Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJldmVudFwiKVswXTtcbiAgICBjb25zdCBsaXN0T2ZFdmVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibGlzdFwiKVswXTtcbiAgICBcbiAgICBldmVudEZvcm0uY2xhc3NMaXN0LmFkZChcInNob3ctLWZsZXhcIik7XG4gICAgbGlzdE9mRXZlbnRzLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xufVxuXG5mdW5jdGlvbiBzaG93RXZlbnRzKGV2ZW50TGlzdCl7XG4gICAgY29uc3QgZXZlbnRGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImV2ZW50XCIpWzBdO1xuICAgIGNvbnN0IGxpc3RPZkV2ZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJsaXN0XCIpWzBdO1xuICAgIFxuICAgIGV2ZW50Rm9ybS5jbGFzc0xpc3QucmVtb3ZlKFwic2hvdy0tZmxleFwiKTtcbiAgICBsaXN0T2ZFdmVudHMuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XG59XG5cbmZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJGb3JtKGV2ZW50TGlzdCl7XG4gICAgY29uc3QgZXZlbnRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZXZlbnRfX2J1dHRvblwiKVswXTtcbiAgICBcbiAgICBldmVudEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICB2YWxpZGF0ZURhdGEoZXZlbnRMaXN0KVxuICAgIH0pOyAgICBcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVEYXRhKGV2ZW50TGlzdCl7XG4gICAgY29uc3QgZXZlbnRJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJldmVudF9faW5wdXRcIik7XG4gICAgbGV0IGNvdW50RXJyb3IgPSAwO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGV2ZW50SW5wdXQubGVuZ3RoOyBpKyspe1xuICAgICAgICBpZihldmVudElucHV0W2ldLnZhbHVlID09IDApe1xuICAgICAgICAgICAgZXJyb3JNZXNzYWdlKFwiUG9sZSBuaWUgem9zdGHFgm8gd3lwZcWCbmlvbmVcIiwgaSk7XG4gICAgICAgICAgICBjb3VudEVycm9yKys7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihldmVudElucHV0WzNdLnZhbHVlID4gZXZlbnRJbnB1dFs0XS52YWx1ZSAmJiBpID09IDMpe1xuICAgICAgICAgICAgZXJyb3JNZXNzYWdlKFwiTmllcG9wcmF3bmllIHdwcm93YWR6b25hIGRhdGFcIiwgaSk7XG4gICAgICAgICAgICBjb3VudEVycm9yKys7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZShcIlwiLCBpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBpZihjb3VudEVycm9yID09IDApe1xuICAgICAgICBnZXREYXRhKGV2ZW50SW5wdXQsIGV2ZW50TGlzdCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBlcnJvck1lc3NhZ2UoZXJyb3JUZXh0LCBpKXtcbiAgICBjb25zdCB3YXJuaW5nTXNnID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImV2ZW50X193YXJuaW5nXCIpO1xuICAgIFxuICAgIHdhcm5pbmdNc2dbaV0udGV4dENvbnRlbnQgPSBlcnJvclRleHQ7IFxufVxuXG5mdW5jdGlvbiBnZXREYXRhKGV2ZW50SW5wdXQsIGV2ZW50TGlzdCl7IFxuICAgIGNvbnN0IHRpdGxlID0gZXZlbnRJbnB1dFswXS52YWx1ZTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGV2ZW50SW5wdXRbMV0udmFsdWU7XG4gICAgXG4gICAgY29uc3QgbG9jYXRpb24gPSBldmVudElucHV0WzJdO1xuICAgIGNvbnN0IGxvY2F0aW9uTmFtZSA9IGxvY2F0aW9uLnZhbHVlO1xuICAgIGNvbnN0IGxvY2F0aW9uTGF0ID0gbG9jYXRpb24uZ2V0QXR0cmlidXRlKFwibGF0XCIpO1xuICAgIGNvbnN0IGxvY2F0aW9uTG5nID0gbG9jYXRpb24uZ2V0QXR0cmlidXRlKFwibG5nXCIpO1xuICAgIFxuICAgIGNvbnN0IGRhdGVGcm9tID0gZXZlbnRJbnB1dFszXS52YWx1ZTtcbiAgICBjb25zdCBkYXRlVG8gPSBldmVudElucHV0WzRdLnZhbHVlO1xuICAgIFxuICAgIGNvbnN0IGV2ZW50SW1hZ2UgPSBldmVudElucHV0WzVdLnZhbHVlO1xuICAgIGNvbnN0IGV2ZW50Q2F0ZWdvcnkgPSBldmVudElucHV0WzZdLnZhbHVlO1xuICAgIFxuICAgIGNsZWFySW5wdXRzKGV2ZW50SW5wdXQpO1xuICAgIGlucHV0RGF0YSh0aXRsZSwgZGVzY3JpcHRpb24sIGxvY2F0aW9uTmFtZSwgbG9jYXRpb25MYXQsIGxvY2F0aW9uTG5nLCBkYXRlRnJvbSwgZGF0ZVRvLCBldmVudEltYWdlLCBldmVudENhdGVnb3J5LCBldmVudExpc3QpO1xufVxuXG5mdW5jdGlvbiBjbGVhcklucHV0cyhldmVudElucHV0KXtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgZXZlbnRJbnB1dC5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGV2ZW50SW5wdXRbaV0udmFsdWUgPSBcIlwiO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaW5wdXREYXRhKHRpdGxlLCBkZXNjcmlwdGlvbiwgbG9jYXRpb25OYW1lLCBsb2NhdGlvbkxhdCwgbG9jYXRpb25MbmcsIGRhdGVGcm9tLCBkYXRlVG8sIGV2ZW50SW1hZ2UsIGV2ZW50Q2F0ZWdvcnksIGV2ZW50TGlzdCl7XG4gICAgXG4gICAgY29uc3QgZXZlbnQgPSBuZXcgRXZlbnQodGl0bGUsIGRlc2NyaXB0aW9uLCBbbG9jYXRpb25OYW1lLCBsb2NhdGlvbkxhdCwgbG9jYXRpb25MbmddLCBbZGF0ZUZyb20sIGRhdGVUb10sIGV2ZW50SW1hZ2UsIGV2ZW50Q2F0ZWdvcnkpO1xuICAgIGV2ZW50TGlzdC5hZGRFdmVudChldmVudCk7XG4gICAgXG4gICAgY29uc29sZS5sb2coZXZlbnRMaXN0KTtcbiAgICBzYXZlRGF0YShldmVudExpc3QpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVFdmVudHNFbGVtZW50cyhldmVudExpc3Qpe1xuICAgIGNvbnN0IGxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibGlzdFwiKVswXTtcbiAgICBjb25zdCBsaXN0RXZlbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImxpc3RcIik7XG4gICAgbGlzdC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGV2ZW50TGlzdC5saXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgY3JlYXRlRXZlbnRFbGVtZW50KGV2ZW50TGlzdC5saXN0W2ldLCBsaXN0KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUV2ZW50RWxlbWVudChldmVudEVsZW1lbnQsIGxpc3Qpe1xuICAgIGNvbnN0IGxpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBsaXN0SXRlbS5jbGFzc0xpc3QgKz0gXCJsaXN0X19pdGVtXCI7XG4gICAgICAgIFxuICAgIGNvbnN0IGxpc3RQaG90byA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgbGlzdFBob3RvLmNsYXNzTGlzdCArPSBcImxpc3RfX3Bob3RvXCI7XG4gICAgICAgIFxuICAgIGNvbnN0IGxpc3RJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIGxpc3RJbWcuY2xhc3NMaXN0ICs9IFwibGlzdF9faW1nXCI7XG4gICAgICAgIFxuICAgIGNvbnN0IGxpc3RCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBsaXN0Qm9keS5jbGFzc0xpc3QgKz0gXCJsaXN0X19ib2R5XCI7XG4gICAgICAgIFxuICAgIGNvbnN0IGxpc3REYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBsaXN0RGF0ZS5jbGFzc0xpc3QgKz0gXCJsaXN0X19kYXRlXCI7XG4gICAgICAgIFxuICAgIGNvbnN0IGxpc3RUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgbGlzdFRpdGxlLmNsYXNzTGlzdCArPSBcImxpc3RfX3RpdGxlXCI7XG4gICAgICAgIFxuICAgIGNvbnN0IGxpc3RMb2NhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgbGlzdExvY2F0aW9uLmNsYXNzTGlzdCArPSBcImxpc3RfX2xvY2F0aW9uXCI7XG4gICAgICAgIFxuICAgIGNvbnN0IGxpc3RDYXRlZ29yeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgbGlzdENhdGVnb3J5LmNsYXNzTGlzdCArPSBcImxpc3RfX2NhdGVnb3J5XCI7XG4gICAgXG4gICAgaW5wdXRDb250ZW50KGV2ZW50RWxlbWVudCwgbGlzdCwgbGlzdEl0ZW0sIGxpc3RQaG90bywgbGlzdEltZywgbGlzdEJvZHksIGxpc3REYXRlLCBsaXN0VGl0bGUsIGxpc3RMb2NhdGlvbiwgbGlzdENhdGVnb3J5KTtcbn1cblxuZnVuY3Rpb24gaW5wdXRDb250ZW50KGV2ZW50RWxlbWVudCwgbGlzdCwgbGlzdEl0ZW0sIGxpc3RQaG90bywgbGlzdEltZywgbGlzdEJvZHksIGxpc3REYXRlLCBsaXN0VGl0bGUsIGxpc3RMb2NhdGlvbiwgbGlzdENhdGVnb3J5KXtcbiAgICBcbiAgICBsaXN0SW1nLnNyYyA9IGV2ZW50RWxlbWVudC5waG90bztcbiAgICBsaXN0RGF0ZS50ZXh0Q29udGVudCA9IGAke2V2ZW50RWxlbWVudC5kYXRlWzBdfSAtICR7ZXZlbnRFbGVtZW50LmRhdGVbMV19YDtcbiAgICBsaXN0VGl0bGUudGV4dENvbnRlbnQgPSBgJHtldmVudEVsZW1lbnQudGl0bGV9YDtcbiAgICBsaXN0TG9jYXRpb24udGV4dENvbnRlbnQgPSBgJHtldmVudEVsZW1lbnQubG9jYXRpb25bMF19YDtcbiAgICBsaXN0Q2F0ZWdvcnkudGV4dENvbnRlbnQgPSBgIyR7ZXZlbnRFbGVtZW50LmNhdGVnb3J5fWA7XG4gICAgICAgIFxuICAgIGFwcGVuZEVsZW1lbnRzKGxpc3RJdGVtLCBsaXN0LCBsaXN0UGhvdG8sIGxpc3RJbWcsIGxpc3RCb2R5LCBsaXN0RGF0ZSwgbGlzdFRpdGxlLCBsaXN0TG9jYXRpb24sIGxpc3RDYXRlZ29yeSk7XG59XG5cbmZ1bmN0aW9uIGFwcGVuZEVsZW1lbnRzKGxpc3RJdGVtLCBsaXN0LCBsaXN0UGhvdG8sIGxpc3RJbWcsIGxpc3RCb2R5LCBsaXN0RGF0ZSwgbGlzdFRpdGxlLCBsaXN0TG9jYXRpb24sIGxpc3RDYXRlZ29yeSl7XG4gICAgXG4gICAgbGlzdEJvZHkuYXBwZW5kQ2hpbGQobGlzdERhdGUpO1xuICAgIGxpc3RCb2R5LmFwcGVuZENoaWxkKGxpc3RUaXRsZSk7XG4gICAgbGlzdEJvZHkuYXBwZW5kQ2hpbGQobGlzdExvY2F0aW9uKTtcbiAgICBsaXN0Qm9keS5hcHBlbmRDaGlsZChsaXN0Q2F0ZWdvcnkpO1xuICAgIFxuICAgIGxpc3RQaG90by5hcHBlbmRDaGlsZChsaXN0SW1nKTtcbiAgICBcbiAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChsaXN0UGhvdG8pO1xuICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKGxpc3RCb2R5KTtcbiAgICBcbiAgICBsaXN0LmFwcGVuZENoaWxkKGxpc3RJdGVtKTtcbn1cblxuZnVuY3Rpb24gc2F2ZURhdGEoZXZlbnRMaXN0KXtcbiAgICAvLyBUaGlzIHdvcmtzIG9uIGFsbCBkZXZpY2VzL2Jyb3dzZXJzLCBhbmQgdXNlcyBJbmRleGVkREJTaGltIGFzIGEgZmluYWwgZmFsbGJhY2sgXG4gICAgb3Blbi5vbnN1Y2Nlc3MgPSBmdW5jdGlvbigpe1xuICAgICAgICAvLyBTdGFydCBhIG5ldyB0cmFuc2FjdGlvblxuICAgICAgICB2YXIgZGIgPSBvcGVuLnJlc3VsdDtcbiAgICAgICAgdmFyIHR4ID0gZGIudHJhbnNhY3Rpb24oXCJNeU9iamVjdFN0b3JlXCIsIFwicmVhZHdyaXRlXCIpO1xuICAgICAgICB2YXIgc3RvcmUgPSB0eC5vYmplY3RTdG9yZShcIk15T2JqZWN0U3RvcmVcIik7XG4gICAgICAgIHZhciBpZEluZGV4ID0gc3RvcmUuaW5kZXgoJ2J5X2lkJyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgIHN0b3JlLmNsZWFyKFwiTXlPYmplY3RTdG9yZVwiKTtcbiAgICAgICAgXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBldmVudExpc3QubGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBzdG9yZS5wdXQoZXZlbnRMaXN0Lmxpc3RbaV0pO1xuICAgICAgICB9XG4gICAgfSBcbn0gIFxuXG5mdW5jdGlvbiBnZXREYXRhRnJvbURhdGFiYXNlKGV2ZW50TGlzdCl7XG4gICAgdmFyIHRyYW5zYWN0aW9uID0gZGIudHJhbnNhY3Rpb24oW1wiY3VzdG9tZXJzXCJdKTtcbiAgICB2YXIgb2JqZWN0U3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZShcImN1c3RvbWVyc1wiKTtcbiAgICB2YXIgcmVxdWVzdCA9IG9iamVjdFN0b3JlLmdldChcIjQ0NC00NC00NDQ0XCIpO1xuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAvLyBIYW5kbGUgZXJyb3JzIVxuICAgIH07XG4gICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggdGhlIHJlcXVlc3QucmVzdWx0IVxuICAgICAgXG4gICAgfTtcbn1cblxuXG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwLmpzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Fzc2V0cy9zY3NzL2FwcC5zY3NzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50e1xyXG5cdGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgbG9jYXRpb24sIGRhdGUsIHBob3RvLCBjYXRlZ29yeSl7XHJcbiAgICAgICAgdGhpcy5pZCA9IDE7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb247XHJcbiAgICAgICAgdGhpcy5kYXRlID0gZGF0ZTtcclxuICAgICAgICB0aGlzLnBob3RvID0gcGhvdG87XHJcbiAgICAgICAgdGhpcy5jYXRlZ29yeSA9IGNhdGVnb3J5O1xyXG5cdH0gICBcclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Fzc2V0cy9qcy9ldmVudC5qcyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50TGlzdHtcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMubGlzdCA9IFtdO1xyXG5cdH1cclxuICAgIFxyXG4gICAgYWRkRXZlbnQoZXZlbnQpe1xyXG4gICAgICAgIGV2ZW50LmlkID0gdGhpcy5saXN0Lmxlbmd0aDtcclxuICAgICAgICB0aGlzLmxpc3QucHVzaChldmVudCk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hc3NldHMvanMvZXZlbnRMaXN0LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==