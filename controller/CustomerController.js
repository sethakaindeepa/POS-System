import {addCustomerData, updateCustomerData, getCustomerDataById, getCustomerData} from "../model/CustomerModel.js";
import {check_nic, check_contact} from '../utils/regex_utils.js';

//---------------------------Start: Customer Add (Create)--------------------------
$('#customer_save_btn').on('click',function (){
    let id = $ ('#customer_id_input').val();
    let name = $ ('#customer_name_input').val();
    let nic = $ ('#customer_nic_input').val();
    let contact = $ ('#customer_contact_input').val();
    let address = $ ('#customer_address_input').val();

    (id === "") ? Swal.fire({ icon: "error", title: "Invalid Id!"}) :
        (getCustomerDataById(id)) ? Swal.fire({ icon: "error", title: "Id is already exist!"}) :
            (name === "") ? Swal.fire({ icon: "error", title: "Invalid Name!"}) :
                (!check_nic(nic)) ? Swal.fire({ icon: "error", title: "Invalid NIC!"}) :
                    (!check_contact(contact)) ? Swal.fire({ icon: "error", title: "Invalid Contact!"}) :
                        (address === "") ? Swal.fire({ icon: "error", title: "Invalid Address!"}) : addCustomerData(id, name, nic, contact, address);

    Swal.fire({ icon: "success", title: "Customer saved successfully!"});
    loadCustomerTbl();
})
//-----------------------------End: Customer Add -------------------------------------

//-----------------------------Start: Customer Update(Update)---------------------------------
$('#customer_update_btn').on('click', function () {
    let id = $('#customer_id_input').val();
    let name = $('#customer_name_input').val();
    let nic = $('#customer_nic_input').val();
    let phone = $('#customer_contact_input').val();
    let address = $('#customer_address_input').val();

    (id === "") ? Swal.fire({ icon: "error", title: "Invalid Id!"}) :
        (!(getCustomerDataById(id))) ? Swal.fire({ icon: "error", title: "Student not found!"}) :
            (name === "") ? Swal.fire({ icon: "error", title: "Invalid Name!"}) :
                (!check_nic(nic)) ? Swal.fire({ icon: "error", title: "Invalid NIC!"}) :
                    (!check_phone(phone)) ? Swal.fire({ icon: "error", title: "Invalid Contact!"}) :
                        (address === "") ? Swal.fire({ icon: "error", title: "Invalid Address!"}) : updateCustomerData(id, name, nic, phone, address);


    Swal.fire({ icon: "success", title: "Customer updated successfully!"});
    loadCustomerTbl();

})
//-------------------------------End: Customer Update----------------------------------

//------------------------- Load Customer Tbl (Read) ------------------------------
const loadCustomerTbl = () => {
    $('#customer_tbody').empty();
    let customer_db = getCustomerData();
    customer_db.map((item, index) => {
        let new_row = `<tr data-index="${index}"> <td>${item.id}</td> <td>${item.name}</td> <td>${item.nic}</td> <td>${item.contact}</td> <td>${item.address}</td> </tr>`;
        $('#customer_tbody').append(new_row);
    });
}


