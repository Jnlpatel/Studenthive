// src/pages/Landing.jsx
import { useNavigate } from 'react-router-dom';
import { FaGraduationCap, FaCalendarAlt, FaTrophy, FaUsers, FaLightbulb, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Landing() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center">
          <span className="text-2xl font-bold text-teal-700 flex items-center">
            <svg className="w-6 h-6 mr-1" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
              <text x="12" y="16" textAnchor="middle" fontSize="12" fill="currentColor">?</text>
            </svg>
            StudentHive
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(/hero-image.png)` }}/>
        <div className="absolute inset-0 bg-white bg-opacity-60 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold text-teal-700">Learn from Peers</h1>
          <p className="text-gray-700 mt-2">Connect & share skills on campus</p>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-md mx-auto mt-6 px-4 grid grid-cols-3 gap-4">
        {[
          { icon: <FaGraduationCap />, label: 'Learn' },
          { icon: <FaCalendarAlt />, label: 'Schedule' },
          { icon: <FaTrophy />, label: 'Earn' },
        ].map(({ icon, label }) => (
          <button key={label}
                  className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
            <span className="text-teal-700 text-2xl">{icon}</span>
            <span className="mt-2 text-sm font-medium">{label}</span>
          </button>
        ))}
      </section>

      {/* Join Card */}
      <section className="max-w-md mx-auto mt-6 px-4">
        <div className="bg-teal-800 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-white mb-4">Join StudentHive</h2>
          <button onClick={() => nav('/register')}
                  className="w-full bg-teal-600 text-white py-2 rounded mb-2">
            Sign Up
          </button>
          <button onClick={() => nav('/login')}
                  className="w-full bg-white text-teal-600 py-2 rounded">
            Log In
          </button>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-md mx-auto mt-6 px-4 grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <FaUsers className="text-teal-700 text-xl mr-2"/>
          <span>Active Community</span>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <FaLightbulb className="text-teal-700 text-xl mr-2"/>
          <span>Skills Available</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white mt-auto py-4">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-2 text-gray-600">
            <FaTwitter className="w-5 h-5 cursor-pointer"/>
            <FaInstagram className="w-5 h-5 cursor-pointer"/>
            <FaLinkedin className="w-5 h-5 cursor-pointer"/>
          </div>
          <p className="text-sm text-gray-500">© 2025 StudentHive</p>
        </div>
      </footer>
    </div>
  );
}
