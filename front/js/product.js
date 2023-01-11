const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")
/*if (id != null) {
    let itemPrice = 0
    let imgUrl, altText, productName
}
*/

fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((res) => handleData(res))

function handleData(kanap) {
     const {colors, name, price, imageUrl, description, altTxt} = kanap
     itemPrice = price
     imgUrl = imageUrl
     altText = altTxt
     productName = name
     productImage(imageUrl,altTxt)
     productTitle(name)
     productPrice(price)
     productDescription(description)
     productColors(colors)
     console.log(price)
}

function productImage(imageUrl,altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    if (parent != null) parent.appendChild(image)
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

const button = document.querySelector('#addToCart')
    button.addEventListener("click", handleClick)

function handleClick() {
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value
    if (cartNotValid(color, quantity)) return
    saveCart(color, quantity)
    redirectToCart()
}
  
function saveCart(color,quantity) {
    const key = `${id}-${color}`
    console.log(key)
    const cartData = {
                name: productName,
                id: id,
                color: color,
                quantity: Number(quantity),
                imageUrl: imgUrl,
                altTxt: altText,
                //price: itemPrice,
    }
    localStorage.setItem(key, JSON.stringify(cartData))   
}

/*
function saveCart(color,quantity) {
        const key = `${id}-${color}`
        const product = {
                    name: productName,
                    id: id,
                    color: color,
                    quantity: Number(quantity),
                    imageUrl: imgUrl,
                    altTxt: altText,
                    price: itemPrice,
        }

        let cart = [];
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }
        let foundProduct = cart.find(
        (item) => item.key === key)
        // Gestion des quantités
        if (foundProduct === undefined) {
            cart.push(product);
        } else {
            foundProduct.quantity += product.quantity;
        }
localStorage.setItem(key, JSON.stringify(product))       
}
*/
function cartNotValid(color,quantity) {
    if (color == null || color === "" || quantity == null || quantity == 0) {
        alert("Merci de selectionner une quantité et un prix")
        return true
    }
}

function redirectToCart() {
    alert("Votre produit a bien été ajouté au panier");
    window.location.href = "cart.html"
}