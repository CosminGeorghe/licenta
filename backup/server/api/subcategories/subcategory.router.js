const router = require("express").Router();
const {
  createProduct,
  getSubcategories,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("./subcategory.controller");
const { checkToken } = require("../../auth/token_validation");

//router.post("/", checkToken, createProduct);
router.get("/", getSubcategories);
//router.get("/:id", checkToken, getProductById);
//router.put("/:id", checkToken, updateProduct);
//router.delete("/:id", checkToken, deleteProduct);
module.exports = router;
