import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

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



const register = () => {

    const email = document.getElementById("regemail").value;
    const password = document.getElementById("regpassword").value;
    const username = document.getElementById("regusername").value;
    createUserWithEmailAndPassword(auth, email, password, username)
        .then(async (userCredential) => {
            const user = userCredential.user;
            user.displayName = username;
            let ref = doc(db, "authList/" + user.uid);
            await setDoc(ref, { registeredUser: username });
            window.location.href = "login.html";
        })

        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Registration failed:", errorCode, errorMessage);
            window.alert(errorMessage);
        });
};
document.getElementById("registrationForm").addEventListener("submit", register);
document.getElementById("submitBtn").addEventListener("click", register);















/* references


const userInp = document.getElementById("username");
const passInp = document.getElementById("password");
const email = document.getElementById("email");
const submitBtn = document.getElementById("submitBtn");

/* Validation

function Validation() {
    if (!Validation()) {
        return;
    };
    let nameregex = /^[a-zA-Z\s]+$/;
    let emailregex = /^[a-zA-Z0-9]+@(gmail yahoo|outlook)\.com$/;
    let userregex = /^[a-zA-Z0-9]{5,}$/;
    if (!nameregex.test(name.value)) {
        alert("the name should only contain alphabets!");
        return false;
    }

    if (!emailregex.test(email.value)) {
        alert("enter a valid email");
        return false;
    }

    if (!userregex.test(username.value)) {
        alert("-username can only be alphanumeric\n-username must be aleast 5 characters\n-username cannot contain spaces");
        return false;
    }
    return true;
}

/*User Registeration

function RegisterUser() {

    Validation();
    const dbRef = ref(db);
    get(child(dbRef, "UserList/" + username.value)).then((snapshot) => {
        if (snapshot.exists()) {
            alert("Account Already Exists");
        }
        else {
            set(ref(db, "UserList/" + username.value),
                {
                    username: userInp.value,
                    email: email.value,
                    password: passInp.value,
                }).then(() => {
                    alert("user added succesfully");
                })
                .catch((error) => {
                    alert("error" + error);
                })
        }
    })
}

/*Assign
submit.addEventListener('click', RegisterUser);
*/