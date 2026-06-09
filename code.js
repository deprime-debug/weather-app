
const apiKey = //insert your own api 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
// created elements for api key and api url
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherBox = document.getElementById("weather-box");
const errorMessage = document.getElementById("error-message");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (response.status === 404) {
            errorMessage.style.display = "block";
            weatherBox.style.display = "none";
            return;
        }

        const data = await response.json();

        //DOM Manupulation is used
        document.getElementById("city").innerText = data.name;
        document.getElementById("temp").innerText = Math.round(data.main.temp) + "°C";
        document.getElementById("description").innerText = data.weather[0].description;
        document.getElementById("humidity").innerText = data.main.humidity + "%";
        document.getElementById("wind").innerText = data.wind.speed + " km/h";

        // Reset visibility
        errorMessage.style.display = "none";
        weatherBox.style.display = "block";

    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Something went wrong. Check your internet connection or API key.");
    }
}

// Event Listeners
searchBtn.addEventListener("click", () => {
    if (cityInput.value.trim() !== "") {
        checkWeather(cityInput.value);
    }
});

cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && cityInput.value.trim() !== "") {
        checkWeather(cityInput.value);
    }
});