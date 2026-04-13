import { 
    getAllProducts, 
    getExpiryProducts, 
    getCart, 
    checkout, 
    deleteProduct 
} from "./inventory.js";

import { startScannerForSell, stopScanner } from "../barcode/scanner.js";

const getContainer = () => document.getElementById("output");


// ================= SELL (SCAN + CART) =================
export function sellProductUI() {
    const container = getContainer();

    container.innerHTML = `
        <h2>Sell Product (Scan to Add)</h2>

        <button id="scanBtn">Start Scanning</button>
        <button id="stopScanBtn">Stop Scan</button>
        <button id="viewCartBtn">View Cart</button>

        <div id="reader" style="margin-top:10px;"></div>
        <div id="cartList"></div>
    `;

    document.getElementById("scanBtn").onclick = startScannerForSell;
    document.getElementById("stopScanBtn").onclick = stopScanner;
    document.getElementById("viewCartBtn").onclick = renderCart;
}


// ================= CART UI =================
function renderCart() {
    const cart = getCart();
    const cartDiv = document.getElementById("cartList");

    if (cart.length === 0) {
        cartDiv.innerHTML = "<p>Cart is empty</p>";
        return;
    }

    let html = "<h3>Cart Items</h3>";

    cart.forEach((item, index) => {
        html += `<p>${index + 1}. ${item.name} (x${item.qty})</p>`;
    });

    html += `<button id="checkoutBtn">Checkout</button>`;

    cartDiv.innerHTML = html;

    document.getElementById("checkoutBtn").onclick = () => {
        checkout();
        renderCart();
    };
}


// ================= INVENTORY =================
export function showInventoryUI() {
    const container = getContainer();
    const products = getAllProducts();

    if (products.length === 0) {
        container.innerHTML = "<p>No products added yet</p>";
        return;
    }

    let html = "<h2>Inventory List</h2>";

    products.forEach(p => {
        html += `
            <div style="border:1px solid #ccc; padding:10px; margin:5px;">
                <p><b>Name:</b> ${p.name}</p>
                <p><b>Quantity:</b> ${p.quantity}</p>
                <p><b>Price:</b> ₹${p.price || 0}</p>
                <p><b>Expiry:</b> ${p.expiry}</p>

                <button onclick="deleteItem('${p.barcode}')">Delete</button>
            </div>
        `;
    });

    container.innerHTML = html;
}


// ================= DELETE HANDLER =================
window.deleteItem = function(barcode) {
    deleteProduct(barcode);
    showInventoryUI(); // refresh
};


// ================= EXPIRY =================
export function showExpiryUI() {
    const container = getContainer();
    const items = getExpiryProducts();

    if (items.length === 0) {
        container.innerHTML = "<p>No expiry products</p>";
        return;
    }

    let html = "<h2>Expiry Products</h2>";

    items.forEach(p => {
        html += `
            <div style="border:2px solid red; padding:10px; margin:5px;">
                <p><b>${p.name}</b></p>
                <p>Expiry: ${p.expiry}</p>
            </div>
        `;
    });

    container.innerHTML = html;
}