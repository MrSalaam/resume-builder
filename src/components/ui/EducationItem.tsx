import type { FC } from 'react';
import { Calendar } from 'lucide-react';
import type { Education } from '../../contexts/ResumeContext';

interface EducationItemProps {
  education: Education;
  getDegreeLevel: (degree: string) => string;
  getLevelColor: (level: string) => string;
}

export const EducationItem: FC<EducationItemProps> = ({ education, getDegreeLevel, getLevelColor }) => {
  const degreeLevel = getDegreeLevel(education.degree);
  const levelColor = getLevelColor(degreeLevel);

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-green-200 p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {education.degree || 'Degree'}
          </h3>
          <p className="text-lg font-semibold text-green-600 mb-3">
            {education.school || 'School Name'}
          </p>
          
          {/* Degree Level Badge */}
          {education.degree && (
            <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border ${levelColor}`}>
              {degreeLevel}
            </span>
          )}
        </div>
        
        {/* Year */}
        {education.year && (
          <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg border border-green-100">
            <Calendar className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">
              {education.year}
            </span>
          </div>
        )}
      </div>
      
      {/* Description */}
      {education.description && (
        <div className="pt-4 border-t border-gray-100">
          <p className="text-gray-700 leading-relaxed">
            {education.description}
          </p>
        </div>
      )}
    </div>
  );
};