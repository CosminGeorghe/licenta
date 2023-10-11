const pool = require("../../config/database");

module.exports = {
  createCategory: (data, callBack) => {
    pool.query(
      "insert into category values(null,?,?,?)",
      [
        data.category,
        data.img,
        data.title,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getCategories: (callBack) => {
    pool.query(
      "select * from category",
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateCategory: (id, data, callBack) => {
    pool.query(
      "update category set category=?, img=?, title=? where id=?",
      [
        data.category,
        data.img,
        data.title,
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
