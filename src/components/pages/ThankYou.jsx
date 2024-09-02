import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { HotelContext } from '../context/HotelContext';

const ThankYou = () => {
  const { userBookings, fetchUserBookings } = useContext(HotelContext);
  const [currentBooking, setCurrentBooking] = useState(null);

  useEffect(() => {
   
    const getBookingData = async () => {
      if (userBookings.length > 0) {
        console.log('User Bookings:', userBookings);
        setCurrentBooking(userBookings[userBookings.length - 1]); 
      } else {
        await fetchUserBookings();
        if (userBookings.length > 0) {
          setCurrentBooking(userBookings[userBookings.length - 1]);
        }
      }
    };
    getBookingData();
  }, [userBookings, fetchUserBookings]);


  useEffect(() => {
    if (currentBooking) {
      console.log('Current Booking:', currentBooking);
    }
  }, [currentBooking]);

  if (!currentBooking && userBookings.length === 0) {
    return <div>Loading...</div>;
  }

  const bookingData = currentBooking || (userBookings.length > 0 && userBookings[userBookings.length - 1]);

  if (!bookingData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#e6ded7] px-4 py-8">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <img
          src="/img/thank_you.jpg"
          alt="Thank You"
          className="mx-auto max-w-[200px] mb-6"
        />
        <h1 className="text-[#b99470] text-4xl font-bold mb-4">Thank You!</h1>
        <p className="text-gray-700 text-xl mb-3">
          We appreciate your business and hope you enjoy your stay with the choice of your hotel selected.
        </p>
        <p className="text-gray-600 mb-4">
          Your booking has been confirmed and details have been sent to your email.
        </p>
        <div className="bg-gray-100 p-4 rounded-md text-left mb-6">
          <h2 className="font-bold text-lg mb-2">Booking Details:</h2>
          <p><strong>Booking ID:</strong> {bookingData._id || 'N/A'}</p>
          <p><strong>Hotel Name:</strong> {bookingData.hotelId?.name || 'N/A'}</p>
          <p><strong>Room Type:</strong> {bookingData.roomType || 'N/A'}</p>
          <p><strong>Check-in Date:</strong> {new Date(bookingData.checkInDate).toLocaleDateString()}</p>
          <p><strong>Check-out Date:</strong> {new Date(bookingData.checkOutDate).toLocaleDateString()}</p>
          <p><strong>Number of Guests:</strong> {bookingData.guests}</p>
          <p><strong>Total Amount:</strong> ₦{bookingData.totalPrice.toFixed(2)}</p>
          <p><strong>Username:</strong> {bookingData.userName || 'N/A'}</p>
          <p><strong>Email:</strong> {bookingData.email || 'N/A'}</p>
          <p><strong>Phone:</strong> {bookingData.phone || 'N/A'}</p>
        </div>
        <Link
          to="/app"
          className="inline-block px-6 py-3 bg-[#b99470] text-white rounded-md hover:bg-cyan-200 transition duration-300"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
