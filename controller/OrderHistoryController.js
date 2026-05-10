import { getAllOrders } from "../model/OrderModel.js";

// ---------------- LOAD ORDER HISTORY ----------------
export function loadOrderHistory() {

    let orders = getAllOrders();

    $('#historyTableBody').empty();

    if (!orders || orders.length === 0) {

        $('#historyTableBody').append(`
            <tr>
                <td colspan="7" class="text-center">
                    No Orders Found
                </td>
            </tr>
        `);

        return;
    }

    orders.forEach((order, index) => {

        let itemNames = order.items
            .map(item => item.itemCode)
            .join(", ");

        let totalQty = order.items
            .reduce((sum, item) => sum + Number(item.qty), 0);

        $('#historyTableBody').append(`
            <tr>
                <td>${order.orderId}</td>
                <td>${order.customerName}</td>
                <td>${itemNames}</td>
                <td>${totalQty}</td>
                <td>LKR ${order.total}</td>
                <td>${order.date}</td>

                <td>
                    <button class="btn btn-primary btn-sm viewBtn"
                            data-index="${index}">
                        View
                    </button>
                </td>
            </tr>
        `);
    });
}

// ---------------- VIEW ORDER DETAILS ----------------
$(document).on('click', '.viewBtn', function () {

    let orders = getAllOrders();
    let order = orders[$(this).data('index')];

    if (!order) return;

    let rows = "";

    order.items.forEach(item => {

        rows += `
            <tr>
                <td>${item.itemCode}</td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.qty}</td>
                <td>${item.subtotal}</td>
            </tr>
        `;
    });

    Swal.fire({
        title: "Order Details",
        width: 800,
        html: `
            <div style="text-align:left">

                <p><strong>Order ID:</strong>
                ${order.orderId}</p>

                <p><strong>Customer:</strong>
                ${order.customerName}</p>

                <p><strong>Date:</strong>
                ${order.date}</p>

                <table class="table table-bordered text-center">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>

                    <tbody>
                        ${rows}
                    </tbody>
                </table>

                <h4 style="text-align:right">
                    Total: LKR ${order.total}
                </h4>
            </div>
        `
    });
});

// ---------------- INITIAL LOAD ----------------
$(document).ready(function () {
    loadOrderHistory();
});