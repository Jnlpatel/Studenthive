import { useNavigate } from 'react-router-dom';

export default function MentorAvailableCard({ mentor }) {
    const nav = useNavigate();
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <img src={mentor.avatar} alt={mentor.name}
                 className="w-12 h-12 rounded-full mr-3 object-cover"/>
            <div>
              <p className="font-medium">{mentor.name}</p>
              <p className="text-xs text-gray-500">{mentor.role}</p>
            </div>
          </div>
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
            ${mentor.rate}/hr
          </span>
        </div>
        <p className="text-xs mb-2">
          ⭐ {mentor.rating.toFixed(1)} ({mentor.reviews} reviews)
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {mentor.tags.map(tag => (
            <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <button
       onClick={() => nav(`/mentor/${mentor.id}/schedule`)}
       className="w-full bg-teal-600 text-white py-2 rounded-md"
     >
       Book Session
     </button>
      </div>
    );
  }
  