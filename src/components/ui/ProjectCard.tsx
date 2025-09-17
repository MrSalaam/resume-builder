import type { FC } from 'react';
import { ExternalLink, Github, Layers, Calendar } from 'lucide-react';
import type { Project } from '../../contexts/ResumeContext';

interface ProjectCardProps {
  project: Project;
  formatDateRange: (start: string, end: string) => string | null;
}

export const ProjectCard: FC<ProjectCardProps> = ({ project, formatDateRange }) => {
  return (
    <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200 overflow-hidden hover:transform hover:scale-[1.02]">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
              {project.name || 'Project Name'}
              {project.url && (
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                >
                  {project.url.includes('github') ? 
                    <Github className="w-4 h-4" /> : 
                    <ExternalLink className="w-4 h-4" />
                  }
                </a>
              )}
            </h3>
            
            {formatDateRange(project.startDate, project.endDate) && (
              <div className="flex items-center gap-2 text-purple-100">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {formatDateRange(project.startDate, project.endDate)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Technologies */}
        {project.technologies && (
          <div className="mb-4">
            <div className="flex items-center gap-2 bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-2 rounded-lg border border-purple-100">
              <Layers className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">
                {project.technologies}
              </span>
            </div>
          </div>
        )}
        
        {/* Description */}
        {project.description && (
          <p className="text-gray-700 leading-relaxed">
            {project.description}
          </p>
        )}
      </div>
      
      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};