import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Edit3, Check, X, type LucideIcon } from 'lucide-react';
import { useResumeData } from '../../contexts/ResumeContext';
import { FormSection } from '../ui/FormSection';
import { motion } from 'framer-motion';

interface FloatingLabelInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder: string;
  icon: LucideIcon;
  required?: boolean;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({ label, value, onChange, type = 'text', placeholder, icon: Icon, required = false }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const validateInput = (val: string) => {
    if (type === 'email') {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || val === '';
    }
    if (required) {
      return val.trim() !== '';
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(e);
    setIsValid(validateInput(newValue));
  };

  const hasValue = value && value.length > 0;
  const labelClasses = `absolute left-12 sm:left-14 transition-all duration-300 pointer-events-none select-none ${isFocused || hasValue ? 'top-3 text-xs text-blue-600 font-medium' : 'top-1/2 -translate-y-1/2 text-gray-500 text-sm sm:text-base'}`;
  return (
    <div className="relative group">
      <div className={`relative flex items-center bg-white rounded-lg sm:rounded-xl border-2  ${isFocused ? 'border-blue-500 shadow-lg shadow-blue-100' : isValid ? 'border-gray-200 hover:border-gray-300' : 'border-red-300'}`}>
        <div className={`flex items-center justify-center w-8 sm:w-10 h-full ml-2  ${isFocused ? 'text-blue-600' : 'text-gray-400'}`}>
          <Icon size={16} />
        </div>
        <div className="flex-1 relative">
          <label className={labelClasses}>{label}</label>
          <input
            type={type}
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`w-full bg-transparent outline-none text-gray-900 placeholder-transparent text-sm sm:text-base pl-4 ${isFocused || hasValue ? 'pt-5 sm:pt-6 pb-2' : 'py-3 sm:py-4'}`}
            placeholder={placeholder}
          />
        </div>
        {hasValue && (
          <div className="flex items-center justify-center w-8 sm:w-10 h-full mr-2">
            {isValid ? <Check size={14} className="text-green-500" /> : <X size={14} className="text-red-500" />}
          </div>
        )}
      </div>
      {!isValid && (
        <p className="text-red-500 text-xs sm:text-sm mt-1 ml-10 sm:ml-12 animate-pulse">
          {type === 'email' ? 'Please enter a valid email address' : `${label} is required`}
        </p>
      )}
    </div>
  );
};

 

export const PersonalInfoForm = () => {
  const { resumeData, updateResumeData } = useResumeData();
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div variants={formVariants} initial="hidden" animate="visible">
      <FormSection
        icon={User}
        title="Personal Information"
        subtitle="Your essential info for recruiters to connect"
      >
      <div className="space-y-6">
        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FloatingLabelInput
              label="Full Name"
              value={resumeData.name}
              onChange={(e) => updateResumeData({ name: e.target.value })}
              placeholder="Enter your full name"
              icon={User}
              required
            />
            <FloatingLabelInput
              label="Job Title"
              value={resumeData.jobTitle}
              onChange={(e) => updateResumeData({ jobTitle: e.target.value })}
              placeholder="e.g. Software Engineer"
              icon={Briefcase}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FloatingLabelInput
              label="Email Address"
              type="email"
              value={resumeData.email}
              onChange={(e) => updateResumeData({ email: e.target.value })}
              placeholder="your.email@example.com"
              icon={Mail}
            />
            <FloatingLabelInput
              label="Phone Number"
              value={resumeData.phone}
              onChange={(e) => updateResumeData({ phone: e.target.value })}
              placeholder="+2340000000000"
              icon={Phone}
            />
          </div>
          <FloatingLabelInput
            label="Location"
            value={resumeData.location}
            onChange={(e) => updateResumeData({ location: e.target.value })}
            placeholder="City, State or Country"
            icon={MapPin}
          />
        </div>
        
        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
          <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
            <Edit3 size={18} className="mr-2" />
            Pro Tips
          </h3>
          <ul className="text-blue-800 space-y-2 text-sm">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Use your professional email address for job applications
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Include your city and state to help employers find local talent
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Keep your job title concise and industry-standard
            </li>
          </ul>
        </div>
      </div>
      </FormSection>
    </motion.div>
  );
};