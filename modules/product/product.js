import { getData, saveData } from "../../utils/database.js";

export function addProduct(name, barcode, quantity, price, expiry) {
    const data = getData();

    const product = {
        id: Date.now(),
        name,
        barcode,
        quantity: Number(quantity),
        price: Number(price),
        expiry,
        sold: 0
    };

    console.log("Saving Product:", product);

    data.push(product);
    saveData(data);
}