const router = require("express").Router();
const {
  createSubcategory,
  getSubcategories,
  updateSubcategory,
  deleteSubcategory,
} = require("./subcategory.controller");
const { checkToken } = require("../../auth/token_validation");

router.post("/", checkToken, createSubcategory);
router.get("/", getSubcategories);
router.put("/:id", checkToken, updateSubcategory);
router.delete("/:id", checkToken, deleteSubcategory);
module.exports = router;
