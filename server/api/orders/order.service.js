const pool = require("../../config/database");

module.exports = {
  createOrder: (data, callBack) => {
    pool.query(
      "INSERT INTO `order` VALUES (null,?,?,?,?,?,?,?,'In Procesare')",
      [
        data.user_id,
        data.name,
        data.number,
        data.judet,
        data.oras,
        data.address,
        data.total,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }

        const orderId = results.insertId;

        data.products.forEach((product) => {
          pool.query(
            "INSERT INTO order_products VALUES (?,?,?,?)",
            [
              orderId,
              product.product.id,
              product.quantity,
              product.product.price * product.quantity,
            ],
            (error, results, fields) => {
              if (error) {
                return callBack(error);
              }
            }
          );
        });

        return callBack(null, results);
      }
    );
  },
  getOrders: (callBack) => {
    pool.query("SELECT * FROM `order`", (error, orderResults, fields) => {
      if (error) {
        return callBack(error);
      }

      const orders = [];

      orderResults.forEach((order) => {
        pool.query(
          "SELECT op.quantity, p.id, p.title, p.desc, p.img, p.price, p.subcategory_id FROM order_products op JOIN product p ON op.product_id = p.id WHERE op.order_id = ?",
          [order.id],
          (error, productResults, fields) => {
            if (error) {
              return callBack(error);
            }

            const products = productResults.map((product) => ({
              product: {
                id: product.id,
                title: product.title,
                desc: product.desc,
                img: product.img,
                price: product.price,
                subcategory_id: product.subcategory_id,
              },
              quantity: product.quantity,
            }));

            const orderData = {
              id: order.id,
              user_id: order.user_id,
              name: order.name,
              number: order.number,
              judet: order.judet,
              oras: order.oras,
              address: order.address,
              total: order.total,
              products: products,
              status: order.status,
            };

            orders.push(orderData);

            if (orders.length === orderResults.length) {
              return callBack(null, orders);
            }
          }
        );
      });
    });
  },
  getUserOrders: (id, callBack) => {
    pool.query(
      "SELECT * FROM `order` WHERE user_id = ?",
      [id],
      (error, orderResults, fields) => {
        if (error) {
          return callBack(error);
        }

        const orders = [];

        orderResults.forEach((order) => {
          pool.query(
            "SELECT op.quantity, p.id, p.title, p.desc, p.img, p.price, p.subcategory_id FROM order_products op JOIN product p ON op.product_id = p.id WHERE op.order_id = ?",
            [order.id],
            (error, productResults, fields) => {
              if (error) {
                return callBack(error);
              }

              const products = productResults.map((product) => ({
                product: {
                  id: product.id,
                  title: product.title,
                  desc: product.desc,
                  img: product.img,
                  price: product.price,
                  subcategory_id: product.subcategory_id,
                },
                quantity: product.quantity,
              }));

              const orderData = {
                id: order.id,
                user_id: order.user_id,
                name: order.name,
                number: order.number,
                judet: order.judet,
                oras: order.oras,
                address: order.address,
                total: order.total,
                products: products,
                status: order.status,
              };

              orders.push(orderData);

              if (orders.length === orderResults.length) {
                return callBack(null, orders);
              }
            }
          );
        });
      }
    );
  },
  updateStatus: (id, data, callBack) => {
    pool.query(
      "update `order` set status=? where id=?",
      [data.status, id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteCategory: (id, callBack) => {
    pool.query(
      "delete from category where id = ?",
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
