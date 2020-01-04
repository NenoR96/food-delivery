var express = require('express');
var router = express.Router();
let FoodItem = require("../models/food-item");

router.get('/', function(req, res, next) {
  FoodItem.find({}, function(err, menus) {
    if (err)
      return res.status(500).send("Server error!");
    return res.status(200).json(menus);
  }); 
});

router.get('/:id', function(req, res, next) {
  FoodItem.findById(req.params.id, function(err, item) {
    if (err)
      return res.status(500).send("Server error!");
    return res.status(200).json(item);
  });
});

router.post('/edit', function(req, res, next) {
  var item = new FoodItem(req.body);
  FoodItem.addFoodItem(item._id, item, function(err, item) {
  })
});

router.delete('/delete', function(req, res, next) {
  console.log(req.params, req.body);
  console.log(item);
  FoodItem.deleteOne( { "_id" : req.body.id }, function(err, item) {
    if (err)
      return res.status(500).send("Server error!");    
  })
});
module.exports = router;
