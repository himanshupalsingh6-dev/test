/******** QUICKPRESS CART – ADMIN CHARGES ********/

let DELIVERY_CHARGE = 20;
let HANDLING_CHARGE = 3;

/* LOAD CHARGES */
async function loadCharges(){
  try{
    const res = await fetch(
      "https://firestore.googleapis.com/v1/projects/quickpress-web/databases/(default)/documents/settings/charges"
    );
    const data = await res.json();
    if(data.fields){
      DELIVERY_CHARGE = Number(data.fields.delivery.integerValue);
      HANDLING_CHARGE = Number(data.fields.handling.integerValue);
    }
  }catch(e){}
}
loadCharges();

/* CART */
function getCart(){ return JSON.parse(localStorage.getItem("cart"))||[] }
function saveCart(c){ localStorage.setItem("cart",JSON.stringify(c)) }

function addItem(name,price){
  let c=getCart();
  const f=c.find(i=>i.name===name);
  f?f.qty++:c.push({name,price,qty:1});
  saveCart(c);
  updateNav();
  if(typeof showAddFeedback==="function") showAddFeedback();
}

function itemsTotal(){
  return getCart().reduce((s,i)=>s+i.price*i.qty,0);
}
function grandTotal(){
  const c=getCart();
  if(!c.length) return 0;
  return itemsTotal()+DELIVERY_CHARGE+HANDLING_CHARGE;
}

function updateNav(){
  const el=document.getElementById("navCartAmount");
  if(el) el.innerText="₹"+grandTotal();
}

/* CART PAGE */
function renderCartPage(){
  const b=document.getElementById("cartItems");
  const t=document.getElementById("cartTotal");
  if(!b||!t) return;
  b.innerHTML="";
  getCart().forEach(i=>{
    b.innerHTML+=`${i.name} × ${i.qty}<br>`;
  });
  t.innerText="₹"+grandTotal();
}

/* CHECKOUT */
function renderCheckoutPage(){
  const i=document.getElementById("itemsTotal");
  const t=document.getElementById("checkoutTotal");
  if(i&&t){
    i.innerText="₹"+itemsTotal();
    t.innerText="₹"+grandTotal();
  }
}

document.addEventListener("DOMContentLoaded",updateNav);
