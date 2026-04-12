import { addToCart } from "../inventory/inventory.js";

let scanner = null;


// ================= COMMON SCANNER START =================
function startScanner(callback) {
    const readerId = "reader";

    // stop previous scanner if running
    if (scanner) {
        scanner.stop().then(() => scanner.clear()).catch(() => {});
    }

    scanner = new Html5Qrcode(readerId);

    scanner.start(
        { facingMode: "environment" },
        {
            fps: 15,
            qrbox: 250
        },
        callback,
        (error) => {
            // ignore scan errors (normal behavior)
        }
    ).catch(err => {
        console.error("Scanner error:", err);
        alert("Camera error / permission issue");
    });
}


// ================= STOP SCANNER =================
export function stopScanner() {
    if (scanner) {
        scanner.stop()
            .then(() => {
                scanner.clear();
                scanner = null;
            })
            .catch(() => {});
    }
}


// ================= ADD PRODUCT SCANNER =================
async function fetchProductDetails(barcode) {
    try {
        const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
        const data = await res.json();

        if (data.status === 1) {
            const product = data.product;

            const nameInput = document.getElementById("name");

            if (nameInput) {
                nameInput.value = product.product_name || "";
            }

            console.log("Auto-filled:", product.product_name);
        }
    } catch (err) {
        console.log("API error:", err);
    }
}

export function startScannerForAdd() {
    startScanner(async (decodedText) => {
        console.log("Scanned (ADD):", decodedText);

        const barcodeInput = document.getElementById("barcode");

        if (barcodeInput) {
            barcodeInput.value = decodedText;
        }

        await fetchProductDetails(decodedText);

        stopScanner(); // single scan for add
    });
}


// ================= SELL SCANNER (CART MODE) =================
export function startScannerForSell() {
    startScanner((decodedText) => {
        console.log("Scanned (SELL):", decodedText);

        addToCart(decodedText);

        alert("Added to cart ✅");

        // 🔥 DON'T STOP → allow multiple scans
    });
}