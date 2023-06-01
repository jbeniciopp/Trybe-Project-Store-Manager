const productServices = require('../services/products.services');

const getAll = async (_req, res) => {
  const products = await productServices.getAll();
  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productServices.getById(id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json(product);
};

const newProduct = async (req, res) => {
  const { name } = req.body;
  const productNew = await productServices.newProduct(name);

  return res.status(201).json(productNew);
};

const updateProduct = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  const productUpdated = await productServices.updateProduct(id, name);

  return res.status(200).json(productUpdated);
};

const deleteProducts = async (req, res) => {
  const { id } = req.params;

  await productServices.deleteProducts(id);

  return res.status(204).end();
};

const search = async (req, res) => {
  const { q } = req.query;
  const result = await productServices.search(q);
  return res.status(200).json(result);
};

module.exports = {
  getAll,
  getById,
  newProduct,
  updateProduct,
  deleteProducts,
  search,
};