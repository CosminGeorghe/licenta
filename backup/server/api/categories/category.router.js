const router = require("express").Router();
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("./category.controller");
const { checkToken } = require("../../auth/token_validation");

router.post("/", checkToken, createCategory);
router.get("/", getCategories);
//router.get("/:id", checkToken, getCategoryById);
//router.put("/:id", checkToken, updateCategory);
//router.delete("/:id", checkToken, deleteCategory);
module.exports = router;
