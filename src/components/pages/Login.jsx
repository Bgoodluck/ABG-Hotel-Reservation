import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEcom } from '../context/EcomContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login, authError } = useEcom();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { email, password } = formData;

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate('/app');
      } else {
        setError(result.message || 'Failed to login');
      }
    } catch (error) {
      setError('An error occurred during login');
      console.error('Failed to login', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#d3c9c0]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {(error || authError) && <p className="text-red-500 text-center mb-4">{error || authError}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#b99470] text-white py-2 rounded hover:bg-[#d0c6bb] transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account? <Link to="/app/signup" className="text-[#b99470] hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

