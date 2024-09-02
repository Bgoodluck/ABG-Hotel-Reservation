import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HotelContext } from '../components/context/HotelContext';

const RoomFeatured = () => {
  const {
    hotelRoom,
    hotel,
    fetchHotelRoomById,
    fetchHotelById,
    loadingRooms,
    loadingHotels,
    error,
  } = useContext(HotelContext);
  const { roomId } = useParams();
  const navigate = useNavigate();

  
  useEffect(() => {
    if (roomId) {
      console.log('Fetching room by ID:', roomId); 
      fetchHotelRoomById(roomId);
    } else {
      console.error('Room ID is undefined or invalid.');
    }
  }, [roomId]);

  
  useEffect(() => {
    if (hotelRoom && hotelRoom.hotelId) {
      console.log('Fetching hotel with ID:', hotelRoom.hotelId); 
      fetchHotelById(hotelRoom.hotelId);
    }
  }, [hotelRoom]);

  useEffect(() => {
    console.log('Current hotel state:', hotel);  
  }, [hotel]);
  

  const handleRoomSelection = () => {
    navigate("/app/listing", {
      state: { searchQuery: hotelRoom.name }, // Passing the room name as the search query
    });
  };
  

//   if (loadingRooms) return <div className="text-center py-8 text-gray-700">Loading room details...</div>;
//   if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  if (loadingRooms || loadingHotels) {
    return <div className="text-center py-8 text-gray-700">Loading room and hotel details...</div>;
  }
  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }
  

  return (
    <div className="container mx-auto p-4">
      {hotelRoom ? (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
          <img
            src={`https://abg-hotel-reservation-api.onrender.com/${hotelRoom.image && hotelRoom.image.length > 0 ? hotelRoom.image[0] : 'default-room-image.jpg'}`}
            alt={hotelRoom.name}
            className="w-full h-64 object-cover object-center transition-opacity duration-500 ease-in-out hover:opacity-80"
          />
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">{hotelRoom.name}</h2>
            <p className="text-gray-600 mb-4">{hotelRoom.description}</p>
            <h3 className="text-lg font-semibold text-green-600 mb-4">Price: ₦{hotelRoom.price}</h3>

            {/* Hotel Details */}
            {hotel ? (
              <div className="bg-gray-100 p-4 rounded-md mb-4">
                <h4 className="text-lg font-bold text-gray-700 flex items-center">
                  Hotel Name:
                  <button
                    onClick={() => navigate(`/app/hotel/${hotelRoom.hotelId}`)}
                    className="text-blue-500 hover:underline ml-2"
                  >
                    {hotel.name}
                  </button>
                </h4>
                <p className="text-gray-500">Location: {hotel.location}</p>
              </div>
            ) : (
              <div className="text-gray-500">Click the button below for Hotel details.</div>
            )}

            <button
              onClick={handleRoomSelection}
              className="bg-[#b99470] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#d0c6bb] focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-300"
            >
              Select this Room
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-700">Room not found</div>
      )}
    </div>
  );
};

export default RoomFeatured;

