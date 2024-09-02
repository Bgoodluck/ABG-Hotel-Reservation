import React from 'react';
import { useEcom } from './context/EcomContext';

const Notification = () => {
  const { notification } = useEcom();

  if (!notification) return null;

  return (
    <div className={`fixed top-4 right-4 p-4 rounded-md ${
      notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
    } text-white z-50`}>
      {notification.message}
    </div>
  );
};

export default Notification;

// notification.jsx was used instead of use alert