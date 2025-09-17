import { useState } from 'react';
import { GraduationCap, PlusCircle, Trash2, School, Calendar, ChevronDown, ChevronUp, BookOpen, Award } from 'lucide-react';
import { useResumeData, type Education } from '../../contexts/ResumeContext';
import { motion, AnimatePresence } from 'framer-motion';


// UI Components
type FormSectionProps = { children: React.ReactNode; className?: string };
const FormSection = ({ children, className = "" }: FormSectionProps) => (
  <div className={`bg-white rounded-2xl border border-gray-100 shadow-lg ${className}`}>
    {children}
  </div>
);

type InputProps = {
  label: string;
  placeholder?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
  className?: string;
};
const Input = ({ label, placeholder, value, onChange, type = "text", className = "" }: InputProps) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${className}`}
    />
  </div>
);

type TextareaProps = {
  label: string;
  placeholder?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  className?: string;
};
const Textarea = ({ label, placeholder, value, onChange, className = "" }: TextareaProps) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${className}`}
      rows={3}
    />
  </div>
);

type ButtonVariant = 'secondary' | 'danger' | 'primary';
type ButtonSize = 'sm' | 'md';
type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

const Button = ({ variant = 'primary', size = "md", onClick, disabled = false, className = "", children }: ButtonProps) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 transform hover:scale-105 disabled:transform-none";
  const variants: Record<ButtonVariant, string> = {
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 hover:border-gray-300",
    danger: "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 hover:border-red-300",
    primary: "bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl"
  };
  const sizes: Record<ButtonSize, string> = {
    sm: "px-3 py-2 text-sm rounded-lg",
    md: "px-6 py-3 rounded-xl"
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
    >
      {children}
    </button>
  );
};

export const EducationForm = () => {
  const { resumeData, updateResumeData } = useResumeData();
  const [expandedItems, setExpandedItems] = useState(new Set([1])); // First item expanded by default
  
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, x: -20, scale: 0.98 },
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now(),
      degree: '',
      school: '',
      year: '',
      description: ''
    };
    updateResumeData({
      education: [...resumeData.education, newEducation]
    });
    // Auto-expand the new item
    setExpandedItems(prev => new Set([...prev, newEducation.id]));
  };

  const updateEducation = (id: number, field: keyof Education, value: string) => {
    updateResumeData({
      education: resumeData.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  const removeEducation = (id: number) => {
    updateResumeData({
      education: resumeData.education.filter(edu => edu.id !== id)
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

  type EducationLevel = 'PhD' | 'Masters' | 'Bachelor' | 'Associate' | 'Other';

  const getDegreeLevel = (degree: string): EducationLevel => {
    const lowerDegree = degree.toLowerCase();
    if (lowerDegree.includes('phd') || lowerDegree.includes('doctorate')) return 'PhD';
    if (lowerDegree.includes('master') || lowerDegree.includes('msc') || lowerDegree.includes('mba')) return 'Masters';
    if (lowerDegree.includes('bachelor') || lowerDegree.includes('bsc') || lowerDegree.includes('ba')) return 'Bachelor';
    if (lowerDegree.includes('associate') || lowerDegree.includes('diploma')) return 'Associate';
    return 'Other';
  };

  const getLevelColor = (level: EducationLevel): string => {
    const colors: Record<EducationLevel, string> = {
      'PhD': 'bg-purple-100 text-purple-800 border-purple-200',
      'Masters': 'bg-blue-100 text-blue-800 border-blue-200',
      'Bachelor': 'bg-green-100 text-green-800 border-green-200',
      'Associate': 'bg-orange-100 text-orange-800 border-orange-200',
      'Other': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[level] || colors['Other'];
  };

  return (
    <motion.div variants={formVariants} initial="hidden" animate="visible">
      <FormSection className="overflow-hidden relative">
      {/* Header */}
      <div className="bg-blue-50 px-8 py-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white rounded-xl shadow-sm">
              <GraduationCap className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Education</h3>
              <p className="text-sm text-gray-600 mt-1">
                Add your academic qualifications and achievements
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <BookOpen className="w-4 h-4" />
            <span>{resumeData.education.length} {resumeData.education.length === 1 ? 'qualification' : 'qualifications'}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 space-y-6">
        {resumeData.education.length === 0 ? (
          // Empty state
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">No education added yet</h4>
            <p className="text-gray-600 mb-6">Add your educational background to showcase your academic achievements</p>
          </div>
        ) : (
          // Education items
          <div className="space-y-4">
            <AnimatePresence>
              {resumeData.education.map((edu, index) => {
                const isExpanded = expandedItems.has(edu.id);
                const isEmpty = !edu.degree && !edu.school && !edu.year;
                const degreeLevel = getDegreeLevel(edu.degree);
                const levelColor = getLevelColor(degreeLevel);
                
                return (
                  <motion.div
                    key={edu.id}
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
                        isExpanded ? 'border-purple-200 bg-purple-50/30' : 'border-gray-200 bg-white hover:border-gray-300'
                      } ${isExpanded ? 'shadow-lg' : 'shadow-sm hover:shadow-md'}`}
                    >
                      {/* Education Header */}
                      <div 
                        className="px-6 py-4"
                        onClick={() => toggleExpanded(edu.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 min-w-0 flex-1">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                              isEmpty ? 'bg-amber-100' : 'bg-purple-100'
                            }`}>
                              <School className={`w-6 h-6 ${isEmpty ? 'text-amber-600' : 'text-purple-600'}`} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center space-x-3 mb-1">
                                <h4 className={`font-semibold truncate ${
                                  edu.degree ? 'text-gray-900' : 'text-gray-400'
                                }`}>
                                  {edu.degree || `Education ${index + 1}`}
                                </h4>
                                {edu.degree && !isEmpty && (
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${levelColor}`}>
                                    {degreeLevel}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                {edu.school && (
                                  <span className="flex items-center">
                                    <School className="w-3 h-3 mr-1" />
                                    {edu.school}
                                  </span>
                                )}
                                {edu.year && (
                                  <span className="flex items-center">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {edu.year}
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
                                e.stopPropagation();
                                removeEducation(edu.id);
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
                                    label="Degree / Qualification"
                                    placeholder="e.g. Bachelor of Science in Computer Science"
                                    value={edu.degree}
                                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                  />
                                  <Input
                                    label="School / Institution"
                                    placeholder="e.g. University of Technology"
                                    value={edu.school}
                                    onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                                  />
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <Input
                                    label="Graduation Year"
                                    placeholder="e.g. 2024"
                                    value={edu.year}
                                    onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                                  />
                                  <div className="flex items-end">
                                    <div className="text-sm text-gray-600 p-3 bg-gray-50 rounded-xl">
                                      <p className="font-medium mb-1">Quick tip:</p>
                                      <p>Use format like "2024" or "2020-2024"</p>
                                    </div>
                                  </div>
                                </div>

                                <Textarea
                                  label="Additional Details (Optional)"
                                  placeholder="Relevant coursework, academic achievements, honors, GPA, thesis topic, etc..."
                                  value={edu.description}
                                  onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                                  className="min-h-[80px]"
                                />

                                {/* Character count for description */}
                                <div className="text-right">
                                  <span className="text-xs text-gray-500">
                                    {edu.description?.length || 0} characters
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

        {/* Add Education Button */}
        <Button 
          onClick={addEducation} 
          variant="secondary" 
          className="w-full py-4 border-2 border-dashed border-gray-300 hover:border-purple-300 hover:bg-purple-50 group"
        >
          <PlusCircle className="w-5 h-5 mr-3 group-hover:text-gray-400 transition-colors" />
          <span className="group-hover:text-gray-400 transition-colors">Add Education</span>
        </Button>

        {/* Tips section */}
        <div className="bg-blue-50 rounded-2xl p-6 border border-purple-100">
          <h4 className="font-semibold text-blue-700 mb-3 flex items-center">
            <Award size={18} className="mr-2" />
            Pro Tips for Education 
          </h4>
          <ul className="text-blue-700 space-y-2 text-sm">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              List your education in reverse chronological order (most recent first).
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Mention honors, awards, and a high GPA (if applicable) to stand out.
            </li>
          </ul>
        </div>
      </div>
      </FormSection>
    </motion.div>
  );
};