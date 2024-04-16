import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/auth.config.js';
import * as employeeModel from '../models/employee.model.js';

const signup = async (req, res) => {
  try {
    console.log("signup called")
    const { name, email, password, role,hireDate,salary } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newEmployee = {
      employeeName: name,
      email,
      password: hashedPassword,
      employeeRole: role,
      hireDate:hireDate,
      salary: salary
    };

    const employeeId = await employeeModel.create(newEmployee);
    res.status(201).send({ id: employeeId, message: 'Employee created successfully' });
  } catch (err) {
    console.log("error in signup fxn")
    res.status(500).send({ message: err.message });
  }
};

const signin = async (req, res) => {
  try {
    console.log("signin called");
    const { email, password } = req.body;
    console.log(email);
    const employee = await employeeModel.findByEmail(email);
    console.log("hello")
    console.log(employee.Password)
    if (!employee) {
      return res.status(404).send({ message: 'Employee not found' });
    }
    
    
    const passwordIsValid = await bcrypt.compare(password, employee.Password);
    console.log("mello")
    console.log(`pass status:${passwordIsValid}`)
    if (!passwordIsValid) {
      console.log("sending invalid")
      return res.status(401).send({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: employee.employeeId, role: employee.employeeRole }, config.secret, { expiresIn: '1h' });
    console.log("sent results")
    res.status(200).send({ id: employee.EmployeeID, role: employee.EmployeeRole, accessToken: token,name:employee.EmployeeName });
  } catch (err) {
    console.log("sending error")
    res.status(500).send({ message: err.message });
  }
};

export { signup, signin };