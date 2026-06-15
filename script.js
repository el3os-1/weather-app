const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

const apiKey = "c63cc7025ee5470bb46150837261506";

searchBtn.addEventListener("click", async function () {

    const city = cityInput.value.trim();
    cityInput.value = "";

    if (city === "") {
        alert("Enter city name");
        return;
    }

    weatherResult.innerHTML = "<p>Loading...</p>";

    try {

        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
        );

        const data = await response.json();

        if (data.error) {
            weatherResult.innerHTML = `<p>${data.error.message}</p>`;
            return;
        }

        weatherResult.innerHTML = `
            <h2>${data.location.name}, ${data.location.country}</h2>
            <img src="https:${data.current.condition.icon}" alt="Weather Icon">
            <h3>${data.current.temp_c}°C</h3>
            <p>${data.current.condition.text}</p>
            <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
            <p><strong>Wind:</strong> ${data.current.wind_kph} km/h</p>
        `;

    } catch (error) {

        weatherResult.innerHTML = `
            <p>Failed to load weather data.</p>
        `;

        console.error(error);
    }
});
cityInput.addEventListener("keypress", function(e){

    if(e.key === "Enter"){
        searchBtn.click();
    }

});