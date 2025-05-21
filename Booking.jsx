import React from 'react';
import { useParams } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall';
import './Booking.css';

function Booking() {
  const { id } = useParams();

  return (
    <div className="booking-container">
      <h2>Вибір місць - Сеанс {id}</h2>
      <CinemaHall />
    </div>
  );
}

export default Booking;