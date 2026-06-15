const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

const apiKey = "c63cc7025ee5470bb46150837261506";

searchBtn.addEventListener("click", async function () {

    const city = cityInput.value.trim();
    cityInput.focus();
cityInput.select();
    if (city === "") {
        alert("Enter city name");
        return;
    }
    

    weatherResult.innerHTML = `
    <div class="loader"></div>
    <p>Loading weather...</p>
`;

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
    <h2>${data.location.name}</h2>

    <img src="https:${data.current.condition.icon}" />

    <h3>${data.current.temp_c}°C</h3>

    <p>${data.current.condition.text}</p>

    <div class="weather-info">
        <div class="card">
            🌡️ <br> ${data.current.temp_c}°C
        </div>

        <div class="card">
            💧 <br> ${data.current.humidity}%
        </div>

        <div class="card">
            💨 <br> ${data.current.wind_kph} km/h
        </div>
    </div>
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
const modeBtn = document.getElementById("modeBtn");

modeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        modeBtn.textContent = "☀️ Light Mode";
    } else {
        modeBtn.textContent = "🌙 Dark Mode";
    }

});
const locationBtn = document.getElementById("locationBtn");
locationBtn.addEventListener("click", () => {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(async (position) => {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            weatherResult.innerHTML = "Loading...";

            const response = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`
            );

            const data = await response.json();

            weatherResult.innerHTML = `
                <h2>${data.location.name}</h2>
                <img src="https:${data.current.condition.icon}">
                <h3>${data.current.temp_c}°C</h3>
                <p>${data.current.condition.text}</p>
            `;

        });

    } else {
        alert("Geolocation not supported");
    }

});
