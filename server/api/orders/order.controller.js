const {
  createOrder,
  getOrders,
  getUserOrders,
  updateStatus,
  deleteCategory,
} = require("./order.service");

require("dotenv").config();

module.exports = {
  createOrder: (req, res) => {
    const body = req.body;
    createOrder(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          succes: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        succes: 1,
        data: results,
      });
    });
  },
  getOrders: (req, res) => {
    getOrders((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "No Order Found",
        });
      }
      return res.json({
        succes: 1,
        data: results,
      });
    });
  },
  getUserOrders: (req, res) => {
    const id = req.params.id;
    getUserOrders(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "No Order Found",
        });
      }
      return res.json({
        succes: 1,
        data: results,
      });
    });
  },
  updateStatus: (req, res) => {
    const id = req.params.id;
    const body = req.body;
    updateStatus(id, body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          succes: 0,
          message: "Failed to update status",
        });
      }
      return res.json({
        succes: 1,
        message: "updated successfully",
      });
    });
  },
  deleteCategory: (req, res) => {
    const id = req.params.id;
    deleteCategory(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        succes: 1,
        message: "category deleted successfully",
      });
    });
  },
};
