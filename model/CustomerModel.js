import {customer_db} from '../db/db.js';

class Customer {
    #id;
    #name;
    #nic;
    #contact;
    #address;

    constructor(id, name, nic, contact, address) {
        this.#id = id;
        this.#name = name;
        this.#nic = nic;
        this.#contact = contact;
        this.#address = address;
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get nic() {
        return this.#nic;
    }

    get contact() {
        return this.#contact;
    }

    get address() {
        return this.#address;
    }

    set id(id) {
        this.#id = id;
    }

    set name(name) {
        this.#name = name;
    }

    set nic(nic) {
        this.#nic = nic;
    }

    set contact(contact) {
        this.#contact = contact;
    }

    set address(address) {
        this.#address = address;
    }
}

// ------------------------- Add Customer -----------------------------------
const addCustomerData = (id, name, nic, contact, address) => {
   let new_customer = new Customer(id,name,nic,contact,address);
   customer_db.push(new_customer);
}

// -------------------------- Update Customer -------------------------------
const updateCustomerData= (id, name, nic, contact, address) => {
    let obj = customer_db.find(item => item.id == sid);

    if(obj) {
        obj.name=name;
        obj.nic=nic;
        obj.contact=contact;
        obj.address=address
    }
}

//-------------------------- Get Customer by ID ------------------------------
const getCustomerDataById = (id) => {
    return customer_db.find(item => item.id==id);
}

// --------------------------- Get Customer ---------------------------
const getCustomerData = () => {
    return customer_db;
}
export {addCustomerData,updateCustomerData,getCustomerData,getCustomerDataById};