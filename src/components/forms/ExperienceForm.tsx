import React, { useState } from 'react';
import { Briefcase, PlusCircle, Trash2, Building2, Calendar, ChevronDown, ChevronUp, Award, Edit3 } from 'lucide-react';
import { useResumeData, type Experience } from '../../contexts/ResumeContext';
import { FormSection } from '../ui/FormSection';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

export const ExperienceForm = () => {
  const { resumeData, updateResumeData } = useResumeData();
  const [expandedItems, setExpandedItems] = useState(new Set([1])); // First item expanded by default

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, x: -20, scale: 0.98 },
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now(),
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    updateResumeData({
      experiences: [...resumeData.experiences, newExperience]
    });
    // Auto-expand the new item
    setExpandedItems(prev => new Set([...prev, newExperience.id]));
  };

  const updateExperience = (id: number, field: keyof Experience, value: string | boolean) => {
    updateResumeData({
      experiences: resumeData.experiences.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const removeExperience = (id: number) => {
    updateResumeData({
      experiences: resumeData.experiences.filter(exp => exp.id !== id)
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

  const formatDateRange = (startDate: string, endDate: string, current: boolean) => {
    const formatDate = (dateStr: string) => {
      if (!dateStr) return '';
      const date = new Date(dateStr + '-01');
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };
    
    const start = formatDate(startDate);
    const end = current ? 'Present' : formatDate(endDate);
    return start && (end || current) ? `${start} - ${end}` : '';
  };

  return (
    <motion.div variants={formVariants} initial="hidden" animate="visible">
      <FormSection icon={Briefcase} title="Work Experience" subtitle="Detail your professional roles and accomplishments." className="overflow-hidden relative">
      <div className="space-y-6">
        {/* Experience counter */}
        <div className="flex items-center justify-end">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Award className="w-4 h-4" />
            <span>{resumeData.experiences.length} {resumeData.experiences.length === 1 ? 'position' : 'positions'}</span>
          </div>
        </div>

        {resumeData.experiences.length === 0 ? (
          // Empty state
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">No work experience added yet</h4>
            <p className="text-gray-600 mb-6">Add your first position to get started with your professional journey</p>
          </div>
        ) : (
          // Experience items
          <div className="space-y-4">
            <AnimatePresence>
              {resumeData.experiences.map((exp, index) => {
                const isExpanded = expandedItems.has(exp.id);
                const isEmpty = !exp.jobTitle && !exp.company && !exp.description;
                
                return (
                  <motion.div
                    key={exp.id}
                    layout
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3, type: 'spring', stiffness: 100, damping: 20 }}
                    whileHover={{ scale: 1.02, y: -4, boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}
                    className="cursor-pointer"
                  >
                    <div 
                      className={`border-2 rounded-2xl transition-all duration-300 ${
                        isEmpty ? 'border-amber-200 bg-amber-50/30' : 
                        isExpanded ? 'border-blue-200 bg-blue-50/30' : 'border-gray-200 bg-white hover:border-gray-300'
                      } ${isExpanded ? 'shadow-lg' : 'shadow-sm hover:shadow-md'}`}
                    >
                      {/* Experience Header */}
                      <div 
                        className="px-6 py-4"
                        onClick={() => toggleExpanded(exp.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 min-w-0 flex-1">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                              isEmpty ? 'bg-amber-100' : 'bg-blue-100'
                            }`}>
                              <Building2 className={`w-6 h-6 ${isEmpty ? 'text-amber-600' : 'text-blue-600'}`} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center space-x-3">
                                <h4 className={`font-semibold truncate ${
                                  exp.jobTitle ? 'text-gray-900' : 'text-gray-400'
                                }`}>
                                  {exp.jobTitle || `Experience ${index + 1}`}
                                </h4>
                                {exp.current && (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Current
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                                {exp.company && (
                                  <span className="flex items-center">
                                    <Building2 className="w-3 h-3 mr-1" />
                                    {exp.company}
                                  </span>
                                )}
                                {(exp.startDate || exp.current) && (
                                  <span className="flex items-center">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
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
                                removeExperience(exp.id);
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
                                    label="Job Title"
                                    placeholder="e.g. Senior Software Engineer"
                                    value={exp.jobTitle}
                                    onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                                  />
                                  <Input
                                    label="Company"
                                    placeholder="e.g. TechCorp Inc."
                                    value={exp.company}
                                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                  />
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <Input
                                    label="Start Date"
                                    type="month"
                                    value={exp.startDate}
                                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                                  />
                                  <div className="space-y-4">
                                    <Input
                                      label="End Date"
                                      type="month"
                                      value={exp.endDate}
                                      disabled={exp.current}
                                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                    />
                                    <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                                      <input
                                        type="checkbox"
                                        checked={exp.current}
                                        onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors"
                                      />
                                      <span className="text-sm font-medium text-gray-700">This is my current position</span>
                                    </label>
                                  </div>
                                </div>

                                <Textarea
                                  label="Job Description & Achievements"
                                  placeholder="Describe your key responsibilities, achievements, and impact in this role. Include specific metrics and technologies used..."
                                  value={exp.description}
                                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                                  rows={6}
                                />

                                {/* Character count for description */}
                                <div className="text-right">
                                  <span className="text-xs text-gray-500">
                                    {exp.description?.length || 0} characters
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

        {/* Add Experience Button */}
        <Button 
          onClick={addExperience} 
          variant="secondary" 
          className="w-full py-4 border-2 border-dashed border-gray-300 hover:border-blue-300 hover:bg-blue-50 group"
        >
          <PlusCircle className="w-5 h-5 mr-3 group-hover:text-blue-600 transition-colors" />
          <span className="group-hover:text-blue-600 transition-colors">Add Work Experience</span>
        </Button>

        {/* Tips section */}
        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
          <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
            <Edit3 size={18} className="mr-2" />
            Pro Tips for Work Experience
          </h3>
          <ul className="text-blue-800 space-y-2 text-sm">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Start each bullet point with a strong action verb (e.g., "Led," "Developed," "Managed").
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Quantify your achievements with numbers and metrics whenever possible (e.g., "Increased sales by 15%").
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Focus on your accomplishments and impact, not just your daily responsibilities.
            </li>
          </ul>
        </div>
      </div>
      </FormSection>
    </motion.div>
  );
};