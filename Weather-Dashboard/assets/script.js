
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
var forecastEl = $("forecast");

var currentWeatherQueryURL;
var fiveDayForecastQueryURL;

var today;
var currDay;
var currMonth;
var currYear;

initialize();

function initialize() {
    if (localStorage.getItem("cityList") === null)
        cityName = "Houston";
    else {
        cityList = JSON.parse(localStorage.getItem("cityList")).concat(cityList).splice(0, 8);
        cityName = cityList[0];
    }
    currentWeatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
    fiveDayForecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;

    setDate();
    setCurrentWeather();
    setFiveDayForecast()
}

function setCurrentWeather() {
    weatherTodayEl.empty();
    var date = "(" + formatDate(currDay, currMonth, currYear) + ")";
    $.ajax({
        url: currentWeatherQueryURL,
        method: "GET"
    }).then(function(response) {

        cityName = response.name;
        var temperature = kelvinToFahrenheit(response.main.temp).toFixed(0);
        var humidity = response.main.humidity;
        var windSpeed = convertSpeed(response.wind.speed).toFixed(1);
        var uvIndex;
        console.log(response);

        var headEl = $("<h1>").html(cityName + " " + date);
        
        var tempEl = $("<p>").html("Temperature: " + temperature + "&#176F");
        var humidityEl = $("<p>").text("Humidity: " + humidity + "%");
        var windSpeedEl = $("<p>").text("Wind Speed: " + windSpeed + " mph");

        weatherTodayEl.append(headEl, tempEl, humidityEl, windSpeedEl);

    });
}

function setFiveDayForecast() {
    forecastEl.empty();
    var headEl = $("<h1>").text("5-Day Forecast");


    
    $.ajax({
        url: fiveDayForecastQueryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        console.log(today.getHours());

    });
}

function kelvinToFahrenheit(tempK) {
    tempF = (tempK - 273.15) * 1.80 + 32;
    return tempF;
}

function convertSpeed(mps) {
    mph = mps * 3600 / 1609.34;
    return mph;
}

function setDate() {
    today = new Date();
    currDay = today.getDate();
    currMonth = today.getMonth() + 1;
    currYear = today.getFullYear();
}

function formatDate(day, month, year) {
    return month + "/" + day + "/" + year;
}