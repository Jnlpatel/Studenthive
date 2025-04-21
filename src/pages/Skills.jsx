import { useEffect, useState } from 'react';
import * as api from '../api/fakeApi';
import SkillCard from '../components/SkillCard';

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => api.getSkills().then(setSkills), []);

  const handleAdd = e => {
    e.preventDefault();
    api.createSkill({ title, description, tags: [] })
       .then(() => api.getSkills().then(setSkills))
       .catch(err => alert(err.message));
  };

  return (
    <div className="max-w-sm mx-auto mt-16 p-4">
      <form onSubmit={handleAdd} className="space-y-2 mb-4">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Skill Title" required className="w-full p-2 border rounded" />
        <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required className="w-full p-2 border rounded" />
        <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">Add Skill</button>
      </form>
      {skills.map(skill => <SkillCard key={skill.id} skill={skill} />)}
    </div>
);
}