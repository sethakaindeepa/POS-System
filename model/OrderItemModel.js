export class OrderItem{

    constructor(itemId,name, price, qty){
        this.itemId = itemId;
        this.name = name;
        this.price = parseFloat(price);
        this.qty = parseInt(qty);

        this.subtotal = this.price * this.qty;
    }
}