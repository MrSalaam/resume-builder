import React from 'react';
import { PersonalInfoForm } from './components/forms/PersonalInfoForm';
import { SummaryForm } from './components/forms/SummaryForm';
import { ExperienceForm } from './components/forms/ExperienceForm';
import { EducationForm } from './components/forms/EducationForm';
import { SkillsForm } from './components/forms/SkillsForm';
import { ProjectsForm } from './components/forms/ProjectsForm';





export const ResumeForm: React.FC = () => {
  return (
    <div className="space-y-6 p-6 h-full overflow-y-auto bg-gray-50">

      {/* header */}
      <div className="text-center mb-8 relative">
        <div className="absolute top-0 right-0 -mt-0.5 -mr-4 ">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-white-50 to-blue-50 text-gray-700 shadow-lg transform rotate-6">
            BETA
          </span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Resume Builder</h1>
        <p className="text-gray-600">Create a comprehensive professional resume</p>
      </div>

      <PersonalInfoForm />
      <SummaryForm />
      <ExperienceForm />
      <EducationForm />
      <SkillsForm />
      <ProjectsForm />
      
      

    
    </div>
  );
};