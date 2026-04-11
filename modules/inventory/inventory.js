import { getData, saveData } from "../../utils/database.js";

export function sellProduct(name) {
    const data = getData();

    const product = data.find(
        p => p.name.toLowerCase() === name.toLowerCase()
    );

    if (!product) {
        alert("Product not found");
        return;
    }

    if (product.quantity <= 0) {
        alert("Out of stock");
        return;
    }

    product.quantity -= 1;
    product.sold += 1;

    saveData(data);
}

export function getAllProducts() {
    return getData();
}

export function getExpiryProducts() {
    const data = getData();
    const today = new Date();

    return data.filter(p => {
        const exp = new Date(p.expiry);
        const diff = (exp - today) / (1000 * 60 * 60 * 24);
        return diff <= 7;
    });
}