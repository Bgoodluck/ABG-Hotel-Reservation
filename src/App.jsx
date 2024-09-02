import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HotelListing from "./components/HotelListing/HotelListing";
import HotelDetails from "./components/HotelDetails/HotelDetails";
import AllHotelsDetails from "./components/AllHotel/AllHotelsDetails";
import { EcomProvider } from "./components/context/EcomContext";
import HomePage from "./components/pages/HomePage";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import LogOut from "./components/pages/LogOut";
import CheckInPage from "./components/CheckInPage/CheckInPage";
import CheckOutPage from "./components/CheckOutPage/CheckOutPage";
import Payment from "./components/payment/payment";
import { HotelProvider } from "./components/context/HotelContext";
import ThankYou from "./components/pages/ThankYou";
import RoomFeatured from "./components/RoomFeatured";
import Profile from "./components/pages/Profile";
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <EcomProvider>
      <HotelProvider>
        <Header />
        <Routes>
          
          <Route path="/" element={<HomePage />} />
          <Route path="listing" element={<HotelListing />} />
          <Route path="hotel/:hotelId" element={<HotelDetails />} />
          <Route path="room/:roomId" element={<RoomFeatured />} />
          <Route path="hotel" element={<AllHotelsDetails />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="logout" element={<LogOut />} />
          <Route path="hotel/:hotelId/checkin" element={<CheckInPage />} />
          <Route path="checkout" element={<CheckOutPage />} />
          <Route path="payment" element={<Payment />} />
          <Route path="profile" element={<Profile />} />
          <Route path="thank-you" element={<ThankYou />} />
        </Routes>
        <Footer />
      </HotelProvider>
    </EcomProvider>
  );
}

export default App;
