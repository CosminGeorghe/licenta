const router = require("express").Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("./product.controller");
const { checkToken } = require("../../auth/token_validation");

//router.post("/", checkToken, createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
//router.put("/:id", checkToken, updateProduct);
//router.delete("/:id", checkToken, deleteProduct);
module.exports = router;
