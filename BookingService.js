const BookingService = {
  
  getBookedSeats: (movieId, showtime) => {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || {};
    return bookings[`${movieId}-${showtime}`]?.seats || [];
  },
