let cart = JSON.parse(localStorage.getItem("cart")) || [];

window.addItem = (name, price) => {
  const i = cart.find(x=>x.name===name);
  i ? i.qty++ : cart.push({name, price, qty:1});
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added");
};

window.renderCart = () => {
  let t=0, h="";
  cart.forEach(i=>{
    t+=i.price*i.qty;
    h+=`${i.name} x ${i.qty} = ₹${i.price*i.qty}<br>`;
  });
  list.innerHTML=h; total.innerText="Total ₹"+t;
};
