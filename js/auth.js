import { createUserWithEmailAndPassword, signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

window.signup = function(){
  const e = email.value, p = password.value;
  createUserWithEmailAndPassword(auth, e, p)
    .then(()=> location.href="index.html")
    .catch(err=> alert(err.message));
}

window.login = function(){
  const e = email.value, p = password.value;
  signInWithEmailAndPassword(auth, e, p)
    .then(()=> location.href="index.html")
    .catch(err=> alert(err.message));
}
