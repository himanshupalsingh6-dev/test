import { db, auth } from "./firebase.js";
import { collection, addDoc, serverTimestamp } from
"https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

window.placeOrder = async () => {
  const user = auth.currentUser;
  if(!user) return alert("Login required");

  const cart = JSON.parse(localStorage.getItem("cart"))||[];
  const address = addr.value;

  await addDoc(collection(db,"orders"),{
    userId:user.uid,
    cart, address,
    status:"PLACED",
    payment:"COD",
    createdAt:serverTimestamp()
  });

  localStorage.removeItem("cart");
  alert("Order placed");
  location.href="index.html";
};
