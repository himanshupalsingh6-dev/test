import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

/* Firebase config */
const firebaseConfig = {
  apiKey: "AIzaSyAWTOu3JBhg3JuZg6snAxhnf_XFhLhLkbc",
  authDomain: "quickpress-web.firebaseapp.com",
  projectId: "quickpress-web"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* State */
let allOrders = [];
let currentFilter = "all";
let currentOrderId = null;

/* Elements */
const table = document.getElementById("ordersTable");
const modal = document.getElementById("orderModal");
const orderInfo = document.getElementById("orderInfo");
const partnerSelect = document.getElementById("partnerSelect");
const deliverySelect = document.getElementById("deliverySelect");
const statusSelect = document.getElementById("statusSelect");

/* Load orders */
async function loadOrders(){
  const snap = await getDocs(collection(db,"orders"));
  allOrders = [];
  snap.forEach(d=>{
    allOrders.push({ id:d.id, ...d.data() });
  });
  renderOrders();
}
loadOrders();

/* Render table */
function renderOrders(){
  table.innerHTML = "";
  const today = new Date().toISOString().slice(0,10);

  const filtered = allOrders.filter(o=>{
    if(currentFilter==="all") return true;
    if(currentFilter==="pending") return o.status!=="Delivered";
    if(currentFilter==="today"){
      if(!o.createdAt?.seconds) return false;
      const d = new Date(o.createdAt.seconds*1000).toISOString().slice(0,10);
      return d===today;
    }
    return o.status===currentFilter;
  });

  if(filtered.length===0){
    table.innerHTML = `<tr><td colspan="5">No orders</td></tr>`;
    return;
  }

  filtered.forEach(o=>{
    const date = o.createdAt?.seconds
      ? new Date(o.createdAt.seconds*1000).toLocaleDateString()
      : "-";

    table.innerHTML += `
      <tr>
        <td>${o.id}</td>
        <td>₹${o.grandTotal||0}</td>
        <td><span class="status ${o.status}">${o.status}</span></td>
        <td>${date}</td>
        <td>
          <button class="btn" onclick="viewOrder('${o.id}')">View</button>
        </td>
      </tr>
    `;
  });
}

/* Filter buttons */
window.setFilter = (f)=>{
  currentFilter = f;
  document.querySelectorAll(".filters button")
    .forEach(b=>b.classList.remove("active"));
  event.target.classList.add("active");
  renderOrders();
};

/* View order */
window.viewOrder = async(id)=>{
  currentOrderId = id;
  const o = allOrders.find(x=>x.id===id);
  if(!o) return;

  let items = "";
  (o.items||[]).forEach(i=>{
    items += `${i.name} × ${i.qty}<br>`;
  });

  orderInfo.innerHTML = `
    <b>Order ID:</b> ${id}<br>
    <b>Total:</b> ₹${o.grandTotal||0}<br>
    <b>Status:</b> ${o.status}<br><br>
    <b>Items:</b><br>${items}
  `;

  statusSelect.value = o.status || "Placed";
  await loadPartners(o.partnerId);
  await loadDelivery(o.deliveryId);

  modal.style.display="block";
};

/* Load partners */
async function loadPartners(selected){
  const snap = await getDocs(collection(db,"partners"));
  partnerSelect.innerHTML = `<option value="">-- Select Partner --</option>`;
  snap.forEach(p=>{
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = p.data().name || "Partner";
    if(p.id===selected) opt.selected=true;
    partnerSelect.appendChild(opt);
  });
}

/* Load delivery */
async function loadDelivery(selected){
  const snap = await getDocs(collection(db,"delivery"));
  deliverySelect.innerHTML = `<option value="">-- Select Delivery --</option>`;
  snap.forEach(d=>{
    const opt = document.createElement("option");
    opt.value = d.id;
    opt.textContent = d.data().name || "Delivery";
    if(d.id===selected) opt.selected=true;
    deliverySelect.appendChild(opt);
  });
}

/* Save order */
window.saveOrder = async()=>{
  if(!currentOrderId) return;

  const data = { status: statusSelect.value };
  if(partnerSelect.value) data.partnerId = partnerSelect.value;
  if(deliverySelect.value) data.deliveryId = deliverySelect.value;

  await updateDoc(doc(db,"orders",currentOrderId), data);
  alert("Order updated");

  closeModal();
  loadOrders();
};

/* Close modal */
window.closeModal = ()=>{
  modal.style.display="none";
  currentOrderId=null;
};
