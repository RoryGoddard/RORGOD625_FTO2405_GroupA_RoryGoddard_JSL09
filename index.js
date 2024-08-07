function getCurrentTime() {
    const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false});
    document.getElementById("time").textContent = currentTime
}
setInterval(getCurrentTime, 1000)

const authorNameHeaderEl = document.getElementById("image-author")

const resBackground = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
const dataBackground = await resBackground.json()
document.body.style.backgroundImage = `url(${dataBackground.urls.full})`
authorNameHeaderEl.textContent = `By: ${dataBackground.user.name}`


const resCoin = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
if (!resCoin.ok) {
    throw Error(`Something went wrong. Status Code: ${resCoin.status}`)
}
const coinData = await resCoin.json()
document.getElementById("crypto-top").innerHTML = `
<img src=${coinData.image.small} />
<span>${coinData.name}</span>
`
document.getElementById("crypto-prices").innerHTML = `
    <p>🎯: R${coinData.market_data.current_price.zar.toLocaleString()}</p>
    <p>👆: R${coinData.market_data.high_24h.zar.toLocaleString()}</p>
    <p>👇: R${coinData.market_data.low_24h.zar.toLocaleString()}</p>
`

navigator.geolocation.getCurrentPosition(async position => {
    const resWeather = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
    if (!resWeather.ok) {
        throw Error(`Weather data not available. Status Code: ${resWeather.status}`)
    }
    const dataWeather = await resWeather.json()
    const iconUrl = `http://openweathermap.org/img/wn/${dataWeather.weather[0].icon}@2x.png`
    document.getElementById("weather").innerHTML = `
        <img src=${iconUrl} />
        <p>${Math.trunc(dataWeather.main.temp)}°</p>
        <p class="weather-city">${dataWeather.name}</p>
    `
    });


