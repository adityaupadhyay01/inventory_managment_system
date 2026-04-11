import { addProduct } from "./product.js";

export function addProductUI() {
    const output = document.getElementById("output");

    output.innerHTML = `
        <h2>Add Product</h2>
        <input id="name" placeholder="Product Name"><br>
        <input id="qty" placeholder="Quantity"><br>
        <input id="exp" type="date"><br>
        <button onclick="saveProduct()">Save</button>
    `;
}

window.saveProduct = function() {
    const name = document.getElementById("name").value;
    const qty = document.getElementById("qty").value;
    const exp = document.getElementById("exp").value;

    addProduct(name, qty, exp);
    alert("Product Added");
};