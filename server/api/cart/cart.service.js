const pool = require("../../config/database");

module.exports = {
  addProductToCart: (user_id, product_id, quantity, callBack) => {
    pool.query(
      "insert into cart() values(1,?,?,?)",
      [user_id, product_id, quantity],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  addProductsToCart: (user_id, body, callBack) => {
    const insertQuery =
      "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)";
    const values = body.map((product) => [
      Number(user_id),
      product.product.id,
      product.quantity,
    ]);
    values.forEach((productValues) => {
      pool.query(insertQuery, productValues, (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
      });
    });

    callBack(null, "Products added to cart");
  },
  getCartProducts: (user_id, callBack) => {
    pool.query(
      "select * from cart, product where cart.user_id = ? and cart.product_id = product.id",
      [user_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteProductsFromCart: (user_id, callBack) => {
    pool.query(
      "delete from cart where user_id = ?",
      [user_id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};
