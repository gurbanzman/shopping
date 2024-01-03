const form = document.querySelector("[data-form]");
const carts = document.querySelector("[data-carts]");
const errorMessage = document.querySelector("[data-error-message]");
const addingDataShop = document.querySelector("[data-add]");

let primary = document.querySelector("[data-btn]");
let totalPrice = document.querySelector(".shop__price");
let sum = 0;

let data = [
  {
    id: "1",
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash      your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: {
      rate: 3.9,
      count: 120,
    },
  },
  {
    id: "2",
    title: "Mens Casual Premium Slim Fit T-Shirts ",
    price: 22.3,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    category: "men's clothing",
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: {
      rate: 4.1,
      count: 259,
    },
  },
  {
    id: "3",
    title:
      "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    rating: {
      rate: 4.6,
      count: 400,
    },
  },
  {
    id: "4",
    title: "WD 2TB Elements Portable External Hard Drive - USB 3.0",
    price: 64,
    description:
      "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    rating: {
      rate: 3.3,
      count: 203,
    },
  },
  {
    id: "5",
    title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    price: 56.99,
    description:
      "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
    rating: {
      rate: 2.6,
      count: 235,
    },
  },
];

function getData(a) {
  let innerText = "";

  a.map((item) => {
    innerText += `
      <div class="main__shop-cart">
        <div class="shop__cart-image">
          <img src="${item.image}" alt="">
        </div>
        <div class="shop__cart-info">
          <h5 class="shop__cart-category">${item.category}</h5>
          <div class="shop__category-info">
            <p class="shop__category-title">${item.title
              .slice(0, 45)
              .concat("...")}</p>
            <p class="shop__category-description">${item.description
              .slice(0, 100)
              .concat("...")}</p>
          </div>
          <div class="shop__category-cash">
            <span class="shop__category-price">Price: ${
              item.rating.count
            }</span>
            <button type="button" class="btn-add" id="addData" onclick="addData(this,${
              item.id
            })">Add</button>
          </div>
        </div>        
      </div>
      `;
  });

  carts.innerHTML = innerText;
}

getData(data);

function searchData(searchItem, key, data) {
  searchItem = searchItem.toLowerCase();

  const currentData = data.filter((item) => {
    const currentItems = item[key].toLowerCase();
    return currentItems.includes(searchItem);
  });
  return currentData;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let result = searchData(form.search.value, "title", data);
  getData(result);

  if (result == "") {
    errorMessage.innerHTML = "Not found Result...";
  }
  else {
   errorMessage.innerHTML = ""
  }
});

addShop();

function addData(e, id) {
  let post = findObject(id, data);
  
  sum+= Number(post.rating.count);
  totalPrice.textContent = sum + "$";

  sendData(post)
  deleteData()
  calculateAdd(post);
}

function sendData(post) {
  let addingCart = document.querySelector("[data-add]");
  addingCart.innerHTML += `
  <div class="main__shop-cart add__shop-cart" data-carts="${post.id}">
         <div class="shop__cart-image shop__cart--image">
           <img src="${post.image}" alt="">
         </div>
         <div class="shop__cart-info">
             <p class="shop__category-title">${post.title
               .slice(1, 50)
               .concat("...")}</p>
           <div class="shop__category-cash">
             <span class="shop__category-price">Price: ${
               post.rating.count
             }</span>
             <div class="shop__category-cal">
               <button class="minus" projectID="${post.id}"> - </button>
               <span> 1 </span>
               <button class="plus" projectID="${post.id}"> + </button>
             </div>
             <button class="btn-delete" data-delete="${post.id}">Delete</button>
           </div>
         </div>        
       </div>
  `;
}

function addShop() {
  primary.addEventListener("click", (e) => {
    document.querySelector(".add__shop").classList.toggle("visible");
  });
}

function filterData(id,data) {
  return data.filter(item => {
    return item.id != id
  });
}

function findObject(id, data) {
  return data.find((item) => {
    return item.id == id;
  });
}

function calculateAdd(post) {

   let shop__cart = document.querySelectorAll(".add__shop-cart");
   shop__cart.forEach(item => {
      let minus = item.querySelector('.minus');
      let plus = item.querySelector('.plus');
      minusCal(minus,post);
      plusCal(plus,post);
   })
}

function minusCal(minus) {
   minus.addEventListener("click", e => {
    let projectID = minus.getAttribute("projectID");
    let post = findObject(projectID,data);
      sum -= Number(post.rating.count)
      totalPrice.textContent = sum + "$";
   })
}

function plusCal(plus) {
   plus.addEventListener("click", e => {
    let projectID = plus.getAttribute("projectID");
    let post = findObject(projectID,data);
      sum += Number(post.rating.count)
      totalPrice.textContent = sum + "$";
   })
}

function deleteData() {
  let deleteBtn = document.querySelectorAll('.btn-delete');

  deleteBtn.forEach(item => {
    item.addEventListener('click', delData)
  })
}

function delData () {
  let btnDelete = event.target.getAttribute("data-delete");
  let deleteID = findObject(btnDelete,data);
  console.log(deleteID);
}




