import { startScannerForAdd } from "../barcode/scanner.js";

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

import { startScannerForSell, stopScanner } from "../barcode/scanner.js";


// 🔹 DASHBOARD
export function showDashboardUI() {
    const stats = getDashboardData();

    document.getElementById("output").innerHTML = `
        <h2>Dashboard</h2>
        <p>Total Products: ${stats.totalProducts}</p>
        <p>Total Items: ${stats.totalItems}</p>
        <p>Total Revenue: ₹${stats.totalRevenue}</p>
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


// 🔹 STOCKS PAGE
export function showInventoryUI() {
    const container = document.getElementById("output");

    container.innerHTML = `
        <h2>Stocks Management</h2>

        <button id="addBtn">Add Product</button>
        <button id="sellBtn">Sell Product</button>
        <button id="showInventoryBtn">Show Inventory</button>
        <button id="expiryBtn">Expiry Alerts</button>

        <hr>

        <div id="stockContent"></div>
    `;
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


// 🔹 INVENTORY
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

    let html = "<h2>Insights</h2>";

    // 🔻 LOW STOCK
    html += "<h3> Low Stock</h3>";
    if (low.length === 0) {
        html += "<p>No low stock items</p>";
    } else {
        low.forEach(p => html += `<p>${p.name}</p>`);
    }

    // 🔻 EXPIRY
    html += "<h3> Expiry Alerts</h3>";
    if (exp.length === 0) {
        html += "<p>No expiry items</p>";
    } else {
        exp.forEach(p => html += `<p>${p.name}</p>`);
    }

    // DEMAND PREDICTION (SMART PLACEHOLDER)
    html += `
        <hr>
        <h3>Demand Prediction</h3>
        <p style="color: gray;">
            Data not sufficient yet. System is learning from sales patterns...
        </p>
    `;

    // SMART SUGGESTIONS
    html += `
        <h3> Smart Suggestions</h3>
        <ul style="color: gray;">
            <li>Maintain optimal stock levels to avoid sudden shortages</li>
            <li>Track frequently sold items for better restocking decisions</li>
            <li>Use the system daily to improve prediction accuracy</li>
            <li>Ensure product data is updated regularly</li>
        </ul>
    `;


    document.getElementById("output").innerHTML = html;
}


// 🔹 DELETE
window.deleteItem = function(barcode) {
    deleteProduct(barcode);
    renderInventoryList();
};

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

    // SAVE TO DATABASE
    const data = getAllProducts();
    data.push(product);
    localStorage.setItem("inventory", JSON.stringify(data));

    alert("Product Saved ");

    // optional: reset form
    document.getElementById("name").value = "";
    document.getElementById("barcode").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("price").value = "";
}