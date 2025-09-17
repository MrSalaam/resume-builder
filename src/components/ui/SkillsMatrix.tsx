import type { FC } from 'react';
import { Award, Star, Zap, Target } from 'lucide-react';
import type { Skill } from '../../contexts/ResumeContext';

interface SkillsMatrixProps {
  skills: Skill[];
  getSkillLevelColor: (level: string) => string;
}

export const SkillsMatrix: FC<SkillsMatrixProps> = ({ 
  skills, 
  getSkillLevelColor 
}) => {
  if (!skills || skills.length === 0) return null;

  const getLevelIcon = (level: Skill['level']) => {
    const icons = {
      'Beginner': Star,
      'Intermediate': Zap,
      'Advanced': Target,
      'Expert': Award
    };
    return icons[level] || Star;
  };

  const getLevelProgress = (level: Skill['level']) => {
    const progress = {
      'Beginner': 25,
      'Intermediate': 50,
      'Advanced': 75,
      'Expert': 100
    };
    return progress[level] || 50;
  };

  // Group skills by level
  const skillsByLevel = skills.reduce((acc: Record<string, Skill[]>, skill) => {
    if (!acc[skill.level]) acc[skill.level] = [];
    acc[skill.level].push(skill);
    return acc;
  }, {});

  const levelOrder: Skill['level'][] = ['Expert', 'Advanced', 'Intermediate', 'Beginner'];

  return (
    <section className="relative">
     
      
      <div className="relative">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
            <Award className="w-6 h-6 text-gray-700" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Skills & Expertise
          </h2>
        </div>

        <div className="space-y-8">
          {levelOrder.map(level => {
            const levelSkills = skillsByLevel[level];
            if (!levelSkills || levelSkills.length === 0) return null;
            
            const LevelIcon = getLevelIcon(level);
            const levelColor = getSkillLevelColor(level);
            
            return (
              <div key={level} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2 rounded-xl ${levelColor}`}>
                    <LevelIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{level}</h3>
                  <span className="text-sm text-gray-500">({levelSkills.length})</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {levelSkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium text-gray-900">{skill.name}</span>
                        <span className="text-xs text-gray-500">{getLevelProgress(skill.level)}%</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${getLevelProgress(skill.level)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};