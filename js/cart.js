/******** QUICKPRESS CART – FINAL ********/

let DELIVERY_CHARGE = 20;
let HANDLING_CHARGE = 3;

/* ===== STORAGE ===== */
function getCart(){
  return JSON.parse(localStorage.getItem("cart")) || [];
}
function saveCart(cart){
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* ===== ADD TO CART ===== */
window.addItem = function(name, price){
  let cart = getCart();
  let item = cart.find(i => i.name === name);

  if(item){
    item.qty += 1;
  }else{
    cart.push({ name, price, qty: 1 });
  }

  saveCart(cart);
  updateCartUI();
  toast("Added to cart");
};

/* ===== TOTAL ===== */
function itemsTotal(){
  return getCart().reduce((t,i)=>t + i.price*i.qty,0);
}
function grandTotal(){
  if(getCart().length === 0) return 0;
  return itemsTotal() + DELIVERY_CHARGE + HANDLING_CHARGE;
}

/* ===== NAV CART ===== */
function updateCartUI(){
  const el = document.getElementById("navCartAmount");
  if(el) el.innerText = "₹" + grandTotal();
}

/* ===== SMALL POPUP ===== */
function toast(text){
  let t = document.getElementById("toast");
  if(!t){
    t = document.createElement("div");
    t.id = "toast";
    t.style.cssText = `
      position:fixed;
      bottom:20px;
      right:20px;
      background:#FFD400;
      padding:10px 14px;
      border-radius:10px;
      font-weight:800;
      z-index:9999;
    `;
    document.body.appendChild(t);
  }
  t.innerText = text;
  t.style.display="block";
  setTimeout(()=>t.style.display="none",1200);
}

/* ===== INIT ===== */
document.addEventListener("DOMContentLoaded", updateCartUI);
