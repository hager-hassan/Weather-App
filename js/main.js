// !global vars
let searchInput = document.getElementById('searchInput');
let email = document.getElementById('email');

let searchButton = document.getElementById('searchButton');
let subscribeButton = document.getElementById('subscribeButton');

let todayColumn = document.getElementById('todayColumn');
let tomorrowColumn = document.getElementById('tomorrowColumn');
let afterTomorrowColumn = document.getElementById('afterTomorrowColumn');

const APIKey = '2ab58103c8f24b71a21214830252204';
const weekDays = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];
const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];


searchInput.addEventListener('input' , function(){
    getCurrentWeather(searchInput.value);
    forecast(searchInput.value);
})

searchButton.addEventListener('click', function(){
    getCurrentWeather(searchInput.value);
    forecast(searchInput.value);
})

// !for current 
async function getCurrentWeather(city){
    let url = `https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}`;

    let result = await fetch(url);
    let data = await result.json();

    let date = new Date(data.location.localtime);

    todayColumn.innerHTML = `<div class="item today rounded position-relative">
                        <header class="d-flex align-items-center justify-content-between position-absolute">
                            <span class="day">${weekDays[date.getDay()]}</span>
                            <span class="date">${date.getDate()} ${months[date.getMonth()]}</span>
                        </header>
                        <div>
                            <p class="location-name">
                                ${data.location.name}
                            </p>
                            <div>
                                <p class="temp d-inline-block text-white fw-bold">${data.current.temp_c}<sup>o</sup>C</p>
                                <img src="https:${data.current.condition.icon}" class="condition-icon">
                            </div>
                            <p class="condition-text fw-light">${data.current.condition.text}</p>
                            <div class="d-flex justify-content-between align-items-center gap-3 mt-3">
                                <span>
                                        <img src="images/icon-umberella.png">
                                        ${data.current.cloud}%
                                </span>
                                <span>
                                        <img src="images/icon-wind.png">
                                        ${data.current.wind_kph}km/h
                                </span>
                                <span>
                                        <img src="images/icon-compass.png">
                                        ${data.current.wind_dir}
                                </span>
                            </div>
                        </div>
                    </div>`
}

// !for tomorrow and after tomorrow
async function forecast(city){
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${APIKey}&q=${city}&days=2`;

    let result = await fetch(url);
    let data = await result.json();

    let tomorrowDate = new Date(data.forecast.forecastday[0].date);
    let afterTomorrowDate = new Date(data.forecast.forecastday[1].date);

    tomorrowColumn.innerHTML = `<div class="item tomorrow rounded position-relative">
                        <header class="position-absolute">
                            <span class="day text-center d-block">${weekDays[tomorrowDate.getDay() + 1]}</span>
                        </header>
                        <div class="d-flex justify-content-center align-items-center mb-4">
                            <img src="https:${data.forecast.forecastday[0].day.condition.icon}">
                        </div>
                        <p class="text-center mb-0 fw-bold text-white max-temp">${data.forecast.forecastday[0].day.maxtemp_c}<sup>o</sup>C</p>
                        <p class="text-center mb-0 fw-light min-temp">${data.forecast.forecastday[0].day.mintemp_c}<sup>o</sup></p>
                        <p class="condition-text fw-light text-center">${data.forecast.forecastday[0].day.condition.text}</p>
                    </div>`

    afterTomorrowColumn.innerHTML = `<div class="item after-tomorrow rounded position-relative">
                        <header class="position-absolute">
                            <span class="day text-center d-block">${weekDays[afterTomorrowDate.getDay() + 1]}</span>
                        </header>
                        <div class="d-flex justify-content-center align-items-center mb-4">
                            <img src="https:${data.forecast.forecastday[1].day.condition.icon}">
                        </div>
                        <p class="text-center mb-0 fw-bold text-white max-temp">${data.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>C</p>
                        <p class="text-center mb-0 fw-light min-temp">${data.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></p>
                        <p class="condition-text fw-light text-center">${data.forecast.forecastday[1].day.condition.text}</p>
                    </div>`              
}

// !email validation
subscribeButton.addEventListener('click' , function(event){
    event.preventDefault();

    let regex =  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;
    let text = email.value;

    if(!regex.test(text) || text === ''){
        return;
    }

    email.value = '';
})

getCurrentWeather('cairo');
forecast('cairo');
