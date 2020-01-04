var express = require('express');
var router = express.Router();
var stripe = require("stripe")("sk_test_mR94JYXWuvJVZmH1TPTD2Iiv00qMRvMjZx");
const uuid = require("uuid/v4");

router.get('/', function (req, res, next) {
    return res.json(200);
});

router.post('/', async function (req, res, next) {
    console.log("Request:", req.body);

    let error;
    try {
      const { items, token } = req.body;
  
      const customer = await stripe.customers.create({
        email: token.email,
        source: token.id
      });

      console.log(customer.email, customer.id)
  
      const idempotency_key = uuid();
      const charge = await stripe.charges.create(
        {
          amount: items * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `Purchased food`,
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
    } catch (error) {
      console.error("Error:", error);
    }
});

module.exports = router;
