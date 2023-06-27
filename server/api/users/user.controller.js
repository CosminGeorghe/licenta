const {
  create,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
  registerUser,
  getUserByEmail,
} = require("./user.service");

require("dotenv").config();

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  registerUser: (req, res) => {
    const body = req.body;
    console.log(res.body);
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    registerUser(body, (err, results) => {
      if (err) {
        if (err.statusCode === 409) {
          return res.status(409).json({
            success: 0,
            message: err.message,
          });
        } else {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection error",
          });
        }
      }
      return res.status(200).json({
        succes: 1,
        data: results,
      });
    });
  },
  getUserById: (req, res) => {
    const id = req.params.id;
    getUserByUserId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found",
        });
      }
      return res.json({
        succes: 1,
        data: results,
      });
    });
  },
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "No User Found",
        });
      }
      return res.json({
        succes: 1,
        data: results,
      });
    });
  },
  updateUser: (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(id, body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          succes: 0,
          message: "Failed to update user",
        });
      }
      return res.json({
        succes: 1,
        message: "updated successfully",
      });
    });
  },
  deleteUser: (req, res) => {
    const id = req.params.id;
    const data = req.body;
    deleteUser(id, data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        succes: 1,
        message: "user deleted successfully",
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
    getUserByEmail(body.email, (err, results) => {
      if (err) {
                return res.json({
          success: 0,
          data: "Invalid email or password",
        });
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid email or password",
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        const jsontoken = sign({ result: results }, process.env.TOKEN_KEY);
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken,
          id: results.id,
          name: results.name,
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password",
        });
      }
    });
  },
  /*
  registerUser: (req, res) => {
    const body = req.body;
    registerUser(body, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (results) {
        return res.json({
          success: 1,
          message: "register successfully",
          token: jsontoken,
        });
      } else {
        return res.json({
          success: 0,
          data: "Error registering user",
        });
      }
    });
  },*/
};
