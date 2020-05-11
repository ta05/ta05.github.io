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
    createTimeBlock(i);
    createSaveBtn(i);
}

function createTimeBlock(index) {
    var timeblockEl = $("<div>").addClass("col-md-10").attr("data-time", index);
    if (index > currHour) {
        timeblockEl.addClass("future");
    }
    else if (index === currHour) {
        timeblockEl.addClass("present");
    }
    else {
        timeblockEl.addClass("past");
    }
    var inputText = $("<textarea>");
    timeblockEl.append(inputText);
    return timeblockEl;
}

function createSaveBtn(index) {
    var saveBtnEl = $("<button>").addClass("col-md-1 saveBtn").attr("value", index);
    return saveBtnEl;
}


