const router = require("express").Router();
const {
  createOrder,
  getOrders,
  getUserOrders,
  updateStatus,
} = require("./order.controller");
const { checkToken } = require("../../auth/token_validation");

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/:id", getUserOrders);
router.put("/setstatus/:id", checkToken, updateStatus)
module.exports = router;
