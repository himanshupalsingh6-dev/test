/************************
 QUICKPRESS CART – FINAL
 MOBILE + DESKTOP WORKING
************************/

// ADMIN CHARGES
const DELIVERY_CHARGE = 20;
const HANDLING_CHARGE = 3;

// CART STATE
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// SAVE
function saveCart(){
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ADD ITEM (WORKS BOTH MOBILE + DESKTOP)
window.addItem = (name, price) => {
  const item = cart.find(i => i.name === name);
  if(item){
    item.qty++;
  }else{
    cart.push({ name, price, qty: 1 });
  }
  saveCart();
  renderDrawer();
  openCart();
};

// OPEN CART
window.openCart = () => {
  const d = document.getElementById("cartDrawer");
  if(d) d.classList.add("open");
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

// RENDER DRAWER (LIVE CART)
window.renderDrawer = () => {
  const box = document.getElementById("cartItems");
  if(!box) return;

  let itemsTotal = 0;
  box.innerHTML = "";

  cart.forEach((item,i)=>{
    itemsTotal += item.price * item.qty;
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

  const delivery = cart.length ? DELIVERY_CHARGE : 0;
  const handling = cart.length ? HANDLING_CHARGE : 0;
  const grand = itemsTotal + delivery + handling;

  // SAFE CHECK (elements exist or not)
  if(document.getElementById("itemsTotal")){
    document.getElementById("itemsTotal").innerText = "₹"+itemsTotal;
    document.getElementById("deliveryCharge").innerText = "₹"+delivery;
    document.getElementById("handlingCharge").innerText = "₹"+handling;
    document.getElementById("grandTotal").innerText = "₹"+grand;
  }
};

// CART PAGE TOTAL (cart.html)
window.renderCartPage = () => {
  const list = document.getElementById("cartList");
  const totalBox = document.getElementById("cartGrandTotal");
  if(!list || !totalBox) return;

  let total = 0;
  list.innerHTML = "";

  cart.forEach(i=>{
    total += i.price * i.qty;
    list.innerHTML += `<div>${i.name} x ${i.qty} = ₹${i.price*i.qty}</div>`;
  });

  totalBox.innerText = "₹" + (total + DELIVERY_CHARGE + HANDLING_CHARGE);
};

// AUTO LOAD
document.addEventListener("DOMContentLoaded", ()=>{
  renderDrawer();
  renderCartPage();
});
