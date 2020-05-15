
var APIKey = "9f56308e6d3d8dc86ce2e3a4522aaa1c";
var cityName = "";
var cityList = [
    "Atlanta",
    "Chicago",
    "Denver",
    "Houston",
    "Los Angeles",
    "Miami",
    "New York",
    "Seattle"
]

var weatherTodayEl = $("#data-today");

var queryURL;

var today = new Date();
var currDay = today.getDate();
var currMonth = today.getMonth() + 1;
var currYear = today.getFullYear();

initialize();

function initialize() {
    if (localStorage.getItem("cityList") === null)
        cityName = "Houston";
    else {
        cityList = JSON.parse(localStorage.getItem("cityList")).concat(cityList).splice(0, 8);
        cityName = cityList[0];
    }
    queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=" + APIKey;

    setCurrentWeather();
}

function setCurrentWeather() {
    weatherTodayEl.empty();
    var date = "(" + formatDate(currDay, currMonth, currYear) + ")";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        cityName = response.name;
        var temperature = kelvinToFahrenheit(response.main.temp).toFixed(0);
        var humidity = response.main.humidity;
        var windSpeed = response.wind.speed;
        var uvIndex;
        console.log(response);

        var headEl = $("<h1>").html(cityName + " " + date);
        
        var tempEl = $("<p>").text("Temperature: " + temperature + " F");
        var humidityEl = $("<p>").text("Humidity: " + humidity + "%");
        var windSpeedEl = $("<p>").text("Wind Speed: " + windSpeed + " mph");
        
        weatherTodayEl.append(headEl, tempEl, humidityEl, windSpeedEl);

    });
}

function kelvinToFahrenheit(tempK) {
    tempF = (tempK - 273.15) * 1.80 + 32;
    return tempF;
}

function formatDate(day, month, year) {
    return month + "/" + day + "/" + year;
}