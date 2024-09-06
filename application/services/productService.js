// Implementa la lógica de negocio y coordina las interacciones entre el dominio y la infraestructura.
const ProductRepository = require('../../domain/repositories/productRepository');

class ProductService {
    constructor() {
        this.productRepository = new ProductRepository();
    }

    async getProductById(id) {
        const product = await this.productRepository.getById(id);
        if (!product) {
            throw new Error(JSON.stringify({status: 404, message: 'Product not found'}));
        }
        return product;
    }
}

module.exports = ProductService;