const authorNameHeaderEl = document.getElementById("image-author")

fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(response => response.json())
    .then(data => setBackgroundImage(data))
    .catch(err => {
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDE2NzA&ixlib=rb-1.2.1&q=80&w=1080)`
        console.error(`Error fetching image: ${err}`)
        }
    )

function setBackgroundImage(obj) {
    document.body.style.backgroundImage = `url(${obj.urls.full})`
    authorNameHeaderEl.textContent = `By: ${obj.user.name}`
}
// author is data.user.name
// 