import pool from '../config/database.js';

const getManagerStats = () => {
  return Promise.all([
    new Promise((resolve, reject) => {
      pool.query('SELECT COUNT(*) as ServerCount FROM employees WHERE EmployeeRole="Server"', (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0].ServerCount);
        }
      });
    }),
    new Promise((resolve, reject) => {
      pool.query('SELECT COUNT(*) as managerCount FROM employees WHERE EmployeeRole="Manager"', (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0].managerCount);
        }
      });
    }),
    new Promise((resolve, reject) => {
      pool.query('SELECT COUNT(*) as tableCount FROM tables', (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0].tableCount);
        }
      });
    })
  ]).then(([ServerCount, managerCount, tableCount]) => {
    return { ServerCount, managerCount, tableCount };
  });
};



const getCountChef = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT COUNT(*) FROM employees WHERE EmployeeRole="Chef" ', (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getAll = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM employees', (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getById = (employeeId) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM employees WHERE employeeId = ?', [employeeId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result[0]);
      }
    });
  });
};

const update = (employeeId, employeeData) => {
  return new Promise((resolve, reject) => {
    pool.query('UPDATE employees SET ? WHERE employeeId = ?', [employeeData, employeeId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.affectedRows > 0);
      }
    });
  });
};

const remove = (employeeId) => {
  return new Promise((resolve, reject) => {
    pool.query('DELETE FROM employees WHERE employeeId = ?', [employeeId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.affectedRows > 0);
      }
    });
  });
};

const create = (employeeData) => {
  console.log("reached create")
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO employees SET ?', [employeeData], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.insertId);
      }
    });
  });
};

  const findByEmail = (email) => {
    console.log(`in findbyemail for${email}`)
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM employees WHERE Email = ?;', [email], (err, result) => {
        
        if (err) {
          console.log("erorr in fbe")
          reject(err);
        } else {
          console.log("found it")
          console.log(result[0])
          resolve(result[0]);
        }
      });
      
    });
  };

export {
  getAll,
  getById,
  update,
  remove,create, findByEmail,getCountChef, getManagerStats
};