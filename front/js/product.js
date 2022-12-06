const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")


fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((res) => handleData(res))

function handleData(kanap) {
    console.log({kanap})
     const {colors, name, price, imageUrl, description, altTxt} = kanap
     productImage(imageUrl,altTxt)
     productTitle(name)
     productPrice(price)
     productDescription(description)
     productColors(colors)
}

function productImage(imageUrl,altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    if (parent != null) parent.appendChild(image)
    console.log(image)
}

function productTitle(name) {
    const h1 = document.querySelector("#title")
    if (h1 != null) h1.textContent = name
    console.log(name)
}

function productPrice(price) {
    const span = document.querySelector("#price")
    if (span != null) span.textContent = price
}

function productDescription(description) {
    const p = document.querySelector("#description")
    if (p != null) p.textContent = description
}

function productColors(colors) {
    const select = document.querySelector("#colors")
    if (select != null) {
        colors.forEach((color) => {
            const option = document.createElement("option")
            option.value = color
            option.textContent = color
            select.appendChild(option)
        })
    }
}