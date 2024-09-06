// Configuración y puesta en marcha del servidor Express.
const express = require('express');
const userRoutes = require('../../application/routes/userRoutes');
const productRoutes = require('../../application/routes/productRoutes')

const { jsonParseErrorHandler } = require('../middlewares/errorHandling');
const { limiTotal } = require('../middlewares/rateLimit');
const createServer = () => {
    const app = express();
    app.use(express.json());
    app.use(jsonParseErrorHandler);
    app.use(limiTotal);
    
    app.use('/users',  userRoutes);
    app.use('/products', productRoutes)
    return app;
};

module.exports = createServer;