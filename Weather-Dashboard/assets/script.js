
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

var queryURL;

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
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        console.log(response);
        // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32

    });
}