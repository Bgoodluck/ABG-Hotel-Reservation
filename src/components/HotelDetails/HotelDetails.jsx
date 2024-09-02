import React, { useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { HotelContext } from '../context/HotelContext';

const HotelDetails = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const {
    hotel,
    fetchHotelById,
    fetchHotelRooms,
    hotelRooms,
    loading,
    error
  } = useContext(HotelContext);

  useEffect(() => {
    const loadHotelData = async () => {
      try {
        await fetchHotelById(hotelId); 
        await fetchHotelRooms();  
      } catch (error) {
        console.error('Error loading hotel data:', error);
      }
    };
    loadHotelData();
  }, [hotelId, fetchHotelById, fetchHotelRooms]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  if (!hotel) {
    return <div className="text-center py-10">Hotel not found</div>;
  }

  const roomsForHotel = hotelRooms.filter(room => room.hotel._id === hotel._id);

  const handleRoomSelection = (room) => {
    
    localStorage.setItem('selectedRoom', JSON.stringify(room));
    
    navigate(`/app/hotel/${hotelId}/checkin`, {
      state: {
        hotelId: hotel._id,
        roomType: room.name,
        pricePerNight: room.price
      }
    });
  };

  const hotelImage = Array.isArray(hotel.image) && hotel.image.length > 0 
    ? `http://localhost:5000/${hotel.image[0]}` 
    : 'default-image.jpg';

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">{hotel.name}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <img 
            src={`http://localhost:5000/${Array.isArray(hotel.image) ? hotel.image[0] : hotel.image}`} 
            className="w-full h-96 object-cover rounded-lg" 
            alt={hotel.name || 'Hotel Image'} 
          />
        </div>
        <div>
          <p className="text-lg text-gray-600 mb-4">{hotel.description}</p>
          <div className="mb-4">
            <h2 className="text-2xl font-bold">Address</h2>
            <p>{hotel.address.street}, {hotel.address.area}, {hotel.address.city}, {hotel.address.country}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-2xl font-bold">Amenities</h2>
            <ul className="list-disc pl-5">
              {hotel.amenities.map((amenity, index) => (
                <li key={index} className="text-lg">{amenity}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-3xl font-bold mb-4">Available Rooms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roomsForHotel.length > 0 ? roomsForHotel.map((room) => (
            <div key={room._id} className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
              <p className="text-[#b99470] mb-2"><b>Price: ₦{room.price} / night</b></p>
              <p className="text-sm text-gray-500 mb-4">{room.description.substring(0, 100)}...</p>
              <img 
                src={`http://localhost:5000/${room.image && room.image.length > 0 ? room.image[0] : 'default-room-image.jpg'}`} 
                className="w-full h-32 object-cover rounded" 
                alt={room.name || 'Room Image'} 
              />
              <button 
                className="mt-4 bg-[#b99470] text-white px-4 py-2 rounded hover:bg-[#cfc8c1] transition duration-300"
                onClick={() => handleRoomSelection(room)}
              >
                Select Room
              </button>
            </div>
          )) : <p>No rooms available</p>}
        </div>
      </div>
      <div className="flex justify-between items-center mt-8">
        <Link to="/app/listing" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300">
          Back to Hotels
        </Link>
        <Link to={`/app/hotel/${hotelId}/checkin`} className="bg-[#b99470] text-white px-4 py-2 rounded hover:bg-blue-300 transition duration-300">
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default HotelDetails;
