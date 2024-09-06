// Gestiona las peticiones HTTP y las respuestas, delegando la lógica de negocio a los servicios.
const { validationResult } = require('express-validator');
const ProductService = require('../services/productService');

class ProductController {
    constructor() {
        this.productService = new ProductService();
    }

    async getProduct(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const product = await this.productService.getProductById(req.params.id);
            res.status(200).json(product);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }
}

module.exports = ProductController;