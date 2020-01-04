var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    return res.json(200);
});

module.exports = router;
