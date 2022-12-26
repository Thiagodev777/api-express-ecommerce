const User = require("../../models/User");
const Helpers = require("../../helpers/index");

const userController = {
  async getUsers(req, res) {
    const userLogged = req.userLogged;
    try {
      const users = await User.findAll();
      return res.status(200).json({ userLogged: userLogged, users });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "internal error" });
    }
  },
  async getUser(req, res) {
    const { id } = req.params;
    if (id) {
      if (isNaN(id)) {
        return res.status(400).json({ error: "invalid data" });
      } else {
        try {
          const user = await User.findOne({ where: { id: id } });
          if (user) {
            return res.status(200).json(user);
          } else {
            return res.status(404).json({ error: "not found" });
          }
        } catch (err) {
          console.log(err);
          return res.status(500).json({ error: "internal error" });
        }
      }
    } else {
      return res.status(400).json({ error: "invalid data" });
    }
  },
  async createUser(req, res) {
    const { name, email, password } = req.body;
    if (name && email && password) {
      if (Helpers.typeCheckingUser(name, email, password)) {
        try {
          const duplicateEmail = await User.findOne({
            where: { email: email },
          });
          if (duplicateEmail) {
            return res.status(400).json({ error: "The email already exists" });
          } else {
            try {
              const user = await User.create({ name, email, password });
              return res.status(200).json({ msg: "successfully created" });
            } catch (err) {
              console.log(err);
              return res.status(500).json({ error: "internal error" });
            }
          }
        } catch (err) {
          console.log(err);
          return res.status(500).json({ error: "internal error" });
        }
      } else {
        return res.status(400).json({ error: "invalid data" });
      }
    } else {
      return res.status(400).json({ error: "invalid data" });
    }
  },
  async updateUser(req, res) {
    const { id } = req.params;
    const { name, email, password } = req.body;
    if (id) {
      if (isNaN(id)) {
        return res.status(400).json({ error: "invalid data" });
      } else {
        try {
          const user = await User.findOne({ where: { id: id } });
          if (user) {
            if (name || email || password) {
              try {
                User.update({ name, email, password }, { where: { id: id } });
                return res.status(200).json({ msg: "successfully updated" });
              } catch (err) {
                console.log(err);
                return res.status(500).json({ error: "internal error" });
              }
            } else {
              return res.status(400).json({ error: "invalid data" });
            }
          } else {
            return res.status(404).json({ error: "not found" });
          }
        } catch (err) {
          console.log(err);
          return res.status(500).json({ error: "internal error" });
        }
      }
    } else {
      return res.status(400).json({ error: "invalid data" });
    }
  },
  async deleteUser(req, res) {
    const { id } = req.params;
    if (id) {
      if (isNaN(id)) {
        return res.status(400).json({ error: "invalid data" });
      } else {
        try {
          const user = await User.findOne({ where: { id: id } });
          if (user) {
            try {
              const userDelete = await User.destroy({ where: { id: id } });
              return res.status(200).json({ msg: "successfully deleted" });
            } catch (err) {
              console.log(err);
              return res.status(500).json({ error: "internal error" });
            }
          } else {
            return res.status(404).json({ error: "not found" });
          }
        } catch (err) {
          console.log(err);
          return res.status(500).json({ error: "internal error" });
        }
      }
    } else {
      return res.status(400).json({ error: "invalid data" });
    }
  },
};

module.exports = userController;
