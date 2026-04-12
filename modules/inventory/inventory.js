import { getData, saveData } from "../../utils/database.js";

let cart = [];

// ================= GET INVENTORY =================
export function getAllProducts() {
    return getData();
}

// ================= EXPIRY =================
export function getExpiryProducts() {
    const data = getData();
    const today = new Date();

    return data.filter(p => {
        const exp = new Date(p.expiry);
        const diff = (exp - today) / (1000 * 60 * 60 * 24);
        return diff <= 7;
    });
}

// ================= CART =================
export function addToCart(barcode) {
    const data = getData();

    const product = data.find(p => p.barcode === barcode);

    if (!product) {
        alert("Product not found");
        return;
    }

    const existing = cart.find(item => item.barcode === barcode);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    console.log("Cart:", cart);
}

// ================= GET CART =================
export function getCart() {
    return cart;
}

// ================= CHECKOUT =================
export function checkout() {
    const data = getData();

    cart.forEach(item => {
        const product = data.find(p => p.barcode === item.barcode);

        if (product && product.quantity >= item.qty) {
            product.quantity -= item.qty;
            product.sold += item.qty;
        }
    });

    saveData(data);
    cart = [];

    alert("Checkout Done ✅");
}