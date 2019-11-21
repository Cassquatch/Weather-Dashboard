$(document).ready(function(){
let appID = "816a6ba18e5f3b77cc12c8f07244ee1f";

let weather="";
let city="";
let current_date = moment().format("L");
console.log(current_date);
function currentWeather(){
    city = $("#city").val();
    weather = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + appID;

    $.getJSON(weather, function(json){
        let temp = (json.main.temp - 273.15) * (9/5) + 32;
        let windspeed = json.wind.speed * 2.237;
        
        console.log(weather);
        $("#current-city").text(json.name + " " + current_date);
        $("#weather-image").attr("src", "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
        $("#temperature").text(temp.toFixed(2));
        $("#humidity").text(json.main.humidity + "%");
        $("#windspeed").text(windspeed.toFixed(2) + " " + "mph");

    });

    function convertToFahrenheit(temp){
        (temp - 273.15) * (9/5) + 32;
        return temp;
    }
}

$(".btn-success").click(currentWeather);
});