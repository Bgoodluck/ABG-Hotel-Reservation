import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-[#b99470] text-white">
      <div className="flex justify-center px-36 py-5 gap-5">
        <div className="flex gap-4 mt-10">
          <p>Terms of Use |</p>
          <p>Contact Us |</p>
          <p>Privacy Policy </p> 
        </div>
      </div>
      <div className="text-sm px-16 py-10">
        ABG Travels is an online platform that facilitates access to the best hotel deals by directing customers to quality hotels and agents. Find cheap hotels and discounts when you book on ABG-Travels. Compare hotel deals, offers and read unbiased reviews on hotels. All prices are subject to availability, and ABG Travels only provides travel information via travel search engines available at any given time. Although we aim to provide our users with the cheapest prices, we cannot promise we are right 100% of the time.
      </div>
      <div className="border-t border-gray-700"></div>
      <div className="flex justify-between px-16 py-10">
        <div>
          <h4 className="font-bold text-2xl">ABG Travels</h4>
          
        </div>
        <div>
          <Link to="/app/listing" className="text-white hover:text-gray-400 mr-4">Hotel Listings</Link>
          <Link to="/app/hotel" className="text-white hover:text-gray-400 mr-4">Your Booking Details</Link>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 mr-4">
            <FontAwesomeIcon icon={faFacebook} size="lg" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 mr-4">
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 mr-4">
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
            <FontAwesomeIcon icon={faYoutube} size="lg" />
          </a>
        </div>
      </div>
      <div className="bg-gray-900 px-16 py-5">
        <p className="text-center text-sm text-gray-500">
          Copyright © 2024 ABG-Travels. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;