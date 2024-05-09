import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

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
const auth = getAuth(app);



const loginUser = () => {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {
            const user = userCredential.user;
            let ref = doc(db, "authList/" + user.uid);
            const docSnap = await getDoc(ref);

           if (docSnap.exists()) {
            // Store user information in sessionStorage
            localStorage.setItem("user-info", JSON.stringify({
                registeredUser: docSnap.data().registeredUser
            }));
        }
                localStorage.setItem("user-creds" , JSON.stringify(user));
                window.location.href = "home.html";
        })

        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("login failed:", errorCode, errorMessage);
            window.alert(errorMessage);
        });
};
document.getElementById("loginForm").addEventListener("submit", loginUser);
document.getElementById("loginBtn").addEventListener("click", loginUser);

