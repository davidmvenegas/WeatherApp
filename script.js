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
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = (hour >= 13 ? hour % 12 : hour);
    const minutes = time.getMinutes();
    const minutesIn60MinFormat = (minutes <= 9 ? "0" + minutes : minutes)
    const ampm = hour >= 12 ? 'PM' : 'AM';
    timeEL.innerHTML = hoursIn12HrFormat + ":" + minutesIn60MinFormat + ' ' + `<span id="am-pm">${ampm}</span>`
    dateEL.innerHTML = days[day] + ', ' + date + ' ' + months[month]
}, 1000);