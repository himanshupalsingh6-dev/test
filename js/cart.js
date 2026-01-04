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
