const jwt = require("jsonwebtoken");
const JWTSECRET = process.env.JWTSECRET;

const auth = (req, res, next) => {
  const authToken = req.headers["authorization"];
  if (authToken) {
    const bearer = authToken.split(" ");
    const token = bearer[1];
    jwt.verify(token, JWTSECRET, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(401).json({ error: "invalid token" });
      } else {
        res.status(200);
        req.token = token;
        req.userLogged = { id: data.id, name: data.name, email: data.email };
        next();
      }
    });
  } else {
    return res.status(401).json({ error: "authentication required" });
  }
};

module.exports = auth;
