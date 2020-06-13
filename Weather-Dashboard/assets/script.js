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

function initialize() {
    if (localStorage.getItem("cityList") === null)
        cityName = "Houston"
    else {
        cityList = JSON.parse(localStorage.getItem("cityList")).concat(cityList).splice(0,8);
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
        var icon = "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
        var temperature = kelvinToFahrenheit(response.main.temp).toFixed(0);
        var humidity = response.main.humidity;
        var windSpeed = convertSpeed(response.wind.speed).toFixed(1);

        var headEl = $("<h1>").html(cityName + " " + date);
        var iconEl = $("<img>").attr({
            "src": icon,
            "alt": response.weather[0].description
        });
        var tempEl = $("<p>").html("Temperature: " + temperature + "&#176F");
        var humidityEl = $("<p>").text("Humidity: " + humidity + "%");
        var windSpeedEl = $("<p>").text("Wind Speed: " + windSpeed + " mph");

        headEl.append(iconEl);

        weatherTodayEl.append(headEl, tempEl, humidityEl, windSpeedEl);

        setUVIndex(response.coord.lat, response.coord.lon);
    });
}

function setFiveDayForecast() {
    forecastEl.empty();
    $.ajax({
        url: fiveDayForecastQueryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response.list[6]);
        for (var i = 7; i < 40; i+=8){
            var result = response.list[i];

            var fDate = result.dt_txt.replace("-", "/");
            var date = new Date(fDate).toLocaleDateString();
            var icon = "https://openweathermap.org/img/wn/" + result.weather[0].icon + "@2x.png";
            var description = result.weather[0].description;
            var temperature = kelvinToFahrenheit(result.main.temp).toFixed(0);
            var humidity = result.main.humidity;

            var cardDiv = createForecastCard(date, icon, description, temperature, humidity);

            forecastEl.append(cardDiv);
        }
    });
}

function createForecastCard(date, icon, description,  temperature, humidity) {
    var cardDiv = $("<div>").attr({
        "class": "col-md card text-white mb-3 forecast-card",
        "style": "max-width: 18rem"
    });
    var cardBody = $("<div>").addClass("class", "card-body");

    var dateEl = $("<h1>").addClass("card-date").text(date);
    var iconEl = $("<img>").attr({
        "src": icon,
        "alt": description,
        "class": "weather-icon img-fluid"
    });
    var tempEl = $("<p>").html("Temp: " + temperature + "&#176F");
    var humidityEl = $("<p>").text("Humidity: " + humidity + "%");

    dateEl.append(iconEl);

    cardBody.append(dateEl, tempEl, humidityEl);
    cardDiv.append(cardBody);
    return cardDiv;
}

function setCityButtons() {
    for (var i = cityList.length - 1; i >= 0; i--)
        $("#city-button-list").prepend($("<button>").addClass("col-md-12 mb-2 city-button").val(cityList[i]).text(cityList[i]));
}

function setUVIndex(lat, lon) {
    uvIndexFromGeolocation(lat, lon);
}

function adjustCityList() {
    cityName = capitalize(cityName);
    if (!cityList.includes(cityName)) {
        cityList.unshift(cityName);
        adjustCityButtons(cityList.pop());
    }
    else {
        movedCity = cityList.splice(cityList.indexOf(cityName), 1);
        cityList.unshift(cityName);
    }
    adjustLocalStorage();
}

function adjustCityButtons(removedCity) {
    $("button[value='" + removedCity + "']").remove();
    $("#city-button-list").prepend($("<button>").addClass("col-md-12 mb-2 city-button").val(cityName).text(cityName));
}

function adjustLocalStorage() {
    localStorage.removeItem("cityList");
    localStorage.setItem("cityList", JSON.stringify(cityList));
}

/* On-Click Functions */

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
    adjustCityList();
});

/* Conversions and Formatting Functions */

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

function uvIntensity(uv) {
    if (uv < 3)
        return "low";
    else if (uv < 6)
        return "moderate";
    else if (uv < 8)
        return "high";
    else if (uv < 11)
        return "very-high";
    else
        return "extreme";
}

/* Geolocation Functions */

function getLocation() {
    // Make sure browser supports this feature
    if (navigator.geolocation) {
      // Provide our showPosition() function to getCurrentPosition
        navigator.geolocation.getCurrentPosition(showPosition);
    } 
    else {
        alert("Geolocation is not supported by this browser.");
    }
}

  // This will get called after getCurrentPosition()
function showPosition(position) {
    // Grab coordinates from the given object
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    // Call our next function, passing on the coordinates
    return {
        lat: lat,
        lon: lon
    };
}

function uvIndexFromGeolocation(lat, lon) {
    uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;

    $.ajax({
        url: uvURL,
        method: "GET"
    }).then(function (response) {

        uv = response.value;

        uvEl = $("<p>").text("UV Index: ");
        intensityEl = $("<span>").text(uv).addClass(uvIntensity(uv)).addClass("uv-index");

        uvEl.append(intensityEl);
        weatherTodayEl.append(uvEl);
    });
}