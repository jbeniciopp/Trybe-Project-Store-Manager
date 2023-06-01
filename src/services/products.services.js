const productsModels = require('../models/products.models');

const getAll = async () => {
  const products = await productsModels.getAll();
  return products;
};

const getById = async (productId) => {
  const product = await productsModels.getById(productId);
  return product;
};

const newProduct = async (product) => {
  const productNew = await productsModels.newProduct(product);
  return productNew;
};

const updateProduct = async (id, product) => {
  const productUpdated = await productsModels.updateProduct(id, product);
  return productUpdated;
};

const deleteProducts = async (id) => {
  await productsModels.deleteProducts(id);
};

const search = async (q) => {
  const result = await productsModels.search(q);
  const resultfiltered = q ? result.filter(({ name }) => name.includes(q)) : result;
  return resultfiltered;
};

module.exports = {
  getAll,
  getById,
  newProduct,
  updateProduct,
  deleteProducts,
  search,
};
