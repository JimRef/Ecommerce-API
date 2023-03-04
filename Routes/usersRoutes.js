const express = require("express")
const router = express.Router();
const userController = require("../Controllers/userController.js");
// const productController = require("../Controllers/productController.js");
const auth = require("../auth.js");


// [Routes withour params]

// [Registration]
router.post("/register", userController.userRegister);
// [User authentication]
router.post("/login", userController.userAuthentication);
// [User Details]
router.get("/details", auth.verify, userController.getUserProfile);


// [Routes with params]

// [Set user as Admin]
router.patch("/:userId", auth.verify, userController.setAsAdmin)





module.exports = router;