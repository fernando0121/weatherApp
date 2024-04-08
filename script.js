const input = document.getElementById("input");
const submitBtn = document.getElementById("submitBtn");
const emoji = document.getElementById("emoji");
const tempDisplay = document.getElementById("tempDisplay");
const humidityDisplay = document.getElementById("humidityDisplay");
const desc = document.getElementById("desc");
const errorMsg = document.getElementById("errorMsg");
const weatherform = document.getElementById("weatherform"); 
const nameCity = document.getElementById("nameCity");
const card = document.getElementById("card"); // Define card variable for appending elements

const apiKey = `5d5d50c5bb7d132c7aab3a4994501411`;

weatherform.addEventListener("submit", async event => {
    event.preventDefault(); 

    const city = input.value;
    if(city){
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch(error) {
            console.error(error);
            displayError("Error fetching data. Please try again.");
        }
    } else {
        displayError("Please Enter Your City");
    }
});

async function getWeatherData(city) {
    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        const response = await fetch(apiUrl);

        if (response.ok) {
            const weatherData = await response.json();
            return weatherData;
        } else {
            throw new Error('Unable to fetch data');
        }
    } catch (error) {
        console.error(error);
        displayError("Error fetching data. Please try again.");
    }
}

function displayWeatherInfo(data) {
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;

    nameCity.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`; // Convert Kelvin to Celsius and round
    humidityDisplay.textContent = `Humidity: ${humidity}% 💧`;
    desc.textContent = description;
    emoji.textContent = getWeatherEmoji(id);

    card.appendChild(nameCity);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(desc);
    card.appendChild(emoji);

    console.log(data);
}

function getWeatherEmoji(weatherId) {
    switch(true) {
        case (weatherId >= 200 && weatherId < 300):
            return `⛈️`;
        case (weatherId >= 300 && weatherId < 400):
            return `🌧️`;
        case (weatherId >= 500 && weatherId < 600):
            return `🌦️`;
        case (weatherId >= 600 && weatherId < 700):
            return `❄️`;
        case (weatherId >= 700 && weatherId < 800):
            return `🌫️`;
        case (weatherId === 800):
            return `☀️`;
        case (weatherId >= 801 && weatherId < 810):
            return `☁️`;
        default:
            return `🤔`;
    }
}

function displayError(message) {
    errorMsg.textContent = message;
}