const router = require("express").Router();
const {
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
  registerUser,
  login,
} = require("./user.controller");
const { checkToken } = require("../../auth/token_validation");


router.get("/", checkToken, getUsers);
router.get("/:id", checkToken, getUserById);
router.put("/:id", checkToken, updateUser);
router.delete("/:id", checkToken, deleteUser);
router.post("/register", registerUser);
router.post("/login", login);
module.exports = router;
