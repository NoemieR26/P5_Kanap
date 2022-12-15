// Récupération des données du localStorage
const cart =[]

retrieveItems()

cart.forEach((item) => displayItem(item))

/*
name: ""
id: 'a557292fe5814ea2b15c6ef4bd73ed83', 
color: 'White', 
quantity: 1, 
imageUrl: 'http://localhost:3000/images/kanap04.jpeg', 
altTxt: "Photo d'un canapé rose, une à deux place"}
*/

function retrieveItems() {
    const numberOfItems = localStorage.length
    for (let i = 0; i < numberOfItems; i++) {
        const item = localStorage.getItem(localStorage.key(i)) || ""
        const itemObject = JSON.parse(item)
        cart.push(itemObject)
    }
}

// Affichage du produit

function createArticle(item) {
    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
}

function displayItem(item) {
    const article = createArticle(item)
    const imageDiv = createImageDiv(item)
    article.appendChild(imageDiv)
    const cartItemContent = createCartContent(item)
    article.appendChild(cartItemContent)
    displayArticle(article)
    displayTotalQuantity(item)
}

function displayArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
}    

// Affichage de l'image + alt text
function createImageDiv(item) {
   const div = document.createElement("div")
   div.classList.add("cart__item__img")
   
    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altTxt
    div.appendChild(image)
    return div
}

// Création de l'élément "item content"
function createCartContent(item) {
    const cartItemContent = document.createElement("div")
    cartItemContent.classList.add("cart__item__content")

    const description = addDescription(item)
    const settings = addSettings(item)

    cartItemContent.appendChild(description)
    cartItemContent.appendChild(settings)
   return cartItemContent
}

// Ajout de la description
function addDescription(item) {
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")

    const h2 = document.createElement("h2")
    h2.textContent = item.name
    const p = document.createElement("p")
    p.textContent = item.color
    const p2 = document.createElement("p")
    p2.textContent = item.price + " €"

    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p2)
    return description
}

// Ajout des Settings
function addSettings(item) {
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")

    addQuantity(settings, item)
    addDelete(settings)
    return settings
}

// Ajout de la quantité
function addQuantity(settings, item) {
    const quantity = document.createElement("div")
    quantity.classList.add("cart__item__content__settings__quantity")
    const p = document.createElement("p")
    p.textContent = "Qté : "
    quantity.appendChild(p)
    const input = document.createElement("input")
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = item.quantity
    quantity.appendChild(input)
    settings.appendChild(quantity)
}

// Ajout de l'élément "supprimer"
function addDelete(settings) {
    const deleteDiv = document.createElement("div")
    deleteDiv.classList.add("cart__item__content__settings__delete")
    const p = document.createElement("p")
    p.classList.add("deleteItem")
    p.textContent = "Supprimer"
    deleteDiv.appendChild(p)
    settings.appendChild(deleteDiv)
}

// Affichage de la quantité totale
function displayTotalQuantity(item) {
    const totalQuantity = document.querySelector("#totalQuantity")
    totalQuantity.textContent = item.quantity
}
    