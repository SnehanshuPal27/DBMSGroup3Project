import * as supplierModel from '../models/supplier.model.js';

const getSuppliers = async (req, res) => {
  try {
    const suppliers = await supplierModel.getAll();
    res.status(200).send(suppliers);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getSupplier = async (req, res) => {
  try {
    const supplierId = req.params.id;
    const supplier = await supplierModel.getById(supplierId);
    if (!supplier) {
      return res.status(404).send({ message: 'Supplier not found' });
    }
    res.status(200).send(supplier);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const createSupplier = async (req, res) => {
  try {
    const newSupplierData = req.body;
    const supplierId = await supplierModel.create(newSupplierData);
    res.status(201).send({ id: supplierId, message: 'Supplier created successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateSupplier = async (req, res) => {
  try {
    const supplierId = req.params.id;
    const updatedSupplierData = req.body;
    const result = await supplierModel.update(supplierId, updatedSupplierData);
    if (!result) {
      return res.status(404).send({ message: 'Supplier not found' });
    }
    res.status(200).send({ message: 'Supplier updated successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteSupplier = async (req, res) => {
  try {
    const supplierId = req.params.id;
    const result = await supplierModel.remove(supplierId);
    if (!result) {
      return res.status(404).send({ message: 'Supplier not found' });
    }
    res.status(200).send({ message: 'Supplier deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export { getSuppliers, getSupplier, createSupplier, updateSupplier, deleteSupplier };