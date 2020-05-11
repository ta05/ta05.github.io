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
$("#currentDay").text(currDate);

/* Timeblock Creation and Formatting */

var currHour = today.getHours();
var planner = $(".container");

for (var i = 0; i < 24; i++){
    var rowTimeBlockEl = $("<div>").addClass("row time-block");
    rowTimeBlockEl.append(createHourBlock(i), createEventBlock(i), createSaveBtn(i));

    planner.append(rowTimeBlockEl);
}

function createHourBlock(index) {
    var hourBlockEl = $("<div>").addClass("col-md-1 hour").text(displayHour(index));
    return hourBlockEl;
}

function createEventBlock(index) {
    var eventBlockEl = $("<textarea>").addClass("col-md-10").attr("id", "input-" + index);
    if (index < currHour) {
        eventBlockEl.addClass("past");
    }
    else if (index === currHour) {
        eventBlockEl.addClass("present");
    }
    else {
        eventBlockEl.addClass("future");
    }

    eventBlockEl.val(localStorage.getItem("event-" + index));
    
    return eventBlockEl;
}

function createSaveBtn(index) {
    var saveBtnEl = $("<button>").addClass("col-md-1 saveBtn").val(index);
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

/* Save Button Event Listener */

planner.on("click", ".saveBtn", function (event) {
    var index = $(this).val();
    localStorage.setItem("event-" + index, $("#input-" + index).val());
});


