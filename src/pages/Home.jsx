// src/pages/Home.jsx
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import SessionCard from '../components/SessionCard';
import TutorCard from '../components/TutorCard';
import SkillCategoryCard from '../components/SkillCategoryCard';
import { Link } from 'react-router-dom';     


export default function Home() {
  const { user } = useContext(AuthContext);

  // Dummy data — replace with API calls if/when ready
  const [sessions, setSessions] = useState([]);
  const [tutors, setTutors]     = useState([]);
  const [skills, setSkills]     = useState([]);

  useEffect(() => {
    setSessions([
      {
        id: '1',
        title: 'Python Basics',
        in: 'In 2h',
        tutor: { name: 'Sarah Miller', avatar: '/avatars/sarah.jpg', rating: 4.9 },
        bgClass: 'bg-teal-600'
      },
      {
        id: '2',
        title: 'UI Design',
        in: 'Tomorrow',
        tutor: { name: 'Emma Chen', avatar: '/avatars/emma.jpg', rating: 4.8 },
        bgClass: 'bg-teal-500'
      },
    ]);

    setTutors([
      { id: 't1', name: 'Emma Chen', specialty: 'UI/UX Design', avatar: '/avatars/emma.jpg', rating: 4.9 },
      { id: 't2', name: 'John Doe', specialty: 'Web Dev',     avatar: '/avatars/john.jpg', rating: 4.8 },
      { id: 't3', name: 'Liam Smith', specialty: 'Data Sci',   avatar: '/avatars/liam.jpg', rating: 4.7 },
    ]);

    setSkills([
      { id: 's1', icon: 'code',         label: 'Coding',    subtitle: '120+ tutors' },
      { id: 's2', icon: 'palette',      label: 'Design',    subtitle: '85+ tutors'  },
      { id: 's3', icon: 'chart-line',   label: 'Business',  subtitle: '95+ tutors'  },
      { id: 's4', icon: 'language',     label: 'Languages', subtitle: '150+ tutors' },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b flex items-center justify-between">
        <h2 className="text-xl font-semibold">Hi, {user.name}</h2>
        <div className="flex items-center space-x-3">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11c0-3.07-1.64-5.64-4.5-6.32V4a1.5 1.5 0 00-3 0v.68C7.64 5.36 6 7.929 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
          </svg>
          <Link to="/profile">
            <img
              src={user.avatar || '/avatars/default.jpg'}
              alt="You"
              className="w-8 h-8 rounded-full border-2 border-teal-600"/>
          </Link>
        </div>
       
      </div>

      {/* Upcoming Sessions */}
      <div className="px-4 mt-4">
        <h3 className="text-base font-medium mb-2">Upcoming Sessions</h3>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {sessions.map(s => <SessionCard key={s.id} session={s} />)}
        </div>
      </div>

      {/* Top Tutors */}
      <div className="px-4 mt-4">
        <h3 className="text-base font-medium mb-2">Top Tutors</h3>
        <div className="grid grid-cols-3 gap-3">
          {tutors.map(t => <TutorCard key={t.id} tutor={t} />)}
        </div>
      </div>

      {/* Popular Skills */}
      <div className="px-4 mt-4">
        <h3 className="text-base font-medium mb-2">Popular Skills</h3>
        <div className="grid grid-cols-2 gap-3">
          {skills.map(k => <SkillCategoryCard key={k.id} skill={k} />)}
        </div>
      </div>
    </div>
  );
}
