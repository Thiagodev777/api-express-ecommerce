const express = require('express');
const router = express.Router();
const auth = require('../../config/middleware/Auth');

// Controllers
const userController = require('../controllers/userController/index');
const productController = require('../controllers/productController/index')
const loginController = require('../controllers/loginController/index')

// routes

// routes login
router.post('/auth', loginController.authenticate)

// routes user
router.get('/users',userController.getUsers)
router.get('/user/:id',userController.getUser)
router.post('/user',userController.createUser)
router.put('/user/:id',userController.updateUser)
router.delete('/user/:id',userController.deleteUser)

// routes product
router.get('/products', productController.getProducts)
router.get('/product/:id', productController.getProduct)
router.post('/product', productController.createProduct)
router.put('/product/:id', productController.updateProduct)
router.delete('/product/:id', productController.deleteProduct)

module.exports = router;
