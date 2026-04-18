// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

 const firebaseConfig = {
    apiKey: "AIzaSyCSIeWkpxijw9ZNlO5Kh7am8M93hdspU9Q",
    authDomain: "inventorymanagmentsystem-bd777.firebaseapp.com",
    projectId: "inventorymanagmentsystem-bd777",
    storageBucket: "inventorymanagmentsystem-bd777.firebasestorage.app",
    messagingSenderId: "965259579885",
    appId: "1:965259579885:web:e24f19fac24306058597e4",
    measurementId: "G-RB860LL4W1"
  };
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);