import * as tableModel from '../models/table.model.js';

const getTables = async (req, res) => {
  try {
    const tables = await tableModel.getAll();
    res.status(200).send(tables);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getTable = async (req, res) => {
  try {
    const tableId = req.params.id;
    const table = await tableModel.getById(tableId);
    if (!table) {
      return res.status(404).send({ message: 'Table not found' });
    }
    res.status(200).send(table);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const createTable = async (req, res) => {
  try {
    const newTableData = req.body;
    const tableId = await tableModel.create(newTableData);
    res.status(201).send({ id: tableId, message: 'Table created successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateTable = async (req, res) => {
  try {
    const tableId = req.params.id;
    const updatedTableData = req.body;
    const result = await tableModel.update(tableId, updatedTableData);
    if (!result) {
      return res.status(404).send({ message: 'Table not found' });
    }
    res.status(200).send({ message: 'Table updated successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteTable = async (req, res) => {
  try {
    const tableId = req.params.id;
    const result = await tableModel.remove(tableId);
    if (!result) {
      return res.status(404).send({ message: 'Table not found' });
    }
    res.status(200).send({ message: 'Table deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export { getTables, getTable, createTable, updateTable, deleteTable };