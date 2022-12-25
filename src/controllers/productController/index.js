const Product = require("../../models/Product");

const productController = {
  async getProducts(req, res) {
    try {
      res.statusCode = 200;
      let products = await Product.findAll();
      res.json(products);
    } catch (err) {
      res.statusCode = 500;
      res.json({ error: "internal error" });
    }
  },
  async getProduct(req, res) {
    let { id } = req.params;
    id = parseInt(id);
    if (isNaN(id)) {
      res.statusCode = 400;
      res.json({ error: "invalid data" });
    } else {
      try {
        let product = await Product.findOne({ where: { id: id } });
        if (product) {
          res.statusCode = 200;
          res.json(product);
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
  async createProduct(req, res) {
    let { name, description, price, quantity, image } = req.body;
    if (name && description && price && quantity && image) {
      if (
        typeof name === "string" &&
        typeof description === "string" &&
        typeof price === "string" &&
        typeof quantity === "string" &&
        typeof image === "string"
      ) {
        let duplicateName = await Product.findOne({ where: { name: name } });
        if (duplicateName) {
          res.statusCode = 400;
          res.json({ error: "A product with that name already exists" });
        } else {
          try {
            res.statusCode = 200;
            let product = await Product.create({
              name,
              description,
              price,
              quantity,
              image,
            });
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
  async updateProduct(req, res) {
    let { id } = req.params;
    id = parseInt(id);
    let { name, description, price, quantity, image } = req.body;
    if (isNaN(id)) {
      res.statusCode = 400;
      res.json({ error: "invalid data" });
    } else {
      let product = await Product.findOne({ where: { id: id } });
      if (product) {
        if(name || description || price || quantity || image) {
            if(name){
                if(typeof name === 'string'){
                    try {
                        Product.update({ name }, { where: { id: id } });
                        return res.status(200).json({ msg: "successfully updated" })
                      } catch (err) {
                        return res.status(500).json({ error: "internal error" })
                      }
                } else {
                    return res.status(400).json({ error: "invalid data" })
                }
            }  
            if(description){
                if(typeof description === 'string'){
                    try {
                        Product.update({ description }, { where: { id: id } });
                        return res.status(200).json({ msg: "successfully updated" })
                      } catch (err) {
                        return res.status(500).json({ error: "internal error" })
                      }
                } else {
                    return res.status(400).json({ error: "invalid data" })
                }
            }
            if(price){
                if(typeof price === 'string'){
                    try {
                        Product.update({ price }, { where: { id: id } });
                        return res.status(200).json({ msg: "successfully updated" })
                      } catch (err) {
                        return res.status(500).json({ error: "internal error" })
                      }
                } else {
                    return res.status(400).json({ error: "invalid data" })
                }
            }
            if(quantity){
                if(typeof quantity === 'string'){
                    try {
                        Product.update({ quantity }, { where: { id: id } });
                        return res.status(200).json({ msg: "successfully updated" })
                      } catch (err) {
                        return res.status(500).json({ error: "internal error" })
                      }
                } else {
                    return res.status(400).json({ error: "invalid data" })
                }
            }
            if(image){
                if(typeof image === 'string'){
                    try {
                        Product.update({ image }, { where: { id: id } });
                        return res.status(200).json({ msg: "successfully updated" })
                      } catch (err) {
                        return res.status(500).json({ error: "internal error" })
                      }
                } else {
                    return res.status(400).json({ error: "invalid data" })
                }
            }
        } else {
            return res.status(400).json({ error: "invalid data" })
        }
      } else {
        res.status(404).json({ error: "not found" });
      }
    }
  },
  async deleteProduct(req, res) {
    let { id } = req.params;
    id = parseInt(id);
    if (isNaN(id)) {
      res.statusCode = 400;
      res.json({ error: "invalid data" });
    } else {
      let product = await Product.findOne({ where: { id: id } });
      if (product) {
        try {
          res.statusCode = 200;
          let productDelete = await Product.destroy({ where: { id: id } });
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
module.exports = productController;
