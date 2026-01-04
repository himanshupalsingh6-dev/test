// ===== ADMIN CONTROLLED CHARGES =====
const DELIVERY_CHARGE = 20;   // admin panel se change hoga
const HANDLING_CHARGE = 3;    // fixed ₹3
/***************
 QUICKPRESS CART SYSTEM
 LIVE DRAWER + QTY + TOTAL
****************/

// CART STATE
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// SAVE + RENDER
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderDrawer();
}

// ADD ITEM (FROM PRODUCT PAGE)
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
  const drawer = document.getElementById("cartDrawer");
  if (drawer) drawer.classList.add("open");
};

window.toggleCart = () => {
  const drawer = document.getElementById("cartDrawer");
  if (drawer) drawer.classList.toggle("open");
};

// RENDER CART DRAWER
window.renderDrawer = () => {
  const itemsBox = document.getElementById("cartItems");
  const totalBox = document.getElementById("cartTotal");

  if (!itemsBox || !totalBox) return;

  itemsBox.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

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

  totalBox.innerText = "Total ₹" + total;
};

// INCREASE QTY
window.increaseQty = (index) => {
  cart[index].qty += 1;
  saveCart();
};

// DECREASE QTY / REMOVE
window.decreaseQty = (index) => {
  cart[index].qty -= 1;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
};

// CLEAR CART (OPTIONAL)
window.clearCart = () => {
  cart = [];
  saveCart();
};

// AUTO RENDER ON PAGE LOAD
document.addEventListener("DOMContentLoaded", () => {
  renderDrawer();
});
