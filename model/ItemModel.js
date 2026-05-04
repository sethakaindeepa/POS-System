let items = JSON.parse(localStorage.getItem("items")) || [];

export function getAllItems() {
    return items;
}

export function addItem(item) {
    items.push(item);
    save();
}

export function updateItem(index, item) {
    items[index] = item;
    save();
}

export function deleteItem(index) {
    items.splice(index, 1);
    save();
}

function save() {
    localStorage.setItem("items", JSON.stringify(items));
}