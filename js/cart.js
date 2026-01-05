/******** QUICKPRESS CART – FINAL FIX ********/

const DELIVERY_CHARGE = 20;
const HANDLING_CHARGE = 3;

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
  alert("Added to cart");
};

/* ===== RENDER CART ===== */
function renderCart(){
  const box = document.getElementById("cartItems");
  if(!box) return;

  const cart = getCart();
  box.innerHTML = "";

  if(cart.length === 0){
    box.innerHTML = "<p>Cart is empty</p>";
    updateTotals(0);
    return;
  }

  let total = 0;

  cart.forEach(i=>{
    const price = i.price * i.qty;
    total += price;

    box.innerHTML += `
      <div class="item">
        <span>${i.name} × ${i.qty}</span>
        <span>₹${price}</span>
      </div>
    `;
  });

  updateTotals(total);
}

/* ===== TOTALS ===== */
function updateTotals(itemsTotal){
  document.getElementById("itemsTotal").innerText = "₹" + itemsTotal;
  document.getElementById("delivery").innerText = "₹" + DELIVERY_CHARGE;
  document.getElementById("handling").innerText = "₹" + HANDLING_CHARGE;

  const grand = itemsTotal === 0 ? 0 : itemsTotal + DELIVERY_CHARGE + HANDLING_CHARGE;
  document.getElementById("grandTotal").innerText = "₹" + grand;
}

/* ===== CHECKOUT ===== */
window.checkout = function(){
  const cart = getCart();
  if(cart.length === 0){
    alert("Cart empty");
    return;
  }
  alert("Order placed successfully!");
  localStorage.removeItem("cart");
  renderCart();
};

/* INIT */
document.addEventListener("DOMContentLoaded", renderCart);
