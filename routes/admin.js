var express = require('express');
var router = express.Router();
let FoodMenu = require("../models/food-menu");
let FoodItem = require("../models/food-item");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("hej");
});

router.post('/food-menu/add', function(req, res, next) {
  let menu = new FoodMenu();
  menu.name = req.body.name;
  FoodMenu.addFoodMenu(menu, (err) => {
    if (err)
      return res.status(500).send("Server error!");
    //obavestavamo korisnika da je sacuvavanje uspesno
    return res.status(201).send("Apartment saved!");
  });
});


router.post('/food-item/add', function(req, res, next) {
  let item = new FoodItem();
  console.log(req.body);
  item.name = req.body.name;
  item.price = req.body.price;
  item.ingredients = req.body.ingredients;
  item.category = req.body.category;
  item.portions = req.body.portions;
 //item = req.body;  console.log(item);

  FoodItem.addFoodItem(item, (err) => {
    if (err)
      return console.log(err), res.status(500).send("Server error!");
    //obavestavamo korisnika da je sacuvavanje uspesno
    return res.status(201).send("Apartment saved!");
  });
});

module.exports = router;
