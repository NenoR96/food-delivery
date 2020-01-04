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


router.post('/cart', function (req, res, next) {
  console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
  /*console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { product, token } = req.body;

    const customer = stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const idempotency_key = uuid();
    const charge = stripe.charges.create(
      {
        amount: product * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the food`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotency_key
      }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }*/
});

module.exports = router;
