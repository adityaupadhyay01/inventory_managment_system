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

        if (lang === "English" || lang === "Hindi") {
            showToast(`${lang} Selected`);
        } else {
            showToast("Coming Soon");
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