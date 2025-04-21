// src/components/TutorCard.jsx
export default function TutorCard({ tutor }) {
    return (
      <div className="bg-white p-3 rounded-lg shadow text-center">
        <img src={tutor.avatar} alt={tutor.name}
             className="w-12 h-12 rounded-full mx-auto mb-2"/>
        <p className="font-medium">{tutor.name}</p>
        <p className="text-xs text-gray-500">{tutor.specialty}</p>
        <p className="text-sm mt-1">⭐ {tutor.rating.toFixed(1)}</p>
      </div>
    );
  }
  