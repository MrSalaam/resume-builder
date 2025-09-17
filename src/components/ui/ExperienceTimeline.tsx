import type { FC } from 'react';
import { Briefcase, Building2, Calendar } from 'lucide-react';
import type { Experience } from '../../contexts/ResumeContext';

interface ExperienceTimelineProps {
  experiences: Experience[];
  formatDateRange: (start: string, end: string, current?: boolean) => string | null;
}

export const ExperienceTimeline: FC<ExperienceTimelineProps> = ({ 
  experiences, 
  formatDateRange 
}) => {
  if (!experiences || experiences.length === 0) return null;

  return (
    <section className="relative">
      {/* Background Decoration */}

      
      <div className="relative">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-gray-700" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Professional Experience
          </h2>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-700"></div>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="relative flex gap-6">
                {/* Timeline Dot */}
                <div className="relative z-10 w-12 h-12 bg-white border-4 border-blue-50 rounded-full flex items-center justify-center shadow-lg">
                  <Building2 className="w-5 h-5 text-gray-700" />
                </div>
                
                {/* Content Card */}
                <div className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8 hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {exp.jobTitle}
                      </h3>
                      <div className="flex items-center gap-2 text-blue-500 font-semibold mb-2">
                        <Building2 className="w-4 h-4" />
                        <span>{exp.company}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                      </span>
                      {exp.current && (
                        <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Current
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {exp.description && (
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line break-words overflow-wrap">
                        {exp.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};