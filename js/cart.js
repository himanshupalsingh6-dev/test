const DELIVERY_CHARGE = 20;
const HANDLING_CHARGE = 3;

/* STORAGE */
function getCart(){
  return JSON.parse(localStorage.getItem("cart")) || [];
}
function saveCart(cart){
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* ADD ITEM */
window.addItem = function(name, price){
  let cart = getCart();
  let item = cart.find(i => i.name === name);

  if(item){
    item.qty++;
  }else{
    cart.push({ name, price, qty: 1 });
  }

  saveCart(cart);
  updateNav();
  toast(name + " added");
};

/* TOTALS */
function itemsTotal(){
  return getCart().reduce((t,i)=>t+i.price*i.qty,0);
}
function grandTotal(){
  let t = itemsTotal();
  return t === 0 ? 0 : t + DELIVERY_CHARGE + HANDLING_CHARGE;
}

/* NAV TOTAL */
function updateNav(){
  let el = document.getElementById("navCartAmount");
  if(el) el.innerText = "₹" + grandTotal();
}

/* TOAST */
function toast(msg){
  let t = document.getElementById("toast");
  if(!t){
    t = document.createElement("div");
    t.id="toast";
    t.style.cssText=`
      position:fixed;bottom:20px;right:20px;
      background:#FFD400;padding:10px;
      font-weight:800;border-radius:8px;
    `;
    document.body.appendChild(t);
  }
  t.innerText = msg;
  t.style.display="block";
  setTimeout(()=>t.style.display="none",1200);
}

document.addEventListener("DOMContentLoaded", updateNav);
