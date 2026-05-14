

import {order_db} from '../db/db.js';

//------------------------ GET ALL ORDERS ----------------------------------------
export function getAllOrders() {
    return order_db;
}

//------------------------- Add Order ----------------------------------------------
export function addOrder(order) {
    order_db.push(order);

}

