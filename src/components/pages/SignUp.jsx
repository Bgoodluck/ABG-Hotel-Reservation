import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEcom } from '../context/EcomContext';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(null);

  const { signup, authError } = useEcom();
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = await signup(name, email, password);

    if (response.success) {
      alert("Registration successful!");
      navigate("/app");
    } else {
      alert(response.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={registerHandler}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Profile Image (Optional)</label>
            <input
              type="file"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#b99470] text-white py-2 rounded hover:bg-[#d0c6bb] transition duration-300"
          >
            Sign Up
          </button>
          {authError && <p className="text-red-500 mt-4">{authError}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
