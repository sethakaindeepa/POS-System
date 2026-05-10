

let order_db = JSON.parse(localStorage.getItem("orders")) || [];

//------------------------ GET ALL ORDERS ----------------------------------------
export function getAllOrders() {
    return order_db;
}

//------------------------- Add Order ----------------------------------------------
export function addOrder(order) {
    order_db.push(order);
    save();
}

//-------------------------- Save to Local Storage ----------------------------------
function save() {
    localStorage.setItem("orders", JSON.stringify(order_db));
}