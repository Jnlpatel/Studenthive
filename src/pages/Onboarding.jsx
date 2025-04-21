import { useState, useEffect, useContext } from 'react';
import { FaArrowLeft, FaCode, FaBriefcase, FaPalette, FaLanguage, FaMusic, FaCamera } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const CATEGORIES = [
  { key: 'programming', icon: <FaCode />,        title: 'Programming',   subtitle: 'Web, Mobile, AI' },
  { key: 'business',    icon: <FaBriefcase />,   title: 'Business',      subtitle: 'Marketing, Finance' },
  { key: 'design',      icon: <FaPalette />,     title: 'Design',        subtitle: 'UI/UX, Graphics' },
  { key: 'languages',   icon: <FaLanguage />,    title: 'Languages',     subtitle: 'English, Spanish' },
  { key: 'music',       icon: <FaMusic />,       title: 'Music',         subtitle: 'Guitar, Piano' },
  { key: 'photography', icon: <FaCamera />,      title: 'Photography',   subtitle: 'Digital, Film' },
];

const POPULAR = ['Data Science','Public Speaking','Digital Marketing','Machine Learning'];

export default function Onboarding() {
  const { user, updateProfile } = useContext(AuthContext);
  const [selected, setSelected] = useState(user?.interests || []);
  const nav = useNavigate();

 
  useEffect(() => {
    if (!user) {
      nav('/login');           // not logged in
    } else if (user.interests?.length) {
      nav('/');                // already completed onboarding
    }
  }, [user]);

  const toggle = key => {
    setSelected(s =>
      s.includes(key) ? s.filter(x => x !== key) : [...s, key]
    );
  };

  const handleContinue = async () => {
    try {
      await updateProfile({ interests: selected });
      nav('/');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between bg-white px-4 py-3 border-b">
        <button onClick={() => nav(-1)} className="text-teal-800">
          <FaArrowLeft size={20}/>
        </button>
        <h2 className="text-lg font-semibold">What are you interested in?</h2>
        <span className="text-sm text-gray-500">Step 2/3</span>
      </div>

      {/* Intro */}
      <div className="px-4 py-4">
        <p className="text-gray-700">
          Choose topics that interest you to personalize your experience
        </p>
      </div>

      {/* Category Grid */}
      <div className="px-4 grid grid-cols-2 gap-4">
        {CATEGORIES.map(cat => {
          const isSel = selected.includes(cat.key);
          return (
            <button
              key={cat.key}
              onClick={() => toggle(cat.key)}
              className={`flex flex-col p-4 rounded-lg border ${
                isSel
                  ? 'border-teal-600 bg-teal-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className={`${isSel ? 'text-teal-600' : 'text-gray-400'} text-2xl`}>
                {cat.icon}
              </div>
              <h3 className="mt-2 font-medium text-teal-800">{cat.title}</h3>
              <p className="text-xs text-gray-500">{cat.subtitle}</p>
            </button>
          );
        })}
      </div>

      {/* Popular Topics */}
      <div className="px-4 mt-6">
        <h3 className="text-base font-medium mb-2">Popular Topics</h3>
        <div className="flex flex-wrap gap-2">
          {POPULAR.map(topic => (
            <button
              key={topic}
              onClick={() => toggle(topic.toLowerCase().replace(/ /g, '_'))}
              className={`px-3 py-1 rounded-full border ${
                selected.includes(topic.toLowerCase().replace(/ /g, '_'))
                  ? 'bg-teal-600 text-white'
                  : 'bg-white border-gray-200 text-teal-800'
              } text-sm`}
            >
              {topic}
            </button>
          ))}
        </div>
        <button className="mt-1 text-sm text-teal-500">View more</button>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-10 left-0 w-full bg-white p-4 border-t flex justify-between">
        <button onClick={() => nav(-1)} className="flex items-center text-gray-700">
          <FaArrowLeft className="mr-1"/> Back
        </button>
        <button
          onClick={handleContinue}
          className="flex items-center bg-teal-600 text-white px-6 py-2 rounded-lg"
        >
          Continue <span className="ml-2">→</span>
        </button>
      </div>
    </div>
  );
}
