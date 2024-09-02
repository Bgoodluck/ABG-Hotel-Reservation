import React from 'react';
import { Link } from 'react-router-dom';

export const PaymentSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-green-600">Payment Successful!</h1>
      <p className="mb-4">Your booking has been confirmed.</p>
      <Link to="/bookings" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        View Your Bookings
      </Link>
    </div>
  );
};

