/***********************
 QUICKPRESS CART SYSTEM
 LIVE CART + BILLING
***********************/

// ADMIN CONTROLLED CHARGES
const DELIVERY_CHARGE = 20;   // admin change karega
const HANDLING_CHARGE = 3;    // fixed ₹3

// CART STATE
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// SAVE CART
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderDrawer();
}

// ADD ITEM
window.addItem = (name, price) => {
  const item = cart.find(i => i.name === name);
  if (item) {
    item.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  saveCart();
  openCart();
};

// OPEN / CLOSE CART
window.openCart = () => {
  const d = document.getElementById("cartDrawer");
  if (d) d.classList.add("open");
};

window.toggleCart = () => {
  const d = document.getElementById("cartDrawer");
  if (d) d.classList.toggle("open");
};

// QTY +
window.increaseQty = (index) => {
  cart[index].qty++;
  saveCart();
};

// QTY -
window.decreaseQty = (index) => {
  cart[index].qty--;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
};

// RENDER CART + BILL
window.renderDrawer = () => {
  const itemsBox = document.getElementById("cartItems");
  if (!itemsBox) return;

  let itemsTotal = 0;
  itemsBox.innerHTML = "";

  cart.forEach((item, index) => {
    itemsTotal += item.price * item.qty;

    itemsBox.innerHTML += `
      <div class="cart-item">
        <div>
          <b>${item.name}</b><br>
          ₹${item.price}
        </div>

        <div class="qty-box">
          <button onclick="decreaseQty(${index})">−</button>
          <span>${item.qty}</span>
          <button onclick="increaseQty(${index})">+</button>
        </div>
      </div>
    `;
  });

  const delivery = cart.length ? DELIVERY_CHARGE : 0;
  const handling = cart.length ? HANDLING_CHARGE : 0;
  const grand = itemsTotal + delivery + handling;

  document.getElementById("itemsTotal").innerText = "₹" + itemsTotal;
  document.getElementById("deliveryCharge").innerText = "₹" + delivery;
  document.getElementById("handlingCharge").innerText = "₹" + handling;
  document.getElementById("grandTotal").innerText = "₹" + grand;
};

// AUTO LOAD
document.addEventListener("DOMContentLoaded", renderDrawer);
