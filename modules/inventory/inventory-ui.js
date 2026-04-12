import { getAllProducts, sellProduct, getExpiryProducts } from "./inventory.js";

const getContainer = () => document.getElementById("output");

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
                <p><b>Expiry:</b> ${p.expiry}</p>
            </div>
        `;
    });

    container.innerHTML = html;
}

export function sellProductUI() {
    const container = getContainer();

    container.innerHTML = `
        <h2>Sell Product</h2>
        <input id="sellName" placeholder="Product Name">
        <button id="sellNowBtn">Sell</button>
    `;

    document.getElementById("sellNowBtn").addEventListener("click", () => {
        const name = document.getElementById("sellName").value;
        sellProduct(name);
        alert("Sold!");
    });
}

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
            <div style="border:1px solid red; padding:10px; margin:5px;">
                <p><b>${p.name}</b></p>
                <p>Expiry: ${p.expiry}</p>
            </div>
        `;
    });

    container.innerHTML = html;
}