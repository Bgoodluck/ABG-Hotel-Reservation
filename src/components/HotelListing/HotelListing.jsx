import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HotelContext } from '../../components/context/HotelContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const HotelListing = () => {
  const { hotels = [], hotelRooms = [], fetchHotels, fetchHotelRooms } = useContext(HotelContext);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState(location.state?.searchQuery || '');
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [hotelLocation, setHotelLocation] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([fetchHotels(), fetchHotelRooms()]);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [fetchHotels, fetchHotelRooms]);

  const handleLocationClick = useCallback(async (address) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`);
      const data = await response.json();
      if (data.length > 0) {
        const newLocation = {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
          address: address,
        };
        setHotelLocation(newLocation);
        setShowPopup(true);
      } else {
        const fallbackLocation = {
          lat: 0,
          lng: 0,
          address: "Location not found",
        };
        setHotelLocation(fallbackLocation);
        setShowPopup(true);
        alert("Couldn't find the exact location. Showing a default map.");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      alert("An error occurred while fetching the location. Please try again.");
    }
  }, []);

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotelRooms.some(
      (room) =>
        room.hotel._id === hotel._id &&
        room.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Hotels</h1>
      <input
        type="text"
        className="w-[40%] flex justify-center mb-6 p-2 border rounded"
        placeholder="Search for hotels or rooms..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.length === 0 ? (
          <p>No hotels available</p>
        ) : (
          filteredHotels.map((hotel) => {
            const roomsForHotel = hotelRooms.filter(
              (room) =>
                room.hotel._id === hotel._id &&
                room.name.toLowerCase().includes(searchQuery.toLowerCase())
            );

            const formattedAddress = hotel.address ? `${hotel.address.street}, ${hotel.address.area}, ${hotel.address.city}, ${hotel.address.country}` : "Address not available";

            return (
              <div key={hotel._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={`http://localhost:5000/${
                    Array.isArray(hotel.image) ? hotel.image[0] : hotel.image
                  }`}
                  className="w-full h-48 object-cover"
                  alt={hotel.name}
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{hotel.name}</h2>
                  <p
                    className="text-gray-600 mb-2 cursor-pointer underline"
                    onClick={() => handleLocationClick(formattedAddress)}
                  >
                    {formattedAddress}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    {hotel.description.substring(0, 100)}...
                  </p>
                  <div className="text-lg font-bold text-[#b99470] mb-4">Rooms:</div>
                  <div className="space-y-2 mb-4">
                    {roomsForHotel.length > 0 ? (
                      roomsForHotel.map((room) => (
                        <div
                          key={room._id}
                          className="bg-gray-100 p-3 rounded flex flex-wrap gap-4"
                        >
                          <div>
                            <h3 className="text-lg font-semibold">{room.name}</h3>
                            <p className="text-[#b99470]"><b>Price: ₦{room.price} / night</b></p>
                            <p className="text-sm text-gray-500">
                              {room.description.substring(0, 50)}...
                            </p>
                          </div>
                          <div>
                            {Array.isArray(room.image) && room.image.length > 0 ? (
                              <img
                                src={`http://localhost:5000/${room.image[0]}`}
                                className="w-14 h-14 object-cover"
                                alt={room.name}
                              />
                            ) : (
                              <p>No image available</p>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No rooms available</p>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <Link
                      to={`/app/hotel/${hotel._id}`}
                      className="bg-[#b99470] text-white px-4 py-2 rounded hover:bg-[#d0c6bb] transition duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Map Popup Display */}
      {showPopup && hotelLocation && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded shadow-lg relative w-4/5 max-w-xl h-4/5 max-h-[600px] overflow-y-auto">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
            >
              &times;
            </button>
            <h3 className="text-center text-tomato mb-4">Location: {hotelLocation.address}</h3>
            <MapContainer
              center={[hotelLocation.lat, hotelLocation.lng]}
              zoom={13}
              className="h-96 w-full rounded-lg shadow-md"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[hotelLocation.lat, hotelLocation.lng]}>
                <Popup>{hotelLocation.address}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelListing;
