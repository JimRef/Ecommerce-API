const express = require("express");
const router = express.Router();
const auth = require("../auth.js");
const cartController = require("../Controllers/addtocartController.js");

router.post("/:productId", auth.verify, cartController.addToCart)

module.exports = router;