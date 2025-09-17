import { useState } from 'react';
import { FolderOpen, PlusCircle, Trash2, ExternalLink, Calendar, ChevronDown, ChevronUp, Code, Lightbulb } from 'lucide-react';
import { useResumeData, type Project } from '../../contexts/ResumeContext';
import { FormSection } from '../ui/FormSection';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

export const ProjectsForm = () => {
  const { resumeData, updateResumeData } = useResumeData();
  const [expandedItems, setExpandedItems] = useState(new Set([1])); // First item expanded by default

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, x: -20, scale: 0.98 },
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now(),
      name: '',
      description: '',
      technologies: '',
      url: '',
      startDate: '',
      endDate: ''
    };
    updateResumeData({
      projects: [...resumeData.projects, newProject]
    });
    // Auto-expand the new item
    setExpandedItems(prev => new Set([...prev, newProject.id]));
  };

  const updateProject = (id: number, field: keyof Project, value: string) => {
    updateResumeData({
      projects: resumeData.projects.map(project =>
        project.id === id ? { ...project, [field]: value } : project
      )
    });
  };

  const removeProject = (id: number) => {
    updateResumeData({
      projects: resumeData.projects.filter(project => project.id !== id)
    });
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const toggleExpanded = (id: number) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    const formatDate = (dateStr: string) => {
      if (!dateStr) return '';
      const date = new Date(dateStr + '-01');
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };
    
    const start = formatDate(startDate);
    const end = formatDate(endDate);
    return start && end ? `${start} - ${end}` : start || end || '';
  };

  return (
    <motion.div variants={formVariants} initial="hidden" animate="visible">
      <FormSection icon={FolderOpen} title="Projects" className="overflow-hidden relative">
      <div className="space-y-6">
        {/* Project counter */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showcase your personal and professional projects
          </p>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Code className="w-4 h-4" />
            <span>{resumeData.projects.length} {resumeData.projects.length === 1 ? 'project' : 'projects'}</span>
          </div>
        </div>

        {resumeData.projects.length === 0 ? (
          // Empty state
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FolderOpen className="w-8 h-8 text-indigo-600" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">No projects added yet</h4>
            <p className="text-gray-600 mb-6">Add your first project to showcase your work and skills</p>
          </div>
        ) : (
          // Project items
          <div className="space-y-4">
            <AnimatePresence>
              {resumeData.projects.map((project, index) => {
                const isExpanded = expandedItems.has(project.id);
                const isEmpty = !project.name && !project.description && !project.technologies;
                
                return (
                  <motion.div
                    key={project.id}
                    layout
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3, type: 'spring', stiffness: 100, damping: 20 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="cursor-pointer"
                  >
                    <div 
                      className={`border-2 rounded-2xl transition-all duration-300 ${
                        isEmpty ? 'border-amber-200 bg-amber-50/30' : 
                        isExpanded ? 'border-indigo-200 bg-indigo-50/30' : 'border-gray-200 bg-white hover:border-gray-300'
                      } ${isExpanded ? 'shadow-lg' : 'shadow-sm hover:shadow-md'}`}
                    >
                      {/* Project Header */}
                      <div 
                        className="px-6 py-4"
                        onClick={() => toggleExpanded(project.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 min-w-0 flex-1">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                              isEmpty ? 'bg-amber-100' : 'bg-indigo-100'
                            }`}>
                              <FolderOpen className={`w-6 h-6 ${isEmpty ? 'text-amber-600' : 'text-indigo-600'}`} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center space-x-3">
                                <h4 className={`font-semibold truncate ${
                                  project.name ? 'text-gray-900' : 'text-gray-400'
                                }`}>
                                  {project.name || `Project ${index + 1}`}
                                </h4>
                                {project.url && (
                                  <ExternalLink className="w-4 h-4 text-indigo-500" />
                                )}
                              </div>
                              <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                                {project.technologies && (
                                  <span className="flex items-center">
                                    <Code className="w-3 h-3 mr-1" />
                                    {project.technologies.split(',').slice(0, 2).join(', ')}
                                    {project.technologies.split(',').length > 2 && '...'}
                                  </span>
                                )}
                                {(project.startDate || project.endDate) && (
                                  <span className="flex items-center">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {formatDateRange(project.startDate, project.endDate)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={(e) => {
                                e?.stopPropagation();
                                removeProject(project.id);
                              }}
                              className="opacity-70 hover:opacity-100"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Expandable Content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 border-t border-gray-100">
                              <div className="pt-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <Input
                                    label="Project Name"
                                    placeholder="e.g. E-commerce Platform"
                                    value={project.name}
                                    onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                                  />
                                  <Input
                                    label="Project URL (Optional)"
                                    placeholder="https://github.com/username/project"
                                    value={project.url || ''}
                                    onChange={(e) => updateProject(project.id, 'url', e.target.value)}
                                  />
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <Input
                                    label="Start Date"
                                    type="month"
                                    value={project.startDate}
                                    onChange={(e) => updateProject(project.id, 'startDate', e.target.value)}
                                  />
                                  <Input
                                    label="End Date"
                                    type="month"
                                    value={project.endDate}
                                    onChange={(e) => updateProject(project.id, 'endDate', e.target.value)}
                                  />
                                </div>

                                <Input
                                  label="Technologies Used"
                                  placeholder="e.g. React, Node.js, MongoDB, AWS"
                                  value={project.technologies}
                                  onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                                />

                                <Textarea
                                  label="Project Description"
                                  placeholder="Describe what the project does, your role, key features, challenges overcome, and impact..."
                                  value={project.description}
                                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                                  rows={5}
                                />

                                {/* Character count for description */}
                                <div className="text-right">
                                  <span className="text-xs text-gray-500">
                                    {project.description?.length || 0} characters
                                  </span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Add Project Button */}
        <Button 
          onClick={addProject} 
          variant="secondary" 
          className="w-full py-4 border-2 border-dashed border-gray-300 hover:border-indigo-300 hover:bg-indigo-50 group"
        >
          <PlusCircle className="w-5 h-5 mr-3 group-hover:text-indigo-600 transition-colors" />
          <span className="group-hover:text-indigo-600 transition-colors">Add Project</span>
        </Button>

        {/* Tips section */}
        <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
          <h4 className="font-semibold text-indigo-900 mb-3 flex items-center">
            <Lightbulb size={18} className="mr-2" />
            Project Section Tips
          </h4>
          <ul className="text-indigo-800 space-y-2 text-sm">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Explain your specific role and contributions to each project.
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Add links to live demos or code repositories (like GitHub) to showcase your work.
            </li>
          </ul>
        </div>
      </div>
      </FormSection>
    </motion.div>
  );
};