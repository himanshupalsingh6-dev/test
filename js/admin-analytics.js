import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {
  getFirestore, collection, getDocs
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAWTOu3JBhg3JuZg6snAxhnf_XFhLhLkbc",
  authDomain: "quickpress-web.firebaseapp.com",
  projectId: "quickpress-web"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* Elements */
const totalCustomersEl = document.getElementById("totalCustomers");
const totalPartnersEl = document.getElementById("totalPartners");
const totalDeliveryEl = document.getElementById("totalDelivery");
const totalOrdersEl = document.getElementById("totalOrders");
const totalRevenueEl = document.getElementById("totalRevenue");

/* Fetch counts */
async function loadCounts(){
  const usersSnap = await getDocs(collection(db,"users"));
  const partnersSnap = await getDocs(collection(db,"partners"));
  const deliverySnap = await getDocs(collection(db,"delivery"));
  const ordersSnap = await getDocs(collection(db,"orders"));

  totalCustomersEl.innerText = usersSnap.size;
  totalPartnersEl.innerText = partnersSnap.size;
  totalDeliveryEl.innerText = deliverySnap.size;
  totalOrdersEl.innerText = ordersSnap.size;

  let revenue = 0;
  ordersSnap.forEach(d=>{
    revenue += Number(d.data().grandTotal) || 0;
  });
  totalRevenueEl.innerText = revenue;

  buildCharts(ordersSnap);
}

/* Charts */
function buildCharts(ordersSnap){
  let statusCount = {
    Placed:0, Assigned:0, Accepted:0, Ready:0, Picked:0, Delivered:0
  };

  let revenueByDay = {};

  ordersSnap.forEach(d=>{
    const o = d.data();
    if(statusCount[o.status] !== undefined){
      statusCount[o.status]++;
    }

    let dateKey = "Today";
    if(o.createdAt?.seconds){
      dateKey = new Date(o.createdAt.seconds*1000).toLocaleDateString();
    }

    revenueByDay[dateKey] = (revenueByDay[dateKey] || 0) + (Number(o.grandTotal) || 0);
  });

  const ordersCtx = document.getElementById("ordersChart").getContext("2d");
  new Chart(ordersCtx,{
    type:"pie",
    data:{
      labels:Object.keys(statusCount),
      datasets:[{
        data:Object.values(statusCount),
        backgroundColor:["#3498db","#9b59b6","#f1c40f","#e67e22","#1abc9c","#2ecc71"]
      }]
    }
  });

  const revCtx = document.getElementById("revenueChart").getContext("2d");
  new Chart(revCtx,{
    type:"line",
    data:{
      labels:Object.keys(revenueByDay),
      datasets:[{
        label:"Revenue",
        data:Object.values(revenueByDay),
        borderColor:"#ff9800",
        fill:false,
        tension:0.3
      }]
    },
    options:{
      scales:{ y:{ beginAtZero:true } }
    }
  });
}

loadCounts();
