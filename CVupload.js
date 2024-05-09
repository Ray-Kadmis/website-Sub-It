import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, set, get, ref, child, update } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getStorage, ref as storageRef, getDownloadURL, uploadBytesResumable } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const storage = getStorage();


var FileUrl;
var files = [];
const cvEmail = document.getElementById("cvEmail")
const cvFullName = document.getElementById("cvFullName")
const cvCountryCode = document.getElementById("cvCountryCode")
const cvCurrentJob = document.getElementById("cvCurrentJob")
const cvContactNumber = document.getElementById("cvContactNumber")
const cvBasePay = document.getElementById("cvBasePay")
const cvExperience = document.getElementById("cvExperience")
const cvSkillSet = document.getElementById("cvSkillSet")
const cvLocation = document.getElementById("cvLocation")
const cvStreet = document.getElementById("cvStreet")
const cvCity = document.getElementById("cvCity")
const cvState = document.getElementById("cvState")
const cvCountrySel = document.getElementById("cvCountrySel")
const uploadOthers = document.getElementById("uploadOthers")
const cvFile = document.getElementById("cvFile")
const cvSubmit = document.getElementById("cvSubmit")
var upload1 = document.getElementById("uploadBtn1")

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

document.getElementById("uploadBtn1").addEventListener("click", openFileManager);

function openFileManager() {
    // Create a hidden file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/pdf'; // Allow only PDF files
    input.style.display = 'none';

    // Add change event listener to handle file selection
    input.addEventListener('change', handleFileSelect);

    // Trigger click event on the input element to open the file manager
    input.click();
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    const userId = auth.currentUser.uid; // Obtain the userID

    if (file) {
        // Rename the file with userID
        const renamedFile = new File([file], `${userId}.pdf`, { type: file.type });

        // Display the selected file
        document.getElementById("selectedFile").textContent = renamedFile.name;

        // Upload the renamed file
        uploadFile(renamedFile);
    } else {
        console.error("No file selected.");
    }
}

function uploadFile(file) {
    const uploadTask = uploadBytesResumable(storageRef(storage, file.name), file);

    // Update progress bar during the upload
    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            // Update the UI to display upload progress
            document.getElementById("progressBar").style.width = progress + "%";
        },
        (error) => {
            console.error("Upload failed: ", error);
        },
        () => {
            // Upload complete, get download URL
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
                // Now you can do something with the download URL, such as storing it in the database
                saveDownloadURL(downloadURL);
            }).catch((error) => {
                console.error("Error getting download URL: ", error);
            });
        }
    );
}

function saveDownloadURL(downloadURL) {
    userId;
    const updates = {};
    updates["/CV of users/${userId}/job information/CV"] = downloadURL;

    // Update the database
     update(ref(db), updates).then(() => {
        console.log("Download URL stored in database successfully!");
        
    }).catch((error) => {
        console.error("Error storing download URL in database: ", error);
    });
    
}
const saveCv = (event, downloadURL) => {
    event.preventDefault(); // Prevent the default form submission
    const user = auth.currentUser; // Get the currently signed-in user
    if (user) {
        const userId = user.uid;

        const Contact_Information = {
            Email: cvEmail.value,
            Contact_Number: cvContactNumber.value,
            Country_Code: cvCountryCode.value,
        };
        const User_Information = {
            Full_Name: cvFullName.value,

        };
        const Job_Location_Information = {
            Location: cvLocation.value,
            Street: cvStreet.value,
            City: cvCity.value,
            State: cvState.value,
            Country: cvCountrySel.value,
        };
        
        const job_information = {
            Current_Job: cvCurrentJob.value,
            Base_Pay: cvBasePay.value,
            Experience: cvExperience.value,
            Skill_Set: cvSkillSet.value,
            Others: "",
            CV: "Copy user id in storage to find CV"
            
        };
        const updates = {};
        updates['/CV of users/' + userId + '/Contact Information'] = Contact_Information;
        updates['/CV of users/' + userId + '/User Information'] = User_Information;
        updates['/CV of users/' + userId + '/Job Location Information'] = Job_Location_Information;
        updates['/CV of users/' + userId + '/job information'] = job_information;
        // Save data to Firebase Realtime Database
        update(ref(db), updates)
        
        .then(() => {
            console.log("Data saved successfully!");
            window.location.href = "YourRequestHasBeenReceivedSuccessfully.html";
        })
        .catch((error) => {
            console.error("Error saving data: ", error);
        });
        
    } else {
        console.error("No user is currently authenticated.");
        // Handle the case where no user is authenticated, such as redirecting to a login page or displaying an error message.
    }
    
    
};

document.getElementById("cvSubmit").addEventListener("submit", saveCv);
document.getElementById("cvSubmit").addEventListener("click", saveCv);
