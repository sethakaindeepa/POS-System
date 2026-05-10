// db.js
let customer_db = [];
let item_db = [];
let order_db = [];

// Load from localStorage when the app starts
const loadFromStorage = () => {
    const savedCustomers = localStorage.getItem('customers');
    const savedItems = localStorage.getItem('items');

    if (savedCustomers) customer_db = JSON.parse(savedCustomers);
    if (savedItems) item_db = JSON.parse(savedItems);
};

// Save to localStorage
const saveCustomers = () => {
    localStorage.setItem('customers', JSON.stringify(customer_db));
};

const saveItems = () => {
    localStorage.setItem('items', JSON.stringify(item_db));
};

export { customer_db, item_db,order_db, loadFromStorage, saveCustomers, saveItems };