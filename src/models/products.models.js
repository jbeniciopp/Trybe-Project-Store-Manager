const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products;',
  );
  return result;
};

const getById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?;',
    [productId],
  );
  return product;
};

const newProduct = async (product) => {
  const [{ insertId }] = await connection.execute(
    `INSERT INTO products (name) VALUE ('${product}');`,
  );

  return { id: insertId, name: product };
};

const updateProduct = async (id, product) => {
  try {
    await connection.execute(
      `UPDATE products
      SET name = ?
      WHERE id = ?;`,
      [product, id],
    );
  } catch (err) {
    console.log(err);
  }

  return { id, name: product };
};

const deleteProducts = async (id) => {
  try {
    await connection.execute(
      `DELETE FROM products
      WHERE id = ?;`,
      [id],
    );
  } catch (err) {
    console.log(err);
  }
};

const search = async (name) => {
  const [result] = await connection.execute(
    'SELECT * FROM products WHERE name LIKE ?;',
    [`%${name}%`],
  );
  return result;
};

module.exports = {
  getAll,
  getById,
  newProduct,
  updateProduct,
  deleteProducts,
  search,
};