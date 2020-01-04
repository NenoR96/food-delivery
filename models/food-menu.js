let mongoose = require('mongoose');

let menuSchema = mongoose.Schema({
    name: { type: String, required: true },
    foodItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food' }]
});

let Menu = module.exports = mongoose.model('Menu', menuSchema);

module.exports.addFoodMenu = function(foodMenu, callback){
    foodMenu.save(callback);
}
