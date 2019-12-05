$(document).ready(function () {
    let appID = "816a6ba18e5f3b77cc12c8f07244ee1f";
    let weather = "";
    let city = "";
    let current_date = moment().format("L");
    let search_history = JSON.parse(localStorage.getItem("cities")) === null ? [] : JSON.parse(localStorage.getItem("cities"));

    console.log(search_history);
    console.log(current_date);

    displaySearchHistory();
    function currentWeather() {


        if ($(this).attr("id") === "submit-city") {
            city = $("#city").val();
        } else {
            city = $(this).text();
        }

        weather = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + appID;
        console.log(search_history.indexOf(city));

        if (search_history.indexOf(city) === -1) {

            search_history.push(city);
        }

        console.log(search_history);
        localStorage.setItem("cities", JSON.stringify(search_history));

        $.getJSON(weather, function (json) {
            let temp = (json.main.temp - 273.15) * (9 / 5) + 32;
            let windspeed = json.wind.speed * 2.237;

            $("#current-city").text(json.name + " " + current_date);
            $("#weather-img").attr("src", "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
            $("#temperature").text(temp.toFixed(2) + "°F");
            $("#humidity").text(json.main.humidity + "%");
            $("#windspeed").text(windspeed.toFixed(2) + " " + "mph");
        });
    }

    function fiveDayForecast() {
        let five_day_forecast = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + ",us&APPID=" + appID;
       
        let day_counter = 1;

        $.ajax({
            url: five_day_forecast,
            method: "GET"
        }).then(function (response) {


            for (let i = 0; i < response.list.length; i++) {
                //change each text area here
                let date_and_time = response.list[i].dt_txt;
                let date = date_and_time.split(" ")[0];
                let time = date_and_time.split(" ")[1];

                if (time === "15:00:00") {
                    let year = date.split("-")[0];
                    let month = date.split("-")[1];
                    let day = date.split("-")[2];
                    $("#day-" + day_counter).children(".card-date").text(month + "/" + day + "/" + year);
                    $("#day-" + day_counter).children(".weather-icon").attr("src", "http://api.openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                    $("#day-" + day_counter).children(".weather-temp").text("Temp: " + ((response.list[i].main.temp - 273.15) * (9 / 5) + 32).toFixed(2) + "°F");
                    $("#day-" + day_counter).children(".weather-humidity").text("Humidity: " + response.list[i].main.humidity + "%");
                    day_counter++;
                }
            }
        });
    }

    function displaySearchHistory() {

        $("#search-history").empty();
        search_history.forEach(function (city) {

            //check to see if an entry is already part of search history, and don't add a second version of it
            console.log(search_history);
            let history_item = $("<li>");

            history_item.addClass("list-group-item btn btn-light");
            history_item.text(city);

            $("#search-history").prepend(history_item);
        });
        $(".btn").click(currentWeather);
        $(".btn").click(fiveDayForecast);

    }
    function clearHistory() {
        $("#search-history").empty();
        search_history = [];
        localStorage.setItem("cities", JSON.stringify(search_history));
    }
    //put the listener on btn class so that all buttons have listener
    $("#clear-history").click(clearHistory);
    $("#submit-city").click(displaySearchHistory);

});