import { useState } from 'react';
import { FaArrowLeft, FaFilter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import MentorCard from '../components/MentorCard';
import MentorAvailableCard from '../components/MentorAvailableCard';

const TOP_RATED = [
  {
    id: 'm1',
    name: 'Alex Chen',
    rating: 4.9,
    tags: ['React','Node.js'],
    avatar: '/avatars/alex.jpg'
  },
  {
    id: 'm2',
    name: 'Sarah Kim',
    rating: 4.8,
    tags: ['Python','ML'],
    avatar: '/avatars/sarah.jpg'
  },
];

const AVAILABLE = [
  {
    id: 'm3',
    name: 'David Park',
    role: 'Full Stack Developer',
    rate: 25,
    rating: 4.9,
    reviews: 124,
    tags: ['JavaScript','React','Node.js'],
    avatar: '/avatars/david.jpg'
  },
  {
    id: 'm4',
    name: 'Emma Wilson',
    role: 'Frontend Developer',
    rate: 20,
    rating: 4.7,
    reviews: 89,
    tags: ['HTML/CSS','Vue.js'],
    avatar: '/avatars/emma.jpg'
  },
];

export default function Search() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState(['Programming','Web Development','Machine Learning']);
  const nav = useNavigate();

  const removeFilter = f => {
    setFilters(fs => fs.filter(x => x !== f));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="flex items-center bg-white px-4 py-3 border-b">
        <button onClick={() => nav(-1)} className="text-gray-600 mr-3">
          <FaArrowLeft size={20} />
        </button>
        <div className="relative flex-grow">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search skills or mentors"
            className="w-full pl-4 pr-10 py-2 bg-gray-100 rounded-full focus:outline-none"
          />
          <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Active Filters */}
      {filters.length > 0 && (
        <div className="px-4 py-2 flex flex-wrap gap-2 bg-white">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => removeFilter(f)}
              className="px-3 py-1 bg-teal-600 text-white rounded-full flex items-center text-sm"
            >
              {f} <span className="ml-1 font-bold">×</span>
            </button>
          ))}
        </div>
      )}

      {/* Top Rated Mentors */}
      <section className="mt-4 px-4">
        <h3 className="text-base font-medium mb-2">Top Rated Mentors</h3>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {TOP_RATED.map(m => <MentorCard key={m.id} mentor={m} />)}
        </div>
      </section>

      {/* Available Now */}
      <section className="mt-4 px-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-base font-medium">Available Now</h3>
          <button className="text-teal-600 text-sm">
            {AVAILABLE.length} Mentors
          </button>
        </div>
        <div className="space-y-4">
          {AVAILABLE.map(m => (
            <MentorAvailableCard key={m.id} mentor={m} />
          ))}
        </div>
      </section>
    </div>
  );
}
