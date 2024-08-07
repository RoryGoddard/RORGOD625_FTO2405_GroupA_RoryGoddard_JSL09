function getCurrentTime() {
    const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false});
    document.getElementById("time").textContent = currentTime
}
setInterval(getCurrentTime, 1000)

const authorNameHeaderEl = document.getElementById("image-author")

fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(response => response.json())
    .then(data => setBackgroundImage(data))
    .catch(err => {
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDE2NzA&ixlib=rb-1.2.1&q=80&w=1080)`
        authorNameHeaderEl.textContent = `By: Dodi Achmad`
        console.error(`Error fetching image: ${err}`)
        }
    )

function setBackgroundImage(obj) {
    document.body.style.backgroundImage = `url(${obj.urls.full})`
    authorNameHeaderEl.textContent = `By: ${obj.user.name}`
}

fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
    .then(response => {
        if (!response.ok) {
            throw Error(`Something went wrong. Status Code: ${response.status}`)
        }
        return response.json()
    })
    .then(data => {
        document.getElementById("crypto-top").innerHTML = `
        <img src=${data.image.small} />
        <span>${data.name}</span>
    `
        document.getElementById("crypto-prices").innerHTML = `
            <p>🎯: R${data.market_data.current_price.zar.toLocaleString()}</p>
            <p>👆: R${data.market_data.high_24h.zar.toLocaleString()}</p>
            <p>👇: R${data.market_data.low_24h.zar.toLocaleString()}</p>
        `
    }
    )
    .catch(err => {
        console.error(`Error fetching coin data: ${err}`)
        }
    )

navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
    .then(res => {
        if (!res.ok) {
            throw Error(`Weather data not available. Status Code: ${res.status}`)
        }
        return res.json()
    })
    .then(data => {
        console.log(data)
        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        document.getElementById("weather").innerHTML = `
            <img src=${iconUrl} />
            <p>${Math.trunc(data.main.temp)}°</p>
            <p>${data.name}</p>
        `
    })
    .catch(err => console.error(err))
  });


