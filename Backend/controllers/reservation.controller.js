import * as reservationModel from '../models/reservation.model.js';

const getReservations = async (req, res) => {
  try {
    const reservations = await reservationModel.getAll();
    
    res.status(200).send(reservations);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getReservationCount = async (req, res) => {
  try {
    const reservations = await reservationModel.getReservationCount();
    console.log(reservations)
    res.status(200).send(reservations);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getReservation = async (req, res) => {
  try {
    const reservationId = req.params.id;
    const reservation = await reservationModel.getById(reservationId);
    if (!reservation) {
      return res.status(404).send({ message: 'Reservation not found' });
    }
    res.status(200).send(reservation);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const createReservation = async (req, res) => {
  try {
    const newReservationData = req.body;
    const reservationId = await reservationModel.create(newReservationData);
    res.status(201).send({ id: reservationId, message: 'Reservation created successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateReservation = async (req, res) => {
  try {
    const reservationId = req.params.id;
    const updatedReservationData = req.body;
    const result = await reservationModel.update(reservationId, updatedReservationData);
    if (!result) {
      return res.status(404).send({ message: 'Reservation not found' });
    }
    res.status(200).send({ message: 'Reservation updated successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteReservation = async (req, res) => {
  try {
    const reservationId = req.params.id;
    const result = await reservationModel.remove(reservationId);
    if (!result) {
      return res.status(404).send({ message: 'Reservation not found' });
    }
    res.status(200).send({ message: 'Reservation deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export { getReservations, getReservation, createReservation, updateReservation, deleteReservation,getReservationCount };