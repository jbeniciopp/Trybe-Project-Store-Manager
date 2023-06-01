const salesServices = require('../services/sales.services');

const newSale = async (req, res) => {
  const sale = req.body;

  const saleNew = await salesServices.newSale(sale);

  return res.status(201).json(saleNew);
};

const getAll = async (_req, res) => {
  const result = await salesServices.getAll();

  return res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await salesServices.getById(id);

  return res.status(200).json(result);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const result = await salesServices.deleteSale(id);
  
  if (result === true) {
    return res.status(204).end();
  }

  return res.status(404).json({ message: 'Sale not found' });
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const result = await salesServices.updateSale(data, id);

  return res.status(200).json(result);
};

module.exports = {
  newSale,
  getAll,
  getById,
  deleteSale,
  updateSale,
};