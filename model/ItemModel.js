import {item_db} from '../db/db.js';

export function getAllItems() {
    return item_db;
}

export function addItem(item) {
    item_db.push(item);

}

export function updateItem(index, item) {
    item_db[index] = item;

}

export function deleteItem(index) {
    item_db.splice(index, 1);

}

