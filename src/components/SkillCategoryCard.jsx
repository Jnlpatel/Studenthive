// src/components/SkillCategoryCard.jsx
import {
    FaCode,
    FaPalette,
    FaChartLine,
    FaLanguage
  } from 'react-icons/fa';
  
  const ICONS = {
    code: FaCode,
    palette: FaPalette,
    'chart-line': FaChartLine,
    language: FaLanguage,
  };
  
  export default function SkillCategoryCard({ skill }) {
    const Icon = ICONS[skill.icon] || FaCode;
    return (
      <div className="bg-white p-3 rounded-lg shadow flex items-center">
        <Icon className="text-teal-700 text-xl mr-3"/>
        <div>
          <p className="font-medium">{skill.label}</p>
          <p className="text-xs text-gray-500">{skill.subtitle}</p>
        </div>
      </div>
    );
  }
  