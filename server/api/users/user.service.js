const pool = require("../../config/database");

module.exports = {
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
        error.statusCode = 409; // Set the status code to indicate a conflict
        return callBack({ statusCode: error.statusCode, message: error.message });
      }

      // If no existing user found, proceed with the insertion
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
    pool.query(
      "select id, firstName, lastName, gender, email, number, role from user",
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
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
  updateUser: (id, data, callBack) => {
    pool.query(
      "update user set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id=?",
      [
        data.first_name,
        data.last_name,
        data.gender,
        data.email,
        data.password,
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
  /*
  registerUser: (email) => {

  },
  */
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
