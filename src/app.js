import { API_key } from "./env.json";

const state = {
    city: ""
};

const tempActual_p = document.getElementById("temp-act");
const tempFeels_p = document.getElementById("temp-feels");
const tempMin_p = document.getElementById("temp-min");
const tempMax_p = document.getElementById("temp-max");
const getWeather_but = document.getElementById("getWeather");
const cityInput_inp = document.getElementById("cityInput");
const countryInput_inp = document.getElementById("countryInput");
const weatherLogo_icon = document.getElementById("weather-logo");

console.log(weatherLogo_icon.classList.value);

getWeather_but.addEventListener("click", e => setWeather(e));

const onCityChange = e => {
    state.city = e.target.value;
};

cityInput_inp.addEventListener("change", onCityChange);

const getWeatherData = async (city, country) => {
    const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}${
            country !== "" ? "," + country : ""
        }&appid=${API_key}`
    );
    const response = await api_call.json();
    console.log(response);
    // console.log((response.main.temp - 273.15).toFixed(2));
    return response;
};

// Celsius = Kelvin - 273.15

const setTemperature = weather => {
    const degreeSign = "°";
    const tempActual = `Actual temperature: ${(
        weather.main.temp - 273.15
    ).toFixed(2)}${degreeSign}`;
    const tempFeels = `Feels like: ${(weather.main.feels_like - 273.15).toFixed(
        2
    )}${degreeSign}`;
    const tempMax = `Max temp: ${(weather.main.temp_max - 273.15).toFixed(
        2
    )}${degreeSign}`;
    const tempMin = `Min temp: ${(weather.main.temp_min - 273.15).toFixed(
        2
    )}${degreeSign}`;
    tempActual_p.innerHTML = tempActual;
    tempFeels_p.innerHTML = tempFeels;
    tempMax_p.innerHTML = tempMax;
    tempMin_p.innerHTML = tempMin;
};

const setWeather = e => {
    e.preventDefault();

    const city = cityInput_inp.value;
    const country = countryInput_inp.value;
    console.log(city);

    const weather = getWeatherData(city, country);
    weather.then(result => {
        if (result.message !== undefined) {
            console.log(result.message);
        } else {
            setTemperature(result);
        }
    });
    // console.log(navigator.geolocation);
};

// setWeather();
