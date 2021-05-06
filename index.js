const temperature = document.getElementById('temperature');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const description = document.getElementById('description');
const feels_like = document.getElementById('feels_like');
const tempmax = document.getElementById('tempmax');
const tempmin = document.getElementById('tempmin');
const city = document.getElementById('city');
const himidity = document.getElementById('himidity');

const form = document.querySelector('form');
const input = document.querySelector('input')


let url = 'https://api.openweathermap.org/data/2.5/weather?q=dakar&appid=df8cf110c9fde32073be5d753edac52c';
let weather = {}
async function goFetch(url) {
    const data = await fetch(url);
    const response = await data.json();
    weather = {
        city: response.name,
        description: response.weather[0].description,
        sunrise: response.sys.sunrise,
        sunset: response.sys.sunset,
        feels_like: response.main.feels_like,
        temp: response.main.temp,
        temp_max: response.main.temp_max,
        temp_min: response.main.temp_min,
        humidity: response.main.humidity
    }
    processData(weather);
}

goFetch(url)

function processData(weather) {
    temperature.textContent = Math.round(weather.temp - 273, 5) + "°";
    sunrise.textContent = `Sunrise ${new Date(weather.sunrise * 1000).getHours()} : ${new Date(weather.sunrise * 1000).getMinutes()} AM `;
    city.textContent = weather.city;
    description.textContent = weather.description;
    sunset.textContent = `Sunset ${new Date(weather.sunrise * 1000).getHours()} : ${new Date(weather.sunset * 1000).getMinutes()} PM `;
    feels_like.textContent = "feels like " + Math.round(weather.feels_like - 273, 15) + "°";
    tempmax.textContent = "temperature max " + Math.round(weather.temp_max - 273, 15) + "°";
    tempmin.textContent = "temperature min: " + Math.round(weather.temp_min - 273, 15) + "°";
    himidity.textContent = "humidity " + weather.humidity
}

function triggerFetch(e) {
    e.preventDefault();
    let url2 = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=df8cf110c9fde32073be5d753edac52c`;
    goFetch(url2)
}


// Even listeners
form.addEventListener('submit', triggerFetch);