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

var _location = __webpack_require__(4);

var _location2 = _interopRequireDefault(_location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _location.autoCompleteLocation)();
startApp();

function startApp() {
    var eventList = new _eventList2.default();
    var dataIndexDb = getDataFromDatabase().then(function (reponse) {
        inputDataFromDatabase(eventList, reponse);
    });

    addEventListenerButton(eventList);
    addEventListenerForm(eventList);
}

function inputDataFromDatabase(eventList, dataIndexDb) {
    for (var i = 0; i < dataIndexDb.length; i++) {
        eventList.list.push(dataIndexDb[i]);
    }

    createEventsElements(eventList);
    addEventListenerEvent(eventList);
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

function addEventListenerForm(eventList) {
    var eventButton = document.getElementsByClassName("event__button")[0];

    eventButton.addEventListener("click", function () {
        validateData(eventList);
    });
}

function addEventListenerEvent(eventList) {
    var events = document.getElementsByClassName("list__item");

    if (eventList) {
        var _loop = function _loop(i) {
            events[i].addEventListener("click", function () {
                showInfoAboutEvent(events[i], eventList), false;
            });
        };

        for (var i = 0; i < events.length; i++) {
            _loop(i);
        }
    }
}

function showInfoAboutEvent(event, eventList) {
    var eventTitle = event.getElementsByClassName("list__title")[0].textContent;

    eventList.findEventByTitle(eventTitle);
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

    saveData(eventList, open);
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

    addEventListenerEvent();
}

function saveData(eventList) {
    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    var open = indexedDB.open("MyDatabase", 1);

    open.onupgradeneeded = function () {
        var db = open.result;
        var store = db.createObjectStore("MyObjectStore", {
            keyPath: "id"
        });

        var index = store.createIndex("by_id", "id");
    };
    open.onsuccess = function () {
        var db = open.result;
        var tx = db.transaction("MyObjectStore", "readwrite");
        var store = tx.objectStore("MyObjectStore");
        store.clear("MyObjectStore");

        for (var i = 0; i < eventList.list.length; i++) {
            store.put(eventList.list[i]);
        }
    };
}

function getDataFromDatabase(eventList) {
    return new Promise(function (resolve, reject) {
        var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
        var open = indexedDB.open("MyDatabase", 1);
        open.onupgradeneeded = function () {
            var db = open.result;
            var store = db.createObjectStore("MyObjectStore", {
                keyPath: "id"
            });
            var index = store.createIndex("by_id", "id");
        };
        open.onsuccess = function () {
            var db = open.result;
            var transaction = db.transaction("MyObjectStore", "readwrite");
            var objectStore = transaction.objectStore("MyObjectStore");
            var request = objectStore.getAll();

            request.onsuccess = function (event) {
                resolve(request.result);
            };
        };
    });
}

var geo = navigator.geolocation;

if (geo) {
    geo.getCurrentPosition(function (location) {
        console.log('Szerokość ' + location.coords.latitude);
        console.log('Długość ' + location.coords.longitude);
    });
} else {
    console.log('niedostępny');
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

       this.id = 0;
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
    }, {
        key: "findEventByTitle",
        value: function findEventByTitle(title) {
            var searchObject = this.list.find(function (o) {
                return o.title === title;
            });

            console.log(searchObject);
        }
    }]);

    return EventList;
}();

exports.default = EventList;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.autoCompleteLocation = autoCompleteLocation;
exports.initMap = initMap;
function autoCompleteLocation() {
    google.maps.event.addDomListener(window, 'load', initAutocomplete);

    function initAutocomplete() {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: -33.8688,
                lng: 151.2195
            },
            zoom: 13,
            mapTypeId: 'roadmap'
        });
        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function () {
            searchBox.setBounds(map.getBounds());
        });
        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function () {
            var places = searchBox.getPlaces();
            if (places.length == 0) {
                return;
            }
            // Clear out the old markers.
            markers.forEach(function (marker) {
                marker.setMap(null);
            });
            markers = [];
            // For each place, get the icon, name and location.
            var bounds = new google.maps.LatLngBounds();
            /*searchBox.setAttribute("lat", bounds.)*/
            places.forEach(function (place) {
                if (!place.geometry) {
                    console.log("Returned place contains no geometry");
                    return;
                }
                var icon = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };
                // Create a marker for each place.
                markers.push(new google.maps.Marker({
                    map: map,
                    icon: icon,
                    title: place.name,
                    position: place.geometry.location
                }));
                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }

                input.setAttribute("Lat", bounds.f.b);
                input.setAttribute("Lng", bounds.b.f);
            });
            map.fitBounds(bounds);
        });
    }
}

function initMap(latPosition, lngPosition) {
    // The location of Uluru
    var uluru = { lat: latPosition, lng: lngPosition };
    // The map, centered at Uluru
    var map = new google.maps.Map(document.getElementById('map'), { zoom: 4, center: uluru });
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({ position: uluru, map: map });
}

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjlmZmQ5MmJlOGE1MWQ3MWY5NDYiLCJ3ZWJwYWNrOi8vLy4vYXBwLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zY3NzL2FwcC5zY3NzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9ldmVudC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvZXZlbnRMaXN0LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9sb2NhdGlvbi5qcyJdLCJuYW1lcyI6WyJzdGFydEFwcCIsImV2ZW50TGlzdCIsIkV2ZW50TGlzdCIsImRhdGFJbmRleERiIiwiZ2V0RGF0YUZyb21EYXRhYmFzZSIsInRoZW4iLCJyZXBvbnNlIiwiaW5wdXREYXRhRnJvbURhdGFiYXNlIiwiYWRkRXZlbnRMaXN0ZW5lckJ1dHRvbiIsImFkZEV2ZW50TGlzdGVuZXJGb3JtIiwiaSIsImxlbmd0aCIsImxpc3QiLCJwdXNoIiwiY3JlYXRlRXZlbnRzRWxlbWVudHMiLCJhZGRFdmVudExpc3RlbmVyRXZlbnQiLCJjcmVhdGVCdXR0b24iLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJzZWFyY2hCdXR0b24iLCJhZGRFdmVudExpc3RlbmVyIiwic2hvd0NyZWF0ZUZvcm0iLCJzaG93RXZlbnRzIiwiZXZlbnRCdXR0b24iLCJ2YWxpZGF0ZURhdGEiLCJldmVudHMiLCJzaG93SW5mb0Fib3V0RXZlbnQiLCJldmVudCIsImV2ZW50VGl0bGUiLCJ0ZXh0Q29udGVudCIsImZpbmRFdmVudEJ5VGl0bGUiLCJldmVudEZvcm0iLCJsaXN0T2ZFdmVudHMiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJldmVudElucHV0IiwiY291bnRFcnJvciIsInZhbHVlIiwiZXJyb3JNZXNzYWdlIiwiZ2V0RGF0YSIsImVycm9yVGV4dCIsIndhcm5pbmdNc2ciLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwibG9jYXRpb24iLCJsb2NhdGlvbk5hbWUiLCJsb2NhdGlvbkxhdCIsImdldEF0dHJpYnV0ZSIsImxvY2F0aW9uTG5nIiwiZGF0ZUZyb20iLCJkYXRlVG8iLCJldmVudEltYWdlIiwiZXZlbnRDYXRlZ29yeSIsImNsZWFySW5wdXRzIiwiaW5wdXREYXRhIiwiRXZlbnQiLCJhZGRFdmVudCIsInNhdmVEYXRhIiwib3BlbiIsImxpc3RFdmVudHMiLCJjcmVhdGVFdmVudEVsZW1lbnQiLCJldmVudEVsZW1lbnQiLCJsaXN0SXRlbSIsImNyZWF0ZUVsZW1lbnQiLCJsaXN0UGhvdG8iLCJsaXN0SW1nIiwibGlzdEJvZHkiLCJsaXN0RGF0ZSIsImxpc3RUaXRsZSIsImxpc3RMb2NhdGlvbiIsImxpc3RDYXRlZ29yeSIsImlucHV0Q29udGVudCIsInNyYyIsInBob3RvIiwiZGF0ZSIsImNhdGVnb3J5IiwiYXBwZW5kRWxlbWVudHMiLCJhcHBlbmRDaGlsZCIsImluZGV4ZWREQiIsIndpbmRvdyIsIm1vekluZGV4ZWREQiIsIndlYmtpdEluZGV4ZWREQiIsIm1zSW5kZXhlZERCIiwic2hpbUluZGV4ZWREQiIsIm9udXBncmFkZW5lZWRlZCIsImRiIiwicmVzdWx0Iiwic3RvcmUiLCJjcmVhdGVPYmplY3RTdG9yZSIsImtleVBhdGgiLCJpbmRleCIsImNyZWF0ZUluZGV4Iiwib25zdWNjZXNzIiwidHgiLCJ0cmFuc2FjdGlvbiIsIm9iamVjdFN0b3JlIiwiY2xlYXIiLCJwdXQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlcXVlc3QiLCJnZXRBbGwiLCJnZW8iLCJuYXZpZ2F0b3IiLCJnZW9sb2NhdGlvbiIsImdldEN1cnJlbnRQb3NpdGlvbiIsImNvbnNvbGUiLCJsb2ciLCJjb29yZHMiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsImlkIiwic2VhcmNoT2JqZWN0IiwiZmluZCIsIm8iLCJhdXRvQ29tcGxldGVMb2NhdGlvbiIsImluaXRNYXAiLCJnb29nbGUiLCJtYXBzIiwiYWRkRG9tTGlzdGVuZXIiLCJpbml0QXV0b2NvbXBsZXRlIiwibWFwIiwiTWFwIiwiZ2V0RWxlbWVudEJ5SWQiLCJjZW50ZXIiLCJsYXQiLCJsbmciLCJ6b29tIiwibWFwVHlwZUlkIiwiaW5wdXQiLCJzZWFyY2hCb3giLCJwbGFjZXMiLCJTZWFyY2hCb3giLCJjb250cm9scyIsIkNvbnRyb2xQb3NpdGlvbiIsIlRPUF9MRUZUIiwiYWRkTGlzdGVuZXIiLCJzZXRCb3VuZHMiLCJnZXRCb3VuZHMiLCJtYXJrZXJzIiwiZ2V0UGxhY2VzIiwiZm9yRWFjaCIsIm1hcmtlciIsInNldE1hcCIsImJvdW5kcyIsIkxhdExuZ0JvdW5kcyIsInBsYWNlIiwiZ2VvbWV0cnkiLCJpY29uIiwidXJsIiwic2l6ZSIsIlNpemUiLCJvcmlnaW4iLCJQb2ludCIsImFuY2hvciIsInNjYWxlZFNpemUiLCJNYXJrZXIiLCJuYW1lIiwicG9zaXRpb24iLCJ2aWV3cG9ydCIsInVuaW9uIiwiZXh0ZW5kIiwic2V0QXR0cmlidXRlIiwiZiIsImIiLCJmaXRCb3VuZHMiLCJsYXRQb3NpdGlvbiIsImxuZ1Bvc2l0aW9uIiwidWx1cnUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQzdEQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUdBO0FBQ0FBOztBQUVBLFNBQVNBLFFBQVQsR0FBbUI7QUFDZixRQUFNQyxZQUFZLElBQUlDLG1CQUFKLEVB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IFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDY5ZmZkOTJiZThhNTFkNzFmOTQ2IiwiaW1wb3J0ICcuL2Fzc2V0cy9zY3NzL2FwcC5zY3NzJztcbmltcG9ydCBFdmVudCBmcm9tIFwiLi9hc3NldHMvanMvZXZlbnQuanNcIjtcbmltcG9ydCBFdmVudExpc3QgZnJvbSBcIi4vYXNzZXRzL2pzL2V2ZW50TGlzdC5qc1wiO1xuaW1wb3J0IHthdXRvQ29tcGxldGVMb2NhdGlvbn0gZnJvbSBcIi4vYXNzZXRzL2pzL2xvY2F0aW9uLmpzXCI7XG5pbXBvcnQgY29zIGZyb20gXCIuL2Fzc2V0cy9qcy9sb2NhdGlvbi5qc1wiO1xuXG5hdXRvQ29tcGxldGVMb2NhdGlvbigpO1xuc3RhcnRBcHAoKTsgXG5cbmZ1bmN0aW9uIHN0YXJ0QXBwKCl7XG4gICAgY29uc3QgZXZlbnRMaXN0ID0gbmV3IEV2ZW50TGlzdCgpO1xuICAgIGNvbnN0IGRhdGFJbmRleERiID0gZ2V0RGF0YUZyb21EYXRhYmFzZSgpLnRoZW4oZnVuY3Rpb24ocmVwb25zZSkge1xuICAgICAgICBpbnB1dERhdGFGcm9tRGF0YWJhc2UoZXZlbnRMaXN0LCByZXBvbnNlKTsgICBcbiAgICB9KTtcbiAgICBcbiAgICBhZGRFdmVudExpc3RlbmVyQnV0dG9uKGV2ZW50TGlzdCk7XG4gICAgYWRkRXZlbnRMaXN0ZW5lckZvcm0oZXZlbnRMaXN0KTtcbiAgIFxufVxuXG5mdW5jdGlvbiBpbnB1dERhdGFGcm9tRGF0YWJhc2UoZXZlbnRMaXN0LCBkYXRhSW5kZXhEYil7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGRhdGFJbmRleERiLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgZXZlbnRMaXN0Lmxpc3QucHVzaChkYXRhSW5kZXhEYltpXSk7XG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZUV2ZW50c0VsZW1lbnRzKGV2ZW50TGlzdCk7XG4gICAgYWRkRXZlbnRMaXN0ZW5lckV2ZW50KGV2ZW50TGlzdCk7XG59XG5cbmZ1bmN0aW9uICBhZGRFdmVudExpc3RlbmVyQnV0dG9uKGV2ZW50TGlzdCl7XG4gICAgY29uc3QgY3JlYXRlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm5hdl9fY3JlYXRlXCIpWzBdO1xuICAgIGNvbnN0IHNlYXJjaEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJuYXZfX3NlYXJjaFwiKVswXTtcbiAgICBcbiAgICBjcmVhdGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgc2hvd0NyZWF0ZUZvcm0oKTtcbiAgICB9KTtcbiAgICBcbiAgICBzZWFyY2hCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgY3JlYXRlRXZlbnRzRWxlbWVudHMoZXZlbnRMaXN0KTtcbiAgICAgICAgc2hvd0V2ZW50cygpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRFdmVudExpc3RlbmVyRm9ybShldmVudExpc3Qpe1xuICAgIGNvbnN0IGV2ZW50QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImV2ZW50X19idXR0b25cIilbMF07XG4gICAgXG4gICAgZXZlbnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgdmFsaWRhdGVEYXRhKGV2ZW50TGlzdClcbiAgICB9KTsgICAgXG59XG5cbmZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJFdmVudChldmVudExpc3Qpe1xuICAgIGNvbnN0IGV2ZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJsaXN0X19pdGVtXCIpO1xuICAgIFxuICAgIGlmKGV2ZW50TGlzdCl7IFxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgZXZlbnRzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dJbmZvQWJvdXRFdmVudChldmVudHNbaV0sIGV2ZW50TGlzdCksIGZhbHNlfSk7IFxuICAgICAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gc2hvd0luZm9BYm91dEV2ZW50KGV2ZW50LCBldmVudExpc3Qpe1xuICAgIGNvbnN0IGV2ZW50VGl0bGUgPSBldmVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibGlzdF9fdGl0bGVcIilbMF0udGV4dENvbnRlbnQ7XG5cbiAgICBldmVudExpc3QuZmluZEV2ZW50QnlUaXRsZShldmVudFRpdGxlKTtcbn1cblxuZnVuY3Rpb24gc2hvd0NyZWF0ZUZvcm0oZXZlbnRMaXN0KXtcbiAgICBjb25zdCBldmVudEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZXZlbnRcIilbMF07XG4gICAgY29uc3QgbGlzdE9mRXZlbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImxpc3RcIilbMF07XG4gICAgXG4gICAgZXZlbnRGb3JtLmNsYXNzTGlzdC5hZGQoXCJzaG93LS1mbGV4XCIpO1xuICAgIGxpc3RPZkV2ZW50cy5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcbn1cblxuZnVuY3Rpb24gc2hvd0V2ZW50cyhldmVudExpc3Qpe1xuICAgIGNvbnN0IGV2ZW50Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJldmVudFwiKVswXTtcbiAgICBjb25zdCBsaXN0T2ZFdmVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibGlzdFwiKVswXTtcbiAgICBcbiAgICBldmVudEZvcm0uY2xhc3NMaXN0LnJlbW92ZShcInNob3ctLWZsZXhcIik7XG4gICAgbGlzdE9mRXZlbnRzLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZURhdGEoZXZlbnRMaXN0KXtcbiAgICBjb25zdCBldmVudElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImV2ZW50X19pbnB1dFwiKTtcbiAgICBsZXQgY291bnRFcnJvciA9IDA7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgZXZlbnRJbnB1dC5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGlmKGV2ZW50SW5wdXRbaV0udmFsdWUgPT0gMCl7XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2UoXCJQb2xlIG5pZSB6b3N0YcWCbyB3eXBlxYJuaW9uZVwiLCBpKTtcbiAgICAgICAgICAgIGNvdW50RXJyb3IrKztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGV2ZW50SW5wdXRbM10udmFsdWUgPiBldmVudElucHV0WzRdLnZhbHVlICYmIGkgPT0gMyl7XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2UoXCJOaWVwb3ByYXduaWUgd3Byb3dhZHpvbmEgZGF0YVwiLCBpKTtcbiAgICAgICAgICAgIGNvdW50RXJyb3IrKztcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXJyb3JNZXNzYWdlKFwiXCIsIGkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGlmKGNvdW50RXJyb3IgPT0gMCl7XG4gICAgICAgIGdldERhdGEoZXZlbnRJbnB1dCwgZXZlbnRMaXN0KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGVycm9yTWVzc2FnZShlcnJvclRleHQsIGkpe1xuICAgIGNvbnN0IHdhcm5pbmdNc2cgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZXZlbnRfX3dhcm5pbmdcIik7XG4gICAgXG4gICAgd2FybmluZ01zZ1tpXS50ZXh0Q29udGVudCA9IGVycm9yVGV4dDsgXG59XG5cbmZ1bmN0aW9uIGdldERhdGEoZXZlbnRJbnB1dCwgZXZlbnRMaXN0KXsgXG4gICAgY29uc3QgdGl0bGUgPSBldmVudElucHV0WzBdLnZhbHVlO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZXZlbnRJbnB1dFsxXS52YWx1ZTtcbiAgICBcbiAgICBjb25zdCBsb2NhdGlvbiA9IGV2ZW50SW5wdXRbMl07XG4gICAgY29uc3QgbG9jYXRpb25OYW1lID0gbG9jYXRpb24udmFsdWU7XG4gICAgY29uc3QgbG9jYXRpb25MYXQgPSBsb2NhdGlvbi5nZXRBdHRyaWJ1dGUoXCJsYXRcIik7XG4gICAgY29uc3QgbG9jYXRpb25MbmcgPSBsb2NhdGlvbi5nZXRBdHRyaWJ1dGUoXCJsbmdcIik7XG4gICAgXG4gICAgY29uc3QgZGF0ZUZyb20gPSBldmVudElucHV0WzNdLnZhbHVlO1xuICAgIGNvbnN0IGRhdGVUbyA9IGV2ZW50SW5wdXRbNF0udmFsdWU7XG4gICAgXG4gICAgY29uc3QgZXZlbnRJbWFnZSA9IGV2ZW50SW5wdXRbNV0udmFsdWU7XG4gICAgY29uc3QgZXZlbnRDYXRlZ29yeSA9IGV2ZW50SW5wdXRbNl0udmFsdWU7XG4gICAgXG4gICAgY2xlYXJJbnB1dHMoZXZlbnRJbnB1dCk7XG4gICAgaW5wdXREYXRhKHRpdGxlLCBkZXNjcmlwdGlvbiwgbG9jYXRpb25OYW1lLCBsb2NhdGlvbkxhdCwgbG9jYXRpb25MbmcsIGRhdGVGcm9tLCBkYXRlVG8sIGV2ZW50SW1hZ2UsIGV2ZW50Q2F0ZWdvcnksIGV2ZW50TGlzdCk7XG59XG5cbmZ1bmN0aW9uIGNsZWFySW5wdXRzKGV2ZW50SW5wdXQpe1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBldmVudElucHV0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgZXZlbnRJbnB1dFtpXS52YWx1ZSA9IFwiXCI7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpbnB1dERhdGEodGl0bGUsIGRlc2NyaXB0aW9uLCBsb2NhdGlvbk5hbWUsIGxvY2F0aW9uTGF0LCBsb2NhdGlvbkxuZywgZGF0ZUZyb20sIGRhdGVUbywgZXZlbnRJbWFnZSwgZXZlbnRDYXRlZ29yeSwgZXZlbnRMaXN0KXtcbiAgICBcbiAgICBjb25zdCBldmVudCA9IG5ldyBFdmVudCh0aXRsZSwgZGVzY3JpcHRpb24sIFtsb2NhdGlvbk5hbWUsIGxvY2F0aW9uTGF0LCBsb2NhdGlvbkxuZ10sIFtkYXRlRnJvbSwgZGF0ZVRvXSwgZXZlbnRJbWFnZSwgZXZlbnRDYXRlZ29yeSk7XG4gICAgZXZlbnRMaXN0LmFkZEV2ZW50KGV2ZW50KTtcbiAgICBcbiAgICBzYXZlRGF0YShldmVudExpc3QsIG9wZW4pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVFdmVudHNFbGVtZW50cyhldmVudExpc3Qpe1xuICAgIGNvbnN0IGxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibGlzdFwiKVswXTtcbiAgICBjb25zdCBsaXN0RXZlbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImxpc3RcIik7XG4gICAgbGlzdC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGV2ZW50TGlzdC5saXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgY3JlYXRlRXZlbnRFbGVtZW50KGV2ZW50TGlzdC5saXN0W2ldLCBsaXN0KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUV2ZW50RWxlbWVudChldmVudEVsZW1lbnQsIGxpc3Qpe1xuICAgIGNvbnN0IGxpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBsaXN0SXRlbS5jbGFzc0xpc3QgKz0gXCJsaXN0X19pdGVtXCI7XG4gICAgICAgIFxuICAgIGNvbnN0IGxpc3RQaG90byA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgbGlzdFBob3RvLmNsYXNzTGlzdCArPSBcImxpc3RfX3Bob3RvXCI7XG4gICAgICAgIFxuICAgIGNvbnN0IGxpc3RJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIGxpc3RJbWcuY2xhc3NMaXN0ICs9IFwibGlzdF9faW1nXCI7XG4gICAgICAgIFxuICAgIGNvbnN0IGxpc3RCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBsaXN0Qm9keS5jbGFzc0xpc3QgKz0gXCJsaXN0X19ib2R5XCI7XG4gICAgICAgIFxuICAgIGNvbnN0IGxpc3REYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBsaXN0RGF0ZS5jbGFzc0xpc3QgKz0gXCJsaXN0X19kYXRlXCI7XG4gICAgICAgIFxuICAgIGNvbnN0IGxpc3RUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgbGlzdFRpdGxlLmNsYXNzTGlzdCArPSBcImxpc3RfX3RpdGxlXCI7XG4gICAgICAgIFxuICAgIGNvbnN0IGxpc3RMb2NhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgbGlzdExvY2F0aW9uLmNsYXNzTGlzdCArPSBcImxpc3RfX2xvY2F0aW9uXCI7XG4gICAgICAgIFxuICAgIGNvbnN0IGxpc3RDYXRlZ29yeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgbGlzdENhdGVnb3J5LmNsYXNzTGlzdCArPSBcImxpc3RfX2NhdGVnb3J5XCI7XG4gICAgXG4gICAgaW5wdXRDb250ZW50KGV2ZW50RWxlbWVudCwgbGlzdCwgbGlzdEl0ZW0sIGxpc3RQaG90bywgbGlzdEltZywgbGlzdEJvZHksIGxpc3REYXRlLCBsaXN0VGl0bGUsIGxpc3RMb2NhdGlvbiwgbGlzdENhdGVnb3J5KTtcbn1cblxuZnVuY3Rpb24gaW5wdXRDb250ZW50KGV2ZW50RWxlbWVudCwgbGlzdCwgbGlzdEl0ZW0sIGxpc3RQaG90bywgbGlzdEltZywgbGlzdEJvZHksIGxpc3REYXRlLCBsaXN0VGl0bGUsIGxpc3RMb2NhdGlvbiwgbGlzdENhdGVnb3J5KXtcbiAgICBcbiAgICBsaXN0SW1nLnNyYyA9IGV2ZW50RWxlbWVudC5waG90bztcbiAgICBsaXN0RGF0ZS50ZXh0Q29udGVudCA9IGAke2V2ZW50RWxlbWVudC5kYXRlWzBdfSAtICR7ZXZlbnRFbGVtZW50LmRhdGVbMV19YDtcbiAgICBsaXN0VGl0bGUudGV4dENvbnRlbnQgPSBgJHtldmVudEVsZW1lbnQudGl0bGV9YDtcbiAgICBsaXN0TG9jYXRpb24udGV4dENvbnRlbnQgPSBgJHtldmVudEVsZW1lbnQubG9jYXRpb25bMF19YDtcbiAgICBsaXN0Q2F0ZWdvcnkudGV4dENvbnRlbnQgPSBgIyR7ZXZlbnRFbGVtZW50LmNhdGVnb3J5fWA7XG4gICAgICAgIFxuICAgIGFwcGVuZEVsZW1lbnRzKGxpc3RJdGVtLCBsaXN0LCBsaXN0UGhvdG8sIGxpc3RJbWcsIGxpc3RCb2R5LCBsaXN0RGF0ZSwgbGlzdFRpdGxlLCBsaXN0TG9jYXRpb24sIGxpc3RDYXRlZ29yeSk7XG59XG5cbmZ1bmN0aW9uIGFwcGVuZEVsZW1lbnRzKGxpc3RJdGVtLCBsaXN0LCBsaXN0UGhvdG8sIGxpc3RJbWcsIGxpc3RCb2R5LCBsaXN0RGF0ZSwgbGlzdFRpdGxlLCBsaXN0TG9jYXRpb24sIGxpc3RDYXRlZ29yeSl7XG4gICAgXG4gICAgbGlzdEJvZHkuYXBwZW5kQ2hpbGQobGlzdERhdGUpO1xuICAgIGxpc3RCb2R5LmFwcGVuZENoaWxkKGxpc3RUaXRsZSk7XG4gICAgbGlzdEJvZHkuYXBwZW5kQ2hpbGQobGlzdExvY2F0aW9uKTtcbiAgICBsaXN0Qm9keS5hcHBlbmRDaGlsZChsaXN0Q2F0ZWdvcnkpO1xuICAgIFxuICAgIGxpc3RQaG90by5hcHBlbmRDaGlsZChsaXN0SW1nKTtcbiAgICBcbiAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChsaXN0UGhvdG8pO1xuICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKGxpc3RCb2R5KTtcbiAgICBcbiAgICBsaXN0LmFwcGVuZENoaWxkKGxpc3RJdGVtKTtcbiAgICBcbiAgICBhZGRFdmVudExpc3RlbmVyRXZlbnQoKTtcbn1cblxuZnVuY3Rpb24gc2F2ZURhdGEoZXZlbnRMaXN0KSB7XG4gICAgdmFyIGluZGV4ZWREQiA9IHdpbmRvdy5pbmRleGVkREIgfHwgd2luZG93Lm1vekluZGV4ZWREQiB8fCB3aW5kb3cud2Via2l0SW5kZXhlZERCIHx8IHdpbmRvdy5tc0luZGV4ZWREQiB8fCB3aW5kb3cuc2hpbUluZGV4ZWREQjtcbiAgICB2YXIgb3BlbiA9IGluZGV4ZWREQi5vcGVuKFwiTXlEYXRhYmFzZVwiLCAxKTtcbiAgICBcbiAgICBvcGVuLm9udXBncmFkZW5lZWRlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRiID0gb3Blbi5yZXN1bHQ7XG4gICAgICAgIHZhciBzdG9yZSA9IGRiLmNyZWF0ZU9iamVjdFN0b3JlKFwiTXlPYmplY3RTdG9yZVwiLCB7XG4gICAgICAgICAgICBrZXlQYXRoOiBcImlkXCJcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICB2YXIgaW5kZXggPSBzdG9yZS5jcmVhdGVJbmRleChcImJ5X2lkXCIsIFwiaWRcIik7XG4gICAgfTtcbiAgICBvcGVuLm9uc3VjY2VzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRiID0gb3Blbi5yZXN1bHQ7XG4gICAgICAgIHZhciB0eCA9IGRiLnRyYW5zYWN0aW9uKFwiTXlPYmplY3RTdG9yZVwiLCBcInJlYWR3cml0ZVwiKTtcbiAgICAgICAgdmFyIHN0b3JlID0gdHgub2JqZWN0U3RvcmUoXCJNeU9iamVjdFN0b3JlXCIpO1xuICAgICAgICBzdG9yZS5jbGVhcihcIk15T2JqZWN0U3RvcmVcIik7XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50TGlzdC5saXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBzdG9yZS5wdXQoZXZlbnRMaXN0Lmxpc3RbaV0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXREYXRhRnJvbURhdGFiYXNlKGV2ZW50TGlzdCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciBpbmRleGVkREIgPSB3aW5kb3cuaW5kZXhlZERCIHx8IHdpbmRvdy5tb3pJbmRleGVkREIgfHwgd2luZG93LndlYmtpdEluZGV4ZWREQiB8fCB3aW5kb3cubXNJbmRleGVkREIgfHwgd2luZG93LnNoaW1JbmRleGVkREI7XG4gICAgICAgIHZhciBvcGVuID0gaW5kZXhlZERCLm9wZW4oXCJNeURhdGFiYXNlXCIsIDEpO1xuICAgICAgICBvcGVuLm9udXBncmFkZW5lZWRlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBkYiA9IG9wZW4ucmVzdWx0O1xuICAgICAgICAgICAgdmFyIHN0b3JlID0gZGIuY3JlYXRlT2JqZWN0U3RvcmUoXCJNeU9iamVjdFN0b3JlXCIsIHtcbiAgICAgICAgICAgICAgICBrZXlQYXRoOiBcImlkXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gc3RvcmUuY3JlYXRlSW5kZXgoXCJieV9pZFwiLCBcImlkXCIpO1xuICAgICAgICB9O1xuICAgICAgICBvcGVuLm9uc3VjY2VzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBkYiA9IG9wZW4ucmVzdWx0O1xuICAgICAgICAgICAgdmFyIHRyYW5zYWN0aW9uID0gZGIudHJhbnNhY3Rpb24oXCJNeU9iamVjdFN0b3JlXCIsIFwicmVhZHdyaXRlXCIpO1xuICAgICAgICAgICAgdmFyIG9iamVjdFN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUoXCJNeU9iamVjdFN0b3JlXCIpO1xuICAgICAgICAgICAgdmFyIHJlcXVlc3QgPSBvYmplY3RTdG9yZS5nZXRBbGwoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcXVlc3QucmVzdWx0KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxudmFyIGdlbyA9IG5hdmlnYXRvci5nZW9sb2NhdGlvbjtcbiBcbmlmKGdlbykge1xuICBnZW8uZ2V0Q3VycmVudFBvc2l0aW9uKGZ1bmN0aW9uKGxvY2F0aW9uKSB7XG4gICAgY29uc29sZS5sb2coJ1N6ZXJva2/Fm8SHICcgKyBsb2NhdGlvbi5jb29yZHMubGF0aXR1ZGUpO1xuICAgIGNvbnNvbGUubG9nKCdExYJ1Z2/Fm8SHICcgKyBsb2NhdGlvbi5jb29yZHMubG9uZ2l0dWRlKTtcbiAgfSk7XG59XG5lbHNlIHtcbiAgY29uc29sZS5sb2coJ25pZWRvc3TEmXBueScpO1xufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAuanMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXNzZXRzL3Njc3MvYXBwLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnR7XHJcblx0Y29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBsb2NhdGlvbiwgZGF0ZSwgcGhvdG8sIGNhdGVnb3J5KXtcclxuICAgICAgICB0aGlzLmlkID0gMDtcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgICAgIHRoaXMubG9jYXRpb24gPSBsb2NhdGlvbjtcclxuICAgICAgICB0aGlzLmRhdGUgPSBkYXRlO1xyXG4gICAgICAgIHRoaXMucGhvdG8gPSBwaG90bztcclxuICAgICAgICB0aGlzLmNhdGVnb3J5ID0gY2F0ZWdvcnk7XHJcblx0fSAgIFxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXNzZXRzL2pzL2V2ZW50LmpzIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRMaXN0e1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5saXN0ID0gW107XHJcblx0fVxyXG4gICAgXHJcbiAgICBhZGRFdmVudChldmVudCl7XHJcbiAgICAgICAgZXZlbnQuaWQgPSB0aGlzLmxpc3QubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMubGlzdC5wdXNoKGV2ZW50KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZmluZEV2ZW50QnlUaXRsZSh0aXRsZSl7XHJcbiAgICAgICAgbGV0IHNlYXJjaE9iamVjdCA9IHRoaXMubGlzdC5maW5kKG8gPT4gby50aXRsZSA9PT0gdGl0bGUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKHNlYXJjaE9iamVjdCk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hc3NldHMvanMvZXZlbnRMaXN0LmpzIiwiZXhwb3J0IGZ1bmN0aW9uIGF1dG9Db21wbGV0ZUxvY2F0aW9uKCl7XHJcbiAgICBnb29nbGUubWFwcy5ldmVudC5hZGREb21MaXN0ZW5lcih3aW5kb3csICdsb2FkJywgaW5pdEF1dG9jb21wbGV0ZSk7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdEF1dG9jb21wbGV0ZSgpIHtcclxuICAgICAgICB2YXIgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyksIHtcclxuICAgICAgICAgICAgY2VudGVyOiB7XHJcbiAgICAgICAgICAgICAgICBsYXQ6IC0zMy44Njg4XHJcbiAgICAgICAgICAgICAgICAsIGxuZzogMTUxLjIxOTVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAsIHpvb206IDEzXHJcbiAgICAgICAgICAgICwgbWFwVHlwZUlkOiAncm9hZG1hcCdcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBDcmVhdGUgdGhlIHNlYXJjaCBib3ggYW5kIGxpbmsgaXQgdG8gdGhlIFVJIGVsZW1lbnQuXHJcbiAgICAgICAgdmFyIGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhYy1pbnB1dCcpO1xyXG4gICAgICAgIHZhciBzZWFyY2hCb3ggPSBuZXcgZ29vZ2xlLm1hcHMucGxhY2VzLlNlYXJjaEJveChpbnB1dCk7XHJcbiAgICAgICAgbWFwLmNvbnRyb2xzW2dvb2dsZS5tYXBzLkNvbnRyb2xQb3NpdGlvbi5UT1BfTEVGVF0ucHVzaChpbnB1dCk7XHJcbiAgICAgICAgLy8gQmlhcyB0aGUgU2VhcmNoQm94IHJlc3VsdHMgdG93YXJkcyBjdXJyZW50IG1hcCdzIHZpZXdwb3J0LlxyXG4gICAgICAgIG1hcC5hZGRMaXN0ZW5lcignYm91bmRzX2NoYW5nZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNlYXJjaEJveC5zZXRCb3VuZHMobWFwLmdldEJvdW5kcygpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB2YXIgbWFya2VycyA9IFtdO1xyXG4gICAgICAgIC8vIExpc3RlbiBmb3IgdGhlIGV2ZW50IGZpcmVkIHdoZW4gdGhlIHVzZXIgc2VsZWN0cyBhIHByZWRpY3Rpb24gYW5kIHJldHJpZXZlXHJcbiAgICAgICAgLy8gbW9yZSBkZXRhaWxzIGZvciB0aGF0IHBsYWNlLlxyXG4gICAgICAgIHNlYXJjaEJveC5hZGRMaXN0ZW5lcigncGxhY2VzX2NoYW5nZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGFjZXMgPSBzZWFyY2hCb3guZ2V0UGxhY2VzKCk7XHJcbiAgICAgICAgICAgIGlmIChwbGFjZXMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBDbGVhciBvdXQgdGhlIG9sZCBtYXJrZXJzLlxyXG4gICAgICAgICAgICBtYXJrZXJzLmZvckVhY2goZnVuY3Rpb24gKG1hcmtlcikge1xyXG4gICAgICAgICAgICAgICAgbWFya2VyLnNldE1hcChudWxsKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG1hcmtlcnMgPSBbXTtcclxuICAgICAgICAgICAgLy8gRm9yIGVhY2ggcGxhY2UsIGdldCB0aGUgaWNvbiwgbmFtZSBhbmQgbG9jYXRpb24uXHJcbiAgICAgICAgICAgIHZhciBib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKCk7XHJcbiAgICAgICAgICAgIC8qc2VhcmNoQm94LnNldEF0dHJpYnV0ZShcImxhdFwiLCBib3VuZHMuKSovXHJcbiAgICAgICAgICAgIHBsYWNlcy5mb3JFYWNoKGZ1bmN0aW9uIChwbGFjZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFwbGFjZS5nZW9tZXRyeSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmV0dXJuZWQgcGxhY2UgY29udGFpbnMgbm8gZ2VvbWV0cnlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIGljb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBwbGFjZS5pY29uXHJcbiAgICAgICAgICAgICAgICAgICAgLCBzaXplOiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSg3MSwgNzEpXHJcbiAgICAgICAgICAgICAgICAgICAgLCBvcmlnaW46IG5ldyBnb29nbGUubWFwcy5Qb2ludCgwLCAwKVxyXG4gICAgICAgICAgICAgICAgICAgICwgYW5jaG9yOiBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoMTcsIDM0KVxyXG4gICAgICAgICAgICAgICAgICAgICwgc2NhbGVkU2l6ZTogbmV3IGdvb2dsZS5tYXBzLlNpemUoMjUsIDI1KVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhIG1hcmtlciBmb3IgZWFjaCBwbGFjZS5cclxuICAgICAgICAgICAgICAgIG1hcmtlcnMucHVzaChuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICAgICAgICAgICAgICBtYXA6IG1hcFxyXG4gICAgICAgICAgICAgICAgICAgICwgaWNvbjogaWNvblxyXG4gICAgICAgICAgICAgICAgICAgICwgdGl0bGU6IHBsYWNlLm5hbWVcclxuICAgICAgICAgICAgICAgICAgICAsIHBvc2l0aW9uOiBwbGFjZS5nZW9tZXRyeS5sb2NhdGlvblxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBsYWNlLmdlb21ldHJ5LnZpZXdwb3J0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gT25seSBnZW9jb2RlcyBoYXZlIHZpZXdwb3J0LlxyXG4gICAgICAgICAgICAgICAgICAgIGJvdW5kcy51bmlvbihwbGFjZS5nZW9tZXRyeS52aWV3cG9ydCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBib3VuZHMuZXh0ZW5kKHBsYWNlLmdlb21ldHJ5LmxvY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJMYXRcIiwgYm91bmRzLmYuYik7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJMbmdcIiwgYm91bmRzLmIuZik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBtYXAuZml0Qm91bmRzKGJvdW5kcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0TWFwKGxhdFBvc2l0aW9uLCBsbmdQb3NpdGlvbil7XHJcbiAgLy8gVGhlIGxvY2F0aW9uIG9mIFVsdXJ1XHJcbiAgdmFyIHVsdXJ1ID0ge2xhdDogbGF0UG9zaXRpb24sIGxuZzogbG5nUG9zaXRpb259O1xyXG4gIC8vIFRoZSBtYXAsIGNlbnRlcmVkIGF0IFVsdXJ1XHJcbiAgdmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoXHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKSwge3pvb206IDQsIGNlbnRlcjogdWx1cnV9KTtcclxuICAvLyBUaGUgbWFya2VyLCBwb3NpdGlvbmVkIGF0IFVsdXJ1XHJcbiAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe3Bvc2l0aW9uOiB1bHVydSwgbWFwOiBtYXB9KTtcclxufVxyXG5cclxuXHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hc3NldHMvanMvbG9jYXRpb24uanMiXSwic291cmNlUm9vdCI6IiJ9