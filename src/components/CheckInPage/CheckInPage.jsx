import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEcom } from '../context/EcomContext';
import { HotelContext } from '../context/HotelContext';

const CheckinPage = () => {
    const { currentUser } = useEcom();
    const { hotel, createBooking } = useContext(HotelContext);
    const navigate = useNavigate();

    const [roomType, setRoomType] = useState('');
    const [pricePerNight, setPricePerNight] = useState(0);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [guests, setGuests] = useState(1);
    const [guestName, setGuestName] = useState(currentUser?.UserName || '');
    const [email, setEmail] = useState(currentUser?.email || '');
    const [phone, setPhone] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (currentUser) {
            setLoading(false);
            setGuestName(currentUser.UserName);
            setEmail(currentUser.email);
        }
    }, [currentUser]);

    useEffect(() => {
        const selectedRoom = JSON.parse(localStorage.getItem('selectedRoom'));
        if (selectedRoom) {
            setRoomType(selectedRoom.name);
            setPricePerNight(selectedRoom.price);
        }
    }, []);

    useEffect(() => {
        if (checkInDate && checkOutDate) {
            const checkIn = new Date(checkInDate);
            const checkOut = new Date(checkOutDate);
            const days = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
            setTotalPrice(days * pricePerNight * guests);
        }
    }, [checkInDate, checkOutDate, guests, pricePerNight]);

    const handleBooking = async (e) => {
        e.preventDefault();

        const userId = currentUser?._id || localStorage.getItem('userId');

        if (!userId) {
            setError('User is not logged in');
            return;
        }

        if (!hotel || !roomType || !checkInDate || !checkOutDate || !totalPrice || !guestName || guests < 1) {
            setError('All fields are required');
            return;
        }

        try {
            const bookingData = {
                userId,
                hotelId: hotel._id,
                roomType,
                checkInDate,
                checkOutDate,
                totalPrice,
                guests,
                userName: guestName,
                email,
                phone,
            };

            const response = await createBooking(bookingData);
            console.log('Booking successful:', response);

            if (response.success) {
                navigate('/app/payment', { state: { bookingData: { ...bookingData, bookingId: response.booking._id } } });
            } else {
                setError(response.message || 'Booking failed');
            }
        } catch (err) {
            console.error('Error during booking:', err.message);
            setError(err.message || 'An error occurred');
        }
    };

    if (loading) {
        return <div>Loading user data...</div>;
    }

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Book Your Stay</h2>
            {error && <div className="mb-4 text-red-500">{error}</div>}
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Hotel: {hotel?.name}</h3>
                <p className="text-gray-700">Room Type: {roomType}</p>
                <p className="text-gray-700">Price per Night: ₦{pricePerNight || 'N/A'}</p>
            </div>
            <form onSubmit={handleBooking}>
                <div className="mb-4">
                    <label className="block text-gray-700">Guest Name</label>
                    <input
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Phone Number</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Check-In Date</label>
                    <input
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Check-Out Date</label>
                    <input
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Number of Guests</label>
                    <input
                        type="number"
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full px-3 py-2 border rounded"
                        min="1"
                        required
                    />
                </div>
                <div className="mb-4">
                    <h4 className="text-lg font-semibold">Total Price: ₦{totalPrice || 'N/A'}</h4>
                </div>
                <button
                    type="submit"
                    className="w-full bg-[#b99470] text-white hover:text-black py-2 rounded hover:bg-[#d0c6bb] transition duration-300"
                >
                    Confirm Booking
                </button>
            </form>
        </div>
    );
};

export default CheckinPage;



