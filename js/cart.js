/*************************
 QUICKPRESS CART – INLINE QTY
*************************/

const DELIVERY_CHARGE = 20;
const HANDLING_CHARGE = 3;

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function save(){
  localStorage.setItem("cart", JSON.stringify(cart));
}

// TOTAL
function itemsTotal(){
  return cart.reduce((s,i)=>s+i.price*i.qty,0);
}
function grandTotal(){
  if(cart.length===0) return 0;
  return itemsTotal() + DELIVERY_CHARGE + HANDLING_CHARGE;
}

// NAVBAR UPDATE
function updateNav(){
  const el = document.getElementById("navCartAmount");
  if(el) el.innerText = "₹" + grandTotal();
}

// ADD
window.addFromCard = (name, price, btn) => {
  const f = cart.find(i=>i.name===name);
  f ? f.qty++ : cart.push({name,price,qty:1});
  save();
  updateNav();

  btn.style.display="none";
  const box = btn.nextElementSibling;
  box.style.display="flex";
  box.querySelector("span").innerText = getQty(name);
};

// +
window.incFromCard = (name, price, btn) => {
  const f = cart.find(i=>i.name===name);
  if(f){
    f.qty++;
    save();
    updateNav();
    btn.parentElement.querySelector("span").innerText = f.qty;
  }
};

// -
window.decFromCard = (name, btn) => {
  const f = cart.find(i=>i.name===name);
  if(!f) return;

  f.qty--;
  if(f.qty<=0){
    cart = cart.filter(i=>i.name!==name);
    btn.parentElement.style.display="none";
    btn.parentElement.previousElementSibling.style.display="block";
  }else{
    btn.parentElement.querySelector("span").innerText = f.qty;
  }
  save();
  updateNav();
};

function getQty(name){
  const f = cart.find(i=>i.name===name);
  return f ? f.qty : 0;
}

// INIT
document.addEventListener("DOMContentLoaded", updateNav);
