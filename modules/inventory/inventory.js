import { getData, saveData } from "../../utils/database.js";

let cart = [];

// GET INVENTORY
export function getAllProducts() {
    return getData();
}

// EXPIRY
export function getExpiryProducts() {
    const data = getData();
    const today = new Date();

    return data.filter(p => {
        const exp = new Date(p.expiry);
        const diff = (exp - today) / (1000 * 60 * 60 * 24);
        return diff <= 7;
    });
}

// ADD TO CART
export function addToCart(barcode) {
    const data = getData();

    const product = data.find(p => p.barcode === barcode);

    if (!product) {
        alert("Product not found");
        return;
    }

    if (product.quantity <= 0) {
        alert("Out of stock");
        return;
    }

    const existing = cart.find(item => item.barcode === barcode);

    if (existing) {
        // Prevent exceeding stock
        if (existing.qty < product.quantity) {
            existing.qty += 1;
        } else {
            alert("Max stock reached");
        }
    } else {
        cart.push({
            ...product,
            qty: 1
        });
    }

    console.log("Cart:", cart);
}

// GET CART 
export function getCart() {
    return cart;
}

// TOTAL BILL
export function getCartTotal() {
    let total = 0;

    cart.forEach(item => {
        total += (item.price || 0) * item.qty;
    });

    return total;
}

// CHECKOUT 
export function checkout() {
    const data = getData();

    for (let item of cart) {
        const product = data.find(p => p.barcode === item.barcode);

        if (!product) continue;

        if (product.quantity < item.qty) {
            alert(`Not enough stock for ${item.name}`);
            return; 
        }
    }

    // Safe deduction
    cart.forEach(item => {
        const product = data.find(p => p.barcode === item.barcode);

        product.quantity -= item.qty;
        product.sold += item.qty;
    });

    saveData(data);

    // Show bill before clearing
    const total = getCartTotal();

    cart = [];

    alert(`Checkout Done \nTotal Bill: ₹${total}`);
}

//delete

export function deleteProduct(barcode) {
    let data = getData();

    const product = data.find(p => p.barcode === barcode);

    if (!product) {
        alert("Product not found");
        return;
    }

    const confirmDelete = confirm(`Delete ${product.name}?`);

    if (!confirmDelete) return;

    data = data.filter(p => p.barcode !== barcode);

    saveData(data);

    alert("Product deleted");
}

export function getLowStockProducts() {
    const data = getData();
    return data.filter(p => p.quantity <= 5);
}

export function getDashboardData() {
    const data = getData();

    let totalProducts = data.length;
    let totalItems = 0;
    let totalRevenue = 0;

    data.forEach(p => {
        totalItems += p.quantity;
        totalRevenue += (p.price || 0) * (p.sold || 0);
    });

    return { totalProducts, totalItems, totalRevenue };
}