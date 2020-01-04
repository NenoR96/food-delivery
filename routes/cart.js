var express = require('express');
var router = express.Router();

let CartItem = require("../models/cart");

router.get('/', function (req, res, next) {
  CartItem.find({}, function(err, carts) {
    if (err)
      return res.status(500).send("Server error!");
      carts.sort(function(a,b){
        return new Date(b.date) - new Date(a.date)
      })
    return res.json(carts);
  })
});

router.post('/', function (req, res, next) {
  var item = new CartItem(req.body);
  item.date = new Date();
  CartItem.addCartItem(item, function (err, item) {
    if (err) console.log(err)
    console.log(item);
  });
});

module.exports = router;
