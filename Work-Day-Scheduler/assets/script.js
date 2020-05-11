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


for (var i = 0; i < 24; i++){
    createTimeBlock(i);
}

function createTimeBlock(index) {
    var timeblock = $("<div>").addClass("col-md-10 jumbotron").attr("data-time", index);
    if (index > currHour) {
        timeblock.addClass("future");
    }
    else if (index === currHour) {
        timeblock.addClass("present");
    }
    else {
        timeblock.addClass("past");
    }
    var inputText = $("<textarea>");
    timeblock.append(inputText);
    return timeblock;
}


