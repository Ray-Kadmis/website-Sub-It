import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getAuth, signOut, onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBjHWNJQoT2PxmiQn-7wRl8Suxxbw9hR2w",
  authDomain: "sub-it-webapp.firebaseapp.com",
  databaseURL: "https://sub-it-webapp-default-rtdb.firebaseio.com",
  projectId: "sub-it-webapp",
  storageBucket: "sub-it-webapp.appspot.com",
  messagingSenderId: "66687798512",
  appId: "1:66687798512:web:99c6721c3e73210b324635",
  measurementId: "G-ZVVQHTGBRW",
  databaseURL:"https://sub-it-webapp-default-rtdb.firebaseio.com/"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

const loginBtn= document.getElementById("viewBtn1LogedOut");
const regBtn = document.getElementById("viewBtn2LogedOut");
const signOutBtn= document.getElementById("viewBtnLogedIn");
const userNav = document.getElementById("displayUsername");

const userSignOut = async()=>{
    signOut(auth).then(()=>{
        window.location.href="Home.html"
    })
    .catch((error)=>{})
}
onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      loginBtn.style.display = "none";
      regBtn.style.display = "none";
      signOutBtn.style.display = "inline";
      userNav.innerHTML= user.displayName;
    } else {
      // User is signed out
      loginBtn.style.display = "inline";
      regBtn.style.display = "inline";
      signOutBtn.style.display = "none";
    }
  });
  
signOutBtn.addEventListener("click", userSignOut);
signOutBtn.addEventListener("click", userSignOut);