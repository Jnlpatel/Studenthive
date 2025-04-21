// src/components/SessionCard.jsx
export default function SessionCard({ session }) {
    return (
      <div className={`min-w-[200px] p-4 rounded-lg text-white ${session.bgClass}`}>
        <h4 className="font-semibold">{session.title}</h4>
        <p className="text-sm mb-2">{session.in}</p>
        <div className="flex items-center">
          <img src={session.tutor.avatar} alt={session.tutor.name}
               className="w-8 h-8 rounded-full border-2 border-white mr-2"/>
          <div>
            <p className="text-sm">{session.tutor.name}</p>
            <p className="text-xs">⭐ {session.tutor.rating.toFixed(1)}</p>
          </div>
        </div>
      </div>
    );
  }
  