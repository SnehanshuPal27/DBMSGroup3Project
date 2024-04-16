import pool from '../config/database.js';

const getAll = async () => {
  const [rows] = await pool.promise().query('SELECT * FROM customers');
  return rows;
};

const getById = async (customerId) => {
  const [rows] = await pool.promise().query('SELECT * FROM customers WHERE customerId = ?', [customerId]);
  return rows[0];
};

const getByEmail = async (email) => {
  console.log("in email")
  console.log([email])
  const [rows] = await pool.promise().query('SELECT * FROM customers WHERE Email = ?', email.Email);
  return rows[0];
};

const create = async (customerData) => {
  const [result] = await pool.promise().query('INSERT INTO customers SET ?', customerData);
  return result.insertId;
};

const update = async (customerId, customerData) => {
  console.log("in cust update model")
  console.log(customerData)
  const [result] = await pool.promise().query('UPDATE customers SET ? WHERE customerId = ?', [customerData, customerId]);
  return result.affectedRows > 0;
};

const remove = async (customerId) => {
  const [result] = await pool.promise().query('DELETE FROM customers WHERE customerId = ?', [customerId]);
  return result.affectedRows > 0;
};

const getHighestIndex=async()=>{
  const result=await pool.promise().query('SELECT MAX(CustomerID) from Customers ')
  console.log(result)
  return result;
}

export { getAll, getById, create, update, remove ,getHighestIndex,getByEmail};