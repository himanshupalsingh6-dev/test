import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth } from
"https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import {
  getFirestore, collection, addDoc, serverTimestamp
} from
"https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const app = initializeApp({
  apiKey: "AIzaSyAWTOu3JBhg3JuZg6snAxhnf_XFhLhLkbc",
  authDomain: "quickpress-web.firebaseapp.com",
  projectId: "quickpress-web"
});

const auth = getAuth(app);
const db = getFirestore(app);

window.place = async ()=>{
  await addDoc(collection(db,"orders"),{
    userId: auth.currentUser.uid,
    items:[{name:"Shirt",qty:2}],
    grandTotal:100,
    status:"Placed",
    createdAt: serverTimestamp()
  });
  location.href="myorders.html";
};
