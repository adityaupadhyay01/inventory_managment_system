import { getData, saveData } from "../../utils/database.js";

export function addProduct(name, barcode, quantity, expiry) {
    const data = getData();

    const product = {
        id: Date.now(),
        name,
        barcode,
        quantity: Number(quantity),
        expiry,
        sold: 0
    };

    data.push(product);
    saveData(data);

    console.log("DATA SAVED:", data);
}