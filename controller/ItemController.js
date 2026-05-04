import{getAllItems,addItem,updateItem,deleteItem} from "../model/ItemModel.js";

$(document).ready(function () {
    $('.add-btn').click(function () {
        $('#modal').show();
    });
});

$('.close').click(() => {
     $('#modal').hide();
});

$('#item_reset_btn').click(() => {
    $('#item-id-input,#item-name-input,#item-price-input,#item-qty-input,#index').val('');
});

// ----------------------------ITEM SAVE-----------------------------------------------
$('#item_save_btn').click(function (){

    let id = $('#item-id-input').val();
    let name = $('#item-name-input').val();
    let price = $('#item-price-input').val();
    let qty = $('#item-qty-input').val();
    let index = $('#index').val();

    if (!id || !name || !price || !qty) {
        return Swal.fire({
            icon: "warning",
            title: "Missing Fields",
            text: "Please fill all fields!"
        });
    }

    let item = {id,name,price,qty};

    if (index === "" || index === null) {

        addItem(item);

        Swal.fire({
            icon: "success",
            title: "Saved!",
            text: "Item added successfully",
            timer: 1500,
            showConfirmButton: false
        });

    } else{
        updateItem(index, item);

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

//---------------------------RENDER UI (CARDS + TABLE)--------------------------------

function render(){

    let items = getAllItems();

    $('.card-container').empty();
    $('#item_tbody').empty();

    items.forEach((item,i) =>{

        $('.card-container').append(`
    <div class="card">
        <h5>${item.name}</h5>
        <p>ID: ${item.id}</p>
        <span class="price">LKR ${item.price}</span>
        <p>Stock: ${item.qty}</p>

        <div class="btn-group">
            <button class="edit-btn btn btn-warning btn-sm" data-index="${i}">Edit</button>
            <button class="delete-btn btn btn-danger btn-sm" data-index="${i}">Delete</button>
        </div>
    </div>
`);

        $('#item_tbody').append(`
    <tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>${item.qty}</td>
    </tr>
`);
    });
}

//-------------------------------------EDIT ITEM --------------------------------------
$('.card-container').on('click','.edit-btn',function (){

    let index = $(this).data('index');
    let item = getAllItems()[index];

    $('#item-id-input').val(item.id);
    $('#item-name-input').val(item.name);
    $('#item-price-input').val(item.price);
    $('#item-qty-input').val(item.qty);
    $('#index').val(index);

    $('#modal').show();
});

//--------------------------------Start: Item Delete (Delete)----------------------------
$('.card-container').on('click','.delete-btn',function (){

    let index = $(this).data('index');

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
            deleteItem(index);
            render();
        }
    });
});

$(document).ready(function (){
    render();
});