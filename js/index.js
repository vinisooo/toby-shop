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
                <h2 class="productName">${list[i].nameItem}</h2>
                <p class="productDescription">${list[i].description}</p>
                <h4 class="productPrice">R$${list[i].value}.00</h4>

                <button id="addToCart">Adicionar ao carrinho</button>
            </div>
        </li>`

        productList.appendChild(newItem);
    }
}
displayProducts(data);


const filterItem = document.getElementsByClassName("filterFor");

for (let i = 0; i < filterItem.length; i++){
    filterItem[i].addEventListener("click", filter);
}

function filter(event){

    const categoryNotFound = document.createElement("h2");
    categoryNotFound.innerText = "Ainda não temos essa categoria de produtos disponível";
    categoryNotFound.classList.add("categoryNotFound");

    let filteredItems =[];
    const item = event.target;
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

