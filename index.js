function getCurrentTime() {
    const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false});
    document.getElementById("time").textContent = currentTime
}
setInterval(getCurrentTime, 1000)

const authorNameHeaderEl = document.getElementById("image-author")

try {
    const resBackground = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    const dataBackground = await resBackground.json()
    document.body.style.backgroundImage = `url(${dataBackground.urls.full})`
    authorNameHeaderEl.textContent = `By: ${dataBackground.user.name}`
} catch(err) {
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`
    document.getElementById("author").textContent = `By: Dodi Achmad`  
    console.err(`Something went wrong with the image API call: ${err}`) 
}



try {const resCoin = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
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
} catch(err) {
    console.error(`Something went wrong with the coin API call: ${err}`)
}


navigator.geolocation.getCurrentPosition(async position => {
    try{
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
    } catch(err) {
        console.error(`Something Went Wrong with the weather API call: ${err}`)
    }

    });


