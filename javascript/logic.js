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
            console.log(json);
            $("#current-city").text(json.name + " " + current_date);
            $("#weather-image").attr("src", "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
            $("#temperature").text(temp.toFixed(2) + "°F");
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
            for(let i = 0; i < response.list.length; i++){
                //change each text area here
               let date_and_time = response.list[i].dt_txt;
               let date = date_and_time.split(" ")[0];
               let time = date_and_time.split(" ")[1];

               if(time === "15:00:00"){
                   let year = date.split("-")[0];
                   let month = date.split("-")[1];
                   let day = date.split("-")[2];
                    $("#day-" + day_counter).children(".card-date").text(month + "/" + day + "/" + year);
                    $("#day-" + day_counter).children(".weather-icon").attr("src","http://api.openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                    $("#day-" + day_counter).children(".weather-temp").text("Temp: " + ((response.list[i].main.temp - 273.15) * (9/5) + 32).toFixed(2) + "°F");
                    $("#day-" + day_counter).children(".weather-humidity").text("Humidity: " + response.list[i].main.humidity + "%");
                    day_counter++;
               }
            }
        });
    }


}

$(".btn-success").click(displayForecast);
});