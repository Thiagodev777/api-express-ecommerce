const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const JWTSECRET = process.env.JWTSECRET;

const loginController = {
  async authenticate(req, res) {
    const { email, password } = req.body;
    if (email) {
      if (typeof email === "string") {
        try {
          const user = await User.findOne({ where: { email: email } });
          if (user) {
            if (password === user.password) {
              jwt.sign(
                { id: user.id, name: user.name, email: user.email },
                JWTSECRET,
                { expiresIn: 120 },
                (err, token) => {
                  if (err) {
                    console.log(err);
                    return res.status(500).json({ error: "internal error" });
                  } else {
                    return res.status(200).json({ token: token });
                  }
                }
              );
            } else {
              return res.status(401).json({ error: "incorrect password" });
            }
          } else {
            return res.status(404).json({ error: "not found" });
          }
        } catch (err) {
          console.log(err);
          return res.status(500).json({ error: "internal error" });
        }
      } else {
        return res.status(400).json({ error: "invalid data" });
      }
    } else {
      return res.status(400).json({ error: "email is required" });
    }
  },
};

module.exports = loginController;
