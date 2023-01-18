const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")

//Récupération des données depuis l'API par ID
fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((res) => handleData(res))

//Gestion des données
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
}

//Affichage de l'image
function productImage(imageUrl,altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    if (parent != null) parent.appendChild(image)
}

//Affichage du nom
function productTitle(name) {
    const h1 = document.querySelector("#title")
    if (h1 != null) h1.textContent = name
}

//Affichage du prix
function productPrice(price) {
    const span = document.querySelector("#price")
    if (span != null) span.textContent = price
}

//Affichage de la description
function productDescription(description) {
    const p = document.querySelector("#description")
    if (p != null) p.textContent = description
}

//Sélection de la couleur
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

//Gestion du bouton "ajouter au panier"
const button = document.querySelector('#addToCart')
    button.addEventListener("click", handleClick)

function handleClick() {
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value
    if (cartNotValid(color, quantity)) return
    saveCart(color, quantity)
    redirectToCart()
}

//Sauvegarde du panier dans le localStorage
function saveCart(color,quantity) {
    const key = `${id}-${color}`
    const cartData = {
                name: productName,
                id: id,
                color: color,
                quantity: Number(quantity),
                imageUrl: imgUrl,
                altTxt: altText
    }
    let cart = [];
 
    if (localStorage.getItem(key)) {
        cart = JSON.parse(localStorage.getItem(key)); 
        const product = {
            name: productName,
            id: id,
            color: color,
            quantity: Number(cart.quantity) + Number(quantity),
            imageUrl: imgUrl,
            altTxt: altText,
        }
       localStorage.setItem(key, JSON.stringify(product));
    } 
    else {
        localStorage.setItem(key, JSON.stringify(cartData)); 
    }
}

//Gestion d'erreur si toutes les informations ne sont pas renseignées
function cartNotValid(color,quantity) {
    if (color == null || color === "" || quantity == null || quantity == 0) {
        alert("Merci de selectionner une quantité et un prix")
        return true
    }
}

//Redirection vers le panier après l'ajout
function redirectToCart() {
    alert("Votre produit a bien été ajouté au panier");
    window.location.href = "cart.html"
}