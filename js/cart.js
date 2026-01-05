/*************************
 QUICKPRESS CART – FINAL
*************************/

const DELIVERY_CHARGE = 20;
const HANDLING_CHARGE = 3;

// LOAD CART
function getCart(){
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// SAVE CART
function saveCart(cart){
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ADD ITEM
function addItem(name, price){
  let cart = getCart();
  const f = cart.find(i => i.name === name);
  f ? f.qty++ : cart.push({name, price, qty:1});
  saveCart(cart);
  updateNavCart();
  if(typeof showAddFeedback === "function") showAddFeedback();
}

// TOTALS
function itemsTotal(){
  return getCart().reduce((s,i)=>s+i.price*i.qty,0);
}
function grandTotal(){
  if(getCart().length === 0) return 0;
  return itemsTotal() + DELIVERY_CHARGE + HANDLING_CHARGE;
}

// NAVBAR AMOUNT
function updateNavCart(){
  const el = document.getElementById("navCartAmount");
  if(el) el.innerText = "₹" + grandTotal();
}

// CART PAGE
function renderCartPage(){
  const box = document.getElementById("cartItems");
  const total = document.getElementById("cartTotal");
  if(!box || !total) return;

  const cart = getCart();
  box.innerHTML = "";

  if(cart.length === 0){
    box.innerHTML = "<p>Your cart is empty</p>";
    total.innerText = "₹0";
    return;
  }

  cart.forEach(i=>{
    box.innerHTML += `
      <div class="cart-item">
        <span>${i.name} × ${i.qty}</span>
        <span>₹${i.price*i.qty}</span>
      </div>
    `;
  });

  total.innerText = "₹" + grandTotal();
}

// CHECKOUT PAGE
function renderCheckoutPage(){
  const itemsEl = document.getElementById("itemsTotal");
  const totalEl = document.getElementById("checkoutTotal");
  if(!itemsEl || !totalEl) return;

  itemsEl.innerText = "₹" + itemsTotal();
  totalEl.innerText = "₹" + grandTotal();
}

document.addEventListener("DOMContentLoaded", updateNavCart);
