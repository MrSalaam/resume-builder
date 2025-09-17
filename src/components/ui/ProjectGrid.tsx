import type { FC } from 'react';
import { FolderOpen, ExternalLink, Calendar, Code } from 'lucide-react';
import type { Project } from '../../contexts/ResumeContext';

interface ProjectGridProps {
  projects: Project[];
  formatDateRange: (start: string, end: string, current?: boolean) => string | null;
}

export const ProjectGrid: FC<ProjectGridProps> = ({ 
  projects, 
  formatDateRange 
}) => {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="relative">
      
      
      <div className="relative">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
            <FolderOpen className="w-6 h-6 text-gray-700" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Featured Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FolderOpen className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-bold inline text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {project.name}
                  </h3>
                </div>
                
                {project.url && (
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>

              {(project.startDate || project.endDate) && (
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {formatDateRange(project.startDate, project.endDate, project.current)}
                  </span>
                </div>
              )}

              {project.description && (
                <p className="text-gray-700 leading-relaxed mb-4 " style={{ wordWrap: 'break-word' }}>
                  {project.description}
                </p>
              )}

              {project.technologies && (
                <div className="flex items-start gap-2">
                  <Code className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.split(',').map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};