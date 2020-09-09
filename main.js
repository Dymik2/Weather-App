const input = document.querySelector('input');
const btn = document.querySelector('button');

const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');

const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');

const apiLink = "https://api.openweathermap.org/data/2.5/weather?q=";

const apiKey = "&appid=5e66f866de0652f41c81c7517da7da66";
const units = "&units=metric"
let city;
let url;

const getWeather = () => {
    city = (!input.value) ? 'Radom' : input.value;
    url = apiLink + city + apiKey + units;

    axios.get(url)
        .then(res => {
            const temp = res.data.main.temp;
            const hum = res.data.main.humidity;
            const status = Object.assign({}, ...res.data.weather);


            cityName.textContent = res.data.name;
            weather.textContent = status.main;
            temperature.textContent = Math.floor(temp) + '°C';
            humidity.textContent = hum + "%";
            input.value = "";
            warning.textContent = "";

            if (status.id >= 200 && status.id < 300) {
                photo.setAttribute('src', "./WeatherApp grafiki/thunderstorm.png");
            }
            else if (status.id >= 300 && status.id < 400) {
                photo.setAttribute('src', "./WeatherApp grafiki/drizzle.png");
            }
            else if (status.id >= 500 && status.id < 600) {
                photo.setAttribute('src', "./WeatherApp grafiki/rain.png");
            }
            else if (status.id >= 600 && status.id < 700) {
                photo.setAttribute('src', "./WeatherApp grafiki/ice.png");
            }
            else if (status.id >= 700 && status.id < 800) {
                photo.setAttribute('src', "./WeatherApp grafiki/fog.png");
            }
            else if (status.id === 800) {
                photo.setAttribute('src', "./WeatherApp grafiki/sun.png");
            }
            else if (status.id > 800 && status.id < 900) {
                photo.setAttribute('src', "./WeatherApp grafiki/cloud.png");
            }

            else {
                photo.setAttribute('src', "./WeatherApp grafiki/unknown.png");
            }

        }
        )
        .catch(() => warning.textContent = "Wpisz poprawną nazwę miasta")
}

const enterCheck = () => {


    if (event.keyCode === 13) {
        getWeather();
    }
}

getWeather();
input.addEventListener('keyup', enterCheck);
btn.addEventListener('click', getWeather);
