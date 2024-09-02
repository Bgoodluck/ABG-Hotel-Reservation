// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import EcomContext from "../context/EcomContext";

// const CheckOutPage = () => {
//     const { checkOut, setCheckOut } = useContext(EcomContext);
//     const navigate = useNavigate();
//     const [checkOutDate, setCheckOutDate] = useState('');

//     const handleNext = () => {
//       if (checkOutDate) {
//         setCheckOut(checkOutDate);
//         navigate('/booking-confirmation');
//       } else {
//         alert('Please select a check-out date.');
//       }
//     };

//     const handleDateChange = (e) => {
//       setCheckOutDate(e.target.value);
//     };

//     return (
//       <div className="p-8">
//         <h1 className="text-2xl font-bold mb-4">Check-Out Date Selection</h1>
//         <div className="mb-4">
//           <label htmlFor="checkOutDate" className="block font-medium mb-1">Select Check-Out Date:</label>
//           <input
//             type="date"
//             id="checkOutDate"
//             name="checkOutDate"
//             value={checkOutDate}
//             onChange={handleDateChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md"
//           />
//         </div>
//         <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-cyan-600 transition duration-200" onClick={handleNext}>
//           Next
//         </button>
//       </div>
//     );
// };

// export default CheckOutPage;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEcom } from "../context/EcomContext";

const CheckOutPage = () => {
    const { searchCriteria, setSearchCriteria } = useEcom();
    const navigate = useNavigate();
    const [checkOutDate, setCheckOutDate] = useState(searchCriteria.checkOut || '');

    const handleNext = () => {
      if (checkOutDate) {
        setSearchCriteria(prev => ({ ...prev, checkOut: checkOutDate }));
        navigate('/booking-confirmation');
      } else {
        alert('Please select a check-out date.');
      }
    };

    const handleDateChange = (e) => {
      setCheckOutDate(e.target.value);
    };

    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Check-Out Date Selection</h1>
        <div className="mb-4">
          <label htmlFor="checkOutDate" className="block font-medium mb-1">Select Check-Out Date:</label>
          <input
            type="date"
            id="checkOutDate"
            name="checkOutDate"
            value={checkOutDate}
            onChange={handleDateChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-cyan-600 transition duration-200" onClick={handleNext}>
          Next
        </button>
      </div>
    );
};

export default CheckOutPage;

