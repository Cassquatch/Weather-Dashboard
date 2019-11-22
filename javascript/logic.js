$(document).ready(function(){
let appID = "816a6ba18e5f3b77cc12c8f07244ee1f";

let weather="";
let city="";
let current_date = moment().format("L");
console.log(current_date);

function displayForecast(){
    currentWeather();
    fiveDayForecast();
    function currentWeather(){
       
        city = $("#city").val().trim();
        weather = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + appID;
       

        localStorage.setItem("cities", city);
        
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
        
        
       
    }


    function fiveDayForecast(){
        let five_day_forecast = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + ",us&APPID=" + appID;
        console.log(five_day_forecast);
        let day_counter=1;
    //    //loop through the five day forecast, display each day at 3pm, 
    // //so something like, 
    //      for(i = 3; i < response.list.length; i += 8){
    //          display the forecast as individual days in the html
    //      }
        
        $.ajax({
            url: five_day_forecast,
            method: "GET"
        }).then(function(response){
        
            /*
            set the day containers and have an id that is the day count, then increment the day count by one as well as the loop incrementer, to try and display the days
            maybe make html cards if normal tags dont work

            */ 
            for(let i = 3; i < response.list.length; i+=8){
                //change each text area here
                $("#day-" + day_counter).children()
            }
        });
    }


}

$(".btn-success").click(displayForecast);
});