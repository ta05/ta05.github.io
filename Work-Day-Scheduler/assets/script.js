/* Current Day Display */

var today = new Date();
var monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

var currDay = today.getDate();
var currMonth = monthList[today.getMonth()];
var currYear = today.getFullYear();

var currDate = currMonth + " " + currDay + " " + currYear;

var currHour = today.getHours();

$("#currentDay").text(currDate);

/* Timeblock Creation and Formatting */

var planner = $(".container");

for (var i = 0; i < 24; i++){
    //createEventBlock(i);
    //createSaveBtn(i);
    createHourBlock(i);
}

function createHourBlock(index) {
    var hourBlockEl = $("<div>").addClass("col-md-1 hour").text(displayHour(index));
    return hourBlockEl;
}

function createEventBlock(index) {
    var eventblockEl = $("<div>").addClass("col-md-10").attr("data-time", index);
    if (index > currHour) {
        eventblockEl.addClass("future");
    }
    else if (index === currHour) {
        eventblockEl.addClass("present");
    }
    else {
        eventblockEl.addClass("past");
    }
    var inputText = $("<textarea>");
    eventblockEl.append(inputText);
    return eventblockEl;
}

function createSaveBtn(index) {
    var saveBtnEl = $("<button>").addClass("col-md-1 saveBtn").attr("value", index);
    return saveBtnEl;
}

function displayHour(index) {
    var hour;
    var suffix = "";

    if (parseInt(index / 12) === 0)
        suffix = "AM";
    else
        suffix = "PM";
    
    hour = index % 12;
    if (hour === 0)
        hour = 12;
    
    var time = hour + suffix;
    return time;
}


