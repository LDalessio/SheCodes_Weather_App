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

//Showing the city searched in the enter a city section
function cityEntered(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  let cityValue = document.querySelector("#city-input");
  city.innerHTML = cityValue.value;
}

let enterACity = document.querySelector("#enter-location");
enterACity.addEventListener("submit", cityEntered);

//Swapping from F to C
function updateTemperature(unit) {
  let temperatureElement = document.querySelector("#temperature-value");

  if (unit === "C") {
    temperatureElement.innerHTML = 37;
  } else if (unit === "F") {
    temperatureElement.innerHTML = 100;
  }
}

function handleFahrenheitLink(event) {
  event.preventDefault();
  updateTemperature("F");
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", handleFahrenheitLink);

function handleCelsiusLinkClick(event) {
  event.preventDefault();
  updateTemperature("C");
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", handleCelsiusLinkClick);

// Function to update the weather information based on the API response
function showCurrentCityTemperature(response) {
  document.querySelector("#temperature-value").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#Wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

// Function to fetch weather data based on the user-entered city name

function getWeatherByCity(city) {
  let apiKey = "cb286bad3607984b41ed10c8de5cf00e";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showCurrentCityTemperature);
}
function handleFormSubmit(event) {
  event.preventDefault();

  let city = document.querySelector("#city-input").value;

  getWeatherByCity(city);
}

// Event Listeners

let searchForm = document.querySelector("#enter-location");
searchForm.addEventListener("submit", handleFormSubmit);

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

getWeatherByCity("Phoenix");
