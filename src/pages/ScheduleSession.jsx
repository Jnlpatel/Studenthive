// src/pages/ScheduleSession.jsx
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import { getMentorById, getScheduleDates, getScheduleTimeSlots, createBooking } from '../api/fakeApi';
import dayjs from 'dayjs';

export default function ScheduleSession() {
  const { user } = useContext(AuthContext);
  const { id }   = useParams();             // mentor id
  const nav      = useNavigate();

  const [mentor, setMentor]       = useState(null);
  const [dates, setDates]         = useState([]);
  const [selectedDate, setDate]   = useState('');
  const [slots, setSlots]         = useState([]);
  const [selectedSlot, setSlot]   = useState('');

  // Details
  const duration      = 60;   // minutes
  const sessionType   = 'Video Call';
  const pricePerHour  = mentor?.rate || 0;

  // Load mentor & availability
  useEffect(() => {
    getMentorById(id).then(setMentor);
    getScheduleDates(id).then(dates => {
      setDates(dates);
      setDate(dates[0]?.slice(0,10) || '');
    });
  }, [id]);

  // Load slots whenever date changes
  useEffect(() => {
    if (selectedDate) {
      // Construct full ISO date string at midnight
      const iso = dayjs(selectedDate).toISOString();
      getScheduleTimeSlots(id, iso).then(ts => {
        setSlots(ts);
        setSlot(ts.find(s => s.available)?.time || '');
      });
    }
  }, [id, selectedDate]);

  if (!user) return <Navigate to="/login" />;
  if (!mentor) return null;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="flex items-center bg-white px-4 py-3 border-b">
        <button onClick={() => nav(-1)} className="text-gray-600 mr-3">
          <FaArrowLeft size={20}/>
        </button>
        <h2 className="text-lg font-semibold">Schedule Session</h2>
        <img
          src={mentor.avatar}
          alt={mentor.name}
          className="w-8 h-8 rounded-full border-2 border-teal-600 ml-auto"
        />
      </div>

      {/* Calendar header */}
      <div className="flex items-center justify-between bg-white px-4 py-2 border-b">
        <button onClick={() => {
          const prev = dayjs(selectedDate).subtract(1, 'day');
          setDate(prev.format('YYYY-MM-DD'));
        }}>◀</button>
        <h3 className="font-medium">
          {dayjs(selectedDate).format('MMMM YYYY')}
        </h3>
        <button onClick={() => {
          const next = dayjs(selectedDate).add(1, 'day');
          setDate(next.format('YYYY-MM-DD'));
        }}>▶</button>
      </div>

      {/* Date selector */}
      <div className="bg-white px-4 py-3 flex space-x-2 overflow-x-auto">
        {dates.slice(0, 30).map(dIso => {
          const d = dayjs(dIso);
          const key = d.format('YYYY-MM-DD');
          const isSel = key === selectedDate;
          return (
            <button
              key={key}
              onClick={() => setDate(key)}
              className={`flex flex-col items-center p-2 rounded-md ${
                isSel
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              <span className="text-xs">{d.format('dd')}</span>
              <span className="font-semibold">{d.date()}</span>
            </button>
          );
        })}
      </div>

      {/* Time slots */}
      <div className="px-4 mt-4">
        <h4 className="font-medium mb-2">Available Time Slots</h4>
        <div className="flex flex-wrap gap-2">
          {slots.map(s => {
            const label = dayjs(`${selectedDate}T${s.time}`).format('h:mm A');
            return (
              <button
                key={s.time}
                disabled={!s.available}
                onClick={() => s.available && setSlot(s.time)}
                className={`px-3 py-1 rounded-md border ${
                  s.available
                    ? (s.time === selectedSlot
                        ? 'border-teal-600 bg-teal-50'
                        : 'border-teal-600 text-teal-600')
                    : 'border-gray-200 text-gray-400'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Session details */}
      <div className="mx-4 mt-6 bg-white p-4 rounded-lg shadow space-y-2">
        <h4 className="font-medium">Session Details</h4>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">🕒</span>
          <span>{duration} minutes</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">📹</span>
          <span>{sessionType}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">💲</span>
          <span>${pricePerHour}/hour</span>
        </div>
      </div>

      {/* Confirm bar */}
      <div className="fixed bottom-9 left-0 w-full bg-white p-4 border-t flex justify-center">
        <button
          disabled={!selectedSlot}
          onClick={async () => {
                      const slotIso = dayjs(`${selectedDate}T${selectedSlot}`).toISOString();
                      await createBooking({ skillId: mentor.id, timeSlot: slotIso });
                      // instead of going to /booking, send them to payment
                      nav('/payment');
                    }}
          className="w-full max-w-md bg-teal-600 text-white py-3 rounded-full disabled:opacity-50"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
