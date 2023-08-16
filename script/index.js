// Function to display the current date and time
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `10${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#date");
let now = new Date();

dateElement.innerHTML = formatDate(now);
// Function to update the weather information based on the API response
function showCurrentCityTemperature(response) {
  let temperatureElement = document.querySelector("#temperature-value");
  fahrenheitLinkTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(fahrenheitLinkTemperature);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}
// Function to fetch weather data based on the user-entered city name

function getWeatherByCity(city) {
  let apiKey = "cb286bad3607984b41ed10c8de5cf00e";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showCurrentCityTemperature);
}

//Showing the city searched in the enter a city section
function cityEntered(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  let cityValue = document.querySelector("#city-input");
  city.innerHTML = cityValue.value;
}

let enterACity = document.querySelector("#enter-location");
enterACity.addEventListener("submit", cityEntered);

function showPosition(position) {
  let apiKey = "cb286bad3607984b41ed10c8de5cf00e";
  let units = "imperial";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentCityTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);
function handleFormSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  getWeatherByCity(city);
}
function handleFahrenheitLink(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature-value");
  temperatureElement.innerHTML = Math.round(fahrenheitLinkTemperature);
}

function handleCelsiusLinkClick(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature-value");
  let celsiusTemperature = ((fahrenheitLinkTemperature - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let fahrenheitLinkTemperature = null;

let searchForm = document.querySelector("#enter-location");
searchForm.addEventListener("submit", handleFormSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", handleFahrenheitLink);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", handleCelsiusLinkClick);

getWeatherByCity("Phoenix");
