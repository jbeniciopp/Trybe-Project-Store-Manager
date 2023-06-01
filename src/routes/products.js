const express = require('express');

const productsController = require('../controllers/products.controllers');
const productsMiddlewares = require('../middlewares/products.middlewares');

const router = express.Router();

router.get('/search', productsController.search);

router.get('/', productsController.getAll);

router.get('/:id', productsController.getById);

router.post('/', productsMiddlewares.newProductValidations, productsController.newProduct);

router.put('/:id', productsMiddlewares.updateProductValidation, productsController.updateProduct);

router.delete(
  '/:id',
  productsMiddlewares.deleteProductsValidation,
  productsController.deleteProducts,
);

module.exports = router;