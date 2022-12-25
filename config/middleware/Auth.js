const jwt = require("jsonwebtoken");
const JWTSECRET = process.env.JWTSECRET;

const auth = (req, res, next) => {
  const authToken = req.headers["authorization"];
  if (authToken) {
    const bearer = authToken.split(" ");
    const token = bearer[1];
    jwt.verify(token, JWTSECRET, (err, data) => {
      if (err) {
        res.statusCode = 401;
        res.json({ error: "invalid token" });
      } else {
        res.statusCode = 200;
        req.token = token;
        req.userLogged = { id: data.id, name: data.name, email: data.email };
        next();
      }
    });
  } else {
    res.statusCode = 401;
    res.json({ error: "authentication required" });
  }
};
module.exports = auth;
