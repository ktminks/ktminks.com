const fUnits = "&#8457", cUnits = "&#8451",
    apiKey = "0d8f3cd5202f9c62b410520a5c7bc5ae";
let lat, lon, api, data, temp = 0, isFahrenheit = true;

swapTemps = (isFahrenheit, temp) => {
    if (isFahrenheit)
        return ((temp - 32) * (5 / 9)).toFixed(2);
    else
        return ((temp * 9 / 5) + 32).toFixed(2);
}

getLocation = async () => {
    await fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // zip = data.postal;
            // city = data.city;
            // country = data.country;
            lat = data.latitude;
            lon = data.longitude;
            api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
        });
};

getWeather = async () => {
    await getLocation();
    await fetch(api)
        .then(response2 => response2.json())
        .then(data2 => data = data2)
};


$(document).ready(() => {
    updateDOM = async () => {
        await getWeather();
        console.log(data);
        if (data) {
            temp = data.main.feels_like;
            const desc = data.weather[0].description,
                icon = data.weather[0].icon,
                city = data.name,
                country = data.sys.country,
                low = data.main.temp_min,
                high = data.main.temp_max,
                windSpeed = data.wind.speed,
                windDirection = data.wind.deg;

            //display temp & location of weather station used for this info
            $("#loc").html(`${city}, ${country}`);
            $("#temp").html(`Feels like: ${temp} ${fUnits}`);

            //display weather description and corresponding icon
            $("#desc").html(desc);
            $("#icon").html(`<img src="https://openweathermap.org/img/w/${icon}.png">`);

            //display details
            $("#details").append(`<div class="d-flex justify-content-around flex-wrap">
                                  <p>Low: ${low}</p>
                                  <p>High: ${high}</p></div>`)
                .append(`<div class="d-flex justify-content-between flex-wrap">
                                  <p>Wind speed: ${windSpeed} &nbsp;</p>
                                  <div class="d-flex"> Direction: ${windDirection}° &nbsp; <div id="arrow">⇑</div></div></div>`);
            if (windSpeed > 0)
                $("#arrow").css("transform", `rotateZ(${windDirection}deg)`);
            else
                $("#arrow").html("✖");
        }
    }

    updateDOM();

    //set temp to fahrenheit by default, click converts to and from celsius
    $("#temp").click(function () {
        temp = swapTemps(isFahrenheit, temp);
        if (isFahrenheit) {
            $("#temp").html(`Feels like: ${temp} ${cUnits} `);
            isFahrenheit = false;
        } else {
            $("#temp").html(`Feels like: ${temp} ${fUnits} `);
            isFahrenheit = true;
        }
    });
});