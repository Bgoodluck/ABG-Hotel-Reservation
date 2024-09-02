import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import axios from "axios";
import { HotelProvider } from "./HotelContext";  

const EcomContext = createContext();

export const useEcom = () => useContext(EcomContext);

export const EcomProvider = ({ children }) => {
  const initialUser = JSON.parse(localStorage.getItem('userProfile'));
  const url = "https://abg-hotel-reservation-api.onrender.com";

  const [searchCriteria, setSearchCriteria] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  });
  
  const [currentUser, setCurrentUser] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [authError, setAuthError] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [userBookings, setUserBookings] = useState([]);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [userProfile, setUserProfile] = useState(initialUser);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCurrentUser(user);
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    }
  }, []);

  const filteredHotels = useMemo(() => {
    return []; 
  }, [searchCriteria.location]);

  const searchHotels = (criteria) => {
    setSearchCriteria(criteria);
  };

  const signup = async (username, email, password) => {
    try {
      const response = await axios.post('https://abg-hotel-reservation-api.onrender.com/api/user/register', {
        UserName: username, email, password
      });
      const { user, token } = response.data;

      if (response.data.success) {
        setCurrentUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setAuthError(null);
      } else {
        setAuthError(response.data.message);
      }
      return response.data;
    } catch (error) {
      console.error('Signup error:', error);
      setAuthError('An error occurred during signup');
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('https://abg-hotel-reservation-api.onrender.com/api/user/login', {
        email, password
      });
      const { user, token } = response.data;

      if (response.data.success) {
        setCurrentUser(user);
        setUserProfile(user.profile || {});
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        localStorage.setItem('userProfile', JSON.stringify(user.profile || {}));
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setAuthError(null);
      } else {
        setAuthError(response.data.message);
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      setAuthError('An error occurred during login');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('userProfile');
    delete axios.defaults.headers.common['Authorization'];
    setAuthError(null);
  };

  const getUserProfile = async () => {
    try {
      const token = localStorage.getItem("token"); 
      const response = await axios.get(url + "/api/profile", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserProfile(response.data.profile);
      localStorage.setItem('userProfile', JSON.stringify(response.data.profile));
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const updateUserProfile = async (profileData) => {
    try {
      setError(null);
      setSuccess(false);
      const token = localStorage.getItem("token"); 
  
      let response;
      if (profileData instanceof FormData) {
        response = await axios.post(url + "/api/profile/update", profileData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        });
      } else {
        response = await axios.post(url + "/api/profile/update", profileData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
  
      setUserProfile(response.data.profile);
      localStorage.setItem('userProfile', JSON.stringify(response.data.profile));
      setSuccess(true);
      await getUserProfile(); 
    } catch (error) {
      console.error("Error updating user profile:", error);
      setError('Error updating profile');
    }
  };

  return (
    <EcomContext.Provider value={{
      searchCriteria,
      searchHotels,
      signup,
      login,
      logout,
      currentUser,
      totalAmount,
      authError,
      setAuthError,
      getUserProfile,
      userProfile,
      updateUserProfile,
      error,
      success,
      filteredHotels
    }}>
      <HotelProvider currentUser={currentUser}>
        {children}
      </HotelProvider>
    </EcomContext.Provider>
  );
};
