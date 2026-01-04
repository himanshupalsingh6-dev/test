/*************************
 QUICKPRESS CART – STABLE
*************************/

const DELIVERY_CHARGE = 20;
const HANDLING_CHARGE = 3;

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function save(){
  localStorage.setItem("cart", JSON.stringify(cart));
}

function itemsTotal(){
  return cart.reduce((s,i)=>s+i.price*i.qty,0);
}

function grandTotal(){
  if(cart.length===0) return 0;
  return itemsTotal() + DELIVERY_CHARGE + HANDLING_CHARGE;
}

// ADD
window.addItem = (name, price) => {
  const f = cart.find(i=>i.name===name);
  f ? f.qty++ : cart.push({name,price,qty:1});
  save();
  renderAll();
  if(window.innerWidth>=768){
    document.getElementById("cartDrawer").classList.add("open");
  }
};

// QTY
window.increaseQty = i => { cart[i].qty++; save(); renderAll(); };
window.decreaseQty = i => {
  cart[i].qty--;
  if(cart[i].qty<=0) cart.splice(i,1);
  save(); renderAll();
};

// DESKTOP DRAWER
function renderDrawer(){
  const box = document.getElementById("cartItems");
  const total = document.getElementById("drawerTotal");
  if(!box) return;

  box.innerHTML="";
  cart.forEach((i,idx)=>{
    box.innerHTML+=`
      <div class="cart-item">
        <div><b>${i.name}</b><br>₹${i.price}</div>
        <div class="qty-box">
          <button onclick="decreaseQty(${idx})">−</button>
          <span>${i.qty}</span>
          <button onclick="increaseQty(${idx})">+</button>
        </div>
      </div>
    `;
  });

  if(total) total.innerText="₹"+grandTotal();
}

// MOBILE BADGE
function renderBadge(){
  const b=document.getElementById("cartBadge");
  if(!b) return;

  if(window.innerWidth<768 && grandTotal()>0){
    b.style.display="flex";
    b.innerText="₹"+grandTotal();
  }else{
    b.style.display="none";
  }
}

// CART / CHECKOUT PAGE
window.renderCartPage = ()=>{
  const t=document.getElementById("cartGrandTotal");
  if(t) t.innerText="₹"+grandTotal();
};

function renderAll(){
  renderDrawer();
  renderBadge();
  renderCartPage();
}

document.addEventListener("DOMContentLoaded",renderAll);
// NAVBAR CART AMOUNT UPDATE
function updateNavCart(){
  const el = document.getElementById("navCartAmount");
  if(!el) return;

  let total = 0;
  cart.forEach(i => total += i.price * i.qty);
  if(cart.length) total += DELIVERY_CHARGE + HANDLING_CHARGE;

  el.innerText = "₹" + total;
}

// call with render
const _oldRenderAll = typeof renderAll === "function" ? renderAll : null;
function renderAll(){
  if(_oldRenderAll) _oldRenderAll();
  updateNavCart();
}
updateNavCart();
// PROFILE / LOGIN CLICK
window.handleProfileClick = () => {
  // abhi simple flow
  // future me auth check yahin hoga
  window.location.href = "login.html";
};
// ===== INLINE QTY LOGIC (PRODUCT CARD) =====

// ADD FROM CARD
window.addItem = (name, price, btn) => {
  const item = cart.find(i => i.name === name);
  item ? item.qty++ : cart.push({name, price, qty:1});
  save();
  renderAll();

  // toggle UI
  if(btn){
    btn.style.display = "none";
    const box = btn.nextElementSibling;
    box.style.display = "flex";
    box.querySelector("span").innerText = getItemQty(name);
  }
};

// +
window.incInline = (name, price, btn) => {
  const item = cart.find(i => i.name === name);
  if(item){
    item.qty++;
    save();
    renderAll();
    btn.parentElement.querySelector("span").innerText = item.qty;
  }
};

// -
window.decInline = (name, btn) => {
  const item = cart.find(i => i.name === name);
  if(!item) return;

  item.qty--;
  if(item.qty <= 0){
    cart = cart.filter(i => i.name !== name);
    btn.parentElement.style.display = "none";
    btn.parentElement.previousElementSibling.style.display = "block";
  }else{
    btn.parentElement.querySelector("span").innerText = item.qty;
  }
  save();
  renderAll();
};

// helper
function getItemQty(name){
  const i = cart.find(x => x.name === name);
  return i ? i.qty : 0;
}
