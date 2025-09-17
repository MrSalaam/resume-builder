import React, { useState } from 'react';
import { Award, PlusCircle, Trash2, Code, Star, Zap, Target, ChevronDown, TrendingUp } from 'lucide-react';
import { useResumeData, type Skill } from '../../contexts/ResumeContext';
import { motion } from 'framer-motion';


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
  className?: string;
};
const Input = ({ label, placeholder, value, onChange, className = "" }: InputProps) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${className}`}
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
const Button = ({ variant = 'primary', size = 'md', onClick, disabled = false, className = "", children }: ButtonProps) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 transform hover:scale-105 disabled:transform-none";
  const variants: Record<ButtonVariant, string> = {
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 hover:border-gray-300",
    danger: "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 hover:border-red-300",
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
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

export const SkillsForm = () => {
  const { resumeData, updateResumeData } = useResumeData();
  const [isAdding, setIsAdding] = useState(false);
  const [newSkill, setNewSkill] = useState<{name: string, level: Skill['level']}>({ name: '', level: 'Intermediate' });
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4 } },
  };

  const addSkill = () => {
    if (newSkill.name.trim()) {
      const skill = {
        id: Date.now(),
        name: newSkill.name.trim(),
        level: newSkill.level
      };
      updateResumeData({
        skills: [...resumeData.skills, skill]
      });
      setNewSkill({ name: '', level: 'Intermediate' });
      setIsAdding(false);
    }
  };

  const updateSkill = (id: number, field: keyof Skill, value: string) => {
    updateResumeData({
      skills: resumeData.skills.map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    });
  };

  const removeSkill = (id: number) => {
    updateResumeData({
      skills: resumeData.skills.filter(skill => skill.id !== id)
    });
  };

  const getLevelIcon = (level: Skill['level']) => {
    const icons: Record<Skill['level'], typeof Star> = {
      'Beginner': Star,
      'Intermediate': Zap,
      'Advanced': Target,
      'Expert': Award
    };
    return icons[level] || Star;
  };

  const getLevelColor = (level: Skill['level']) => {
    const colors: Record<Skill['level'], string> = {
      'Beginner': 'bg-blue-100 text-blue-800 border-blue-200',
      'Intermediate': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Advanced': 'bg-orange-100 text-orange-800 border-orange-200',
      'Expert': 'bg-emerald-100 text-emerald-800 border-emerald-200'
    };
    return colors[level] || colors['Intermediate'];
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

  const skillsByLevel = resumeData.skills.reduce((acc: Record<Skill['level'], Skill[]>, skill) => {
    if (!acc[skill.level]) acc[skill.level] = [] as Skill[];
    acc[skill.level].push(skill);
    return acc;
  }, { Beginner: [], Intermediate: [], Advanced: [], Expert: [] } as Record<Skill['level'], Skill[]>);

  return (
    <motion.div variants={formVariants} initial="hidden" animate="visible">
      <FormSection className="overflow-hidden relative">
      {/* Header */}
      <div className="bg-blue-50 px-8 py-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white rounded-xl shadow-sm">
              <Award className="w-6 h-6 text-gray-700" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Skills & Expertise</h3>
              <p className="text-sm text-gray-600 mt-1">
                Showcase your technical and professional abilities
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <TrendingUp className="w-4 h-4" />
              <span>{resumeData.skills.length} {resumeData.skills.length === 1 ? 'skill' : 'skills'}</span>
            </div>
            <div className="flex items-center bg-white rounded-lg border border-gray-200 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-50 text-emerald-700' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  viewMode === 'list' ? 'bg-blue-50 text-emerald-700' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 space-y-6">
        {resumeData.skills.length === 0 ? (
          // Empty state
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Code className="w-8 h-8 text-blue-200" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">No skills added yet</h4>
            <p className="text-gray-600 mb-6">Add your technical and professional skills to highlight your expertise</p>
          </div>
        ) : (
          // Skills display
          <div className="space-y-6">
            {viewMode === 'grid' ? (
              // Grid view - grouped by level
              <div className="space-y-6">
                {(Object.entries(skillsByLevel) as Array<[Skill['level'], Skill[]]>).map(([level, skills]) => (
                  <div key={level}>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`p-2 rounded-xl ${getLevelColor(level)}`}>
                        {React.createElement(getLevelIcon(level), { className: "w-4 h-4" })}
                      </div>
                      <h4 className="font-semibold text-gray-900">{level}</h4>
                      <span className="text-sm text-gray-500">({skills.length})</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {skills.map((skill) => (
                        <motion.div
                          key={skill.id}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="group relative bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer"
                        >
                          
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900 truncate pr-2">{skill.name}</span>
                            <button
                              onClick={() => removeSkill(skill.id)}
                              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded-lg transition-all duration-200"
                            >
                              <Trash2 className="w-3 h-3 text-red-500" />
                            </button>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">{skill.level}</span>
                              <span className="text-gray-500">{getLevelProgress(skill.level)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <motion.div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${getLevelProgress(skill.level)}%` }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // List view
              <div className="space-y-3">
                {resumeData.skills.map((skill) => {
                  const LevelIcon = getLevelIcon(skill.level);
                  return (
                    <motion.div
                      key={skill.id}
                      whileHover={{ scale: 1.02, y: -2, boxShadow: '0 5px 15px rgba(0,0,0,0.04)' }}
                      className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 transition-all duration-200 group cursor-pointer"
                    >
                      <div className={`p-2 rounded-lg ${getLevelColor(skill.level)}`}>
                        <LevelIcon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                          className="w-full font-medium text-gray-900 bg-transparent border-none outline-none focus:ring-0 p-0"
                          placeholder="Skill name"
                        />
                      </div>
                      <div className="relative">
                        <select
                          value={skill.level}
                          onChange={(e) => updateSkill(skill.id, 'level', e.target.value as Skill['level'])}
                          className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                          <option value="Expert">Expert</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                      <button
                        onClick={() => removeSkill(skill.id)}
                        className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-50 rounded-lg transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Add Skill Section */}
        {isAdding ? (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <h4 className="font-semibold text-blue-900 mb-4">Add New Skill</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input
                label="Skill Name"
                placeholder="e.g. JavaScript, Project Management"
                value={newSkill.name}
                onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
              />
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Proficiency Level</label>
                <div className="relative">
                  <select 
                    value={newSkill.level as Skill['level']}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewSkill(prev => ({ ...prev, level: e.target.value as Skill['level'] }))}
                    className="w-full appearance-none px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent pr-10"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button onClick={addSkill} disabled={!newSkill.name.trim()}>
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Skill
              </Button>
              <Button variant="secondary" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button 
            onClick={() => setIsAdding(true)}
            variant="secondary" 
            className="w-full py-4 border-2 border-dashed border-gray-300 hover:border-blue-300 hover:bg-blue-50 group"
          >
            <PlusCircle className="w-5 h-5 mr-3 group-hover:text-blue-600 transition-colors" />
            <span className="group-hover:text-blue-600 transition-colors">Add New Skill</span>
          </Button>
        )}

        {/* Tips section */}
        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
          <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
            <Star size={18} className="mr-2" />
            Skills Section Best Practices
          </h4>
          <ul className="text-blue-800 space-y-2 text-sm">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Include a mix of technical (hard) skills and professional (soft) skills.
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Tailor your skills to match the requirements listed in the job description.
            </li>
          </ul>
        </div>
      </div>
      </FormSection>
    </motion.div>
  );
};