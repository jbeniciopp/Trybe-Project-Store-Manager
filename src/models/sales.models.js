const connection = require('./connection');

const newSale = async (sale) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales () VALUES ();',
  );

  try {
    sale.forEach(async (element) => {
      const { productId, quantity } = element;
  
      await connection.execute(
        `INSERT INTO sales_products (sale_id, product_id, quantity)
        VALUE (${insertId}, ${productId}, ${quantity});`,
      );
    });
    await Promise.all(sale);
  } catch (err) {
    console.log(err);
  }

  return { id: insertId, itemsSold: sale };
};

const getAll = async () => {
  const [result] = await connection.execute( 
    `SELECT
      sales_products.sale_id AS saleId,
      sales_products.product_id AS productId,
      sales_products.quantity,
      sales.date
    FROM sales_products
    LEFT JOIN sales
    ON sales_products.sale_id = sales.id
    ORDER BY
      sales_products.sale_id,
      sales_products.product_id;`,
  );

  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    `SELECT
      sales.date,
      sales_products.product_id AS productId,
      sales_products.quantity
      FROM
      sales_products
      LEFT JOIN sales
      ON sales_products.sale_id = sales.id
      WHERE
      sales_products.sale_id = ?;`,
    [id],
  );

  return result;
};

const deleteSale = async (id) => {
  try {
    await connection.execute(
      `DELETE FROM sales_products
        WHERE sale_id = ?;`,
      [id],
    );
    await connection.execute(
      `DELETE FROM sales
      WHERE id = ?`,
      [id],
    );
  } catch (err) {
    console.log(err);
  }

  return true;
};

const updateSale = async (updates, id) => {
  try {
    const promises = updates.map((data) => connection.execute(
        `UPDATE sales_products
        SET quantity = ?
        WHERE sale_id = ? AND product_id = ?;`,
      [data.quantity, id, data.productId],
      ));

    await Promise.all(promises);
  } catch (err) {
    console.log(err);
  }

  return { saleId: id, itemsUpdated: updates };
};

module.exports = {
  newSale,
  getAll,
  getById,
  deleteSale,
  updateSale,
};