/************************
 QUICKPRESS CART – FINAL FIX
 TOTAL BUG + MOBILE BADGE
************************/

// ADMIN CHARGES
const DELIVERY_CHARGE = 20;
const HANDLING_CHARGE = 3;

// CART STATE
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// SAVE
function saveCart(){
  localStorage.setItem("cart", JSON.stringify(cart));
  updateBadge();
}

// ADD ITEM
window.addItem = (name, price) => {
  const item = cart.find(i => i.name === name);
  if(item){
    item.qty++;
  }else{
    cart.push({ name, price, qty: 1 });
  }
  saveCart();
  renderDrawer();
};

// QTY +
window.increaseQty = (i) => {
  cart[i].qty++;
  saveCart();
  renderDrawer();
};

// QTY -
window.decreaseQty = (i) => {
  cart[i].qty--;
  if(cart[i].qty <= 0) cart.splice(i,1);
  saveCart();
  renderDrawer();
};

// TOTAL CALC (🔥 MAIN FIX)
function getTotals(){
  let itemsTotal = 0;
  cart.forEach(i => {
    itemsTotal += i.price * i.qty;
  });
  const delivery = cart.length ? DELIVERY_CHARGE : 0;
  const handling = cart.length ? HANDLING_CHARGE : 0;
  return {
    itemsTotal,
    grandTotal: itemsTotal + delivery + handling
  };
}

// DRAWER RENDER (DESKTOP)
window.renderDrawer = () => {
  const box = document.getElementById("cartItems");
  const totalBox = document.getElementById("grandTotal");
  if(!box) return;

  box.innerHTML = "";
  const t = getTotals();

  cart.forEach((item,i)=>{
    box.innerHTML += `
      <div class="cart-item">
        <div>
          <b>${item.name}</b><br>
          ₹${item.price}
        </div>
        <div class="qty-box">
          <button onclick="decreaseQty(${i})">−</button>
          <span>${item.qty}</span>
          <button onclick="increaseQty(${i})">+</button>
        </div>
      </div>
    `;
  });

  if(totalBox){
    totalBox.innerText = "₹" + t.grandTotal;
  }
};

// 🔥 MOBILE BADGE UPDATE
function updateBadge(){
  const badge = document.getElementById("cartBadge");
  if(!badge) return;

  const t = getTotals();
  if(t.grandTotal > 0){
    badge.style.display = "flex";
    badge.innerText = "₹" + t.grandTotal;
  }else{
    badge.style.display = "none";
  }
}

// AUTO LOAD
document.addEventListener("DOMContentLoaded", ()=>{
  renderDrawer();
  updateBadge();
});
