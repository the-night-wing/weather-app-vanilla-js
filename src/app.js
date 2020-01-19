import { API_key } from "./env.json";

const state = {
    city: "",
    country: ""
};

const tempActual_p = document.getElementById("temp-act");
const tempFeels_p = document.getElementById("temp-feels");
const tempMin_p = document.getElementById("temp-min");
const tempMax_p = document.getElementById("temp-max");
const humidity_p = document.getElementById("humidity");
const pressure_p = document.getElementById("pressure");
const precipitation_p = document.getElementById("precipitation");
const getWeather_but = document.getElementById("getWeather");
const cityInput_inp = document.getElementById("cityInput");
const countryInput_inp = document.getElementById("countryInput");
const weatherLogo_icon = document.getElementById("weather-logo");
const inputError_div = document.getElementById("input-error");

const tempActual_cb = document.getElementsByName("actual-temp-cb")[0];
const tempFeels_cb = document.getElementsByName("feels-like-cb")[0];
const tempMin_cb = document.getElementsByName("min-temp-cb")[0];
const tempMax_cb = document.getElementsByName("max-temp-cb")[0];
const humidity_cb = document.getElementsByName("humidity-cb")[0];
const pressure_cb = document.getElementsByName("pressure-cb")[0];
const precipitation_cb = document.getElementsByName("precipitation-cb")[0];

const forecastOptions_p = document.querySelector(".forecast-options > p");
const checkboxes_div = document.getElementById("forecast-checkboxes");
// console.log(weatherLogo_icon.classList.value);

const checkboxes_ = [
    tempActual_cb,
    tempFeels_cb,
    tempMin_cb,
    tempMax_cb,
    humidity_cb,
    pressure_cb,
    precipitation_cb
];
const paragraphs = [
    tempActual_p,
    tempFeels_p,
    tempMin_p,
    tempMax_p,
    humidity_p,
    pressure_p,
    precipitation_p
];

let forecastOptions = false;
getWeather_but.addEventListener("click", e => setWeather(e));

const onCityChange = e => {
    state.city = e.target.value;
};

const onCountryChange = e => {
    state.country = e.target.value;
};

const hideByCheckBox = (el, cb) => {
    if (cb.checked === false) {
        // console.log(true);
        el.parentElement.classList.value = "hide";
    } else {
        el.parentElement.classList.value = "temp";
        // console.log(false);
    }
};

for (let i = 0; i < checkboxes_.length; i++) {
    checkboxes_[i].addEventListener("click", () =>
        hideByCheckBox(paragraphs[i], checkboxes_[i])
    );
}

// tempActual_cb.addEventListener("click", () =>
//     hideByCheckBox(tempActual_p, tempActual_cb)
// );

// tempFeels_cb.addEventListener("click", () =>
//     hideByCheckBox(tempFeels_p, tempFeels_cb)
// );

// tempMin_cb.addEventListener("click", () =>
//     hideByCheckBox(tempMin_p, tempMin_cb)
// );

// tempMax_cb.addEventListener("click", () =>
//     hideByCheckBox(tempMax_p, tempMax_cb)
// );

// humidity_cb.addEventListener("click", () =>
//     hideByCheckBox(humidity_p, humidity_cb)
// );

// pressure_cb.addEventListener("click", () =>
//     hideByCheckBox(pressure_p, pressure_cb)
// );

// precipitation_cb.addEventListener("click", () =>
//     hideByCheckBox(precipitation_p, precipitation_cb)
// );

const onForecastOptionsClick = () => {
    if (!forecastOptions) {
        checkboxes_div.classList.value = "checkboxes forecast-options-show";
        forecastOptions = !forecastOptions;
        console.log("object");
    } else {
        checkboxes_div.classList.value = "checkboxes forecast-options-hide";
        forecastOptions = !forecastOptions;
        console.log("object11");
        setTimeout(() => {
            checkboxes_div.classList.value = "checkboxes hide";
        }, 2000);
    }
};

cityInput_inp.addEventListener("input", e => onCityChange(e));
countryInput_inp.addEventListener("input", e => onCountryChange(e));

forecastOptions_p.onclick = onForecastOptionsClick;

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
        const errObject = {
            code: api_call.status,
            message: api_call.statusText
        };
        console.log(JSON.stringify(errObject));
        // return Promise.reject([api_call.status, api_call.statusText]);
        throw new Error(JSON.stringify(errObject));

        // console.log(e);
    } else {
        return api_call.json();
    }
    // console.log(response);
    // console.log((response.main.temp - 273.15).toFixed(2));
    // return response;
};

// Celsius = Kelvin - 273.15

const setTemperature = weather => {
    const degreeSign = "°";
    const tempActual = `${(weather.main.temp - 273.15).toFixed(
        2
    )}${degreeSign}`;
    const tempFeels = `${(weather.main.feels_like - 273.15).toFixed(
        2
    )}${degreeSign}`;
    const tempMax = `${(weather.main.temp_max - 273.15).toFixed(
        2
    )}${degreeSign}`;
    const tempMin = `${(weather.main.temp_min - 273.15).toFixed(
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

const showInputCityError = error => {
    const { message: errorMessage } = error;
    console.log(errorMessage);
    let errMessageToShow;
    if (errorMessage === "Failed to fetch") {
        console.log(true);
        errMessageToShow = "Check your internet connection";
    } else {
        const errObj = JSON.parse(errorMessage);
        const { code, message } = errObj;
        if (code === 404) {
            errMessageToShow = "Such a city was not found";
        }

        console.log(code);
        console.log(message);
    }
    inputError_div.innerHTML = errMessageToShow;
    inputError_div.classList.value = "input-error";
    setTimeout(() => hideInputCityError(), 7000);
};

// !        JS Animations

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
            // console.log(e + " Throwed an error");

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
