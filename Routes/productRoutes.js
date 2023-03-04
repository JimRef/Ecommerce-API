const express = require("express");
const router = express.Router();
const auth = require("../auth.js");
const productController = require("../Controllers/productController.js");

// [WITHOUT PARAMS]
// [Creating a Product]
router.post("/addproduct", auth.verify, productController.addProduct);
// [Getting all Product]
router.get("/allactiveproduct", productController.getAllActiveProduct);
// [Get all Product active or not active]
router.get("/allProduct", auth.verify, productController.retrieveAllProduct)



// [ROUTES With PARAMS]
// [Update product admin only]
router.put("/update/:productId", auth.verify, productController.updateProduct)
//[Getting one Product]
router.get("/singleproduct/:productId", productController.getOneProduct);
// [Archive a Product]
router.put("/archive/:productId", auth.verify, productController.archiveProduct)

module.exports = router;