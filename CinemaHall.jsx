import React, { useState, useEffect } from 'react';
import BookingService from '../services/BookingService';
import './CinemaHall.css';

function CinemaHall({
  movieId,
  selectedSeats,
  setSelectedSeats,
  onBookClick,
  showForm,
  setShowForm,
  userData,
  handleInputChange,
  errors,
  handleSubmitBooking,
}) {
  const [seats, setSeats] = useState([]);
  const [showtimes] = useState(['16:20', '17:00', '17:40', '19:00']);
  const [selectedShowtime, setSelectedShowtime] = useState('16:20');
  const [seatsByShowtime, setSeatsByShowtime] = useState({});

  const generateSeats = () => {
    return Array(96).fill().map((_, index) => {
      const row = Math.floor(index / 12) + 1;
      const isSuperLux = row >= 7;
      const isBooked = Math.random() < 0.3;
      return {
        id: index + 1,
        row,
        booked: isBooked,
        selected: false,
        type: isSuperLux ? 'SUPER LUX' : 'GOOD',
        price: isSuperLux ? 270 : 160,
      };
    });
  };

  useEffect(() => {
    if (!seatsByShowtime[selectedShowtime]) {
      const newSeats = generateSeats();
      const bookedSeats = BookingService.getBookedSeats(movieId, selectedShowtime);
      const updatedSeats = newSeats.map(seat => ({
        ...seat,
        booked: bookedSeats.includes(seat.id) || seat.booked,
      }));
      setSeatsByShowtime(prev => ({
        ...prev,
        [selectedShowtime]: updatedSeats,
      }));
      setSeats(updatedSeats);
    } else {
      const currentSeats = seatsByShowtime[selectedShowtime];
      const bookedSeats = BookingService.getBookedSeats(movieId, selectedShowtime);
      const updatedSeats = currentSeats.map(seat => ({
        ...seat,
        selected: selectedSeats.includes(seat.id),
        booked: bookedSeats.includes(seat.id) || seat.booked,
      }));
      setSeats(updatedSeats);
      setSeatsByShowtime(prev => ({
        ...prev,
        [selectedShowtime]: updatedSeats,
      }));
    }
  }, [selectedShowtime, seatsByShowtime, selectedSeats, movieId]);

  const handleSeatClick = (seatId) => {
    const seat = seats.find(s => s.id === seatId);
    if (!seat.booked) {
      const updatedSeats = seats.map(s =>
        s.id === seatId ? { ...s, selected: !s.selected } : s
      );
      setSeats(updatedSeats);
      setSelectedSeats(prev => {
        const newSelected = prev.includes(seatId)
          ? prev.filter(id => id !== seatId)
          : [...prev, seatId];
        return newSelected;
      });
      setSeatsByShowtime(prev => ({
        ...prev,
        [selectedShowtime]: updatedSeats,
      }));
    }
  };

  const handleShowtimeClick = (time) => {
    setSelectedShowtime(time);
  };

  return (
    <div className="cinema-hall-container">
      <div className="hall-content">
        <div className="seats-container">
          <div className="screen">ЕКРАН</div>
          <div className="seats-layout">
            {seats.map(seat => (
              <div
                key={seat.id}
                className={`seat ${seat.booked ? 'booked' : ''} ${seat.selected ? 'selected' : ''} ${seat.type === 'SUPER LUX' ? 'super-lux' : 'good'}`}
                onClick={() => handleSeatClick(seat.id)}
                title={`${seat.type} - ${seat.price} грн`}
              />
            ))}
          </div>
        </div>
        <div className="booking-info">
          <div className="legend">
            <span className="legend-item good">GOOD - 160 грн</span>
            <span className="legend-item super-lux">SUPER LUX - 270 грн</span>
            <span className="legend-item booked">Заброньовано</span>
          </div>
          <div className="showtimes">
            {showtimes.map(time => (
              <button
                key={time}
                className={`showtime-btn ${selectedShowtime === time ? 'active' : ''}`}
                onClick={() => handleShowtimeClick(time)}
              >
                {time}
              </button>
            ))}
          </div>
          <div className="selected-seats">
            Вибрані місця: {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Немає'}
          </div>
          <div className="total-price">
            Загальна сума: {selectedSeats.reduce((sum, id) => {
              const seat = seats.find(s => s.id === id);
              return sum + (seat ? seat.price : 0);
            }, 0)} грн
          </div>
          <button className="pay-btn" onClick={onBookClick}>Забронювати</button>
        </div>
      </div>
    </div>
  );
}

export default CinemaHall;
