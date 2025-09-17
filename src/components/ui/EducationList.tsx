import type { FC } from 'react';
import { GraduationCap, School, Calendar } from 'lucide-react';
import type { Education } from '../../contexts/ResumeContext';

interface EducationListProps {
  education: Education[];
  getDegreeLevel: (degree: string) => string;
  getLevelColor: (level: string) => string;
}

export const EducationList: FC<EducationListProps> = ({ 
  education, 
  getDegreeLevel, 
  getLevelColor 
}) => {
  if (!education || education.length === 0) return null;

  return (
    <section className="relative">
      

      <div className="relative">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-gray-700" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Education
          </h2>
        </div>

        <div className="space-y-6">
          {education.map((edu, index) => {
            const degreeLevel = getDegreeLevel(edu.degree);
            const levelColor = getLevelColor(degreeLevel);
            
            return (
              <div 
                key={edu.id} 
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8 hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {edu.degree}
                      </h3>
                      {degreeLevel !== 'Other' && (
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${levelColor}`}>
                          {degreeLevel}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 text-blue-600 font-semibold mb-2">
                      <School className="w-4 h-4" />
                      <span>{edu.school}</span>
                    </div>
                  </div>
                  
                  {edu.year && (
                    <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-medium">{edu.year}</span>
                    </div>
                  )}
                </div>
                
                {edu.description && (
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed break-words overflow-wrap">
                      {edu.description}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};