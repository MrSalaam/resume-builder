import type { FC } from 'react';
import type { Skill } from '../../contexts/ResumeContext';

interface SkillCategoryProps {
  level: string;
  skills: Skill[];
  getSkillLevelColor: (level: string) => string;
}

export const SkillCategory: FC<SkillCategoryProps> = ({ level, skills, getSkillLevelColor }) => {
  if (skills.length === 0) return null;

  const levelColors = {
    'Expert': 'from-emerald-500 to-green-600',
    'Advanced': 'from-orange-500 to-red-600',
    'Intermediate': 'from-yellow-500 to-orange-600',
    'Beginner': 'from-blue-500 to-purple-600'
  };

  



  const gradientColor = levelColors[level as keyof typeof levelColors] || levelColors['Intermediate'];

  return (
    <div className="mb-8">
      {/* Category Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-3 h-3 bg-gradient-to-r ${gradientColor} rounded-full`}></div>
        <h4 className="text-lg font-bold text-gray-800 uppercase tracking-wide">
          {level}
        </h4>
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {skills.length}
        </span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>
      
      {/* Skills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {skills.map((skill) => (
          <div 
            key={skill.id} 
            className={`group bg-gradient-to-r ${gradientColor} text-white px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105`}
          >
            <span className="text-sm font-medium text-center block">
              {skill.name || 'Skill Name'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};