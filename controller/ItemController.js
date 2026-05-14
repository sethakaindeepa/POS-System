import { getAllItems, addItem, updateItem, deleteItem } from "../model/ItemModel.js";

$(document).ready(function () {

    // ---------------- OPEN MODAL ----------------
    $('.add-btn').click(function () {
        $('#modal').show();
    });

    // ---------------- INITIAL RENDER ----------------
    render();
});

// ---------------- CLOSE MODAL ----------------
$('.close').click(() => {
    $('#modal').hide();
});

// ---------------- RESET FORM ----------------
$('#item_reset_btn').click(() => {
    $('#item-code-input,#item-name-input,#item-price-input,#item-qty-input,#index').val('');
});

// ---------------- SAVE / UPDATE ITEM ----------------
$('#item_save_btn').click(function () {

    let code = $('#item-code-input').val();
    let name = $('#item-name-input').val();
    let price = $('#item-price-input').val();
    let qty = $('#item-qty-input').val();

    // hidden field (stores old code when editing)
    let oldCode = $('#index').val();

    if (!code || !name || !price || !qty) {
        return Swal.fire({
            icon: "warning",
            title: "Missing Fields",
            text: "Please fill all fields!"
        });
    }

    let items = getAllItems();

    // ---------------- ADD NEW ITEM ----------------
    if (!oldCode) {

        let exists = items.some(item => item.code === code);

        if (exists) {
            return Swal.fire({
                icon: "error",
                title: "Duplicate ID",
                text: "This Item ID already exists!"
            });
        }

        addItem({ code, name, price, qty });

        Swal.fire({
            icon: "success",
            title: "Saved!",
            text: "Item added successfully",
            timer: 1500,
            showConfirmButton: false
        });

    }

    // ---------------- UPDATE ITEM ----------------
    else {

        updateItem(oldCode, { code, name, price, qty });

        Swal.fire({
            icon: "success",
            title: "Updated!",
            text: "Item updated successfully",
            timer: 1500,
            showConfirmButton: false
        });
    }

    render();

    $('#modal').hide();
    $('#item_reset_btn').click();
});


// ---------------- RENDER ITEMS ----------------
function render() {

    let items = getAllItems();

    $('.card-container').empty();
    $('#item_tbody').empty();

    items.forEach((item) => {

        $('.card-container').append(`
            <div class="card">
                <h5>${item.name}</h5>
                <p>Code: ${item.code}</p>
                <span class="price">LKR ${item.price}</span>
                <p>Stock: ${item.qty}</p>

                <div class="btn-group">
                    <button class="edit-btn btn btn-warning btn-sm" data-code="${item.code}">Edit</button>
                    <button class="delete-btn btn btn-danger btn-sm" data-code="${item.code}">Delete</button>
                </div>
            </div>
        `);

        $('#item_tbody').append(`
            <tr>
                <td>${item.code}</td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.qty}</td>
            </tr>
        `);
    });
}


// ---------------- EDIT ITEM ----------------
$('.card-container').on('click', '.edit-btn', function () {

    let code = $(this).data('code');

    let item = getAllItems().find(i => i.code === code);

    $('#item-code-input').val(item.code);
    $('#item-name-input').val(item.name);
    $('#item-price-input').val(item.price);
    $('#item-qty-input').val(item.qty);

    // store old code
    $('#index').val(item.code);

    $('#modal').show();
});


// ---------------- DELETE ITEM ----------------
$('.card-container').on('click', '.delete-btn', function () {

    let code = $(this).data('code');

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {

        if (result.isConfirmed) {
            deleteItem(code);
            render();
        }
    });
});