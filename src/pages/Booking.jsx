import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import * as api from '../api/fakeApi';
import TimeSlotPicker from '../components/TimeSlotPicker';

export default function Booking() {
  const [skills, setSkills] = useState([]);
  const [skillId, setSkillId] = useState('');
  const [timeSlot, setTimeSlot] = useState(dayjs().add(1,'day').format('YYYY-MM-DDTHH:mm'));
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.getSkills().then(setSkills);
    api.getMyBookings().then(setBookings);
  }, []);

  const handleBook = e => {
    e.preventDefault();
    api.createBooking({ skillId, timeSlot })
       .then(() => api.getMyBookings().then(setBookings))
       .catch(err => alert(err.message));
  };

  return (
    <div className="max-w-sm mx-auto mt-16 p-4">
      <form onSubmit={handleBook} className="space-y-2 mb-4">
        <select value={skillId} onChange={e => setSkillId(e.target.value)} required className="w-full p-2 border rounded">
          <option value="">Select Skill</option>
          {skills.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
        </select>
        <TimeSlotPicker value={timeSlot} onChange={e => setTimeSlot(e.target.value)} />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Book</button>
      </form>
      <h2 className="text-xl mb-2">My Bookings</h2>
      <ul>
        {bookings.map(b => (
          <li key={b.id} className="mb-1">
            {skills.find(s => s.id===b.skillId)?.title} at {dayjs(b.timeSlot).format('MMM D, H:mm')}
          </li>
        ))}
      </ul>
    </div>
);
}