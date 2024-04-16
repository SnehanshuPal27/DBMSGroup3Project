import jwt from 'jsonwebtoken';
import config from '../config/auth.config.js';

const verifyToken = (req, res, next) => {
  // console.log(req)
  const token = req.headers.authorization;
  console.log(token);
  
  if (!token) {
    console.log("token error")
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

const isManager = (req, res, next) => {
  // console.log("in Ismanager")
  // console.log(req.headers.userrole)
  // if (req.userRole !== 'Manager') {
    console.log("in manager detect middleware")
    if (req.headers.userrole!== 'Manager') {
    return res.status(403).send({ message: 'Require Manager Role!' });
  }
  next();
};

const isServerOrManager = (req, res, next) => {
  // console.log("in isServerOrManager");
  // console.log(req.headers.userrole);
  if (req.headers.userrole !== 'Server' && req.headers.userrole !== 'Manager') {
    return res.status(403).send({ message: 'Require Server or Manager Role!' });
  }
  next();
};
const isServer = (req, res, next) => {
  if (req.userRole !== 'Server') {
    return res.status(403).send({ message: 'Require Server Role!' });
  }
  next();
};

const isChef = (req, res, next) => {
  if (req.userRole !== 'Chef') {
    return res.status(403).send({ message: 'Require Chef Role!' });
  }
  next();
};

export { verifyToken, isManager, isServer, isChef,isServerOrManager };