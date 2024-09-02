// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';


// export const HotelContext = createContext();

// export const HotelProvider = ({ children, currentUser }) => {
//     const [hotels, setHotels] = useState([]);
//     const [hotel, setHotel] = useState(null);
//     const [hotelRooms, setHotelRooms] = useState([]);
//     const [hotelRoom, setHotelRoom] = useState(null);
//     const [loadingHotels, setLoadingHotels] = useState(false);
//     const [loadingRooms, setLoadingRooms] = useState(false);
//     const [error, setError] = useState(null);
//     const [userBookings, setUserBookings] = useState([]);

    
//     const fetchHotels = async () => {
//         setLoadingHotels(true);
//         try {
//             const response = await axios.get('http://localhost:5000/api/hotel/list');
//             setHotels(response.data.data);
//         } catch (error) {
//             setError(error.response ? error.response.data.message : error.message);
//         } finally {
//             setLoadingHotels(false);
//         }
//     };

    
//     const fetchHotelById = async (id) => {
//         setLoadingHotels(true);
//         try {
//             // console.log(`Fetching hotel by ID: ${id}`); 
//             const response = await axios.get(`http://localhost:5000/api/hotel/${id}`);
//             console.log('Hotel response:', response.data);
           
//             if (response.data) {
//                 console.log('Hotel data fetched:', response.data);  
//                 setHotel(response.data);  
//               } else {
//                 console.warn('No hotel data found');  
//               }
//         } catch (error) {
//             console.error('Failed to fetch hotel:', error); 
//             setError(error.response ? error.response.data.message : error.message);
//             setHotel(null);  
//         } finally {
//             setLoadingHotels(false);
//         }
//     };

    
//     const fetchHotelRooms = async () => {
//         setLoadingRooms(true);
//         try {
//             const response = await axios.get('http://localhost:5000/api/hotelrooms/get');
//             setHotelRooms(response.data.data);
//         } catch (error) {
//             setError(error.response ? error.response.data.message : error.message);
//         } finally {
//             setLoadingRooms(false);
//         }
//     };

    
//     const fetchHotelRoomById = async (id) => {
//         setLoadingRooms(true);
//         try {
//             const response = await axios.get(`http://localhost:5000/api/hotelrooms/${id}`);
            
//             setHotelRoom(response.data.data);
//         } catch (error) {
//             setError(error.response ? error.response.data.message : error.message);
//         } finally {
//             setLoadingRooms(false);
//         }
//     };

   

//     const setBooking = (data) => {
//         setBookingData(data);
//         setCurrentBooking(data);
//       };
    
//       const createBooking = async (bookingData) => {
//         try {
//           if (!/^[0-9a-fA-F]{24}$/.test(bookingData.hotelId)) {
//             throw new Error('Invalid hotelId format');
//           }
    
//           const token = localStorage.getItem('token');
//           if (!token) {
//             throw new Error('No authentication token found');
//           }
          
//           console.log('Received token:', token);
//           console.log("Booking data before sending to backend:", bookingData);
    
//           if (!bookingData.userId || !bookingData.hotelId || !bookingData.totalPrice) {
//             throw new Error('userId, hotelId, or totalPrice is missing in bookingData');
//           }
      
//           const response = await axios.post("http://localhost:5000/api/bookings/create", bookingData, {
//             headers: {
//               'Authorization': `Bearer ${token}`
//             }
//           });
      
//           if (response.data.success) {
//             return response.data;
//           } else {
//             throw new Error(response.data.message || 'Failed to create booking');
//           }
//         } catch (error) {
//           console.error("Error creating booking:", error.response?.data || error.message);
//           throw error;
//         }
//       };
    
    
//     const fetchUserBookings = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 throw new Error('No authentication token found');
//             }
    
//             const response = await axios.get('http://localhost:5000/api/bookings/bookings', {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
    
//             if (response.status === 200 && response.data.success) {
//                 setUserBookings(response.data.bookings); 
//                 return response.data.bookings; 
//             } else {
//                 throw new Error(response.data.message || 'Failed to fetch user bookings');
//             }
//         } catch (error) {
//             console.error('Error fetching user bookings:', error.response ? error.response.data : error.message);
//             alert(error.message); 
//             throw error;
//         }
//     };
    

//     return (
//         <HotelContext.Provider value={{
//             hotels,
//             hotel,
//             hotelRooms,
//             hotelRoom,
//             loadingHotels,
//             loadingRooms,
//             error,
//             fetchHotels,
//             fetchHotelById,
//             fetchHotelRooms,
//             fetchHotelRoomById,
//             createBooking,
//             fetchUserBookings,
//             userBookings,
//         }}>
//             {children}
//         </HotelContext.Provider>
//     );
// };


import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const HotelContext = createContext();

export const HotelProvider = ({ children, currentUser }) => {
    const [hotels, setHotels] = useState([]);
    const [hotel, setHotel] = useState(null);
    const [hotelRooms, setHotelRooms] = useState([]);
    const [hotelRoom, setHotelRoom] = useState(null);
    const [loadingHotels, setLoadingHotels] = useState(false);
    const [loadingRooms, setLoadingRooms] = useState(false);
    const [error, setError] = useState(null);
    const [userBookings, setUserBookings] = useState([]);

    // Fetch all hotels
    const fetchHotels = async () => {
        setLoadingHotels(true);
        try {
            const response = await axios.get('http://localhost:5000/api/hotel/list');
            setHotels(response.data.data);
        } catch (error) {
            setError(error.response ? error.response.data.message : error.message);
        } finally {
            setLoadingHotels(false);
        }
    };

    // Fetch a single hotel by ID
    const fetchHotelById = async (id) => {
        setLoadingHotels(true);
        try {
            const response = await axios.get(`http://localhost:5000/api/hotel/${id}`);
            setHotel(response.data);
        } catch (error) {
            setError(error.response ? error.response.data.message : error.message);
            setHotel(null);
        } finally {
            setLoadingHotels(false);
        }
    };

    // Fetch all hotel rooms
    const fetchHotelRooms = async () => {
        setLoadingRooms(true);
        try {
            const response = await axios.get('http://localhost:5000/api/hotelrooms/get');
            setHotelRooms(response.data.data);
        } catch (error) {
            setError(error.response ? error.response.data.message : error.message);
        } finally {
            setLoadingRooms(false);
        }
    };

    // Fetch a single hotel room by ID
    const fetchHotelRoomById = async (id) => {
        setLoadingRooms(true);
        try {
            const response = await axios.get(`http://localhost:5000/api/hotelrooms/${id}`);
            setHotelRoom(response.data.data);
        } catch (error) {
            setError(error.response ? error.response.data.message : error.message);
        } finally {
            setLoadingRooms(false);
        }
    };

    // Create a booking
    const createBooking = async (bookingData) => {
        try {
            if (!/^[0-9a-fA-F]{24}$/.test(bookingData.hotelId)) {
                throw new Error('Invalid hotelId format');
            }

            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await axios.post("http://localhost:5000/api/bookings/create", bookingData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.data.success) {
                return response.data;
            } else {
                throw new Error(response.data.message || 'Failed to create booking');
            }
        } catch (error) {
            console.error("Error creating booking:", error.response?.data || error.message);
            throw error;
        }
    };

    // Fetch user bookings
    const fetchUserBookings = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await axios.get('http://localhost:5000/api/bookings/bookings', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.status === 200 && response.data.success) {
                setUserBookings(response.data.bookings);
                return response.data.bookings;
            } else {
                throw new Error(response.data.message || 'Failed to fetch user bookings');
            }
        } catch (error) {
            console.error('Error fetching user bookings:', error.response ? error.response.data : error.message);
            alert(error.message);
            throw error;
        }
    };

    return (
        <HotelContext.Provider value={{
            hotels,
            hotel,
            hotelRooms,
            hotelRoom,
            loadingHotels,
            loadingRooms,
            error,
            fetchHotels,
            fetchHotelById,
            fetchHotelRooms,
            fetchHotelRoomById,
            createBooking,
            fetchUserBookings,
            userBookings,
        }}>
            {children}
        </HotelContext.Provider>
    );
};
