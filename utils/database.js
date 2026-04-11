const KEY = "inventory";

export function getData() {
    return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function saveData(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
}