import React, { useState, useEffect, useContext } from 'react';
import { useEcom } from '../context/EcomContext';
import axios from 'axios';

function UserBookings  ()  {
    const { currentUser } = useEcom(); // Fetch the current user from context
    const [bookings, setBookings] = useState([]); // State to store the booking data
    const [loading, setLoading] = useState(true); // State to handle loading state
    const [error, setError] = useState(null); // State to handle errors

    // Fetch user's bookings when the component mounts
    useEffect(() => {
        const fetchUserBookings = async () => {
            if (!currentUser) {
                setError('User is not logged in');
                setLoading(false);
                return;
            }

            try {
                const token = localStorage.getItem('token'); // Retrieve token from local storage
                if (!token) {
                    throw new Error('No authentication token found');
                }

                const response = await axios.get('http://localhost:5000/api/bookings/bookings', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log('User bookings:', response.data);
                
                setBookings(response.data.bookings); // Set bookings data from API response
            } catch (err) {
                console.error('Error fetching user bookings:', err.message);
                setError(err.message || 'An error occurred while fetching bookings');
            } finally {
                setLoading(false);
            }
        };

        fetchUserBookings();
    }, [currentUser]);

    

    if (loading) return <div>Loading booking information...</div>; // Display loading message

    if (error) return <div>Error: {error}</div>; // Display error message

    if (bookings.length === 0) return <div>No bookings found.</div>; // Handle case with no bookings

    // Render booking information
    return (
        <div className="max-w-lg mx-auto p-6 bg-[#e4dbd2] shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">Your Bookings</h2>
            {bookings.map((booking) => (
                <div key={booking._id} className="mb-8 p-4 border-b border-gray-300">
                <p><strong>Hotel:</strong> <span className="ml-2 text-center">{booking.hotelId?.name || 'Unknown'}</span></p>
                <p><strong>Room Type:</strong> <span className="ml-2 text-center">{booking.roomType}</span></p>
                <p><strong>Check-In Date:</strong> <span className="ml-2 text-center">{new Date(booking.checkInDate).toLocaleDateString()}</span></p>
                <p><strong>Check-Out Date:</strong> <span className="ml-2 text-center">{new Date(booking.checkOutDate).toLocaleDateString()}</span></p>
                <p><strong>Guests:</strong> <span className="ml-2 text-center">{booking.guests}</span></p>
                <p><strong>Total Price:</strong> <span className="ml-2 text-center">₦{booking.totalPrice}</span></p>
                <p><strong>Guest Name:</strong> <span className="ml-2 text-center">{booking.userName}</span></p>
                <p><strong>Email:</strong> <span className="ml-2 text-center">{booking.email || 'N/A'}</span></p>
                <p><strong>Phone:</strong> <span className="ml-2 text-center">{booking.phone || 'N/A'}</span></p>
            </div>
            
            ))}
        </div>
    );
};

export default UserBookings;
