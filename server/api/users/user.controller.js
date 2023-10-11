const {
  create,
  addUser,
  getUserById,
  getUsers,
  getUserAccountDetails,
  getAdressAccountDetails,
  updateUserAccountDetails,
  updateUserAddressDetails,
  updateUser,
  getPassword,
  updatePassword,
  updatePasswordByEmail,
  deleteUser,
  registerUser,
  getUserByEmail,
} = require("./user.service");

require("dotenv").config();

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  addUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    addUser(body, (err, results) => {
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
        success: 1,
        data: results,
      });
    });
  },
  registerUser: (req, res) => {
    const body = req.body;
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
        success: 1,
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
        success: 1,
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
        success: 1,
        data: results,
      });
    });
  },
  getUserAccountDetails: (req, res) => {
    const id = req.params.id;
    getUserAccountDetails(id, (err, results) => {
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
        success: 1,
        data: results,
      });
    });
  },
  getAdressAccountDetails: (req, res) => {
    const id = req.params.id;
    getAdressAccountDetails(id, (err, results) => {
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
        success: 1,
        data: results,
      });
    });
  },

  updateUserAccountDetails: (req, res) => {
    const id = req.params.id;
    const body = req.body;
    updateUserAccountDetails(id, body, (err, results) => {
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
        success: 1,
        message: "updated successfully",
      });
    });
  },
  updateUserAddressDetails: (req, res) => {
    const id = req.params.id;
    const body = req.body;
    updateUserAddressDetails(id, body, (err, results) => {
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
        success: 1,
        message: "updated successfully",
      });
    });
  },
  updateUser: (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const salt = genSaltSync(10);
    console.log(req.body);
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
        success: 1,
        message: "updated successfully",
      });
    });
  },
  updatePasswordUser: (req, res) => {
    const id = req.params.id;
    const body = req.body;
    getPassword(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "parola userului nu exista",
        });
      }
      const result = compareSync(body.oldPassword, results.password);
      if (result) {
        const salt = genSaltSync(10);
        body.password = hashSync(body.newPassword, salt);
        console.log(salt);
        updatePassword(id, body, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          if (!results) {
            return res.json({
              succes: 0,
              message: "Failed to update password",
            });
          }
          return res.json({
            success: 1,
            message: "parola actualizata cu succes",
          });
        });
      } else {
        return res.json({
          success: 0,
          message: "parola veche este incorecta",
        });
      }
    });
  },
  updatePasswordAdmin: (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const salt = genSaltSync(10);
    data.password = hashSync(data.password, salt);
    updatePassword(id, data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          succes: 0,
          message: "Failed to update password",
        });
      }
      return res.json({
        success: 1,
        message: "parola actualizata cu succes",
      });
    });
  },
  resetPassword: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    verify(body.token, process.env.TOKEN_KEY, (err, decoded) => {
      if (err) {
        res.json({
          succes: 0,
          message: "Invalid token",
        });
      } else {
        console.log(decoded.email);
        console.log(req.body.email);
        updatePasswordByEmail(body.password, decoded.email, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          if (!results) {
            return res.json({
              succes: 0,
              message: "Failed to update password",
            });
          }
          return res.json({
            success: 1,
            message: "parola actualizata cu succes",
          });
        });
      }
    });
    /*
    const salt = genSaltSync(10);
    data.password = hashSync(data.password, salt);
    updatePassword(id, data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          succes: 0,
          message: "Failed to update password",
        });
      }
      return res.json({
        success: 1,
        message: "parola actualizata cu succes",
      });
    });*/
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
        success: 1,
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
          img: results.img,
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password",
        });
      }
    });
  },
};
