const DELIVERY_CHARGE = 20;
const HANDLING_CHARGE = 3;

/* STORAGE */
function getCart(){
  return JSON.parse(localStorage.getItem("cart")) || [];
}
function saveCart(cart){
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* ADD */
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
};

/* REMOVE (−) */
window.removeItem = function(name){
  let cart = getCart();
  let item = cart.find(i => i.name === name);

  if(!item) return;

  item.qty--;
  if(item.qty <= 0){
    cart = cart.filter(i => i.name !== name);
  }
  saveCart(cart);
  updateNav();
};

/* HELPERS */
window.getQty = function(name){
  let item = getCart().find(i => i.name === name);
  return item ? item.qty : 0;
};

function itemsTotal(){
  return getCart().reduce((t,i)=>t+i.price*i.qty,0);
}
function grandTotal(){
  let t = itemsTotal();
  return t === 0 ? 0 : t + DELIVERY_CHARGE + HANDLING_CHARGE;
}

/* NAV */
function updateNav(){
  const el = document.getElementById("navCartAmount");
  if(el) el.innerText = "₹" + grandTotal();
}

document.addEventListener("DOMContentLoaded", updateNav);
