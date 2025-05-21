const BookingService = {
  
  getBookedSeats: (movieId, showtime) => {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || {};
    return bookings[`${movieId}-${showtime}`]?.seats || [];
  },
saveBooking: (movieId, showtime, seats, userData) => {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || {};
    bookings[`${movieId}-${showtime}`] = {
      seats,
      userData,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('bookings', JSON.stringify(bookings));
    return true;
  },
};

export default BookingService;
