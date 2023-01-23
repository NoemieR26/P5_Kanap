/*Récupération des données depuis l'API*/
async function getData () {
    const response = await fetch("http://localhost:3000/api/products")
    if (response.ok === true) {
        return response.json();
    }
    throw new Error ('Impossible de contacter le serveur');
}

/*Affichage des produits*/
getData().then(data => {
    let list_product =  document.getElementById("items");  
    for (let item of data) {
        list_product .innerHTML += `
        <a href="./product.html?id=${item._id}">
            <article>
              <img src="${item.imageUrl}" alt="${item.altTxt}">
              <h3 class="productName"> ${item.name} </h3>
              <p class="productDescription"> ${item.description}</p>
            </article>
          </a>
          `;
      }
})

