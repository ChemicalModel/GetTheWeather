// Get references to HTML elements
const searchBtnEl = document.getElementById("searchBtn");
const searchInputEl = document.getElementById("searchInput");
const cityEl = document.getElementById("city");
const tempEl = document.getElementById("temp");
const windEl = document.getElementById("wind");
const humidityEl = document.getElementById("humidity");
const historyContainerEl = document.getElementById("historyContainer");

// Set OpenWeatherMap API key
const apiKey = "3be2b2b6acc21e3760901d15acf91f72";

// Load search history from local storage or create empty list
let history = JSON.parse(localStorage.getItem("history")) || [];

// Update search history with new city and limit to 5 entries
function updateHistory(city) {
  history.unshift(city);
  history.splice(5);
  localStorage.setItem("history", JSON.stringify(history));
}

// Create buttons for each item in search history
function createHistoryButtons() {
  historyContainerEl.innerHTML = "";
  history.forEach(city => {
    const button = document.createElement("button");
    button.textContent = city;
    button.classList.add("historyBtn");
    button.addEventListener("click", () => {
      weatherSearch(city.toLowerCase());
    });
    historyContainerEl.appendChild(button);
  });
}

// Fetch current and forecast weather data for a given city
function weatherSearch(city) {
  const endpointUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  const forecastEndpointUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

  // Fetch current weather data
  fetch(endpointUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      // Update UI with current weather data and search history
      cityEl.textContent = data.name;
      tempEl.textContent = `Temp: ${data.main.temp} \u00B0F`;
      windEl.textContent = `Wind: ${data.wind.speed}MPH`;
      humidityEl.textContent = `Humidity: ${data.main.humidity}%`
      updateHistory(city.toLowerCase());
      createHistoryButtons();

      // Fetch 5-day forecast data
      fetch(forecastEndpointUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          // TODO: Parse forecast data and display on page
        })
        .catch(error => {
          console.error("There was a problem fetching the forecast data:", error);
        });
    })
    .catch(error => {
      console.error("There was a problem fetching the weather data:", error);
    });

  // TODO: This code block serves no purpose and should be removed
  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      const element = object[key];
    }

    p++

    const historyButtons = document.querySelectorAll(".historyBtn");
    historyButtons.forEach(button => {
      button.addEventListener("click", () => {
        const city = button.textContent.toLowerCase();
        weatherSearch(city);
      });
    });

    searchBtnEl.addEventListener("click", () => {
      const city = searchInputEl.value.trim().toLowerCase();
      weatherSearch(city);
    });

    createHistoryButtons();
  }
}

// Initialize app by displaying search history buttons
createHistoryButtons();
