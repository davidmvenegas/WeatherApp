const timeEL = document.getElementById('time')
const dateEL = document.getElementById('date')
const currentWeatherItemsEL = document.getElementById('current-weather-items')
const timezone = document.getElementById('time-zone')
const country = document.getElementById('country')
const weatherForcastEl = document.getElementById('weather-forecast')
const currentTempEl = document.getElementById('current-temp')
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const API_KEY = '9a1918161e04a878528454abef1d9368'

setInterval(() => {
    const time = new Date()
    const month = time.getMonth()
    const date = time.getDate()
    const day = time.getDay()
    const hour = time.getHours()
    const hoursIn12HrFormat = (hour >= 13 ? hour % 12 : hour)
    const minutes = time.getMinutes()
    const minutesIn60MinFormat = (minutes <= 9 ? "0" + minutes : minutes)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    timeEL.innerHTML = hoursIn12HrFormat + ":" + minutesIn60MinFormat + ' ' + `<span id="am-pm">${ampm}</span>`
    dateEL.innerHTML = days[day] + ', ' + date + ' ' + months[month]
}, 1000)

getWeatherData()

function getWeatherData() {
    navigator.geolocation.getCurrentPosition((yourLocation) => {
        console.log(yourLocation)

        let {latitude, longitude} = yourLocation.coords

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            showWeatherData(data)
        })

    })
}

function showWeatherData(data) {
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current

    currentWeatherItemsEL.innerHTML =
    `
    <div class="weather-item">
        <div>Humidity :</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Pressure :</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed :</div>
        <div>${wind_speed} mph</div>
    </div>
    <div class="weather-item">
        <div>Sunrise :</div>
        <div>${window.moment(sunrise * 1000).format('h:mm a')}</div>
    </div>
    <div class="weather-item">
        <div>Sunset :</div>
        <div>${window.moment(sunset * 1000).format('h:mm a')}</div></div>
    </div>
    `

    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 0){

        } else {
            otherDayForcast += 
            `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}°F</div>
                <div class="temp">Day - ${day.temp.day}°F</div>
            </div>
            `
        }
    })
    weatherForcastEl.innerHTML = otherDayForcast;
}