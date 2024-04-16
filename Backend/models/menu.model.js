import pool from '../config/database.js';

const getAll = async () => {
  const [rows] = await pool.promise().query('SELECT * FROM MenuItems');
  return rows;
};

const getMenuItemIngridient = async (menuItemID) => {
  console.log(`model ingridient finder${menuItemID}`)
  const [rows] = await pool.promise().query('SELECT * FROM MenuItemIngredients WHERE MenuItemID= ?',[menuItemID]);
  return rows;
};

const getMenuItemIngridientAll = async () => {

  const [rows] = await pool.promise().query('SELECT * FROM MenuItemIngredients ');
  return rows;
};


const getById = async (menuItemId) => {
  console.log("here in model menu")
  const [rows] = await pool.promise().query('SELECT * FROM menu_items WHERE menuItemId = ?', [menuItemId]);
  return rows[0];
};

const create = async (menuItemData) => {
  const [result] = await pool.promise().query('INSERT INTO MenuItems SET ?', menuItemData);
  return result.insertId;
};

const createIng = async (menuItemData) => {
  const [result] = await pool.promise().query('INSERT INTO MenuItemIngredients SET ?', menuItemData);
  return result.insertId;
};

const update = async (menuItemId, menuItemData) => {
  console.log("in um 1")
  const [result] = await pool.promise().query('UPDATE MenuItems SET ? WHERE menuItemId = ?', [menuItemData, menuItemId]);
  return result.affectedRows > 0;
};

const updateIng = async (menuItemId,inventoryID, menuItemData) => {
  console.log("in update model2")
  
  const [result] = await pool.promise().query('UPDATE MenuItemIngredients SET ? WHERE menuItemId = ? and inventoryID = ?', [menuItemData, menuItemId,inventoryID]);
  return result.affectedRows > 0;
};


const remove = async (menuItemId) => {
  const [result] = await pool.promise().query('DELETE FROM MenuItems WHERE menuItemId = ?', [menuItemId]);
  return result.affectedRows > 0;
};

const removeIngridient = async (menuItemId,InventoryID) => {
  const [result] = await pool.promise().query('DELETE FROM MenuItemIngredients WHERE menuItemId = ? and InventoryID = ?', [menuItemId,InventoryID]);
  return result.affectedRows > 0;
};

export { getAll, getById, create, update, remove,getMenuItemIngridient,getMenuItemIngridientAll,removeIngridient,createIng,updateIng};