import pool from '../config/database.js';

const getAll = async () => {
  const [rows] = await pool.promise().query('SELECT * FROM suppliers');
  return rows;
};

const getById = async (supplierId) => {
  const [rows] = await pool.promise().query('SELECT * FROM suppliers WHERE supplierId = ?', [supplierId]);
  return rows[0];
};

const create = async (supplierData) => {
  const [result] = await pool.promise().query('INSERT INTO suppliers SET ?', supplierData);
  return result.insertId;
};

const update = async (supplierId, supplierData) => {
  console.log(supplierData)
  
  const [result] = await pool.promise().query('UPDATE suppliers SET ? WHERE supplierId = ?', [supplierData, supplierId]);
  return result.affectedRows > 0;
};

const remove = async (supplierId) => {
  const [result] = await pool.promise().query('DELETE FROM suppliers WHERE supplierId = ?', [supplierId]);
  return result.affectedRows > 0;
};

export { getAll, getById, create, update, remove };