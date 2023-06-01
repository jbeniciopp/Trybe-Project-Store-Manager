const salesModels = require('../models/sales.models');

const newSale = async (sale) => {
  const saleNew = await salesModels.newSale(sale);
  return saleNew;
};

const getAll = async () => {
  const result = await salesModels.getAll();
  return result;
};

const getById = async (id) => {
  const result = await salesModels.getById(id);
  return result;
};

const deleteSale = async (id) => {
  const result = await salesModels.deleteSale(id);
  return result;
};

const updateSale = async (updates, id) => {
  const result = await salesModels.updateSale(updates, id);
  return result;
};

module.exports = {
  newSale,
  getAll,
  getById,
  deleteSale,
  updateSale,
};