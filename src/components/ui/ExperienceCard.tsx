import type { FC } from 'react';
import { ChevronRight, Calendar } from 'lucide-react';
import type { Experience } from '../../contexts/ResumeContext';

interface ExperienceCardProps {
  experience: Experience;
  formatDateRange: (start: string, end: string, current?: boolean) => string | null;
}

export const ExperienceCard: FC<ExperienceCardProps> = ({ experience, formatDateRange }) => {
  return (
    <div className="group relative">
      {/* Timeline Connector */}
    
      
      <div className="ml-12 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group-hover:transform group-hover:scale-[1.02]">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-4 gap-4">
            <div className="flex-1">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                {experience.jobTitle || 'Job Title'}
              </h3>
              <p className="text-lg font-semibold text-blue-600 mb-1">
                {experience.company || 'Company Name'}
              </p>
            </div>
            
            {formatDateRange(experience.startDate, experience.endDate, experience.current) && (
              <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-lg border border-blue-100">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">
                  {formatDateRange(experience.startDate, experience.endDate, experience.current)}
                </span>
              </div>
            )}
          </div>
          
          {/* Description */}
          {experience.description && (
            <div className="prose prose-gray max-w-none">
              {experience.description.split('\n').map((line, i) => (
                <div key={i} className={line.trim().startsWith('•') ? 'flex items-start gap-3 mb-2' : 'mb-3'}>
                  {line.trim().startsWith('•') && (
                    <ChevronRight className="w-4 h-4 mt-1 text-blue-500 flex-shrink-0" />
                  )}
                          <p className="text-gray-700 leading-relaxed overflow-wrap break-words">
                    {line.replace(/^•/, '').trim()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};