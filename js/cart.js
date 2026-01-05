/******** QUICKPRESS CART – FINAL FIX ********/

let DELIVERY_CHARGE = 20;
let HANDLING_CHARGE = 3;

/* ===== CART STORAGE ===== */
function getCart(){
  return JSON.parse(localStorage.getItem("cart")) || [];
}
function saveCart(cart){
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* ===== ADD TO CART (GLOBAL FIX) ===== */
window.addItem = function(name, price){
  let cart = getCart();
  const found = cart.find(i => i.name === name);

  if(found){
    found.qty += 1;
  }else{
    cart.push({ name, price, qty: 1 });
  }

  saveCart(cart);
  updateCartAmount();
  showAddFeedback();
};

/* ===== TOTALS ===== */
function itemsTotal(){
  return getCart().reduce((s,i)=>s + i.price * i.qty, 0);
}
function grandTotal(){
  if(getCart().length === 0) return 0;
  return itemsTotal() + DELIVERY_CHARGE + HANDLING_CHARGE;
}

/* ===== NAV CART AMOUNT ===== */
function updateCartAmount(){
  const el = document.getElementById("navCartAmount");
  if(el) el.innerText = "₹" + grandTotal();
}

/* ===== SMALL POPUP FEEDBACK ===== */
function showAddFeedback(){
  let pop = document.getElementById("addPop");
  if(!pop){
    pop = document.createElement("div");
    pop.id = "addPop";
    pop.style.cssText = `
      position:fixed;
      bottom:20px;
      right:20px;
      background:#FFD400;
      padding:10px 14px;
      border-radius:10px;
      font-weight:800;
      z-index:9999;
    `;
    document.body.appendChild(pop);
  }
  pop.innerText = "Added to Cart ✔";
  pop.style.display = "block";
  setTimeout(()=>pop.style.display="none", 1200);
}

/* ===== INIT ===== */
document.addEventListener("DOMContentLoaded", updateCartAmount);
