import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, set, get, ref, child, update } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

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
const db = getDatabase(app);
const auth = getAuth();


const jobForm = document.getElementById("JobForm")
const JobName = document.getElementById("jobName")
const endDate = document.getElementById("endDate")
const allDay = document.getElementById("allDay")
const startTime = document.getElementById("startTime")
const endTime = document.getElementById("endTime")
const typeOfJob = document.getElementById("typeOfJob")
const staffNumber = document.getElementById("staffNumber")
const address = document.getElementById("addressLine")
const city = document.getElementById("city")
const state = document.getElementById("state")
const zip = document.getElementById("zip")
const countrySel = document.getElementById("countrySel")
const jobTitle = document.getElementById("jobTitle")
const XPstart = document.getElementById("XPstart")
const XPend = document.getElementById("XPend")
const tempStatus = document.getElementById("tempStatus")
const jobDescription = document.getElementById("jobDescription")
const contactName = document.getElementById("contactName")
const contactEmail = document.getElementById("contactEmail")
const countryCode = document.getElementById("countryCode")
const phoneNumber = document.getElementById("phoneNumber")
const companyName = document.getElementById("companyName")
const startDate = document.getElementById("startDate")
const submit = document.getElementById("submit")


onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        const userId = user.uid;
        // You can now safely access user properties and perform authenticated actions
    } else {
        // No user is signed in
        console.error("No user is currently authenticated.");
    }
});
const SaveJobPost = (event) => {
    event.preventDefault(); // Prevent the default form submission
    const user = auth.currentUser; // Get the currently signed-in user
    if (user) {
        const userId = user.uid;

            const durationData = {
                endDate: endDate.value,
                allDay: allDay.value,
                startTime: startTime.value,
                endTime: endTime.value,
                typeOfJob: typeOfJob.value
            };
            const basicInfoData = {
                staffNumber: staffNumber.value,
                address: address.value,
                city: city.value,
                state: state.value,
                zip: zip.value,
                countrySel: countrySel.value,
                jobTitle: jobTitle.value,
                XPstart: XPstart.value,
                XPend: XPend.value,
                tempStatus: tempStatus.value,
                jobDescription: jobDescription.value
            };
            const contactData = {
                contactName: contactName.value,
                contactEmail: contactEmail.value,
                countryCode: countryCode.value,
                phoneNumber: phoneNumber.value,
                companyName: companyName.value
            };
            const updates = {};
            updates['/jobpostusers/' + userId + '/basicInfo'] = basicInfoData;
            updates['/jobpostusers/' + userId + '/contact'] = contactData;
            updates['/jobpostusers/' + userId + '/duration'] = durationData;
    
            // Save data to Firebase Realtime Database
            update(ref(db), updates)

                .then(() => {
                    console.log("Data saved successfully!");
                })
                .catch((error) => {
                    console.error("Error saving data: ", error);
                });
        
    } else {
        console.error("No user is currently authenticated.");
        // Handle the case where no user is authenticated, such as redirecting to a login page or displaying an error message.
    }
    
    
};


document.getElementById("JobForm").addEventListener("submit", SaveJobPost);
document.getElementById("submit").addEventListener("click", SaveJobPost);

