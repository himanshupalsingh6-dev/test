let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart(){
  localStorage.setItem("cart", JSON.stringify(cart));
  renderDrawer();
}

window.addItem = (name, price) => {
  const i = cart.find(x => x.name === name);
  i ? i.qty++ : cart.push({name, price, qty:1});
  saveCart();
  openCart();
};

window.toggleCart = () => {
  document.getElementById("cartDrawer").classList.toggle("open");
};

window.openCart = () => {
  document.getElementById("cartDrawer").classList.add("open");
};

window.renderDrawer = () => {
  const box = document.getElementById("cartItems");
  const totalBox = document.getElementById("cartTotal");

  if(!box || !totalBox) return;

  let total = 0;
  box.innerHTML = "";

  cart.forEach(i=>{
    total += i.price * i.qty;
    box.innerHTML += `
      <div class="cart-item">
        <span>${i.name} x ${i.qty}</span>
        <span>₹${i.price*i.qty}</span>
      </div>
    `;
  });

  totalBox.innerText = "Total ₹" + total;
};

document.addEventListener("DOMContentLoaded", renderDrawer);
