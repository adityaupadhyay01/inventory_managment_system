import { addProductUI } from "./modules/product/product-ui.js";
import * as inventoryUI from "./modules/inventory/inventory-ui.js";

document.addEventListener("DOMContentLoaded", () => {

    console.log("App Started");

    document.getElementById("addBtn")
        ?.addEventListener("click", addProductUI);

    document.getElementById("showBtn")
        ?.addEventListener("click", inventoryUI.showInventoryUI);

    document.getElementById("sellBtn")
        ?.addEventListener("click", inventoryUI.sellProductUI);

    document.getElementById("expiryBtn")
        ?.addEventListener("click", inventoryUI.showExpiryUI);

});