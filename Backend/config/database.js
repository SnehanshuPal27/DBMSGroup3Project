// import mysql from 'mysql2/promise';
import mysql from "mysql2";
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '123456',
//   database: 'restromate',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });
const pool = mysql.createConnection ({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'restromate' // Use the name of the database you created
});

// Connect to the MySQL database
pool.connect((err) => {
  if (err) {
      console.error('Error connecting to the database: ' + err.stack);
      return;
}
  console.log('Connected to the database as ID ' + pool.threadId);
});

// (async () => {
//   try {
//     // Get a connection from the pool to check the connection status
//     const connection = await pool.getConnection();
//     console.log('Connection to the database is successful.');
//     connection.release(); // Release the connection back to the pool
//   } catch (err) {
//     console.error('Error connecting to the database:', err.message);
//   }
// })();

export default pool;
