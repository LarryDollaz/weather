const cityInputs = document.getElementsByClassName('city-input')
const cityDetails = document.getElementsByClassName('city-details')

// Clouds, Snow, Clear, Rain


function getWeather(city, i) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6b6e0ad5ee331df64dba0d72e6a53fd8`)
    .then(response => response.json())
    .then(data => {
        if(data.weather[0].main == "Mist") {
            cityInputs[i].parentElement.style.backgroundImage = 'url(./images/clouds.jpg)'
        } else if(data.weather[0].main == "Rain") {
            cityInputs[i].parentElement.style.backgroundImage = 'url(./images/rain.jpg)'
        } else if(data.weather[0].main == "Clear") {
            cityInputs[i].parentElement.style.backgroundImage = 'url(./images/clear.jpg)'
        } else if(data.weather[0].main == "Snow") {
            cityInputs[i].parentElement.style.backgroundImage = 'url(./images/snow.jpg)'
        }

        cityInputs[i].value = data.name
        cityDetails[i].innerHTML = `
        <h1>${Math.round(data.main.temp - 273.15)}°C</h1>
        <p>${Math.round(data.wind.speed)}km/h</p>    
        <p>${Math.round(data.visibility /1000)}km</p>
        <p>${Math.round(data.main.pressure)}mm/hg</p>
        <p>${Math.round(data.main.humidity)}%</p>
        `
    })
}

Array.from(cityInputs).forEach((input, idx) => {
    input.addEventListener("keyup", (e) => {
        if(e.key === "Enter") {
            getWeather(input.value, idx)
        }
    })
})

getWeather("Tokyo", 0)
getWeather("New York", 1)
getWeather("Berlin", 2)
getWeather("Montreal", 3)