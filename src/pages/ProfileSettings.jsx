import { useState, useEffect, useContext } from 'react';
import { FaArrowLeft, FaCamera } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProfileSettings() {
  const { user, updateProfile } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: '', email: '', university: '', interests: ''
  });
  const [editing, setEditing] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        university: user.university || '',
        interests: user.interests || ''
      });
    }
  }, [user]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await updateProfile(form);
      setEditing(false);
      alert('Profile updated!');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between bg-white px-4 py-3 border-b">
        <button onClick={() => nav(-1)} className="text-teal-800">
          <FaArrowLeft size={20}/>
        </button>
        <h2 className="text-lg font-semibold">Profile Settings</h2>
        <button
          onClick={() => editing ? handleSave() : setEditing(true)}
          className={`text-sm font-medium ${editing ? 'text-green-600' : 'text-teal-600'}`}
        >
          {editing ? 'Save' : 'Edit Profile'}
        </button>
      </div>

      {/* Avatar */}
      <div className="flex justify-center my-6">
        <div className="relative">
          <img
            src={user?.avatar || '/avatars/default.jpg'}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover border-2 border-teal-600"
          />
          {editing && (
            <button className="absolute bottom-0 right-0 bg-teal-600 p-2 rounded-full text-white">
              <FaCamera size={14}/>
            </button>
          )}
        </div>
      </div>

      {/* Form */}
      <div className="px-4 space-y-4">
        {[
          { label: 'Name',    name: 'name',        type: 'text' },
          { label: 'Email',   name: 'email',       type: 'email' },
          { label: 'University', name: 'university', type: 'text' },
          { label: 'Learning Interests', name: 'interests', type: 'text' },
        ].map(({ label, name, type }) => (
          <label key={name} className="block">
            <span className="text-teal-800 font-medium">{label}</span>
            <input
              name={name}
              type={type}
              value={form[name]}
              onChange={handleChange}
              disabled={!editing}
              className={`mt-1 w-full p-2 border rounded-md focus:outline-none ${
                editing ? 'focus:ring-2 focus:ring-teal-500' : 'bg-gray-100'
              }`}
            />
          </label>
        ))}
      </div>
    </div>
  );
}
