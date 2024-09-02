import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useEcom } from './context/EcomContext';

const BookNow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    bookNow, 
    isAuthenticated, 
    totalAmount, 
    currentBooking, 
    selectedRooms,
    user 
  } = useEcom();

  const [bookingDetails, setBookingDetails] = useState({
    Name: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    if (currentBooking) {
      setBookingDetails(prevDetails => ({
        ...prevDetails,
        ...currentBooking,
      }));
    }
    if (user) {
      setBookingDetails(prevDetails => ({
        ...prevDetails,
        Name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
      }));
    }
  }, [currentBooking, user]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const bookingData = {
        ...bookingDetails,
        rooms: selectedRooms,
        totalAmount,
        hotelId: currentBooking.hotelId,
        user,
      };
  
      await bookNow(bookingData);
  
      const res = await fetch("http://localhost:5000/api/payment/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify({
          amount: totalAmount,
          currency: "NGN",
          Name: bookingDetails.Name,
          phone: bookingDetails.phone,
          address: bookingDetails.address,
        })
      });
  
      const data = await res.json();
      if (res.ok) {
        window.location.href = data.link;
      } else {
        console.error(data.msg || "Failed to initiate payment");
        alert(data.msg || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error('Error during booking process:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };
  

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Book Now</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="Name" className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="Name"
            name="Name"
            value={bookingDetails.Name}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={bookingDetails.email}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={bookingDetails.phone}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={bookingDetails.address}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          ></textarea>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Selected Rooms:</h3>
          {selectedRooms && selectedRooms.length > 0 ? (
            selectedRooms.map((room, index) => (
              <div key={index} className="mb-2">
                <p>{room.roomType}</p>
              </div>
            ))
          ) : (
            <p>No rooms selected</p>
          )}
        </div>
        <div className="mb-6">
          <p className="text-xl font-bold">
            Total Amount: ₦{totalAmount}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Confirm Booking and Proceed to Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookNow;