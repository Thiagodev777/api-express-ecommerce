const Product = require("../../models/Product");
const Helpers = require("../../helpers/index");

const productController = {
  async getProducts(req, res) {
    try {
      const products = await Product.findAll();
      return res.status(200).json(products);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "internal error" });
    }
  },
  async getProduct(req, res) {
    const { id } = req.params;
    if (id) {
      if (isNaN(id)) {
        return res.status(400).json({ error: "invalid data" });
      } else {
        try {
          const product = await Product.findOne({ where: { id: id } });
          if (product) {
            return res.status(200).json(product);
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
  async createProduct(req, res) {
    const { name, description, price, quantity, image } = req.body;
    if (name && description && price && quantity && image) {
      if (
        Helpers.typeCheckingProduct(name, description, price, quantity, image)
      ) {
        try {
          const duplicateName = await Product.findOne({
            where: { name: name },
          });
          if (duplicateName) {
            return res
              .status(404)
              .json({ error: "A product with that name already exists" });
          } else {
            try {
              const product = await Product.create({
                name,
                description,
                price,
                quantity,
                image,
              });
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
  async updateProduct(req, res) {
    const { id } = req.params;
    const { name, description, price, quantity, image } = req.body;
    if (id) {
      if (isNaN(id)) {
        return res.status(400).json({ error: "invalid data" });
      } else {
        try {
          const product = await Product.findOne({ where: { id: id } });
          if (product) {
            if (name || description || price || quantity || image) {
              try {
                Product.update(
                  { name, description, price, quantity, image },
                  { where: { id: id } }
                );
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
  async deleteProduct(req, res) {
    const { id } = req.params;
    if (id) {
      if (isNaN(id)) {
        return res.status(400).json({ error: "invalid data" });
      } else {
        try {
          const product = await Product.findOne({ where: { id: id } });
          if (product) {
            try {
              const productDelete = await Product.destroy({
                where: { id: id },
              });
              return res.status(200).json({ msg: "successfully deleted" });
            } catch (err) {
              console.log(err);
              return res.status(500).json({ error: "internal error" });
            }
          } else {
            return res.status(400).json({ error: "not found" });
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

module.exports = productController;
