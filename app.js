import {
    showDashboardUI,
    showInventoryUI,
    showInsightsUI,
    sellProductUI,
    showExpiryUI,
    renderInventoryList,
    addProductUI
} from "./modules/inventory/inventory-ui.js";

console.log("App Started");

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
function updateLanguage(lang) {
    window.currentLang = lang;

    document.getElementById("langBtn").innerText = translations[lang].language;
    document.getElementById("navDashboard").innerText = translations[lang].dashboard;
    document.getElementById("navStocks").innerText = translations[lang].stocks;
    document.getElementById("navInsights").innerText = translations[lang].insights;
    document.getElementById("navProfile").innerText = translations[lang].profile;
    showDashboardUI();
}

// NAVBAR
document.getElementById("navDashboard")?.addEventListener("click", showDashboardUI);
document.getElementById("navStocks")?.addEventListener("click", showInventoryUI);
document.getElementById("navInsights")?.addEventListener("click", showInsightsUI);

document.getElementById("navProfile")?.addEventListener("click", () => {
    document.getElementById("output").innerHTML = "<h2>Profile Coming Soon</h2>";
});

// BUTTONS (event delegation)
document.body.addEventListener("click", (e) => {

    if (e.target.id === "addBtn") {
        addProductUI();
    }

    if (e.target.id === "showBtn") {
        showInventoryUI();
    }

    if (e.target.id === "sellBtn") {
        sellProductUI();
    }

    if (e.target.id === "showInventoryBtn") {   
        renderInventoryList();
    }

    if (e.target.id === "expiryBtn") {
        showExpiryUI();
    }

});

showDashboardUI(); 

window.addEventListener("DOMContentLoaded", () => {
    const langBtn = document.getElementById("langBtn");
    const langMenu = document.getElementById("langMenu");

    if (!langBtn || !langMenu) return;

    // TOGGLE MENU
    langBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        langMenu.style.display =
            langMenu.style.display === "block" ? "none" : "block";
    });

    // TOAST FUNCTION
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