const express = require("express");
const router = express.Router();
const auth = require("../auth.js");
const orderController = require("../Controllers/orderController.js");


// [Without Params]

// [Retrive authenticated user]
router.get("/retrieveorder", auth.verify, orderController.retrieveOrder)
// [Retrieve all orders admin only]
router.get("/retrieveallorder", auth.verify, orderController.retrieveAllOrder)

// [With PARAMS]

// [Create Order]
router.post("/:productId", auth.verify, orderController.createOrder);

module.exports = router;