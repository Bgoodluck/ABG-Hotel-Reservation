import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from 'react-router-dom';
import PlanetOne from '/img/planet.svg';
import PlanetTwo from '/img/planet-2.svg';
import PlanetThree from '/img/planet-3.svg';
import PlanetFour from '/img/planet-4.svg';

const Welcome = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/app'); 
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <div className="flex items-center bg-[#b99470] p-4 pl-16">
        <h4 className="font-bold text-xl md:text-2xl text-white">ABG Travels</h4>
      </div>

      <section className="flex-grow flex flex-col justify-center items-center bg-[#b99470]">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full max-w-[1300px] mx-auto gap-4 p-4 md:p-[3rem]">
          {/* Column Left */}
          <div className="flex flex-col justify-center items-start text-white p-4 md:p-20 relative z-10">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-xl md:text-2xl mb-2"
            >
              Welcome to ABG Travels
            </motion.h1>
            <motion.p
              variants={fadeLeft}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1 }}
              className="text-2xl md:text-4xl leading-tight mb-4 md:mb-8"
            >
              Let us get you that dream staycation.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{
                scale: 0.95,
                backgroundColor: '#67F6E7',
                border: 'none',
                color: '#000',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 1.5 } }}
              className="py-2 px-6 md:py-4 md:px-12 text-sm md:text-base border-2 border-white rounded cursor-pointer bg-transparent"
              onClick={handleClick}
            >
              Get Started
            </motion.button>
          </div>

          {/* Column Right */}
          <div className="relative flex justify-center items-center p-4 md:p-8">
            <motion.img
              src="/img/background-4.jpg"
              alt="planet"
              className="absolute w-full h-full max-w-[100px] max-h-[100px] md:max-w-[250px] md:max-h-[250px] top-[10px] left-[10px] rounded-full opacity-10 hidden md:block"
              whileTap={{ scale: 0.9 }}
              drag
              dragElastic={0.2}
              dragConstraints={{ top: -200, bottom: 200, left: -200, right: 200 }}
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
            />
            <motion.img
              src="/img/background-3.jpg"
              alt="planet"
              className="absolute w-full h-full max-w-[100px] max-h-[100px] md:max-w-[250px] md:max-h-[250px] top-[170px] right-[10px] rounded-full opacity-10 hidden md:block"
              whileTap={{ scale: 0.6 }}
              drag
              dragElastic={0.2}
              dragConstraints={{ top: -200, bottom: 200, left: -200, right: 200 }}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 1 } }}
            />
            <motion.img
              src="/img/background-1.jpg"
              alt="planet"
              className="absolute w-full h-full max-w-[100px] max-h-[100px] md:max-w-[250px] md:max-h-[250px] top-[350px] left-[50px] rounded-full opacity-10 hidden md:block"
              whileTap={{ scale: 0.8 }}
              drag
              dragElastic={0.2}
              dragConstraints={{ top: -200, bottom: 200, left: -200, right: 200 }}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 1 } }}
            />
            <motion.img
              src="/img/background-2.jpg"
              alt="planet"
              className="absolute w-full h-full max-w-[100px] max-h-[100px] md:max-w-[250px] md:max-h-[250px] bottom-[100px] right-[75px] rounded-full opacity-10 hidden md:block"
              whileTap={{ scale: 0.9 }}
              drag
              dragElastic={0.2}
              dragConstraints={{ top: -200, bottom: 200, left: -200, right: 200 }}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
            />
          </div>
        </div>
        <div className='z-10 font-bold'>
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center px-4 md:px-16 py-5 gap-5">
            <div className="flex gap-2 md:gap-4 text-white">
              <p>Terms of Use |</p>
              <p>Contact Us |</p>
              <p>Privacy Policy</p>
            </div>
          </div>
          <div className="text-sm px-4 md:px-16 py-5 text-black">
            ABG Travels is an online platform that facilitates access to the best hotel deals by directing customers to quality hotels and agents. Find cheap hotels and discounts when you book on ABG-Travels. Compare hotel deals, offers and read unbiased reviews on hotels. All prices are subject to availability, and ABG Travels only provides travel information via travel search engines available at any given time. 
          </div>
          <div className="border-t border-[#b99470]"></div>
          <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-16 py-5">
            <h4 className="font-bold text-lg md:text-2xl text-white">ABG Travels</h4>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                <FontAwesomeIcon icon={faYoutube} size="lg" />
              </a>
            </div>
          </div>
          <div className="bg-gray-900 px-4 md:px-16 py-5">
            <p className="text-center text-xs md:text-sm text-gray-500">
              Copyright © 2024 ABG-Travels. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Welcome;
