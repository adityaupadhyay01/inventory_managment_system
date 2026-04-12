import { addProduct } from "./product.js";
import { startScannerForAdd } from "../barcode/scanner.js";

export function addProductUI() {
    const container = document.getElementById("output");

    container.innerHTML = `
        <h2>Add Product</h2>

        <input id="name" placeholder="Product Name"><br>
        <input id="barcode" placeholder="Barcode"><br>
        <input id="qty" placeholder="Quantity"><br>
        <input id="exp" type="date"><br>

        <button id="scanBtn">Scan Barcode</button>
        <button id="saveBtn">Save</button>

        <div id="reader"></div>
    `;

    // 🔥 EVENT DELEGATION (IMPORTANT FIX)
    container.onclick = (e) => {

        // SAVE
        if (e.target.id === "saveBtn") {
            console.log("SAVE CLICKED 🔥");

            const name = document.getElementById("name").value;
            const barcode = document.getElementById("barcode").value;
            const qty = document.getElementById("qty").value;
            const exp = document.getElementById("exp").value;

            console.log(name, barcode, qty, exp);

            if (!name || !barcode || !qty || !exp) {
                alert("Fill all fields");
                return;
            }

            addProduct(name, barcode, qty, exp);
            alert("Product Added ✅");
        }

        // SCAN
        if (e.target.id === "scanBtn") {
            startScannerForAdd();
        }
    };
}