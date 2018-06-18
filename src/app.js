import './assets/scss/app.scss';
import Event from "./assets/js/event.js";
import EventList from "./assets/js/eventList.js";

var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

// Open (or create) the database
var open = indexedDB.open("MyDatabase", 1);  
    
    // Create the schema
open.onupgradeneeded = function(){
    var db = open.result;
    var store = db.createObjectStore("MyObjectStore");
        
    store.createIndex('by_id', 'id');
    
};


startApp(); 

function startApp(){
    const eventList = new EventList();
    
    
    addEventListenerButton(eventList);
    addEventListenerForm(eventList);
}

function  addEventListenerButton(eventList){
    const createButton = document.getElementsByClassName("nav__create")[0];
    const searchButton = document.getElementsByClassName("nav__search")[0];
    
    createButton.addEventListener("click", () => {
        showCreateForm();
    });
    
    searchButton.addEventListener("click", () => {
        createEventsElements(eventList);
        showEvents();
    });
}

function showCreateForm(eventList){
    const eventForm = document.getElementsByClassName("event")[0];
    const listOfEvents = document.getElementsByClassName("list")[0];
    
    eventForm.classList.add("show--flex");
    listOfEvents.classList.add("hide");
}

function showEvents(eventList){
    const eventForm = document.getElementsByClassName("event")[0];
    const listOfEvents = document.getElementsByClassName("list")[0];
    
    eventForm.classList.remove("show--flex");
    listOfEvents.classList.remove("hide");
}

function addEventListenerForm(eventList){
    const eventButton = document.getElementsByClassName("event__button")[0];
    
    eventButton.addEventListener("click", () => {
        validateData(eventList)
    });    
}

function validateData(eventList){
    const eventInput = document.getElementsByClassName("event__input");
    let countError = 0;

    for(let i = 0; i < eventInput.length; i++){
        if(eventInput[i].value == 0){
            errorMessage("Pole nie zostało wypełnione", i);
            countError++;
        }
        else if(eventInput[3].value > eventInput[4].value && i == 3){
            errorMessage("Niepoprawnie wprowadzona data", i);
            countError++;
        }
        else{
            errorMessage("", i);
        }
    }
    
    if(countError == 0){
        getData(eventInput, eventList);
    }
}

function errorMessage(errorText, i){
    const warningMsg = document.getElementsByClassName("event__warning");
    
    warningMsg[i].textContent = errorText; 
}

function getData(eventInput, eventList){ 
    const title = eventInput[0].value;
    const description = eventInput[1].value;
    
    const location = eventInput[2];
    const locationName = location.value;
    const locationLat = location.getAttribute("lat");
    const locationLng = location.getAttribute("lng");
    
    const dateFrom = eventInput[3].value;
    const dateTo = eventInput[4].value;
    
    const eventImage = eventInput[5].value;
    const eventCategory = eventInput[6].value;
    
    clearInputs(eventInput);
    inputData(title, description, locationName, locationLat, locationLng, dateFrom, dateTo, eventImage, eventCategory, eventList);
}

function clearInputs(eventInput){
    for(let i = 0; i < eventInput.length; i++){
        eventInput[i].value = "";
    }
}

function inputData(title, description, locationName, locationLat, locationLng, dateFrom, dateTo, eventImage, eventCategory, eventList){
    
    const event = new Event(title, description, [locationName, locationLat, locationLng], [dateFrom, dateTo], eventImage, eventCategory);
    eventList.addEvent(event);
    
    console.log(eventList);
    saveData(eventList);
}

function createEventsElements(eventList){
    const list = document.getElementsByClassName("list")[0];
    const listEvents = document.getElementsByClassName("list");
    list.textContent = "";
    
    for(let i = 0; i < eventList.list.length; i++){
        createEventElement(eventList.list[i], list);
    }
}

function createEventElement(eventElement, list){
    const listItem = document.createElement("div");
    listItem.classList += "list__item";
        
    const listPhoto = document.createElement("div");
    listPhoto.classList += "list__photo";
        
    const listImg = document.createElement("img");
    listImg.classList += "list__img";
        
    const listBody = document.createElement("div");
    listBody.classList += "list__body";
        
    const listDate = document.createElement("div");
    listDate.classList += "list__date";
        
    const listTitle = document.createElement("div");
    listTitle.classList += "list__title";
        
    const listLocation = document.createElement("div");
    listLocation.classList += "list__location";
        
    const listCategory = document.createElement("div");
    listCategory.classList += "list__category";
    
    inputContent(eventElement, list, listItem, listPhoto, listImg, listBody, listDate, listTitle, listLocation, listCategory);
}

function inputContent(eventElement, list, listItem, listPhoto, listImg, listBody, listDate, listTitle, listLocation, listCategory){
    
    listImg.src = eventElement.photo;
    listDate.textContent = `${eventElement.date[0]} - ${eventElement.date[1]}`;
    listTitle.textContent = `${eventElement.title}`;
    listLocation.textContent = `${eventElement.location[0]}`;
    listCategory.textContent = `#${eventElement.category}`;
        
    appendElements(listItem, list, listPhoto, listImg, listBody, listDate, listTitle, listLocation, listCategory);
}

function appendElements(listItem, list, listPhoto, listImg, listBody, listDate, listTitle, listLocation, listCategory){
    
    listBody.appendChild(listDate);
    listBody.appendChild(listTitle);
    listBody.appendChild(listLocation);
    listBody.appendChild(listCategory);
    
    listPhoto.appendChild(listImg);
    
    listItem.appendChild(listPhoto);
    listItem.appendChild(listBody);
    
    list.appendChild(listItem);
}

function saveData(eventList){
    // This works on all devices/browsers, and uses IndexedDBShim as a final fallback 
    open.onsuccess = function(){
        // Start a new transaction
        var db = open.result;
        var tx = db.transaction("MyObjectStore", "readwrite");
        var store = tx.objectStore("MyObjectStore");
        var idIndex = store.index('by_id');
                
        store.clear("MyObjectStore");
        
        for(let i = 0; i < eventList.list.length; i++){
            store.put(eventList.list[i]);
        }
    } 
}  

function getDataFromDatabase(eventList){
    var transaction = db.transaction(["customers"]);
    var objectStore = transaction.objectStore("customers");
    var request = objectStore.get("444-44-4444");
    request.onerror = function(event) {
      // Handle errors!
    };
    request.onsuccess = function(event) {
      // Do something with the request.result!
      
    };
}




