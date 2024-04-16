import pool from '../config/database.js';

const getAll = async () => {
    console.log("in inventory model")
  const [rows] = await pool.promise().query('SELECT * FROM Inventory');
  return rows;
};

const updateInventory = async (req) => {
  console.log("in inventory model");

  const { InventoryID, Quantity } = req.body;

  const [result] = await pool.promise().query(
    'UPDATE Inventory SET Quantity = ? WHERE InventoryID = ?',
    [Quantity, InventoryID]
  );

  if (result.affectedRows === 0) {
    // No rows were updated
    return { message: 'No inventory item found with the provided InventoryID' };
  }

  return { message: 'Inventory updated successfully' };
};

const update = async (InventoryId, InventoryData) => {
  console.log(InventoryData)
  const [result] = await pool.promise().query('UPDATE Inventory SET ? WHERE InventoryId = ?', [InventoryData,InventoryId]);
  return result.affectedRows > 0;
};

const remove = async (InventoryId) => {
  const [result] = await pool.promise().query('DELETE FROM Inventory WHERE InventoryId = ?', [InventoryId]);
  return result.affectedRows > 0;
};

const create = async (InventoryItemData) => {
  const [result] = await pool.promise().query('INSERT INTO Inventory SET ?', InventoryItemData);
  return result.insertId;
};


export{ getAll,updateInventory,remove,create,update}