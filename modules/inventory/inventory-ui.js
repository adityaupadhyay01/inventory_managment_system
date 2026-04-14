import {
    getAllProducts,
    getExpiryProducts,
    getLowStockProducts,
    getDashboardData,
    deleteProduct,
    addToCart,
    getCart,
    checkout
} from "./inventory.js";

import { startScannerForSell, stopScanner, startScannerForAdd } from "../barcode/scanner.js";


// 🔹 DASHBOARD
export function showDashboardUI() {
    const stats = getDashboardData();

    const lang = window.currentLang || "en";
    const t = window.translations?.[lang] || {};

    document.getElementById("output").innerHTML = `
        <h2>${t.dashboard || "Dashboard"}</h2>
        <p>${t.totalProducts || "Total Products"}: ${stats.totalProducts}</p>
        <p>${t.totalItems || "Total Items"}: ${stats.totalItems}</p>
        <p>${t.totalRevenue || "Total Revenue"}: ₹${stats.totalRevenue}</p>
    `;
}


// 🔹 STOCKS PAGE
export function showInventoryUI() {
    const container = document.getElementById("output");

    const lang = window.currentLang || "en";
    const t = window.translations?.[lang] || {};

    container.innerHTML = `
        <h2>${t.stocks || "Stocks"} Management</h2>

        <div class="btn-group">
            <button id="addBtn">${t.addProduct || "Add Product"}</button>
            <button id="sellBtn">${t.sellProduct || "Sell Product"}</button>
            <button id="showInventoryBtn">${t.showInventory || "Show Inventory"}</button>
            <button id="expiryBtn">${t.expiryAlerts || "Expiry Alerts"}</button>
        </div>

        <hr>
        <div id="stockContent"></div>
    `;
}


// 🔹 ADD PRODUCT
export function addProductUI() {
    const content = document.getElementById("stockContent");

    content.innerHTML = `
        <h2>Add Product</h2>

        <input placeholder="Product Name" id="name" />
        <input placeholder="Barcode" id="barcode" />
        <input placeholder="Quantity" id="quantity" />
        <input placeholder="Price" id="price" />
        <input type="date" id="expiry" />

        <br><br>

        <button id="scanBtn">Scan Barcode</button>
        <button id="saveBtn">Save</button>

        <div id="reader"></div>
    `;

    document.getElementById("scanBtn").onclick = startScannerForAdd;
    document.getElementById("saveBtn").onclick = saveProduct;
}


// 🔹 SELL UI
export function sellProductUI() {
    const content = document.getElementById("stockContent");

    content.innerHTML = `
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


// 🔹 CART
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


// 🔹 INVENTORY LIST
export function renderInventoryList() {
    const content = document.getElementById("stockContent");
    const products = getAllProducts();

    if (products.length === 0) {
        content.innerHTML = "<p>No products added yet</p>";
        return;
    }

    let html = "<h3>Inventory List</h3>";

    products.forEach(p => {
        html += `
            <div>
                <p>${p.name} (Qty: ${p.quantity})</p>
                <button onclick="deleteItem('${p.barcode}')">Delete</button>
            </div>
        `;
    });

    content.innerHTML = html;
}


// 🔹 EXPIRY
export function showExpiryUI() {
    const content = document.getElementById("stockContent");
    const items = getExpiryProducts();

    if (items.length === 0) {
        content.innerHTML = "<p>No expiry products</p>";
        return;
    }

    let html = "<h3>Expiry Alerts</h3>";

    items.forEach(p => {
        html += `<p>${p.name} (Expiry: ${p.expiry})</p>`;
    });

    content.innerHTML = html;
}


// 🔹 INSIGHTS
export function showInsightsUI() {
    const low = getLowStockProducts();
    const exp = getExpiryProducts();

    const lang = window.currentLang || "en";
    const t = window.translations?.[lang] || {};

    let html = `<h2>${t.insights || "Insights"}</h2>`;

    // LOW STOCK
    html += `<h3>${t.lowStock || "Low Stock"}</h3>`;
    html += low.length === 0
        ? `<p>${t.noLowStock || "No low stock items"}</p>`
        : low.map(p => `<p>${p.name}</p>`).join("");

    // EXPIRY
    html += `<h3>${t.expiryAlerts || "Expiry Alerts"}</h3>`;
    html += exp.length === 0
        ? `<p>${t.noExpiry || "No expiry items"}</p>`
        : exp.map(p => `<p>${p.name}</p>`).join("");

    // DEMAND
    html += `
        <hr>
        <h3>${t.demand || "Demand Prediction"}</h3>
        <p style="color: gray;">${t.demandMsg || "Data not sufficient yet..."}</p>
    `;

    // SUGGESTIONS
    html += `<h3>${t.suggestions || "Smart Suggestions"}</h3>`;
    html += `<ul style="color: gray;">`;

    (t.suggestionsList || []).forEach(item => {
        html += `<li>${item}</li>`;
    });

    html += `</ul>`;

    document.getElementById("output").innerHTML = html;
}


// 🔹 DELETE
window.deleteItem = function(barcode) {
    deleteProduct(barcode);
    renderInventoryList();
};


// 🔹 SAVE PRODUCT
function saveProduct() {
    const name = document.getElementById("name").value;
    const barcode = document.getElementById("barcode").value;
    const quantity = parseInt(document.getElementById("quantity").value);
    const price = parseFloat(document.getElementById("price").value);
    const expiry = document.getElementById("expiry").value;

    if (!name || !barcode || !quantity) {
        alert("Fill all required fields");
        return;
    }

    const product = {
        name,
        barcode,
        quantity,
        price,
        expiry,
        sold: 0
    };

    const data = getAllProducts();
    data.push(product);
    localStorage.setItem("inventory", JSON.stringify(data));

    alert("Product Saved ");

    document.getElementById("name").value = "";
    document.getElementById("barcode").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("price").value = "";
}