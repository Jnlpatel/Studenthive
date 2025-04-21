import { useState } from 'react';

export default function AuthForm({ onSubmit, submitLabel }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    try { await onSubmit(form); } catch (err) { alert(err.message); }
  };

  return (
    <div className="max-w-sm mx-auto mt-16 p-4 bg-white rounded-lg shadow">
      <form onSubmit={handleSubmit} className="space-y-4">
        {submitLabel === 'Register' && <input name="name" placeholder="Name" onChange={handleChange} required className="w-full p-3 border rounded" />}
        <input name="email" placeholder="Email" onChange={handleChange} required className="w-full p-3 border rounded" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="w-full p-3 border rounded" />
        <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded">{submitLabel}</button>
      </form>
    </div>
  );
}
