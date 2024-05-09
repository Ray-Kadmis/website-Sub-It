const register = () => {
const email = document.getElementById("email").value
const password = document.getElementById("password").value

console.log(email, password);
}

/*
        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
        import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";

        import { getFirestore, ref, get, child, set } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore-compat.js";

        const firebaseConfig = {
            apiKey: "AIzaSyCBubhLzDBZmwXAcjC_3laV9i9sw2OxpH0",
            authDomain: "sub-it-1825b.firebaseapp.com",
            projectId: "sub-it-1825b",
            storageBucket: "sub-it-1825b.appspot.com",
            messagingSenderId: "1082992891122",
            appId: "1:1082992891122:web:696de41adf3809773f6c6b",
            measurementId: "G-YH3BBNM56V"
        };

        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
        const db = firebase.firestore();

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