const newProductValidations = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  } if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  next();
};

const { getById } = require('../models/products.models');

const updateProductValidation = async (req, res, next) => {
  const { id } = req.params;

  if (!req.body.name) {
    return res.status(400).json({ message: '"name" is required' });
  } if (req.body.name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  const product = await getById(id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return next();
};

const deleteProductsValidation = async (req, res, next) => {
  const { id } = req.params;

  const product = await getById(id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return next();
};

module.exports = {
  newProductValidations,
  updateProductValidation,
  deleteProductsValidation,
};