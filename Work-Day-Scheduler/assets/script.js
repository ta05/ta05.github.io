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
    if (index > currHour) {
        eventBlockEl.addClass("future");
    }
    else if (index === currHour) {
        eventBlockEl.addClass("present");
    }
    else {
        eventBlockEl.addClass("past");
    }
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

planner.on("click", ".saveBtn", function (event) {
    var index = $(this).val();
    console.log($("#input-" + index).val());
});


