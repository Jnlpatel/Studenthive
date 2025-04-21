// src/components/MentorCard.jsx
export default function MentorCard({ mentor }) {
    return (
      <div className="min-w-[140px] bg-white p-3 rounded-lg shadow flex flex-col items-center">
        <img src={mentor.avatar} alt={mentor.name}
             className="w-12 h-12 rounded-full mb-2 object-cover"/>
        <p className="font-medium text-sm">{mentor.name}</p>
        <p className="text-xs text-gray-500 mb-1">⭐ {mentor.rating.toFixed(1)}</p>
        <div className="flex flex-wrap justify-center gap-1">
          {mentor.tags.map(tag => (
            <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  }
  