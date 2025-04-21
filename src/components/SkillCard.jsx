export default function SkillCard({ skill }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <h3 className="text-lg font-semibold">{skill.title}</h3>
      <p className="text-sm text-gray-600">{skill.description}</p>
    </div>
  );
}
