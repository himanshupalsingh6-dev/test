import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

/* Firebase */
const firebaseConfig = {
  apiKey: "AIzaSyAWTOu3JBhg3JuZg6snAxhnf_XFhLhLkbc",
  authDomain: "quickpress-web.firebaseapp.com",
  projectId: "quickpress-web"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let allOrders = [];
let currentFilter = "all";

const table = document.getElementById("ordersTable");

/* Load orders */
async function loadOrders(){
  const snap = await getDocs(collection(db,"orders"));
  allOrders = [];

  snap.forEach(d=>{
    allOrders.push({ id:d.id, ...d.data() });
  });

  renderOrders();
}

function renderOrders(){
  table.innerHTML = "";
  const today = new Date().toISOString().slice(0,10);

  const filtered = allOrders.filter(o=>{
    if(currentFilter === "all") return true;

    if(currentFilter === "today"){
      if(!o.createdAt?.seconds) return false;
      const d = new Date(o.createdAt.seconds*1000)
                .toISOString().slice(0,10);
      return d === today;
    }

    if(currentFilter === "pending"){
      return o.status !== "Delivered";
    }

    return o.status === currentFilter;
  });

  if(filtered.length === 0){
    table.innerHTML = `<tr><td colspan="5">No orders found</td></tr>`;
    return;
  }

  filtered.forEach(o=>{
    const date = o.createdAt?.seconds
      ? new Date(o.createdAt.seconds*1000).toLocaleDateString()
      : "-";

    table.innerHTML += `
      <tr>
        <td>${o.id}</td>
        <td>₹${o.grandTotal || 0}</td>
        <td><span class="status ${o.status}">${o.status}</span></td>
        <td>${date}</td>
        <td>
          <button class="btn" onclick="viewOrder('${o.id}')">
            View
          </button>
        </td>
      </tr>
    `;
  });
}

/* Filter */
window.setFilter = (f)=>{
  currentFilter = f;
  document
    .querySelectorAll(".filters button")
    .forEach(b=>b.classList.remove("active"));
  event.target.classList.add("active");
  renderOrders();
};

/* View order (next step expand hoga) */
window.viewOrder = (id)=>{
  alert("Order detail popup next step me add karenge\nOrder ID: " + id);
};

loadOrders();
