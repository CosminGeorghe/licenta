const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      "insert into user(firstName,lastName,gender,email,password,number,role) values(?,?,?,?,?,?,'customer')",
      [
        data.first_name,
        data.last_name,
        data.gender,
        data.email,
        data.password,
        data.number,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getSubcategories: (category, callBack) => {
    pool.query("select subcategory.* from subcategory, category where category.id = subcategory.category_id and category.category = ?", [category], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },
  getNewProducts: (callBack) => {
    pool.query("SELECT * FROM ( SELECT * FROM product ORDER BY id DESC LIMIT 12) AS sub ORDER BY id ASC", [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },
  getProductsByCategory: (category, callBack) => {
    console.log(category);
    pool.query("SELECT product.* FROM product, subcategory, category where subcategory.id = product.subcategory_id and subcategory.category_id = category.id and category.id=?;", [category], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },
  getUserById: (id, callBack) => {
    pool.query(
      "select id, firstName, lastName, gender, email, number, role from user where id = ?",
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
