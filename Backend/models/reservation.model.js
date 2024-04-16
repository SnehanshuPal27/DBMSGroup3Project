import pool from '../config/database.js';

const getReservationCount = async () => {
    const [rows] = await pool.promise().query('SELECT COUNT(*) FROM reservations');
    return rows[0];
  };

  const getAll = async () => {
    const [rows] = await pool.promise().query('SELECT * FROM reservations');
    console.log(rows)
    return rows;
  };  

  const create = async (newReservationData) => {
    const [result] = await pool.promise().query('INSERT INTO Reservations SET ?', newReservationData);
    return result.insertId;
  };
  

  const update = (ReservationId, ReservationData) => {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE reservations SET ? WHERE ReservationId = ?', [ReservationData, ReservationId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  };

  const remove = async (ReservationId) => {
    const [result] = await pool.promise().query('DELETE FROM Reservations WHERE ReservationID = ?', [ReservationId]);
    return result.affectedRows > 0;
  };



 export{getReservationCount,getAll,create,update,remove} 
  