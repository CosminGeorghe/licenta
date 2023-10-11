const pool = require("../../config/database");

module.exports = {
  createSubcategory: (data, callBack) => {
    pool.query(
      "insert into subcategory values(null,?,?)",
      [
        data.subcategory,
        data.category_id,
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
    if(category !== undefined) {
      pool.query("select subcategory.* from subcategory, category where category.id = subcategory.category_id and category.category = ?", [category], (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      });
    } else {
      pool.query("select * from subcategory", [], (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      });
    }

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
  updateSubcategory: (id, data, callBack) => {
    pool.query(
      "update subcategory set subcategory=?, category_id=? where id=?",
      [
        data.subcategory,
        data.category_id,
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
  deleteSubcategory: (id, callBack) => {
    pool.query(
      "delete from subcategory where id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};
