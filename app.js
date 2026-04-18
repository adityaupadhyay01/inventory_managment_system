// 🔥 IMPORTS
import {
    showDashboardUI,
    showInventoryUI,
    showInsightsUI,
    sellProductUI,
    showExpiryUI,
    renderInventoryList,
    addProductUI
} from "./modules/inventory/inventory-ui.js";

import { auth } from "./firebase.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

console.log("App Started");


// 🔐 AUTH CONTROL
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("app").style.display = "block";

        showDashboardUI(); // 🔥 load dashboard after login
    } else {
        document.getElementById("loginPage").style.display = "block";
        document.getElementById("app").style.display = "none";
    }
});


// 🌐 LANGUAGE SYSTEM
window.currentLang = "en";

window.translations = {
    en: {
        dashboard: "Dashboard",
        totalProducts: "Total Products",
        totalItems: "Total Items",
        totalRevenue: "Total Revenue",

        stocks: "Stocks",
        insights: "Insights",
        profile: "Profile",
        language: "Language",

        addProduct: "Add Product",
        sellProduct: "Sell Product",
        showInventory: "Show Inventory",
        expiryAlerts: "Expiry Alerts",

        lowStock: "Low Stock",
        noLowStock: "No low stock items",

        noExpiry: "No expiry items",

        demand: "Demand Prediction",
        demandMsg: "Data not sufficient yet. System is learning...",

        suggestions: "Smart Suggestions",

        suggestionsList: [
            "Maintain optimal stock levels",
            "Track frequently sold items"
        ]
    },

    hi: {
        dashboard: "डैशबोर्ड",
        totalProducts: "कुल उत्पाद",
        totalItems: "कुल आइटम",
        totalRevenue: "कुल राजस्व",

        stocks: "स्टॉक्स",
        insights: "इनसाइट्स",
        profile: "प्रोफाइल",
        language: "भाषा",

        addProduct: "उत्पाद जोड़ें",
        sellProduct: "उत्पाद बेचें",
        showInventory: "इन्वेंट्री देखें",
        expiryAlerts: "एक्सपायरी अलर्ट",

        lowStock: "कम स्टॉक",
        noLowStock: "कोई कम स्टॉक आइटम नहीं",

        noExpiry: "कोई एक्सपायरी आइटम नहीं",

        demand: "मांग पूर्वानुमान",
        demandMsg: "पर्याप्त डेटा नहीं है। सिस्टम सीख रहा है...",

        suggestions: "स्मार्ट सुझाव",

        suggestionsList: [
            "उचित स्टॉक स्तर बनाए रखें",
            "ज्यादा बिकने वाले उत्पादों को ट्रैक करें"
        ]
    }
};


// UPDATE LANGUAGE
function updateLanguage(lang) {
    window.currentLang = lang;

    document.getElementById("langBtn").innerText = window.translations[lang].language;
    document.getElementById("navDashboard").innerText = window.translations[lang].dashboard;
    document.getElementById("navStocks").innerText = window.translations[lang].stocks;
    document.getElementById("navInsights").innerText = window.translations[lang].insights;
    document.getElementById("navProfile").innerText = window.translations[lang].profile;

    showDashboardUI();
}


// DOM READY
window.addEventListener("DOMContentLoaded", () => {

    // LOGIN
    const loginBtn = document.getElementById("loginBtn");
    const signupBtn = document.getElementById("signupBtn");

    loginBtn?.addEventListener("click", () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (!email || !password) {
            alert("Enter email and password");
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log("Login Success");
            })
            .catch(err => alert(err.message));
    });

    // SIGNUP
    signupBtn?.addEventListener("click", () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (!email || !password) {
            alert("Enter email and password");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert("Account Created ");
            })
            .catch(err => alert(err.message));
    });


    // NAVBAR
    document.getElementById("navDashboard")?.addEventListener("click", showDashboardUI);
    document.getElementById("navStocks")?.addEventListener("click", showInventoryUI);
    document.getElementById("navInsights")?.addEventListener("click", showInsightsUI);

    document.getElementById("navProfile")?.addEventListener("click", () => {
        document.getElementById("navProfile")?.addEventListener("click", () => {
    const user = auth.currentUser;

    document.getElementById("output").innerHTML = `
        <h2>Profile</h2>

        <p>Email: ${user?.email || "Unknown"}</p>

        <button id="logoutBtn">Logout</button>
    `;
});
    });


    // BUTTONS (EVENT DELEGATION)
    document.body.addEventListener("click", (e) => {

    if (e.target.id === "addBtn") addProductUI();

    if (e.target.id === "sellBtn") sellProductUI();

    if (e.target.id === "showInventoryBtn") renderInventoryList();

    if (e.target.id === "expiryBtn") showExpiryUI();

    if (e.target.id === "logoutBtn") {
        signOut(auth)
            .then(() => console.log("Logged out"))
            .catch(err => alert(err.message));
    }

});


    // LANGUAGE DROPDOWN
    const langBtn = document.getElementById("langBtn");
    const langMenu = document.getElementById("langMenu");

    langBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        langMenu.style.display =
            langMenu.style.display === "block" ? "none" : "block";
    });

    // TOAST
    function showToast(msg) {
        const toast = document.getElementById("toast");
        if (!toast) return;

        toast.innerText = msg;
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 2000);
    }

    // LANGUAGE CLICK
    document.querySelectorAll("#langMenu p").forEach(item => {
        item.addEventListener("click", () => {
            const lang = item.innerText.trim();

            if (lang === "English") {
                updateLanguage("en");
                showToast("English Selected");
            } 
            else if (lang === "Hindi") {
                updateLanguage("hi");
                showToast("हिंदी चयनित ");
            } 
            else {
                showToast("Coming Soon ");
            }

            langMenu.style.display = "none";
        });
    });

    // CLICK OUTSIDE CLOSE
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".top-lang")) {
            langMenu.style.display = "none";
        }
    });

});