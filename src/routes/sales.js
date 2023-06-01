const express = require('express');

const salesController = require('../controllers/sales.controllers');
const salesMiddlewares = require('../middlewares/sales.middlewares');

const router = express.Router();

router.post(
  '/',
  salesMiddlewares.newSaleValidation1,
  salesMiddlewares.newSaleValidation2,
  salesMiddlewares.newSaleProductValidation,
  salesController.newSale,
);

router.get('/', salesController.getAll);

router.get(
  '/:id',
  salesMiddlewares.getByIdValidation,
  salesController.getById,
);

router.delete(
  '/:id',
  salesMiddlewares.getByIdValidation,
  salesController.deleteSale,
);

router.put(
  '/:id',
  salesMiddlewares.newSaleValidation1,
  salesMiddlewares.newSaleValidation2,
  salesMiddlewares.newSaleProductValidation,
  salesMiddlewares.getByIdValidation,
  salesController.updateSale,
);

module.exports = router;