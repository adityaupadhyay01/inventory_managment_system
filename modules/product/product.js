import { getData, saveData } from "../../utils/database.js";
import { generateId } from "../../utils/helpers.js";

export function addProduct(name, quantity, expiry) {
    const data = getData();

    const product = {
        id: generateId(),
        name,
        quantity: Number(quantity),
        expiry,
        sold: 0
    };

    data.push(product);
    saveData(data);
}