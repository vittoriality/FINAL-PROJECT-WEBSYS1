import { products } from "./data.js";
import { addToCart } from "./cart.js";

const productsContainer = document.getElementById("products");
const search = document.getElementById("search");

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}
function isInCart(id) {
  return getCart().some((item) => item.id === id);
}

export function showProducts(items) {
  productsContainer.innerHTML = "";
  items.forEach((product) => {
    const added = isInCart(product.id);

    productsContainer.innerHTML += `
      <div class="card">
        <div class="image-box">
          <img src="${product.image}">
          <span class="tag">NEW!</span>
        </div>

        <div class="card-content">
          <p class="category">${product.category}</p>
          <h3 class="product-name">${product.name}</h3>
          <p class="description">${product.description}</p>

          <div class="bottom">
            <p class="price">₱${product.price}</p>
            <button class="add-btn"
              data-id="${product.id}"
              ${added ? "disabled" : ""}>
              ${added ? "Already in cart!" : "Add"}
            </button>

          </div>
        </div>
      </div>
    `;
  });

  document.querySelectorAll(".add-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      addToCart(Number(btn.dataset.id));
      showProducts(products);
    });
  });
}

search.addEventListener("input", () => {
  const value = search.value.toLowerCase();
  const filtered = products.filter((p) => p.name.toLowerCase().includes(value));
  showProducts(filtered);
});

document.getElementById("checkout-btn").addEventListener("click", () => {
  alert("Checkout successful!");
});

showProducts(products);
