const pool = require("../../config/database");

module.exports = {
  addUser: (data, callBack) => {
    pool.query(
      "SELECT COUNT(*) AS count FROM user WHERE email = ?",
      [data.email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }

        const existingEmailCount = results[0].count;
        if (existingEmailCount > 0) {
          const error = new Error("Email-ul există deja");
          error.statusCode = 409; // Set the status code to indicate a conflict
          return callBack({
            statusCode: error.statusCode,
            message: error.message,
          });
        }

        // If no existing user found, proceed with the insertion
        pool.query(
          "INSERT INTO user VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ? 'customer')",
          [
            data.name,
            data.email,
            data.password,
            data.role,
            data.judet,
            data.oras,
            data.address,
            data.img,
            data.number,
          ],
          (error, results, fields) => {
            if (error) {
              return callBack(error);
            }
            return callBack(null, results);
          }
        );
      }
    );
  },
  registerUser: (data, callBack) => {
    pool.query(
      "SELECT COUNT(*) AS count FROM user WHERE email = ?",
      [data.email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }

        const existingEmailCount = results[0].count;
        if (existingEmailCount > 0) {
          const error = new Error("Email-ul există deja");
          error.statusCode = 409;
          return callBack({
            statusCode: error.statusCode,
            message: error.message,
          });
        }

        pool.query(
          "INSERT INTO user(id, name, email, password, role) VALUES (null, ?, ?, ?, 'customer')",
          [data.name, data.email, data.password],
          (error, results, fields) => {
            if (error) {
              return callBack(error);
            }
            return callBack(null, results);
          }
        );
      }
    );
  },
  getUsers: (callBack) => {
    pool.query("select * from user", [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },
  getUserAccountDetails: (user_id, callBack) => {
    pool.query(
      "select name, email, img from user where id =?",
      [user_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getAdressAccountDetails: (user_id, callBack) => {
    pool.query(
      "select judet, oras, address, number from user where id =?",
      [user_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUserById: (id, callBack) => {
    pool.query(
      "select * from user where id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getPassword: (id, callBack) => {
    pool.query(
      "select password from user where id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updateUserAccountDetails: (id, data, callBack) => {
    pool.query(
      "update user set name=?, email=?, img=? where id=?",
      [data.name, data.email, data.img, id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateUserAddressDetails: (id, data, callBack) => {
    pool.query(
      "update user set judet=?, oras=?, address=?, number=? where id=?",
      [data.judet, data.oras, data.address, data.number, id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateUser: (id, data, callBack) => {
    pool.query(
      "update user set name=?, email=?, role=?, judet=?, oras =?, address =?, img=?,  number=? where id=?",
      [
        data.name,
        data.email,
        data.role,
        data.judet,
        data.oras,
        data.address,
        data.img,
        data.number,
        id,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updatePassword: (id, data, callBack) => {
    pool.query(
      "update user set password=? where id=?",
      [data.password, id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updatePasswordByEmail: (password, email, callBack) => {
    pool.query(
      "update user set password=? where email=?",
      [password, email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteUser: (id, data, callBack) => {
    pool.query(
      "delete from user where id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUserByEmail: (email, callBack) => {
    pool.query(
      "select * from user where email = ?",
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};
