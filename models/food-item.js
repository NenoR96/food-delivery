let mongoose = require('mongoose');

let foodSchema = mongoose.Schema({
    name: { type: String, required: true },
    ingredients: [{ type: String, required: false }],
    price: { type: Number, required: true },
    portions: [{ size: String, price: Number }],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }
});

let Food = module.exports = mongoose.model('Food', foodSchema);

module.exports.addFoodItem = function(foodItem, callback){
    foodItem.save(callback);
}

module.exports.getFoodItemById = function(_id, callback){
    foodItem.findById(_id, callback);
}

module.exports.updateFoodItem = function(_id, property, callback){
    //var query = { _id: id };
    console.log(_id, property);
    foodItem.findByIdAndUpdate(_id, property, callback);
}