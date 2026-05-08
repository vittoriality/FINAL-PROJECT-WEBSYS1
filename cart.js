import { products } from "./data.js";
import { showProducts } from "./product.js";

let cart = JSON.parse(localStorage.getItem("cart")) || [];

export function addToCart(id) {
  const existing = cart.find((item) => item.id === id);

  existing ||
    cart.push({
      ...products.find((p) => p.id === id),
      quantity: 1,
    });
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const total = document.getElementById("total");
  const cartCount = document.getElementById("cart-count");
  const empty = document.getElementById("empty-msg");

  cartItems.innerHTML = "";

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  empty.style.display = cart.length ? "none" : "block";

  cart.forEach((item) => {
    cartItems.innerHTML += `
  <div class="cart-item">
    <div class="cart-info">
      <h4>${item.name}</h4>
      <p>₱${item.price}</p>
    </div>

    <div class="qty">
  <button onclick="changeQty(${item.id}, -1)">-</button>
  <span>${item.quantity}</span>
  <button onclick="changeQty(${item.id}, 1)">+</button>
</div>
`;
  });

  total.textContent = totalPrice;
  cartCount.textContent = totalCount;
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function changeQty(id, value) {
  cart.forEach((item) => item.id === id && (item.quantity += value));
  cart = cart.filter((item) => item.quantity > 0);
  updateCart();
}

window.changeQty = changeQty;

document.getElementById("clear-cart").onclick = () => {
  cart = [];
  updateCart();
  showProducts(products);
};
