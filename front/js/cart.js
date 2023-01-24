const cart =[]

// Récupération des données depuis l'API
fetch(`http://localhost:3000/api/products/`)
    .then((response) => response.json())
    .then((res) => handleCartData(res))

function handleCartData(kanapList) {
   const [] = kanapList;
   retrieveItems()
   cart.forEach((item) => displayItem(kanapList, item))
}

//Récupération du prix des canapés
function getItemPrice(kanapList, id) {
    const numberOfProducts = kanapList.length
    for (let i = 0; i < numberOfProducts; i++) {
        if (kanapList[i]._id == id);
            return kanapList[i].price;
    }
}

// Récupération des données du localStorage
function retrieveItems() {
    const numberOfItems = localStorage.length;
    for (let i = 0; i < numberOfItems; i++) {
        const item = localStorage.getItem(localStorage.key(i)) || ""
        const itemObject = JSON.parse(item);
        cart.push(itemObject);
    }
}

// Gestion du bouton "commander"
const orderButton = document.querySelector("#order");
orderButton.addEventListener("click", (e) => submitForm(e));

// Affichage des produits
function createArticle(item) {
    const article = document.createElement("article");
    article.classList.add("cart__item");
    article.dataset.id = item.id;
    article.dataset.color = item.color;
    return article;
}

function displayItem(kanapList, item) {
    const article = createArticle(item);
    const imageDiv = createImageDiv(item);
    article.appendChild(imageDiv);
    const cartItemContent = createCartContent(kanapList, item);
    article.appendChild(cartItemContent);
    displayArticle(article);
    displayTotalQuantity();
    displayTotalPrice(kanapList, item);
}

function displayArticle(article) {
    document.querySelector("#cart__items").appendChild(article);
}    

// Affichage de l'image + alt text
function createImageDiv(item) {
   const div = document.createElement("div");
   div.classList.add("cart__item__img");
   
    const image = document.createElement("img");
    image.src = item.imageUrl;
    image.alt = item.altTxt;
    div.appendChild(image);
    return div;
}

// Création de l'élément "item content"
function createCartContent(kanapList, item) {
    const cartItemContent = document.createElement("div");
    cartItemContent.classList.add("cart__item__content");

    const description = addDescription(kanapList, item);
    const settings = addSettings(kanapList, item);

    cartItemContent.appendChild(description);
    cartItemContent.appendChild(settings);
    return cartItemContent;
}

// Ajout de la description (nom, couleur, prix)
function addDescription(kanapList, item) {
    const description = document.createElement("div");
    description.classList.add("cart__item__content__description");

    const h2 = document.createElement("h2");
    h2.textContent = item.name;
    const p = document.createElement("p");
    p.textContent = item.color;
    const p2 = document.createElement("p");
    p2.textContent = getItemPrice(kanapList, item.id) + " €";
    
    description.appendChild(h2);
    description.appendChild(p);
    description.appendChild(p2);
    return description;
}

// Ajout des settings
function addSettings(kanapList, item) {
    const settings = document.createElement("div");
    settings.classList.add("cart__item__content__settings");

    addQuantity(kanapList, settings, item);
    addDelete(kanapList, settings, item);
    return settings;
}

// Ajout de la quantité
function addQuantity(kanapList, settings, item) {
    const quantity = document.createElement("div");
    quantity.classList.add("cart__item__content__settings__quantity");
    const p = document.createElement("p");
    p.textContent = "Qté : ";
    quantity.appendChild(p);
    const input = document.createElement("input");
    input.type = "number";
    input.classList.add("itemQuantity");
    input.name = "itemQuantity";
    input.min = "1";
    input.max = "100";
    input.value = item.quantity;
    input.addEventListener("input", () => updatePriceAndQuantity(kanapList, item.id, input.value, item));
    quantity.appendChild(input);
    settings.appendChild(quantity);
}

// Mise à jour du prix et de la quantité
function updatePriceAndQuantity(kanapList, id, newValue, item) {
    const itemToUpdate = cart.find((item) => item.id === id);
    itemToUpdate.quantity = Number(newValue);
    item.quantity = itemToUpdate.quantity;
    if (item.quantity <= 0){
        alert("Vous n'avez pas atteint la quantité minimum");
        return true;
    }
    displayTotalQuantity();
    displayTotalPrice(kanapList);
    saveNewData(item);
}

function maxQuantity(quantity) {
    if (quantity > 100) {
        alert("Vous avez dépassé la quantité maximum");
        return true;
    }
}

function minQuantity(quantity) {
    if (quantity <= 0) {
        alert("Vous n'avez pas atteint la quantité minimum");
        return true;
    }
}

//Suppression d'un article du LocalStorage
function deleteDataFromCache(item) {
    const key = `${item.id}-${item.color}`;
    localStorage.removeItem(key);
    location.reload();
}

//Enregistrement des modifications sur le panier
function saveNewData(item) {
    const dataToSave = JSON.stringify(item);
    const key = `${item.id}-${item.color}`;
    localStorage.setItem(key, dataToSave);
}

// Ajout de l'élément "supprimer"
function addDelete(kanapList, settings, item) {
    const deleteDiv = document.createElement("div");
    deleteDiv.classList.add("cart__item__content__settings__delete");
    deleteDiv.addEventListener("click", () => deleteItem(kanapList, item));
    const p = document.createElement("p");
    p.classList.add("deleteItem");
    p.textContent = "Supprimer";
    deleteDiv.appendChild(p);
    settings.appendChild(deleteDiv);
}

//Fonction supprimer
function deleteItem(kanapList, item) {
    const itemToDelete = cart.findIndex(
        (product) => product.id === item.id && product.color === item.color
    );
    cart.splice(itemToDelete, 1);
    displayTotalQuantity;
    displayTotalPrice(kanapList);
    deleteDataFromCache(item);
    deleteProductFromCart(item);
}

//Suppression du produit sur la page panier
function deleteProductFromCart(item) {
    const productToDelete = document.querySelector(
    'product[data-id="${item.id}"][data-color="${item.color}"]'
    );
productToDelete.remove();
}

// Affichage de la quantité totale
function displayTotalQuantity() {
    let quantity = 0;
    const totalQuantity = document.querySelector("#totalQuantity");
    const total = cart.reduce((total, item) => total + item.quantity, 0);
    totalQuantity.textContent = total;
}
    
//Affichage du prix total
function displayTotalPrice(kanapList) {
    let total = 0;
    const totalPrice= document.querySelector("#totalPrice");
    cart.forEach((item) => {
        const totalUnitPrice = getItemPrice(kanapList, item.id) * item.quantity;
        total += totalUnitPrice;
    });
    totalPrice.textContent = total;
}

//Envoi du formulaire
function submitForm(e) {
    e.preventDefault()
    if (cart.length === 0) {
      alert("Merci d'ajouter des articles au panier pour passer commande");
      return;  
    }
if (formInvalid()) return;
if (firstNameInvalid()) return;
if (lastNameInvalid()) return;
if (addressInvalid()) return;
if (cityInvalid()) return;
if (emailInvalid()) return;

    const body = formContentRequest();
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((res) => res.json())
    .then((data) => {
      const orderId = data.orderId;
      window.location.href = "../html/confirmation.html" + "?orderId=" + orderId;  
      return console.log(data);  
    })
    
    .catch((err) => console.log(err));
}

//Gestion d'erreurs du formulaire
function formInvalid() {
  const form = document.querySelector(".cart__order__form");
  const inputs = form.querySelectorAll("input");
  let error = false;
  inputs.forEach((input) => {
    if (input.value === "") {
        error = true; 
    }
  })  
  if (error == true) {
    alert ("Merci de renseigner tous les champs");
  }
  return error;
}

function firstNameInvalid() {
    const firstName = document.querySelector("#firstName").value;
    const regex = /^[a-z A-Z  À-ÿ ōŌ -]{2,55}$/;
      if (regex.test(firstName) === false) {
          alert ("Prénom invalide");
          return true;
      }
      return false;
}

function lastNameInvalid() {
    const lastName = document.querySelector("#lastName").value;
    const regex = /^[a-z A-Z  À-ÿ ōŌ -]{2,55}$/;
      if (regex.test(lastName) === false) {
          alert ("Nom invalide");
          return true;
      }
      return false;
}

function addressInvalid() {
    const address = document.querySelector("#address").value;
    const regex = /([0-9]*)?([a-zA-Z]*)/;
      if (regex.test(email) === false) {
          alert ("Adresse invalide");
          return true;
      }
      return false;
}

function cityInvalid() {
    const city = document.querySelector("#city").value;
    const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
      if (regex.test(city) === false) {
          alert ("Ville invalide");
          return true;
      }
      return false;
}

function emailInvalid() {
    const email = document.querySelector("#email").value;
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      if (regex.test(email) === false) {
          alert ("Email invalide");
          return true;
      }
      return false;
}

//Récupération des données du formulaire et du panier
function formContentRequest() {
    const form = document.querySelector(".cart__order__form");
    const firstName = form.elements.firstName.value;
    const lastName = form.elements.lastName.value;
    const address = form.elements.address.value;
    const city = form.elements.city.value;
    const email = form.elements.email.value;
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
    return body;
}

function getIdsFromCache() {
    const numberOfProducts = localStorage.length;
    const ids = []
    for (let i = 0; i < numberOfProducts; i++) {
        const key = localStorage.key(i);
        const id = key.split("-")[0];
        ids.push(id);
    };
    return ids;
}