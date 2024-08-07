const authorNameHeaderEl = document.getElementById("image-author")

fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(response => response.json())
    .then(data => setBackgroundImage(data))
    .catch(error => console.error(`Error fetching image: ${error}`))

function setBackgroundImage(obj) {
    document.body.style.backgroundImage = `url(${obj.urls.full})`
    authorNameHeaderEl.textContent = `By: ${obj.user.name}`
}
// author is data.user.name
// 