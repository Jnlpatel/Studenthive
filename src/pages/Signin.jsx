import { useState } from 'react';
import { FaEnvelope, FaLock, FaGoogle, FaMicrosoft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Signin() {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await login(form);
      nav('/'); // go home on success
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-12">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 border-2 border-teal-500 rounded-full mb-2">
          <FaLock className="text-teal-500 text-xl"/>
        </div>
        <h1 className="text-2xl font-semibold text-teal-800">Welcome Back</h1>
        <p className="text-gray-600">Log in to your StudentHive account</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        {/* Email */}
        <label className="block mb-4">
          <span className="text-teal-800 font-medium">Email Address</span>
          <div className="mt-1 relative rounded-md shadow-sm">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <FaEnvelope/>
            </span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="block w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </label>

        {/* Password */}
        <label className="block mb-6">
          <span className="text-teal-800 font-medium">Password</span>
          <div className="mt-1 relative rounded-md shadow-sm">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <FaLock/>
            </span>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="block w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </label>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition"
        >
          Log In
        </button>

        {/* Or */}
        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-sm text-gray-500">or sign in with</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Social Buttons */}
        <div className="flex space-x-4 mb-4">
          <button type="button" className="flex-1 flex items-center justify-center py-2 border rounded-md hover:bg-gray-50">
            <FaGoogle className="text-red-500 mr-2"/> Google
          </button>
          <button type="button" className="flex-1 flex items-center justify-center py-2 border rounded-md hover:bg-gray-50">
            <FaMicrosoft className="text-blue-600 mr-2"/> Microsoft
          </button>
        </div>

        {/* Sign up link */}
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?&nbsp;
          <Link to="/register" className="text-teal-600 underline">Sign up</Link>
        </p>
      </form>
    </div>
  );
}
