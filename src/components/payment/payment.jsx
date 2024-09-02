import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { HotelContext } from '../../components/context/HotelContext';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchUserBookings } = useContext(HotelContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initiatePayment = async () => {
      try {
        const bookingData = location.state?.bookingData;

        if (!bookingData) {
          setError('No booking data found');
          setLoading(false);
          return;
        }

        const token = localStorage.getItem('token');
        
        if (!token) {
          navigate('/app/login');
          return;
        }

        console.log("Payment data:", {
          userId: bookingData.userId,
          bookingId: bookingData.bookingId,
          amount: bookingData.totalPrice,
          email: bookingData.email,
          phone: bookingData.phone,
          userName: bookingData.userName,
        });

        const response = await axios.post('http://localhost:5000/api/payment/create', {
          userId: bookingData.userId,
          bookingId: bookingData.bookingId,
          amount: bookingData.totalPrice,
          email: bookingData.email,
          phone: bookingData.phone,
          userName: bookingData.userName,
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.status === "success") {
          
          window.location.href = response.data.data.link;
          await fetchUserBookings();
        } else {
          setError(response.data.message || 'Failed to initiate payment');
        }
      } catch (error) {
        console.error('Payment initiation error:', error);
        setError(error.response?.data?.message || 'An error occurred while initiating the payment');
      } finally {
        setLoading(false);
      }
    };

    initiatePayment();
  }, [location, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Payment Processing</h1>
      {error && <p className="text-red-600">{error}</p>}
      {loading && !error && (
        <div className="flex flex-col items-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-blue-400 h-24 w-24 mb-4"></div>
          <p className="text-blue-600 font-semibold">Please wait while we redirect you to the payment gateway...</p>
        </div>
      )}
    </div>
  );
};

export default Payment;