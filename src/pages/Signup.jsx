import { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaUniversity, FaGoogle, FaMicrosoft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Signup() {
  const { register } = useContext(AuthContext);
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: '', email: '', password: '', university: '', terms: false
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.terms) return alert('You must agree to the terms');
    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password
      });
       nav('/onboarding');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-8">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 border-2 border-teal-500 rounded-full mb-2">
          <FaUser className="text-teal-500 text-xl"/>
        </div>
        <h1 className="text-2xl font-semibold text-teal-800">Welcome to StudentHive</h1>
        <p className="text-gray-600">Connect, learn, and grow with your peers</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        {/* Name */}
        <label className="block mb-4">
          <span className="text-teal-800 font-medium">Full Name</span>
          <div className="mt-1 relative rounded-md shadow-sm">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <FaUser/>
            </span>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="block w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </label>

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
        <label className="block mb-4">
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
              placeholder="Create a password"
              required
              className="block w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </label>

        {/* University */}
        <label className="block mb-4">
          <span className="text-teal-800 font-medium">University</span>
          <div className="mt-1 relative rounded-md shadow-sm">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <FaUniversity/>
            </span>
            <select
              name="university"
              value={form.university}
              onChange={handleChange}
              required
              className="block w-full pl-10 pr-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="" disabled>Select your university</option>
              <option>Guelph-Humber University</option>
              <option>Waterloo University</option>
              <option>McMaster University</option>
            </select>
          </div>
        </label>

        {/* Terms */}
        <label className="flex items-center mb-6">
          <input
            type="checkbox"
            name="terms"
            checked={form.terms}
            onChange={handleChange}
            className="h-4 w-4 text-teal-600 border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-700">
            I agree to StudentHive’s&nbsp;
            <a href="#" className="text-teal-600 underline">Terms of Service</a>
            &nbsp;and&nbsp;
            <a href="#" className="text-teal-600 underline">Privacy Policy</a>
          </span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition"
        >
          Create Account
        </button>

        {/* Or */}
        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-sm text-gray-500">or sign up with</span>
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

        {/* Log in link */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?&nbsp;
          <Link to="/login" className="text-teal-600 underline">Log in</Link>
        </p>
      </form>
    </div>
  );
}
