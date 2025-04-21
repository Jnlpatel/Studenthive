// src/pages/MentorProfile.jsx
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { FaArrowLeft, FaBookmark } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import { getMentorById, getAvailability, createBooking } from '../api/fakeApi';

export default function MentorProfile() {
  const { user } = useContext(AuthContext);
  const { id }   = useParams();
  const nav      = useNavigate();

  const [mentor, setMentor]         = useState(null);
  const [availability, setAvail]    = useState([]);
  const [selectedDate, setDate]     = useState('');
  const [bookingInProgress, setBusy]= useState(false);

  useEffect(() => {
    getMentorById(id).then(setMentor);
    getAvailability(id).then(days => {
      setAvail(days.map(d => new Date(d.date)));
      if (days[0]) setDate(days[0].date);
    });
  }, [id]);

  if (!user) return <Navigate to="/login" />;
  if (!mentor) return null; // or a loader

  // Helpers to format day names & numbers
  const weekday = d => d.toLocaleDateString(undefined, { weekday: 'short' });
  const daynum  = d => d.getDate();

  const handleBook = async () => {
    setBusy(true);
    await createBooking({ skillId: mentor.id, timeSlot: selectedDate });
    nav('/booking');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="flex items-center bg-white px-4 py-3 border-b">
        <button onClick={() => nav(-1)} className="text-gray-600 mr-3">
          <FaArrowLeft size={20}/>
        </button>
        <h2 className="text-lg font-semibold flex-grow">Mentor Profile</h2>
        <FaBookmark className="text-gray-600"/>
      </div>

      {/* Mentor Card */}
      <div className="m-4 bg-white rounded-lg p-4 shadow space-y-2">
        <div className="flex items-center space-x-4">
          <img src={mentor.avatar} alt={mentor.name}
               className="w-16 h-16 rounded-full object-cover"/>
          <div>
            <h3 className="text-lg font-semibold">{mentor.name}</h3>
            <p className="text-teal-600">{mentor.role}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span>⭐ {mentor.rating.toFixed(1)}</span>
          <span>({mentor.reviews} reviews)</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {mentor.verified && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              Verified
            </span>
          )}
          {mentor.quickResponse && (
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
              Quick Response
            </span>
          )}
        </div>
      </div>

      {/* Expertise */}
      <div className="mx-4 mt-4 bg-white rounded-lg p-4 shadow">
        <h4 className="font-medium mb-2">Expertise</h4>
        <div className="flex flex-wrap gap-2">
          {mentor.tags.map(tag => (
            <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="mx-4 mt-4 bg-white rounded-lg p-4 shadow">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium">Availability</h4>
          <button className="text-teal-600 text-sm">View Calendar</button>
        </div>
        <div className="flex space-x-2">
          {availability.map(d => {
            const iso = d.toISOString();
            const isSel = iso === selectedDate;
            return (
              <button
                key={iso}
                onClick={() => setDate(iso)}
                className={`flex flex-col items-center p-3 rounded-md ${
                  isSel
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                <span className="text-xs">{weekday(d)}</span>
                <span className="text-lg font-semibold">{daynum(d)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-10 left-0 w-full bg-white p-4 border-t flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500">Rate per hour</p>
          <p className="text-xl font-bold">${mentor.rate}</p>
        </div>
        <button
          disabled={bookingInProgress}
          onClick={handleBook}
          className="bg-teal-600 text-white px-6 py-2 rounded-lg disabled:opacity-50"
        >
          Book Session →
        </button>
      </div>
    </div>
  );
}
