import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaSearch, FaChartBar, FaComments } from 'react-icons/fa';

export default function Navbar() {
  const loc = useLocation().pathname;
  const items = [
    { to: '/',      icon: <FaHome />,      label: 'Home' },
    { to: '/search',icon: <FaSearch />,    label: 'Search' },
    { to: '/leaderboard', icon: <FaChartBar />, label: 'Leaderboard' },
    { to: '/discussion',  icon: <FaComments/>,  label: 'Discussion' },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-white shadow-inner p-2 flex justify-around">
      {items.map(i => (
        <Link key={i.to} to={i.to}
              className={`flex flex-col items-center text-sm ${
                loc === i.to ? 'text-teal-700' : 'text-gray-500'
              }`}>
          {i.icon}
          <span>{i.label}</span>
        </Link>
      ))}
    </nav>
  );
}
