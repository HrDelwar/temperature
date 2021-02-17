//get id
function getId(id) {
    return document.getElementById(id);
}
//show temperature for city when type city name
getId('search-input').addEventListener('keyup', function () {
    const regex = /[a-zA-Z]/; // regular expression
    if (this.value.match(regex)) {
        getWetherData(this.value);
    } else {
        getWetherData('sylhet');
    }
})

// get weather data with api for city from open-weather-map website 
function getWetherData(cityName) {
    const apiKey =secret.SECRET_KEY;//api key for open-weather-map website
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
        .then(res => {
            return res.json()
        })
        .then(data => {
            display(data);
        })
        .catch(err => {
            getId('city-name').innerText = `The ${cityName} City not Fount!`;
            getId('city-temp').innerText = '';
            getId('city-weather').innerText = '';
            getId('weather-icon').src = '';
        })
}

//display temperature data 
function display(data) {
    getId('city-name').innerText = data.name;//catch city name and display
    getId('city-temp').innerText = Math.round(data.main.temp - 273) + '°C';// catch temperature K and display °c
    getId('city-weather').innerText = data.weather[0].main;// set wether condition and display
    const icon = data.weather[0].icon;//catch weather icon and display
    getId('weather-icon').src = `http://openweathermap.org/img/w/${icon}.png`; // catch weather icon and display
}

// clear catch onload 
function clear() {
    getId('search-input').value = '';
    getWetherData('Sylhet');
}