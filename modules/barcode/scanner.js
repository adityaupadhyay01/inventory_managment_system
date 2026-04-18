import { addToCart } from "../inventory/inventory.js";
import { fetchProductDetails } from "../product/product-ui.js";

let scanner = null;
let isScanning = false;

// 🔒 scan control
let lastValidScan = "";
let scanLock = false;

// ================= START SCANNER =================
async function startScanner(callback, singleScan = false) {
    const readerId = "reader";
    const reader = document.getElementById(readerId);

    if (!reader) {
        console.error("Reader element not found");
        return;
    }

    reader.style.display = "block";
    reader.innerHTML = "";

    // stop previous
    if (scanner && isScanning) {
        try {
            await scanner.stop();
            await scanner.clear();
        } catch (e) {
            console.warn("Stop error:", e);
        }
        scanner = null;
        isScanning = false;
    }

    scanner = new Html5Qrcode(readerId);

    try {
        const devices = await Html5Qrcode.getCameras();

        if (!devices.length) {
            alert("No camera found ❌");
            return;
        }

        const backCam = devices.find(d =>
            d.label.toLowerCase().includes("back")
        );

        const cameraId = backCam ? backCam.id : devices[0].id;

        await new Promise(r => setTimeout(r, 100));

        await scanner.start(
            cameraId,
            {
                fps: 5, // 🔥 stability over speed
                qrbox: { width: 200, height: 200 },
                aspectRatio: 1.0
            },
            async (decodedText) => {

                if (!isScanning) return;

                // 🚫 ignore invalid scans
                if (!/^\d{8,13}$/.test(decodedText)) return;

                // 🚫 prevent duplicate spam
                if (scanLock && decodedText === lastValidScan) return;

                scanLock = true;
                lastValidScan = decodedText;

                setTimeout(() => {
                    scanLock = false;
                }, 1200);

                try {
                    await callback(decodedText);
                } catch (err) {
                    console.error("Callback error:", err);
                }

                if (singleScan) {
                    await stopScanner();
                }
            },
            () => {}
        );

        isScanning = true;

    } catch (err) {
        console.error("Camera error:", err);
        alert("Camera not opening ❌");
        reader.style.display = "none";
    }
}

// ================= STOP =================
export async function stopScanner() {
    if (scanner && isScanning) {
        try {
            await scanner.stop();
            await scanner.clear();
        } catch (e) {
            console.warn("Stop error:", e);
        }
    }

    scanner = null;
    isScanning = false;

    const reader = document.getElementById("reader");
    if (reader) {
        reader.innerHTML = "";
        reader.style.display = "none";
    }
}

// ================= ADD PRODUCT =================
export function startScannerForAdd() {
    startScanner((code) => {

        const barcodeInput = document.getElementById("barcode");
        const nameInput = document.getElementById("name");

        if (barcodeInput) barcodeInput.value = code;
        if (nameInput) nameInput.value = "Fetching...";

        // async API (non-blocking)
        fetchProductDetails(code)
            .then(() => showScanToast("Product Loaded ✅"))
            .catch(() => {
                if (nameInput) {
                    nameInput.value = "";
                    nameInput.placeholder = "Enter manually";
                }
                showScanToast("Not Found ❌");
            });

    }, true);
}

// ================= SELL PRODUCT =================
export function startScannerForSell() {
    startScanner((code) => {
        addToCart(code);
        showScanToast("Added to cart ✅");
    }, false);
}

// ================= TOAST =================
let toastTimeout = null;

function showScanToast(msg) {
    let toast = document.getElementById("scanToast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "scanToast";
        document.body.appendChild(toast);
    }

    if (toastTimeout) clearTimeout(toastTimeout);

    toast.innerText = msg;
    toast.classList.remove("show");

    void toast.offsetWidth;

    toast.classList.add("show");

    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 1000);
}