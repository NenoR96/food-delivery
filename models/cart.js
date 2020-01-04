let mongoose = require('mongoose');

let cartSchema = mongoose.Schema({
    cost: { type: Number, required: true },
    adress: { type: String, required: false },
    phone: { type: Number, required: true },
    note: { size: String, required: false },
    foodItems: [],
    date:  { type: Date, required: true}
});

let Cart = module.exports = mongoose.model('Cart', cartSchema);

module.exports.addCartItem = function(CartItem, callback){
    CartItem.save(callback);
}

module.exports.getCartItemById = function(_id, callback){
    CartItem.findById(_id, callback);
}

module.exports.updateCartItem = function(_id, property, callback){
    //var query = { _id: id };
    console.log(_id, property);
    CartItem.findByIdAndUpdate(_id, property, callback);
}