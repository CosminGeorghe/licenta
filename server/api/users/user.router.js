const router = require("express").Router();
const {
  addUser,
  getUserById,
  getUsers,
  getUserAccountDetails,
  getAdressAccountDetails,
  updateUserAccountDetails,
  updateUserAddressDetails,
  updateUser,
  deleteUser,
  updatePasswordUser,
  updatePasswordAdmin,
  resetPassword,
  registerUser,
  login,
} = require("./user.controller");
const {
  checkToken,
  checkTokenAndIsSameUserOrIsAdmin,
  checkTokenAndIsAdmin,
} = require("../../auth/token_validation");

router.get("/", checkTokenAndIsAdmin, getUsers);
router.post("/", checkTokenAndIsAdmin, addUser)
//router.get("/:id", checkToken, getUserById);
router.get("/:id/account_info", checkTokenAndIsSameUserOrIsAdmin, getUserAccountDetails);
router.get("/:id/account_address", checkTokenAndIsSameUserOrIsAdmin, getAdressAccountDetails);
//router.post("/check-same-password/:id", checkToken, checkSamePassword)
router.put("/:id", checkTokenAndIsSameUserOrIsAdmin, updateUser);
router.put("/:id/account_info", checkTokenAndIsSameUserOrIsAdmin, updateUserAccountDetails);
router.put("/:id/account_address", checkTokenAndIsSameUserOrIsAdmin, updateUserAddressDetails);
router.put("/:id", checkTokenAndIsSameUserOrIsAdmin, updateUser);
router.delete("/:id", checkToken, deleteUser);
router.post("/register", registerUser);
router.post("/login", login);
router.put("/password-user/:id", checkTokenAndIsSameUserOrIsAdmin, updatePasswordUser);
router.put("/password-admin/:id", checkTokenAndIsAdmin, updatePasswordAdmin);
router.put("/reset/password", resetPassword);
router.get("/isAdmin", checkTokenAndIsAdmin, (req, res) => {
  res.json({ isAdmin: true });
});
module.exports = router;
