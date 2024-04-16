import * as customerModel from '../models/customer.model.js';

const getCustomers = async (req, res) => {
  try {
    const customers = await customerModel.getAll();
    res.status(200).send(customers);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getHighestCustomerIndex = async (req, res) => {
  try {
    console.log("in controller customer");
    const orders = await customerModel.getHighestIndex();
    
    if (orders.length > 0) {
      const result = orders[0][0];
      console.log(result);
      res.send(result);
    } else {
      res.send({ message: "No customers found." });
    }
  } catch (err) {
    console.log("in controller customer error");
    res.status(500).send({ message: err.message });
  }
};


const getCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await customerModel.getById(customerId);
    if (!customer) {
      return res.status(404).send({ message: 'Customer not found' });
    }
    res.status(200).send(customer);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getCustomerByEmail = async (req, res) => {
  try {
    
    console.log(req)
    const customerEmail = req.body;
    const customer = await customerModel.getByEmail(customerEmail);
    if (!customer) {
      return res.status(404).send({ message: 'Customer not found' });
    }
    res.status(200).send(customer);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const createCustomer = async (req, res) => {
  try {
    const newCustomerData = req.body;
    console.log(newCustomerData)
    const customerId = await customerModel.create(newCustomerData);
    res.status(201).send({ id: customerId, message: 'Customer created successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateCustomer = async (req, res) => {
  try {
    console.log("in update customer")
    const customerId = req.params.id;
    const updatedCustomerData = req.body;
    const result = await customerModel.update(customerId, updatedCustomerData);
    if (!result) {
      return res.status(404).send({ message: 'Customer not found' });
    }
    res.status(200).send({ message: 'Customer updated successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const result = await customerModel.remove(customerId);
    if (!result) {
      return res.status(404).send({ message: 'Customer not found' });
    }
    res.status(200).send({ message: 'Customer deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export { getCustomers, getCustomer, createCustomer, updateCustomer, deleteCustomer,getHighestCustomerIndex,getCustomerByEmail };