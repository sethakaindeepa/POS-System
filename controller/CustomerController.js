import {addCustomerData, updateCustomerData,deleteCustomerData, getCustomerDataById, getCustomerData,getCustomerDataByIndex} from "../model/CustomerModel.js";
import {check_nic, check_contact} from '../utils/regex_utils.js';

//---------------------------Start: Customer Add (Create)--------------------------
$('#customer_save_btn').on('click',function (){
    let id = $ ('#customer_id_input').val();
    let name = $ ('#customer_name_input').val();
    let nic = $ ('#customer_nic_input').val();
    let contact = $ ('#customer_contact_input').val();
    let address = $ ('#customer_address_input').val();

    if (id === "") {
        return Swal.fire("Invalid Id");
    }
    else if (getCustomerDataById(id)) {
        return Swal.fire("ID already exists");
    }
    else if (name === "") {
        return Swal.fire("Invalid Name");
    }
    else if (!check_nic(nic)) {
        return Swal.fire("Invalid NIC");
    }
    else if (!check_contact(contact)){
        return Swal.fire("Invalid Contact");
    }
    else if (address === ""){
        return Swal.fire("Invalid Address");
    }

    else {
        addCustomerData(id, name, nic, contact, address);

        cleanCustomerForm();
        Swal.fire({icon: "success", title: "Customer saved successfully!"});
        loadCustomerTbl();
    }
})
//-----------------------------End: Customer Add -------------------------------------

//-----------------------------Start: Customer Update(Update)---------------------------------
$('#customer_update_btn').on('click', function () {
    let id = $('#customer_id_input').val();
    let name = $('#customer_name_input').val();
    let nic = $('#customer_nic_input').val();
    let contact = $('#customer_contact_input').val();
    let address = $('#customer_address_input').val();

    if (id === ""){
        return Swal.fire("Invalid Id");
    }
    else if (!getCustomerDataById(id)){
        return Swal.fire("Customer not found");
    }
    else if (name === "") {
        return Swal.fire("Invalid Name");
    }
    else if (!check_nic(nic)){
        return Swal.fire("Invalid NIC");
    }
    else if (!check_contact(contact)) {
        return Swal.fire("Invalid Contact");
    }
    else if (address === "") {
        return Swal.fire("Invalid Address");
    }
    else {
        updateCustomerData(id, name, nic, contact, address);

        cleanCustomerForm();
        Swal.fire({icon: "success", title: "Customer updated successfully!"});
        loadCustomerTbl();
    }
})
//-------------------------------End: Customer Update----------------------------------

//------------------------- Start: Student Delete (Delete) ------------------------------
$('#customer_delete_btn').on('click', function () {

    let id = $('#customer_id_input').val();


    if (id === "") {
        return Swal.fire({ icon: "error", title: "Invalid Id!" });
    }

    else if (!getCustomerDataById(id)) {
        return Swal.fire({ icon: "error", title: "Customer not found!" });
    }

    else {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {

            if (result.isConfirmed) {
                deleteCustomerData(id);

                cleanCustomerForm();
                loadCustomerTbl();

                Swal.fire({
                    icon: "success",
                    title: "Customer deleted successfully!"
                });
            }

        });
    }
});
//------------------------- End: Student Delete ------------------------------

//------------------------- Load Customer Tbl (Read) ------------------------------
const loadCustomerTbl = () => {
    $('#customer_tbody').empty();
    let customer_db = getCustomerData();
    customer_db.map((item, index) => {
        let new_row = `<tr data-index="${index}"> <td>${item.id}</td> <td>${item.name}</td> <td>${item.nic}</td> <td>${item.contact}</td> <td>${item.address}</td> </tr>`;
        $('#customer_tbody').append(new_row);
    });
}



//------------------------- Clean Customer Form ------------------------------
const cleanCustomerForm = () => {
    $('#customer_id_input').val("");
    $('#customer_name_input').val("");
    $('#customer_nic_input').val("");
    $('#customer_contact_input').val("");
    $('#customer_address_input').val("");
};

$('#customer_reset_btn').on('click', function () {
    cleanCustomerForm();
});


//------------------------- Click on Student Row ------------------------------
$('#customer_tbody').on('click', 'tr', function () {
    let customer_obj = getCustomerDataByIndex($(this).index());

    $('#customer_id_input').val(customer_obj.id);
    $('#customer_name_input').val(customer_obj.name);
    $('#customer_nic_input').val(customer_obj.nic);
    $('#customer_contact_input').val(customer_obj.contact);
    $('#customer_address_input').val(customer_obj.address);
})



