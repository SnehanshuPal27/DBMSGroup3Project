import pool from '../config/database.js';

const getAll = async () => {
  const [rows] = await pool.promise().query('SELECT * FROM tables');
  return rows;
};

const getById = async (tableId) => {
  const [rows] = await pool.query('SELECT * FROM tables WHERE tableId = ?', [tableId]);
  return rows[0];
};

const create = async (tableData) => {
  const [result] = await pool.query('INSERT INTO tables SET ?', tableData);
  return result.insertId;
};

const update = async (tableId, tableData) => {
  const [result] = await pool.query('UPDATE tables SET ? WHERE tableId = ?', [tableData, tableId]);
  return result.affectedRows > 0;
};

const remove = async (tableId) => {
  const [result] = await pool.query('DELETE FROM tables WHERE tableId = ?', [tableId]);
  return result.affectedRows > 0;
};

export { getAll, getById, create, update, remove };