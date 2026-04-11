import { sellProduct, getExpiryProducts } from "./inventory.js";

export function sellProductUI() {
    const output = document.getElementById("output");

    output.innerHTML = `
        <h2>Sell Product</h2>
        <input id="sellName" placeholder="Product Name"><br>
        <button onclick="sellNow()">Sell</button>
    `;
}

window.sellNow = function() {
    const name = document.getElementById("sellName").value;
    sellProduct(name);
    alert("Sold!");
};

export function showExpiryUI() {
    const output = document.getElementById("output");

    const items = getExpiryProducts();

    let html = "<h2>Expiry Products</h2>";

    items.forEach(p => {
        html += `<p>${p.name} - Expiry: ${p.expiry}</p>`;
    });

    output.innerHTML = html;
}