const newSaleValidation1 = (req, res, next) => {
  const { body } = req;

  for (let index = 0; index < body.length; index += 1) {
    const element = body[index];
    if (!element.productId) {
      return res.status(400).json({ message: '"productId" is required' });
    }
  }

  return next();
};

const newSaleValidation2 = (req, res, next) => {
  const { body } = req;

  for (let index = 0; index < body.length; index += 1) {
    const element = body[index];
    if (element.quantity === undefined) {
      return res.status(400).json({ message: '"quantity" is required' });
    } if (element.quantity < 1) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
  }

  return next();
};

const product = require('../models/products.models');

const newSaleProductValidation = async (req, res, next) => {
  const { body } = req;

  try {
    const responses = await Promise.all(
      body.map(async (element) => {
        const { productId } = element;
        const response = await product.getById(productId);
        return response;
      }),
    );

    const notFound = responses.some((response) => !response);
    if (notFound) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const { getById } = require('../models/sales.models');

const getByIdValidation = async (req, res, next) => {
  const { id } = req.params;

  const result = await getById(id);

  if (result.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  return next();
};

module.exports = {
  newSaleValidation1,
  newSaleValidation2,
  newSaleProductValidation,
  getByIdValidation,
};
