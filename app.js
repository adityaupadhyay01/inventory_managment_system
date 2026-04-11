import { addProductUI } from "./modules/product/product-ui.js";
import { sellProductUI, showExpiryUI } from "./modules/inventory/inventory-ui.js";

document.getElementById("addBtn").addEventListener("click", addProductUI);
document.getElementById("sellBtn").addEventListener("click", sellProductUI);
document.getElementById("expiryBtn").addEventListener("click", showExpiryUI);

console.log("App Started");