import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall';
import BookingService from '../services/BookingService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Booking.css';

function Booking() {
  const { id } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [userData, setUserData] = useState({ name: '', phone: '', email: '' });
  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="booking-container">
      <h2>Вибір місць - Сеанс {id}</h2>
      <CinemaHall />
    </div>
  );
}

export default Booking;
