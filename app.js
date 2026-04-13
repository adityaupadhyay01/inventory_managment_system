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