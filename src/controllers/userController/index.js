// model
const User = require("../../models/User");

const userController = {
  async getUsers(req, res) {
    try {
      res.statusCode = 200;
      let users = await User.findAll();
      res.json(users);
    } catch (err) {
      res.statusCode = 500;
      res.json({ error: "internal error" });
    }
  },
  async getUser(req, res) {
    let { id } = req.params;
    if (isNaN(id)) {
      res.statusCode = 400;
      res.json({ error: "invalid data" });
    } else {
      try {
        let user = await User.findOne({ where: { id: id } });
        if (user) {
          res.statusCode = 200;
          res.json(user);
        } else {
          res.statusCode = 404;
          res.json({ error: "not found" });
        }
      } catch (err) {
        res.statusCode = 500;
        res.json({ error: "internal error" });
      }
    }
  },
  async createUser(req, res) {
    let { name, email, password } = req.body;
    if (name && email && password) {
      if (
        typeof name === "string" &&
        typeof email === "string" &&
        typeof password === "string"
      ) {
        let duplicateEmail = await User.findOne({ where: { email: email } });
        if (duplicateEmail) {
          res.statusCode = 400;
          res.json({ error: "The email already exists" });
        } else {
          try {
            res.statusCode = 200;
            let user = await User.create({ name, email, password });
            res.json({ msg: "successfully created" });
          } catch (err) {
            res.statusCode = 500;
            res.json({ error: "internal error" });
          }
        }
      } else {
        res.statusCode = 400;
        res.json({ error: "invalid data" });
      }
    } else {
      res.statusCode = 400;
      res.json({ error: "invalid data" });
    }
  },
  async updateUser(req, res) {
    let { id } = req.params;
    let { name, email, password } = req.body;
    if (isNaN(id)) {
      res.statusCode = 400;
      res.json({ error: "invalid data" });
    } else {
      let user = await User.findOne({ where: { id: id } });
      if (user) {
        if (name || email || password) {
          if (name) {
            if (typeof name === "string") {
              try {
                res.statusCode = 200;
                User.update({ name }, { where: { id: id } });
                res.json({ msg: "successfully updated" });
              } catch (err) {
                res.statusCode = 500;
                res.json({ error: "internal error" });
              }
            } else {
              res.statusCode = 400;
              res.json({ error: "invalid data" });
            }
          }
          if (email) {
            if (typeof email === "string") {
              try {
                res.statusCode = 200;
                User.update({ email }, { where: { id: id } });
                res.json({ msg: "successfully updated" });
              } catch (err) {
                res.statusCode = 500;
                res.json({ error: "internal error" });
              }
            } else {
              res.statusCode = 400;
              res.json({ error: "invalid data" });
            }
          }
          if (password) {
            if (typeof password === "string") {
              try {
                res.statusCode = 200;
                User.update({ password }, { where: { id: id } });
                res.json({ msg: "successfully updated" });
              } catch (err) {
                res.statusCode = 500;
                res.json({ error: "internal error" });
              }
            } else {
              res.statusCode = 400;
              res.json({ error: "invalid data" });
            }
          }
        } else {
          res.statusCode = 400;
          res.json({ error: "invalid data" });
        }
      } else {
        res.statusCode = 404;
        res.json({ error: "not found" });
      }
    }
  },
  async deleteUser(req, res) {
    let { id } = req.params;
    if (isNaN(id)) {
      res.statusCode = 400;
      res.json({ error: "invalid data" });
    } else {
      let user = await User.findOne({ where: { id: id } });
      if (user) {
        try {
          res.statusCode = 200;
          let userDelete = await User.destroy({ where: { id: id } });
          res.json({ msg: "successfully deleted" });
        } catch (err) {
          res.statusCode = 500;
          res.json({ error: "internal error" });
        }
      } else {
        res.statusCode = 404;
        res.json({ error: "not found" });
      }
    }
  },
};

module.exports = userController;
