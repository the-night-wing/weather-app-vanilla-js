import { API_key } from "./env.json";

const state = {
    city: "",
    country: ""
};

const tempActual_p = document.getElementById("temp-act");
const tempFeels_p = document.getElementById("temp-feels");
const tempMin_p = document.getElementById("temp-min");
const tempMax_p = document.getElementById("temp-max");
const getWeather_but = document.getElementById("getWeather");
const cityInput_inp = document.getElementById("cityInput");
const countryInput_inp = document.getElementById("countryInput");
const weatherLogo_icon = document.getElementById("weather-logo");
const inputError_div = document.getElementById("input-error");

console.log(weatherLogo_icon.classList.value);

getWeather_but.addEventListener("click", e => setWeather(e));

const onCityChange = e => {
    state.city = e.target.value;
};

const onCountryChange = e => {
    state.country = e.target.value;
};

cityInput_inp.addEventListener("input", e => onCityChange(e));
countryInput_inp.addEventListener("input", e => onCountryChange(e));

const getWeatherData = async (city, country) => {
    const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}${
            country !== "" ? "," + country : ""
        }&appid=${API_key}`
    );
    console.log(api_call.ok);
    console.log(api_call.status);
    if (api_call.status !== 200) {
        console.log(api_call.status);
        console.log(api_call.statusText);
        // return Promise.reject([api_call.status, api_call.statusText]);
        throw new Error([api_call.status, api_call.statusText]);

        // console.log(e);
    }
    // console.log(response);
    // console.log((response.main.temp - 273.15).toFixed(2));
    // return response;
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

const checkCityInput = () => {
    console.log(state);
    // console.log(state.city === "" ? false : true);
    return state.city === "" ? false : true;
};

const showEmptyCityError = () => {
    cityInput_inp.placeholder = "Enter a city";
    cityInput_inp.classList.value = "input-city-error";
    setTimeout(() => hideEmptyCityError(), 1500);
};
//! How to make value change smooth
const hideEmptyCityError = () => {
    cityInput_inp.placeholder = "Your city";
    cityInput_inp.classList.value = "";
};

const showInputCityError = message => {
    let errMessage = message;
    console.log(message);
    switch (message) {
        case "TypeError: Failed to fetch":
            errMessage = "Check your internet connection";
            break;
    }
    if ((message = "TypeError: Failed to fetch")) {
        errMessage = "Check your internet connection";
    }
    console.log(errMessage);
    inputError_div.innerHTML = errMessage;
    inputError_div.classList.value = "input-error";
    setTimeout(() => hideInputCityError(), 6000);
};

const hideInputCityError = () => {
    inputError_div.classList.value = "hide";
};

const setWeather = e => {
    e.preventDefault();

    const isCityEntered = checkCityInput();

    if (!isCityEntered) {
        console.log(isCityEntered);
        showEmptyCityError();
    } else {
        const { city, country } = state;
        // let weather;
        const res = getWeatherData(city, country);
        res.then(data => {
            console.log("asdasd");
            setTemperature(data);
        }).catch(e => {
            console.log(e + " Throwed an error");
            showInputCityError(e);
        });
        // .catch(console.log(object));
        // console.log(weather);
        // weather.then(result => {
        //     if (result.message !== undefined) {
        //         console.log(result.message);
        //         showInputCityError();
        //     } else {
        //         setTemperature(result);
        //     }
        // });
    }

    // console.log(navigator.geolocation);
};

// setWeather();
