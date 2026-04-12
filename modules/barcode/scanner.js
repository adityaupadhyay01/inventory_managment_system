let scanner = null;

// 🔥 API FETCH FUNCTION
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

            console.log("Product Found:", product.product_name);
        } else {
            console.log("Product not found in API");
        }
    } catch (err) {
        console.error("API error:", err);
    }
}

// 🔥 ADD SCANNER
export function startScannerForAdd() {

    const readerId = "reader";

    if (scanner) {
        scanner.stop().then(() => {
            scanner.clear();
        }).catch(() => {});
    }

    scanner = new Html5Qrcode(readerId);

    scanner.start(
        { facingMode: "environment" },
        {
            fps: 15,
            qrbox: 250
        },
        async (decodedText) => {
            console.log("Scanned:", decodedText);

            const barcodeInput = document.getElementById("barcode");

            if (barcodeInput) {
                barcodeInput.value = decodedText;
            }

            // 🔥 AUTO FETCH PRODUCT
            await fetchProductDetails(decodedText);

            stopScanner();
        }
    ).catch(err => {
        console.error("Scanner error:", err);
        alert("Camera not working. Check permissions.");
    });
}

// 🔥 STOP FUNCTION
export function stopScanner() {
    if (scanner) {
        scanner.stop()
            .then(() => {
                scanner.clear();
                scanner = null;
            })
            .catch(err => console.log("Stop error:", err));
    }
}

// 🔥 SELL SCANNER
export function startScannerForSell() {

    const readerId = "reader";

    if (scanner) {
        scanner.stop().then(() => {
            scanner.clear();
        }).catch(() => {});
    }

    scanner = new Html5Qrcode(readerId);

    scanner.start(
        { facingMode: "environment" },
        {
            fps: 15,
            qrbox: 250
        },
        (decodedText) => {
            console.log("Scanned:", decodedText);

            const input = document.getElementById("sellBarcode");

            if (input) {
                input.value = decodedText;
            }

            stopScanner();
        }
    ).catch(err => {
        console.error("Scanner error:", err);
        alert("Camera not working");
    });
}