import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

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
const provider= new GoogleAuthProvider();
const googleBtn = document.getElementById("googleBtn");

const googleSignIn = async()=>{
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;
    

    const userRef = doc(db, "authList", user.uid);
    await setDoc(userRef, { registeredUser: user.displayName });


    window.location.href = "Home.html";
  } catch (error) {
    
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Error during sign-in:", errorMessage);
  }
}



googleBtn.addEventListener("click", googleSignIn);

