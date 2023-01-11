// Récupération des données du localStorage
const cart =[]

/*const productData = []
console.log(productData) 
//-> productData est vide...*/
retrieveItems()
cart.forEach((item) => displayItem(item))
cart.forEach((data) => displayItemPrice(data))

const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => submitForm(e))

/*// Récupération des prix depuis l'API
function getDataFromAPI(id) {
  fetch("http://localhost:3000/api/products/" + id)
  .then((res) => {
    return res.json();
  })
  .then(async function (productData) {
    console.log(productData)
  })
  .catch((error) => {
    console.log(error);
  })

}
*/
// Récupération des données depuis l'API
async function fetchData(id_product, quantity){

    let response = await fetch("http://localhost:3000/api/products/" + id_product);
    let data = await response.json();

    data = JSON.stringify(data);
    data = JSON.parse(data);
    return data.price * quantity;
}

async function displayItemPrice(id, quantity) {
    let response = await fetchData(id, quantity);
    console.log(response);
}

/*
async function getDataFromAPI(id) {
    return (await fetch(`http://localhost:3000/api/products/${id}`)).json();
  }

// Appel de la fonction 
const productData = async (id) => {
    try {
      return getDataFromAPI(id);
    } catch {
      console.error("Erreur lors de la récupération des données du produit");
    }
    console.log(productData)
  };
  
  productData()
*/
/*  //Ajout du prix des produits
function pushPriceFromAPI(id, itemPrice, item) {
   // const itemPrice = price
        //const itemPrice = productData.find((item) => item.id === id)
        itemPrice.price = Number(price)
        cart.push(itemPrice)
}
*/
/*
async function getPriceFromAPI(id) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/products/${id}`
      );
      const productData = await response.json();
  
      const completeItem = {
        ...article,
        ...dataFetch,
      };
      displayItem(completeItem);
  
      return productData.price;
    } catch (e) {
      console.log("Erreur");
    }
  }
getPriceFromAPI()
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
    article.dataset.price = item.price
    return article
}

function displayItem(item) {
    const article = createArticle(item)
    const imageDiv = createImageDiv(item)
    article.appendChild(imageDiv)
    const cartItemContent = createCartContent(item)
    article.appendChild(cartItemContent)
    displayArticle(article)
    displayItemPrice(item.id, item.quantity)
    displayTotalQuantity()
    displayTotalPrice(item)
}
/*
function displayItemPrice(article) {
  const price = itemPrice
  displayItemPrice(article)
}
*/
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

//Affichage du prix
function productPrice(price) {
    const span = document.querySelector("#price")
    if (span != null) span.textContent = price
    return price
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

// Ajout de la description (nom, couleur, prix)
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
    addDelete(settings, item)
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
    input.addEventListener("input", () => updatePriceAndQuantity(item.id, input.value, item))
    
    quantity.appendChild(input)
    settings.appendChild(quantity)
}

function updatePriceAndQuantity(id, newValue, item, data) {
    const itemToUpdate = cart.find((item) => item.id === id)
    itemToUpdate.quantity = Number(newValue)
    item.quantity = itemToUpdate.quantity
    displayTotalQuantity()
    displayTotalPrice(data)
    saveNewData(item) 
}
/*
//Mise à jour des quantités dans le panier
function addToCart(item) {
    let cart = retrieveItems();
    let foundProduct = cart.find((item) => item.id === id)
    if (foundProduct != undefined) {
        foundProduct.quantity++;
     } else {
            item.quantity = 1;
            cart.push(item);
        }
        saveNewData(cart) 
}
*/
//Mise à jour du prix et de la quantité
/*
function updatePriceAndQuantity(id, newValue, item) {
    const itemToUpdate = cart.find((item) => item.id === id)
    if (itemToUpdate != undefined) {
        itemToUpdate.quantity++
    }
    else {
        itemToUpdate.quantity = Number(newValue)
        cart.push(newValue)
    }
    
    item.quantity = itemToUpdate.quantity
    displayTotalQuantity()
    //displayTotalPrice()
    saveNewData(item) 
}
*/
//Suppression d'un article du LocalStorage
function deleteDataFromCache(item) {
    const key = `${item.id}-${item.color}`
    console.log("on retire cette key",key)
    localStorage.removeItem(key)
    location.reload()
}

//Enregistrement des modifications sur le panier
function saveNewData(item) {
    const dataToSave = JSON.stringify(item)
    const key = `${item.id}-${item.color}`
    localStorage.setItem(key, dataToSave)
}

// Ajout de l'élément "supprimer"
function addDelete(settings, item) {
    const deleteDiv = document.createElement("div")
    deleteDiv.classList.add("cart__item__content__settings__delete")
    deleteDiv.addEventListener("click", () => deleteItem(item))
    const p = document.createElement("p")
    p.classList.add("deleteItem")
    p.textContent = "Supprimer"
    deleteDiv.appendChild(p)
    settings.appendChild(deleteDiv)
}

//Fonction supprimer
function deleteItem(item) {
    const itemToDelete = cart.findIndex(
        (product) => product.id === item.id && product.color === item.color
    )
    cart.splice(itemToDelete, 1)
    displayTotalQuantity
    displayTotalPrice
    deleteDataFromCache(item)
    deleteProductFromCart(item)
}

//Suppression du produit sur la page panier
function deleteProductFromCart(item) {
    const productToDelete = document.querySelector(
    'product[data-id="${item.id}"][data-color="${item.color}"]'
)
productToDelete.remove()

}

// Affichage de la quantité totale
function displayTotalQuantity() {
    let quantity = 0
    const totalQuantity = document.querySelector("#totalQuantity")
    const total = cart.reduce((total, item) => total + item.quantity, 0)
    totalQuantity.textContent = total
}
    
//Affichage du prix total
function displayTotalPrice(item) {
    let total = 0
    const totalPrice= document.querySelector("#totalPrice")
    cart.forEach((item) => {
        const totalUnitPrice = item.price * item.quantity
        total += totalUnitPrice
    })
    totalPrice.textContent = total
}


function submitForm(e) {
    e.preventDefault()
    if (cart.length === 0) {
      alert("Merci d'ajouter des articles au panier pour passer commande")
      return  
    }
if (formInvalid()) return
if (firstNameInvalid()) return
if (lastNameInvalid()) return
if (addressInvalid()) return
if (cityInvalid()) return
if (emailInvalid()) return

    const body = formContentRequest()
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((res) => res.json())
    .then((data) => {
      const orderId = data.orderId
      window.location.href = "../html/confirmation.html" + "?orderId=" + orderId  
      return console.log(data)  
    })
    
    .catch((err) => console.log(err))
}

function formInvalid() {
  const form = document.querySelector(".cart__order__form")
  const inputs = form.querySelectorAll("input")
  inputs.forEach((input) => {
    if (input.value === "") {
        alert ("Merci de renseigner tous les champs")
        return true
    }
    return false
  })  
}

function firstNameInvalid() {
    const firstName = document.querySelector("#firstName").value
    const regex = /^[a-z A-Z  À-ÿ ōŌ -]{2,55}$/
      if (regex.test(firstName) === false) {
          alert ("Prénom invalide")
          return true
      }
      return false
}

function lastNameInvalid() {
    const lastName = document.querySelector("#lastName").value
    const regex = /^[a-z A-Z  À-ÿ ōŌ -]{2,55}$/
      if (regex.test(lastName) === false) {
          alert ("Nom invalide")
          return true
      }
      return false
}

function addressInvalid() {
    const address = document.querySelector("#address").value
    const regex = /([0-9]*)?([a-zA-Z]*)/
      if (regex.test(email) === false) {
          alert ("Adresse invalide")
          return true
      }
      return false
}

function cityInvalid() {
    const city = document.querySelector("#city").value
    const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g
      if (regex.test(city) === false) {
          alert ("Ville invalide")
          return true
      }
      return false
}

function emailInvalid() {
    const email = document.querySelector("#email").value
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
      if (regex.test(email) === false) {
          alert ("Email invalide")
          return true
      }
      return false
}

function formContentRequest() {
    const form = document.querySelector(".cart__order__form")
    const firstName = form.elements.firstName.value
    const lastName = form.elements.lastName.value
    const address = form.elements.address.value
    const city = form.elements.city.value
    const email = form.elements.email.value
    const body = {
        contact: {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email
        },
        products: getIdsFromCache()
    }
    return body
}

function getIdsFromCache() {
    const numberOfProducts = localStorage.length
    const ids = []
    for (let i = 0; i < numberOfProducts; i++) {
        const key = localStorage.key(i)
        const id = key.split("-")[0]
        ids.push(id)
    }
    return ids
}