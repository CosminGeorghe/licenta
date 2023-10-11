const router = require("express").Router();
const {
  addProductsToCart,
  getCartProducts,
  deleteProductsFromCart,
  updateProductQuantityById,
} = require("./cart.controller");

router.get("/:user_id/", getCartProducts);
router.get("/:user_id/:product_id/:quantity", updateProductQuantityById);
router.put("/:user_id", addProductsToCart);
router.delete("/:user_id", deleteProductsFromCart);
module.exports = router;
