// controll de rota de authenticação e geracao de token
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const JWTSECRET = process.env.JWTSECRET;

const loginController = {
  async authenticate(req, res) {
    let { email, password } = req.body;
    if (email) {
      if (typeof email === "string") {
        try {
          let user = await User.findOne({ where: { email: email } });
          if (user) {
            if (password === user.password) {
              jwt.sign(
                { id: user.id, name: user.name, email: user.email },
                JWTSECRET,
                { expiresIn: 120 },
                (err, token) => {
                  if (err) {
                    res.statusCode = 500;
                    res.json({ error: "internal error" });
                  } else {
                    res.statusCode = 200;
                    res.json({ token: token });
                  }
                }
              );
            } else {
              res.statusCode = 401;
              res.json({ error: "incorrect password" });
            }
          } else {
            res.statusCode = 404;
            res.json({ error: "not found" });
          }
        } catch (err) {
          res.statusCode = 500;
          res.json({ error: "internal error" });
        }
      } else {
        res.statusCode = 400;
        res.json({ error: "invalid data" });
      }
    } else {
      res.statusCode = 400;
      res.json({ error: "email is required" });
    }
  },
};

module.exports = loginController;
