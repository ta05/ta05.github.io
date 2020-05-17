
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
var forecastEl = $("#five-day-row");

var currentWeatherQueryURL;
var fiveDayForecastQueryURL;

var today;

initialize();

$("#search-button").on("click", function (event) {
    if ($("#citySearch").val().trim() !== "") {
        cityName = $("#citySearch").val().trim();

        currentWeatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
        fiveDayForecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;

        setDate();
        setCurrentWeather();
        setFiveDayForecast();
        adjustCityList();
    }

});

$(".city-button").on("click", function (event) {
    cityName = $(this).val();

    currentWeatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
    fiveDayForecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;

    setDate();
    setCurrentWeather();
    setFiveDayForecast();
});

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
    setCityButtons();
    setCurrentWeather();
    setFiveDayForecast();
}

function setCurrentWeather() {
    weatherTodayEl.empty();
    var date = "(" + formatDate(today) + ")";
    $.ajax({
        url: currentWeatherQueryURL,
        method: "GET"
    }).then(function (response) {
        
        cityName = response.name;
        var icon = response.weather[0].icon;
        var temperature = kelvinToFahrenheit(response.main.temp).toFixed(0);
        var humidity = response.main.humidity;
        var windSpeed = convertSpeed(response.wind.speed).toFixed(1);
        var uvIndex;

        var headEl = $("<h1>").html(cityName + " " + date);
        var iconEl;
        var tempEl = $("<p>").html("Temperature: " + temperature + "&#176F");
        var humidityEl = $("<p>").text("Humidity: " + humidity + "%");
        var windSpeedEl = $("<p>").text("Wind Speed: " + windSpeed + " mph");

        weatherTodayEl.append(headEl, tempEl, humidityEl, windSpeedEl);
    });
}

function setFiveDayForecast() {
    forecastEl.empty();
    $.ajax({
        url: fiveDayForecastQueryURL,
        method: "GET"
    }).then(function(response) {
        timeIndex = Math.floor(today.getHours() / 3);
        for (var i = 0; i < 5; i++){
            var result = response.list[timeIndex];

            var date = new Date(result.dt_txt);
            var icon = result.weather[0].icon;
            var temperature = kelvinToFahrenheit(result.main.temp).toFixed(0);
            var humidity = result.main.humidity;

            var cardDiv = createForecastCard(date, icon, temperature, humidity);

            forecastEl.append(cardDiv);
            
            timeIndex += 8;
        }
    });
}

function createForecastCard(date, icon, temperature, humidity) {
    var cardDiv = $("<div>").attr({
        "class": "col-md card text-white bg-primary mb-3",
        "style": "max-width: 18rem",
        "id": "forecast-card"
    });
    var cardBody = $("<div>").addClass("class", "card-body");

    var dateEl = $("<h1>").addClass("card-date").text(formatDate(date));
    var iconEl;
    var tempEl = $("<p>").html("Temp: " + temperature + "&#176F");
    var humidityEl = $("<p>").text("Humidity: " + humidity + "%");

    cardBody.append(dateEl, tempEl, humidityEl);
    cardDiv.append(cardBody);
    return cardDiv;
}

function setCityButtons() {
    for (var i = cityList.length - 1; i >= 0; i--)
        $("#city-button-list").prepend($("<button>").addClass("col-md-12 mb-2 city-button").val(cityList[i]).text(cityList[i]));
}

function adjustCityList() {
    cityName = capitalize(cityName);
    console.log(cityName);
    if (!cityList.includes(cityName)) {
        cityList.unshift(cityName);
        adjustCityButtons(cityList.pop());
    }
}

function adjustCityButtons(removedCity) {
    $("button[value='" + removedCity + "']").remove();
    $("#city-button-list").prepend($("<button>").addClass("col-md-12 mb-2 city-button").val(cityName).text(cityName));
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
}

function formatDate(date) {
    return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
}

function capitalize(name) {
    name = name.replace(/(^|\s)\S/g, l => l.toUpperCase());
    return name;
}

