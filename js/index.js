//EXIBINDO PRODUTOS
const productList = document.getElementById("cards");

function displayProducts(list){
    
    productList.innerHTML = "";

    for (let i = 0; i < list.length; i++){

        const newItem = document.createElement("li");
        newItem.innerHTML =
        `<li class="itemCard id_${list[i].id}">
            <div class="productImage">
                <img src="${list[i].img}" alt="Imagem do produto ${list[i].nameItem}">
            </div>

            <div class="aboutProduct">

                <span class="productCategory">${list[i].tag}</span>
                <h3 class="productName">${list[i].nameItem}</h3>
                <p class="productDescription">${list[i].description}</p>
                <span class="productPrice">R$${list[i].value}.00</span>

                <button id="addToCart">Adicionar ao carrinho</button>
            </div>
        </li>`

        productList.appendChild(newItem);
    }
    
    const addToCartBtn = document.querySelectorAll("#addToCart");

    for (let i = 0; i < addToCartBtn.length; i++){
        addToCartBtn[i].addEventListener("click",addItemToCart);
    }
}
displayProducts(data);


//PESQUISA POR CATEGORIA
const filterItem = document.getElementsByClassName("filterFor");

for (let i = 0; i < filterItem.length; i++){
    filterItem[i].addEventListener("click", filter);
}

function filter(event){

    const categoryNotFound = document.createElement("h2");
    categoryNotFound.innerText = "Ainda não temos essa categoria de produtos disponível";
    categoryNotFound.classList.add("categoryNotFound");

    let filteredItems =[];
    const itemText = event.target.innerHTML.toLowerCase();

    for (element of data){
        if (itemText == element.tag[0].toLowerCase()){
            filteredItems.push(element);

        }if (itemText == "todos"){
            displayProducts(data);
            return "";
        }
    }
    displayProducts(filteredItems);
}

//CARRINHO

cartItemsList = [];

function addItemToCart(event){

    const item = event.target.closest("li");
    console.log(item);

    const itemId = parseInt(item.classList[1].substring(3))
    for (let i = 0; i < data.length; i++){
        if (data[i].id == itemId){
            cartItemsList.push(data[i]);
        }
    }
    createCartItem();
    
}

let footerGen = 0;

function createCartItem(){

    let cart = document.getElementById("cartList");
    cart.innerHTML = "";
    const generalCart = document.getElementsByClassName("cart")[0];

    const purchaseDetails = document.createElement("footer");

    if (footerGen < 1){
        purchaseDetails.innerHTML =
        `
        <footer class="cartDetails">
            <div class="totalQuant">
                <h4>Quantidade:</h4>
                <span class = "totalQuantValue">0</span>
            </div>

            <div class="totalPrice">
                <h4>Total:</h4>
                <span class = "totalPriceValue">R$00.00</span>
            </div>
        </footer>
        `
    }

    

    let sumItemsPrice = 0;

    for (let i = 0; i < cartItemsList.length; i++){

        const newCardItem = document.createElement("li");

        sumItemsPrice += cartItemsList[i].value;
        
        newCardItem.innerHTML =
        `<li class="cartItem id_${cartItemsList[i].id}">

        <div class="cartProductImage">
            <img src="${cartItemsList[i].img}" alt="Imagem do produto: ${cartItemsList[i].nameItem}">
        </div>
        <div class="cartProductDetails">
            <h3 class="productNameCart">${cartItemsList[i].nameItem}</h3>
            <span class="productPriceCart">R$${cartItemsList[i].value}</span>
            <button id="removeBtn">Remover produto</button>
        </div>
        </li>`
        cart.appendChild(newCardItem);
    }

    
    generalCart.appendChild(purchaseDetails);

    const totalPriceValue = document.getElementsByClassName("totalPriceValue")[0];
    const totalQuantValue = document.getElementsByClassName("totalQuantValue")[0];

    totalPriceValue.innerText = `R$${sumItemsPrice.toFixed(2)}`;
    totalQuantValue.innerText = cartItemsList.length;

    footerGen++;

    const removeBtn = document.querySelectorAll("#removeBtn");

    for (let i = 0 ; i < removeBtn.length; i++){
        removeBtn[i].addEventListener("click", removeFromCart);
    }
    
}


function removeFromCart(event){

    let item = event.target.closest("li");
    let itemId = parseInt(item.classList[1].substring(3));

    
    for (let i = 0; i < cartItemsList.length; i++){
        if (cartItemsList[i].id === itemId){
            cartItemsList.splice(i , 1);
            createCartItem();

            return "item removido"
        }
    }
}
