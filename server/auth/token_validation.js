const { verify } = require("jsonwebtoken");

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      token = token.slice(7);
      verify(token, process.env.TOKEN_KEY, (err, decoded) => {
        if (err) {
          res.json({
            succes: 0,
            message: "Nu esti logat",
          });
        } else {
          next();
        }
      });
    } else {
      res.json({
        succes: 0,
        message: "Acces respins! Nu ai permisiunea",
      });
    }
  },
  checkTokenAndIsSameUserOrIsAdmin: (req, res, next) => {
    const id = req.params.id;
    let token = req.get("authorization");

    if (token) {
      token = token.slice(7);
      verify(token, process.env.TOKEN_KEY, (err, decoded) => {
        if (err) {
          res.json({
            succes: 0,
            message: "Nu esti logat",
          });
        } else {
          if (decoded.result.role === "admin") {
            next();
          } else if (Number(decoded.result.id) === Number(id)) {
            next();
          } else {
            res.json({
              succes: 0,
              message: "Acces respins! Nu ai permisiunea",
            });
          }
        }
      });
    } else {
      res.json({
        succes: 0,
        message: "Acces respins! Nu ai permisiunea",
      });
    }
  },
  checkTokenAndIsAdmin: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      token = token.slice(7);
      verify(token, process.env.TOKEN_KEY, (err, decoded) => {
        if (err) {
          res.json({
            succes: 0,
            message: "Nu esti logat",
          });
        } else {
          if (decoded.result.role === "admin") {
            next();
          } else {
            res.json({
              succes: 0,
              message: "Acces respins! Nu ai permisiunea",
            });
          }
        }
      });
    } else {
      res.json({
        succes: 0,
        message: "Acces respins! Nu ai permisiunea",
      });
    }
  },
};
