import { getCustomerData } from "../model/CustomerModel.js";
import { getAllItems, updateItem } from "../model/ItemModel.js";
import { addOrder } from "../model/OrderModel.js";
import { loadOrderHistory } from "./OrderHistoryController.js";

let customers = [];
let items = [];
let cart = [];

//-------------------------INITIAL LOAD ----------------------------------
$(document).ready(function () {
    console.log(" Order Controller Loaded Successfully");
    loadData();
});

//-------------------------LOAD DATA ------------------------------------
function loadData() {
    cleanInvalidCustomers();

    customers = getCustomerData();
    items = getAllItems();

    loadCustomerIds();
    loadItemCodes();
}


function refreshDropdowns() {
    customers = getCustomerData();
    items = getAllItems();
    loadCustomerIds();
    loadItemCodes();
    console.log(" Dropdowns refreshed with latest data");
}

//--------------------------LOAD CUSTOMER IDS --------------------------------
function loadCustomerIds() {
    let menu = $('#customerDropdownMenu');
    menu.empty();
    menu.append(`<li><a class="dropdown-item" href="#" data-index="">Select Customer</a></li>`);

    customers.forEach((c, i) => {
        menu.append(`
            <li><a class="dropdown-item" href="#" data-index="${i}">${c.id} - ${c.name}</a></li>
        `);
    });
}

//--------------------------LOAD ITEM CODES ------------------------------------
function loadItemCodes() {
    let menu = $('#itemDropdownMenu');
    menu.empty();
    menu.append(`<li><a class="dropdown-item" href="#" data-index="">Select Item</a></li>`);

    items.forEach((item, i) => {
        menu.append(`
            <li><a class="dropdown-item" href="#" data-index="${i}">${item.code} - ${item.name}</a></li>
        `);
    });
}

//---------------------------- CUSTOMER SELECTION ----------------------------
$('#customerDropdownMenu').on('click', '.dropdown-item', function(e){
    e.preventDefault();
    let index = $(this).data('index');
    let text = $(this).text().trim();

    $('#customerDropdownBtn').text(text || 'Select Customer');

    if(index === "" || index == null){
        clearCustomerFields();
        $('#customerDropdownBtn').removeData('selected-id');
        return;
    }

    let customer = customers[index];
    if(customer){
        $('#customerDropdownBtn').data('selected-id', customer.id);
        $('#customerName').val(customer.name || '');
        $('#customerAddress').val(customer.address || '');
        $('#customerNIC').val(customer.nic || '');
        $('#customerContact').val(customer.contact || '');
    }
});

function clearCustomerFields() {
    $('#customerName, #customerAddress, #customerNIC, #customerContact').val('');
}

//------------------------------ ITEM SELECTION -------------------------
$('#itemDropdownMenu').on('click', '.dropdown-item', function(e){
    e.preventDefault();
    let index = $(this).data('index');
    let text = $(this).text().trim();

    $('#itemDropdownBtn').text(text || 'Select Item');

    if(index === "" || index == null){
        clearItemFields();
        $('#itemDropdownBtn').removeData('selected-code');
        return;
    }

    let item = items[index];
    if(item){
        $('#itemDropdownBtn').data('selected-code', item.code);
        $('#itemName').val(item.name || '');
        $('#price').val(item.price || '');
        $('#availableQty').val(item.qty || '');
    }
});

function clearItemFields() {
    $('#itemName, #price, #availableQty, #qty').val('');
}

//--------------------------ADD TO CART ----------------------------------
$('#addBtn').click(function () {
    let selectedCode = $('#itemDropdownBtn').data('selected-code');
    let qty = Number($('#qty').val());

    if (!selectedCode || qty <= 0) {
        return Swal.fire({ icon: "warning", title: "Invalid Input", text: "Select item and quantity!" });
    }

    let item = items.find(i => i.code === selectedCode);
    if (!item || qty > Number(item.qty)) {
        return Swal.fire({ icon: "error", title: "Stock Error", text: "Not enough stock!" });
    }

    let existing = cart.find(c => c.itemCode === selectedCode);
    if (existing) {
        if (existing.qty + qty > Number(item.qty)) return Swal.fire({ icon: "error", title: "Stock Error", text: "Exceeds stock!" });
        existing.qty += qty;
        existing.subtotal = existing.qty * existing.price;
    } else {
        cart.push({
            itemCode: item.code,
            name: item.name,
            price: Number(item.price),
            qty: qty,
            subtotal: Number(item.price) * qty
        });
    }

    renderCart();
    $('#qty').val('');
});

//--------------------------------------RENDER CART-----------------------------------
function renderCart() {
    $('#cartTable').empty();
    let total = 0;
    cart.forEach((item, index) => {
        total += item.subtotal;
        $('#cartTable').append(`
            <tr>
                <td>${item.itemCode}</td>
                <td>${item.price}</td>
                <td>${item.qty}</td>
                <td>${item.subtotal}</td>
                <td><button class="btn btn-danger btn-sm deleteBtn" data-index="${index}">Remove</button></td>
            </tr>
        `);
    });
    $('#total').text(total);
}

$('#cartTable').on('click', '.deleteBtn', function () {
    cart.splice($(this).data('index'), 1);
    renderCart();
});

//------------------------------------PLACE ORDER------------------------------------
$('#placeOrderBtn').click(function () {

    if (cart.length === 0) {
        return Swal.fire({ icon: "warning", title: "Cart Empty", text: "Please add items to cart!" });
    }

    let customerId = $('#customerDropdownBtn').data('selected-id');

    if (!customerId) {
        return Swal.fire({ icon: "warning", title: "No Customer", text: "Please select a customer!" });
    }

    let customer = customers.find(c => c.id === customerId);

    let order = {
        orderId: "ORD-" + Date.now(),
        date: new Date().toLocaleString(),
        customerId: customer.id,
        customerName: customer.name,
        items: [...cart],
        total: Number($('#total').text())
    };

    addOrder(order);
    loadOrderHistory();

    cart.forEach(cartItem => {
        let item = items.find(i => i.code === cartItem.itemCode);
        if (item) {
            item.qty -= cartItem.qty;
            updateItem(item.code, item);
        }
    });

    showOrderSummary(order);
    resetCustomerSelection();

    cart = [];
    renderCart();
    $('#resetItemBtn').click();
    refreshDropdowns();
});

//--------------------------SHOW ORDER SUMMARY -------------------------------
function showOrderSummary(order) {
    let rows = "";

    order.items.forEach(item => {
        rows += `
            <tr>
                <td>${item.itemCode}</td>
                <td>${item.price}</td>
                <td>${item.qty}</td>
                <td>${item.subtotal}</td>
            </tr>
        `;
    });

    Swal.fire({
        title: "Order Summary",
        width: 700,
        html: `
            <div style="text-align:left">
                <p><b>Order ID:</b> ${order.orderId}</p>
                <p><b>Date:</b> ${order.date}</p>
                <p><b>Customer:</b> ${order.customerName}</p>
                <table class="table table-bordered text-center">
                    <thead>
                        <tr>
                            <th>Item Code</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
                <h4 style="text-align:right">Total: LKR ${order.total}</h4>
            </div>
        `
    });
}


$('#resetItemBtn').click(function () {
    $('#itemDropdownBtn').text('Select Item').removeData('selected-code');
    clearItemFields();
});

$('#resetCartBtn').click(function () {
    cart = [];
    renderCart();
    $('#total').text('0');
});


function cleanInvalidCustomers() {
    let customers = getCustomerData();


    let validCustomers = customers.filter(c =>
        c &&
        c.id != null &&
        c.name &&
        c.name.trim() !== "" &&
        c.name !== "undefined"
    );

    console.log(` Cleaned ${customers.length - validCustomers.length} invalid customers`);


    localStorage.setItem('customers', JSON.stringify(validCustomers));


    refreshDropdowns();

    return validCustomers;
}

// ====================== RESET CUSTOMER AFTER ORDER ======================
function resetCustomerSelection() {

    $('#customerDropdownBtn')
        .text('Select Customer')
        .removeData('selected-id');


    $('#customerName').val('');
    $('#customerAddress').val('');
    $('#customerNIC').val('');
    $('#customerContact').val('');

    console.log(" Customer selection reset after order");
}

window.addEventListener('refreshOrderDropdowns', refreshDropdowns);

window.addEventListener('customerUpdated', refreshDropdowns);
window.addEventListener('itemUpdated', refreshDropdowns);