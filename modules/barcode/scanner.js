let scanner = null;

export function startScannerForAdd() {

    const readerId = "reader";
    const readerElement = document.getElementById(readerId);

    // 🔥 Clear previous scanner if exists
    if (scanner) {
        scanner.stop().then(() => {
            scanner.clear();
        }).catch(() => {});
    }

    scanner = new Html5Qrcode(readerId);

    scanner.start(
        { facingMode: "environment" },
        {
            fps: 10,
            qrbox: 250
        },
        (decodedText) => {
            console.log("Scanned:", decodedText);

            const barcodeInput = document.getElementById("barcode");

            if (barcodeInput) {
                barcodeInput.value = decodedText;
            }

            stopScanner();
        },
        (errorMessage) => {
            // silent ignore (scanner keeps scanning)
        }
    ).catch(err => {
        console.error("Scanner error:", err);
        alert("Camera not working. Check permissions.");
    });
}

// 🔥 Reusable stop function
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

export function startScannerForSell() {

    const readerId = "reader";
    const readerElement = document.getElementById(readerId);

    if (scanner) {
        scanner.stop().then(() => {
            scanner.clear();
        }).catch(() => {});
    }

    scanner = new Html5Qrcode(readerId);

    scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
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