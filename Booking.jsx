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

  const validateForm = () => {
    const newErrors = {};
    if (!userData.name.trim()) newErrors.name = "Ім'я є обов'язковим";
    if (!userData.phone.trim()) newErrors.phone = 'Телефон є обов’язковим';
    else if (!/^\+?\d{10,}$/.test(userData.phone)) newErrors.phone = 'Невірний формат телефону';
    if (!userData.email.trim()) newErrors.email = 'Email є обов’язковим';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) newErrors.email = 'Невірний формат email';
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      toast.error('Будь ласка, виберіть хоча б одне місце');
      return;
    }
    setShowForm(true);
  };

  const handleSubmitBooking = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const success = BookingService.saveBooking(id, '16:20', selectedSeats, userData);
    if (success) {
      toast.success('Бронювання успішне!');
      setSelectedSeats([]);
      setUserData({ name: '', phone: '', email: '' });
      setErrors({});
      setShowForm(false);
    }
  };

  return (
    <div className="booking-container">
      <h2>Вибір місць - Сеанс {id}</h2>
      <CinemaHall movieId={id} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} />
      <button className="pay-btn" onClick={handleBooking}>Забронювати</button>
      {showForm && (
        <div className="booking-form">
          <h3>Введіть дані для бронювання</h3>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            placeholder="Ім'я"
          />
          {errors.name && <span className="error">{errors.name}</span>}
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
            placeholder="Телефон (наприклад, +380XXXXXXXXX)"
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
          {errors.email && <span className="error">{errors.email}</span>}
          <button onClick={handleSubmitBooking}>Підтвердити</button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Booking;
