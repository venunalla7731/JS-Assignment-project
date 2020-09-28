fetch('data-source/products.json')
  .then(
    function (response) {
      if (response.status !== 200) {
        console.log('Status Code: ' + response.status);
        return;
      }
      response.json().then(function (data) {
        console.log('data from response : ', data);
        let categories = data.categories;
        loadCategories(categories);
        let products = data.groups;
        loadProducts(products);
      });
    }
  )

function loadProducts(products) {
  var i=0;
  products.forEach(element => {
    addProduct(element, i);
    i++;
  });
}

function loadCategories(categories) {
  categories.forEach(element => {
    var li = document.createElement("li");
    li.classList.add("list-group-item");
    li.appendChild(document.createTextNode(element.name));
    addItemToUl("categories_list", li);
  });
}

function addItemToUl(ulId, li) {
  var ul = document.getElementById(ulId);
  ul.appendChild(li);
}

function addProduct(product, productIndex) {
  let thumbnail = product.thumbnail.href;
  let name = product.name;
  let price = getSellingPrice(product);
  
  let productDiv = "<div class='col-12 col-md-6 col-lg-4'><div class='card product_card' id='product_card_" + productIndex + "'><img class='card-img-top' src='" + thumbnail + "' alt='Card image cap'><h6 class='card-title'><a href='product.html' title='View Product'>" + name + "</a></h6><div class='row'><div class='btn-group' role='group' aria-label='Basic example'><button type='button' class='btn btn-danger btn-secondary product-btn'>" + price + " $</button><button type='button' class='btn btn-success btn-secondary'>Add to cart</button></div></div></div></div>";
  var productListDiv = document.getElementById("product_list");
  productListDiv.insertAdjacentHTML('beforeend', productDiv);
  var productItem = document.getElementById('product_card_' + productIndex);
  productItem.dataset.product_data = JSON.stringify(product);
}

function getSellingPrice(product) {
  if(typeof(product.priceRange) === "number") {
    return product.priceRange.selling;
  } else if(typeof(product.priceRange) === "undefined" && typeof(product.price) === "undefined") {
    return "undefined";
  } else if(typeof(product.price) !== "undefined") {
    return product.price.selling;
  } else {
    return product.priceRange.selling.low.toString() + " - " + product.priceRange.selling.high.toString();
  }
}