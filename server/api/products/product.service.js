const pool = require("../../config/database");

module.exports = {
  createProduct: (data, callBack) => {
    pool.query(
      "insert into product values(null,?,?,?,?,?)",
      [data.title, data.desc, data.img, data.price, data.subcategory_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getProducts: (callBack) => {
    pool.query("select * from product", [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },
  getNewProducts: (callBack) => {
    pool.query(
      "SELECT * FROM ( SELECT * FROM product ORDER BY id DESC LIMIT 12) AS sub ORDER BY id ASC",
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getProductsByCategory: (category, callBack) => {
    pool.query(
      "SELECT product.* FROM product, subcategory, category where subcategory.id = product.subcategory_id and subcategory.category_id = category.id and category.category=?;",
      [category],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getProductById: (id, callBack) => {
    pool.query(
      "select * from product where id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updateProduct: (id, data, callBack) => {
    pool.query(
      "update product set title=?, `desc`=?, img=?, price=?, subcategory_id =? where id=?",
      [data.title, data.desc, data.img, data.price, data.subcategory_id, id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteProduct: (id, callBack) => {
    pool.query(
      "delete from product where id = ?",
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
