const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cart.controllers.js");
const cartControllers = new CartController(); 
const authMiddleware = require("../middleware/authmiddleware.js");

router.use(authMiddleware)

router.post("/", cartControllers.newCart);
router.get("/:cid", cartControllers.getProductsFromCart);
router.post("/:cid/product/:pid", cartControllers.addProductToCart);
router.delete('/:cid/product/:pid', cartControllers.removeProductFromCart);
router.put('/:cid', cartControllers.updateProductsInCart);
router.put('/:cid/product/:pid', cartControllers.updateQuantity);
router.delete('/:cid', cartControllers.emptyCart);
router.post("/:cid/purchase", cartControllers.finalizePurchase)

module.exports = router;
