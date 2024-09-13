// Define las rutas de la aplicación y mapea las URLs a los controladores.
const express = require('express');
const ProductController = require('../controllers/productController');
const ProductValidator = require('../validator/productValidator');

const router = express.Router();
const productController = new ProductController();
const productValidator = new ProductValidator();

router.get('/:id', productValidator.validateUserId(), (req, res) => productController.getProduct(req, res));


module.exports = router;