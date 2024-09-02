import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HotelContext } from "../context/HotelContext";

const HomePage = () => {
  const { hotels, hotelRooms, fetchHotels, fetchHotelRooms } = useContext(HotelContext);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState("");
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);

  const roomImages = [
    { name: "Deluxe Suite", imageNames: ["deluxe1", "deluxe2"] },
    { name: "Standard Room", imageNames: ["standard1", "standard2"] },
    { name: "Presidential Room", imageNames: ["presidential1", "presidential2"] },
    { name: "Suite Room", imageNames: ["suite1", "suite2"] },
    
  ];

  useEffect(() => {
    fetchHotels();
    fetchHotelRooms();
  }, [fetchHotels, fetchHotelRooms]);

  useEffect(() => {
    if (searchParams) {
      const lowercasedQuery = searchParams.toLowerCase();
      setFilteredHotels(
        hotels.filter((hotel) =>
          hotel.name.toLowerCase().includes(lowercasedQuery)
        )
      );
      setFilteredRooms(
        hotelRooms.filter((room) =>
          room.name.toLowerCase().includes(lowercasedQuery)
        )
      );
    } else {
      setFilteredHotels(hotels);
      setFilteredRooms(hotelRooms);
    }
  }, [searchParams, hotels, hotelRooms]);

  const handleInputChange = (e) => {
    setSearchParams(e.target.value);
  };

  const handleSearch = () => {
    // Optional: Redirect to search results page or handle search logic here
  };

  const handleHotelClick = (id) => {
    navigate(`/app/hotel/${id}`); 
  };

  const handleRoomClick = (roomId) => {
    if (roomId) {
        navigate(`/app/room/${roomId}`); 
    } else {
        console.error("Room ID is undefined");
    }
};

  
  const getRoomImages = (roomName) => {
    const room = roomImages.find((room) => room.name === roomName);
    return room ? room.imageNames.map((image) => `https://abg-hotel-reservation-api.onrender.com/uploads/${image}.jpg`) : [];
  };

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-96">
        <div
          className="absolute inset-0 bg-cover bg-center z-10"
          style={{ backgroundImage: "url('/img/background-1.jpg')" }}
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center text-white px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Explore Unbeatable Hotel Rates
            </h1>
            <p className="text-base sm:text-lg mb-8">
              Find the perfect stay for your next adventure
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 text-black">
              <input
                type="text"
                placeholder="Enter destination"
                className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-[#b99470] w-full sm:w-auto"
                value={searchParams}
                onChange={handleInputChange}
              />
              <button
                className="bg-[#b99470] hover:bg-[#d0c6bb] text-white py-2 px-4 rounded-lg text-lg font-semibold transition duration-300 w-full sm:w-auto"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hotel Categories */}
      <div className="py-12 bg-[#dfdad5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">
            Discover Our Exclusive Hotels
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHotels.map((hotel) => (
              <div
                key={hotel._id}
                className="bg-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 cursor-pointer"
                onClick={() => handleHotelClick(hotel._id)}
              >
                <img
                  src={`https://abg-hotel-reservation-api.onrender.com/${Array.isArray(hotel.image) ? hotel.image[0] : hotel.image}`}
                  alt={hotel.name}
                  className="w-full h-48 sm:h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{hotel.name}</h3>
                  <p className="text-gray-700">{hotel.description}</p>
                  <button className="mt-5 px-3 py-1 text-sm text-white rounded-lg bg-[#b99470]">View Hotel</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Rooms */}
      <div className="py-12 bg-[#dfdad5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">
            Featured Rooms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => {
              const images = getRoomImages(room.name);
              return (
                <div
                  key={room._id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 cursor-pointer"
                  onClick={() =>  handleRoomClick(room._id)} 
                >
                  <div className="relative">
                    {images.length > 0 ? (
                      images.map((img, index) => (
                        <img
                          key={index}
                          src={img} 
                          alt={`${room.name} image ${index + 1}`}
                          className={`w-full ${index === 0 ? 'h-48' : 'h-64'} object-cover`}
                        />
                      ))
                    ) : (
                      <p className="text-center text-[#b99470]"><b>ABG Travels Booking Rooms</b></p>
                    )}
                  </div>
                  <div className="p-6">
                   <img src={`https://abg-hotel-reservation-api.onrender.com/${room.image && room.image.length > 0 ? room.image[0] : 'default-room-image.jpg'}`} />
                    <h3 className="text-xl font-bold mb-2">{room.name}</h3>
                    <p className="text-gray-700">{room.description}</p>
                    <button className="mt-5 px-3 py-1 text-sm text-white rounded-lg bg-[#b99470]">View Room</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
