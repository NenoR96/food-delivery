var express = require('express');
var router = express.Router();
let FoodMenu = require("../models/food-menu");

router.get('/', function(req, res, next) {
  FoodMenu.find({}, function(err, menus) {
    if (err)
      return res.status(500).send("Server error!");
    return res.json(menus);
  }); 
});

router.post('/add', function(req, res, next) {
  let menu = new FoodMenu();
  menu.name = req.body.name;
  FoodMenu.addFoodMenu(menu, (err) => {
    if (err)
      return res.status(500).send("Server error!");
    return res.status(201).send("Apartment saved!");
  });
});

module.exports = router;
