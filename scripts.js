'use strict';
// seleccion para el description para la description
let srchBar = document.querySelector('.search-bar');
const cityName = document.querySelector('.city-name');
const humidityForecast = document.querySelector('.forecast--hum');
const weatherTemp = document.querySelector('.weather-dg');
const wedaImg = document.querySelector('.weather-icon');
const time = document.querySelectorAll('.time');
const icon = document.querySelectorAll('.icon');
const dgToday = document.querySelectorAll('.forecast--w');
const forecastTemp = document.querySelectorAll('.temperature');
const forecastIcon = document.querySelectorAll('.forecast-icon');
const forecastText = document.querySelectorAll('.weather');
const forcastDays = document.querySelectorAll('.day');
const rain = document.querySelector('.c--rain');
const wind = document.querySelector('.wind');
const uvIndex = document.querySelector('.uv-index');

//event
let city;
let data;

let localData;
let getLocalData;

const updateWeatherUI = function (data) {
  console.log('second');
  humidityForecast.textContent = ` ${data.current.condition.text}
  `;
  weatherTemp.textContent = `${data.current.temp_c.toFixed(0)}°`;

  wedaImg.innerHTML = ` <img
  src=${data.current.condition.icon}
  alt=""
  class="weda-icon"
/>`;

  // icon.forEach(
  //   img => (tm.textContent = `${data.forecast.forecastday[0].icon[6]}`)
  // );

  icon.forEach(img => (img.src = `${data.current.condition.icon}`));

  dgToday.forEach(
    tmp =>
      (tmp.textContent = `${(data.forecast.forecastday[0].day.avgtemp_c += 2)}°`)
  );

  forecastTemp.forEach((temp, i) => {
    return (temp.textContent = `
      ${data.forecast.forecastday[i].day.avgtemp_c.toFixed(0)}°       
  `);
  });

  forecastIcon.forEach((icon, i) => {
    return (icon.src = `${data.forecast.forecastday[i].day.condition.icon}`);
  });

  forecastText.forEach((txt, i) => {
    return (txt.textContent = `${data.forecast.forecastday[i].day.condition.text}`);
  });

  // forcastDays.forEach((day, i) => {});

  forcastDays.forEach((day, i) => {
    return (day.textContent = `${data.forecast.forecastday[i].date}`);
  });

  rain.textContent = `${data.forecast.forecastday[0].day.daily_chance_of_rain}%`;

  wind.textContent = `${data.current.wind_kph}km/h`;

  uvIndex.textContent = `${data.current.uv}`;
};

const fetchWeather = async function (cnt) {
  // if (localdata) {
  try {
    const res = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=934ed6ad49234f2ea2a34922230111&q=${cnt}&days=7&aqi=yes&alerts=yes`
    );
    data = await res.json();

    const storageData = JSON.stringify(data);
    localData = localStorage.setItem('item', storageData);

    getLocalData = JSON.parse(localStorage.getItem('item'));
    // console.log(localdata);
    console.log(getLocalData);

    // assigning values from API call

    updateWeatherUI(getLocalData);
  } catch (err) {
    console.error(err.message);
    // localdata;
  }
};

// console.log(localdata);
// localStorage.setItem('forecasts', JSON.stringify(fetchWeather(`${city}`)));
// };

document.addEventListener('keydown', function (e) {
  // console.log(e.key);
  // localData = JSON.parse(localStorage.getItem('item'));
  // const storage = JSON.stringify(localData);
  // localStorage.setItem('item', storage);
  if (e.key === 'Enter') {
    const storage = JSON.stringify(data);
    localStorage.setItem('item', storage);
    // getLocalData = JSON.parse(localStorage.getItem('item'));
    console.log(getLocalData);
    if (!srchBar.value) return;

    // console.log(localdata);
    (city = cityName.textContent = srchBar.value.toUpperCase()),
      (srchBar.value = '');

    if (getLocalData) {
      console.log('in');
      console.log(getLocalData);
      updateWeatherUI(getLocalData);
    } else {
      fetchWeather(city);
    }
  }
});
console.log(typeof getLocalData);
// getLocalData = JSON.parse(localStorage.getItem('item'));
if (getLocalData) {
  console.log(`first`);
  updateWeatherUI(getLocalData);
}
