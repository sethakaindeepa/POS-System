import { item_db, saveItems, loadFromStorage } from '../db/db.js';

loadFromStorage();

export function getAllItems() {
    return item_db;
}

export function addItem(item) {
    item_db.push(item);
    saveItems();
}

export function updateItem(code, updatedItem) {
    const index = item_db.findIndex(item => item.code === code);
    if (index !== -1) {
        item_db[index] = updatedItem;
        saveItems();
    }
}

export function deleteItem(index) {
    item_db.splice(index, 1);
    saveItems();
}

