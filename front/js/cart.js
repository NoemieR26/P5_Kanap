// Récupération des données du localStorage
const cart =[]

retrieveItems()
//getPriceFromAPI()
cart.forEach((item) => displayItem(item))

// Récupération des prix depuis l'API

/*async function getPriceFromAPI(article) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/products/${article.id}`
      );
      const dataFetch = await response.json();
  
      const completeItem = {
        ...article,
        ...dataFetch,
      };
      productDisplay(completeItem);
  
      return dataFetch.price;
      
    } catch (e) {
      console.log("Erreur");
      let fetchError = document.querySelector("#cart__items");
      fetchError.innerText = "Erreur d'accès au panier";
    }
  }
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
    displayTotalQuantity()
    //displayTotalPrice(item)
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

//Mise à jour du prix et de la quantité

function updatePriceAndQuantity(id, newValue, item) {
    const itemToUpdate = cart.find((item) => item.id === id)
    itemToUpdate.quantity = Number(newValue)
    item.quantity = itemToUpdate.quantity
    displayTotalQuantity()
   // displayTotalPrice()
    saveNewData(item) 
}

//Suppression d'un article du LocalStorage
function deleteDataFromCache(item) {
    const key = `${item.id}-${item.color}`
    console.log("on retire cette key",key)
    localStorage.removeItem(key)
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
   // displayTotalPrice
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
/*    
//Affichage du prix total
function displayTotalPrice(item) {
    let total = 0
    const totalPrice= document.querySelector("#totalPrice")
    cart.forEach((item) => {
        const totalUnitPrice = item.price * item.quantity
        total += totalUnitPrice
    })
    console.log(total)
    totalPrice.textContent = total
}
*/