import { addProduct } from "./product.js";
import { startScannerForAdd } from "../barcode/scanner.js";

export function addProductUI() {
    const container = document.getElementById("output");

    container.innerHTML = `
        <h2>Add Product</h2>

        <input id="name" placeholder="Product Name"><br>
        <input id="barcode" placeholder="Barcode"><br>
        <input id="qty" placeholder="Quantity"><br>
        <input id="price" placeholder="Price"><br>
        <input id="exp" type="date"><br>

        <button id="scanBtn">Scan Barcode</button>
        <button id="saveBtn">Save</button>

        <div id="reader"></div>
    `;

    // EVENT DELEGATION (IMPORTANT FIX)
    container.onclick = (e) => {

        // SAVE
        if (e.target.id === "saveBtn") {
    console.log("SAVE CLICKED");

    const name = document.getElementById("name").value;
    const barcode = document.getElementById("barcode").value;
    const qty = document.getElementById("qty").value;
    const price = document.getElementById("price").value;
    const exp = document.getElementById("exp").value;

    console.log(name, barcode, qty, price, exp);

    if (!name || !barcode || !qty || !price || !exp) {
        alert("Fill all fields");
        return;
    }

    addProduct(name, barcode, qty, price, exp);

    alert("Product Added");
}

        // SCAN
        if (e.target.id === "scanBtn") {
            startScannerForAdd();
        }
    };
}

export async function fetchProductDetails(barcode) {
    try {
        const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
        const data = await res.json();

        const nameInput = document.getElementById("name");
        if (!nameInput) return;

        if (data.status === 1) {
            nameInput.value = data.product.product_name || "Unknown Product";
        } else {
            // 🔥 NO ALERT
            nameInput.value = "";
            nameInput.placeholder = "Enter manually";
        }

    } catch (err) {
        console.log(err);

        const nameInput = document.getElementById("name");
        if (nameInput) {
            nameInput.value = "";
            nameInput.placeholder = "Enter manually";
        }
    }
}