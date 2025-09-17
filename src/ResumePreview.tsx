import type { FC } from 'react';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './components/ui/Button';
import { useResumeData } from './contexts/ResumeContext';
import { ResumeHeader } from './components/ui/ResumeHeader';
import { ProfessionalSummary } from './components/ui/ProfessionalSummary';
import { ExperienceTimeline } from './components/ui/ExperienceTimeline';
import { ProjectGrid } from './components/ui/ProjectGrid';
import { EducationList } from './components/ui/EducationList';

import { SkillsMatrix } from './components/ui/SkillsMatrix';

export const ResumePreview: FC = () => {
  const { resumeData } = useResumeData();

  const formatDate = (date: string) => {
    if (!date) return null;
   
    const d = new Date(date + '-01');
    return d.toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });
  };
  
  const formatDateRange = (start: string, end: string, current?: boolean) => {
    const startDate = formatDate(start);
    const endDate = current ? 'Present' : formatDate(end);
    if (!startDate) return null;
    return `${startDate} - ${endDate}`;
  };

  const exportToPDF = () => {
    window.print();
  };

  const getDegreeLevel = (degree: string) => {
    const lowerDegree = degree.toLowerCase();
    if (lowerDegree.includes('phd') || lowerDegree.includes('doctorate')) return 'PhD';
    if (lowerDegree.includes('master') || lowerDegree.includes('msc') || lowerDegree.includes('mba')) return 'Masters';
    if (lowerDegree.includes('bachelor') || lowerDegree.includes('bsc') || lowerDegree.includes('ba')) return 'Bachelor';
    if (lowerDegree.includes('associate') || lowerDegree.includes('diploma')) return 'Associate';
    return 'Other';
  };

  const getLevelColor = (level: string | null | undefined): string => {
    if (typeof level !== 'string') return '';
    const colors: Record<string, string> = {
      'PhD': 'bg-indigo-50 text-indigo-700 border-indigo-200',
      'Masters': 'bg-blue-50 text-blue-700 border-blue-200',
      'Bachelor': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'Associate': 'bg-amber-50 text-amber-700 border-amber-200',
      'Other': 'bg-gray-50 text-gray-700 border-gray-200'
    };
    return colors[level] || colors['Other'] || '';
  };

  const getSkillLevelColor = (level: string | null | undefined): string => {
    if (typeof level !== 'string' || level === null || level === undefined) {
      throw new Error('Invalid argument: level must be a non-null string');
    }

    const colors: Record<string, string> = {
      'Beginner': 'bg-blue-50 text-blue-700 border-blue-200',
      'Intermediate': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'Advanced': 'bg-orange-50 text-orange-700 border-orange-200',
      'Expert': 'bg-emerald-50 text-emerald-700 border-emerald-200'
    };

    const color = colors[level];
    if (!color) {
      throw new Error(`Invalid skill level: ${level}`);
    }

    return color;
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Resume Content */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-6" id="resume-content">
        <div className="max-w-5xl mx-auto bg-white shadow-2xl" style={{ minHeight: '11in' }}>
          
          {/* Header */}
          <ResumeHeader 
            name={resumeData.name}
            jobTitle={resumeData.jobTitle}
            email={resumeData.email}
            phone={resumeData.phone}
            location={resumeData.location}
          />

          {/* Main Content */}
          <main className="px-8 lg:px-12 py-12 space-y-16 lg:space-y-20">
            
            {/* Professional Summary */}
            <ProfessionalSummary summary={resumeData.summary} />

            {/* Experience Timeline */}
            <ExperienceTimeline 
              experiences={resumeData.experiences} 
              formatDateRange={formatDateRange}
            />

            {/* Projects Grid */}
            <ProjectGrid 
              projects={resumeData.projects} 
              formatDateRange={formatDateRange}
            />

            {/* Education */}
            <EducationList 
              education={resumeData.education}
              getDegreeLevel={getDegreeLevel}
              getLevelColor={getLevelColor}
            />

            

            {/* Skills Matrix */}
            <SkillsMatrix 
              skills={resumeData.skills}
              getSkillLevelColor={getSkillLevelColor}
            />

          </main>
        </div>
      </div>
      
      {/* Export Button Footer */}
      <div className="flex-shrink-0 p-6 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg export-button-footer">
        <div className="max-w-5xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Button
              onClick={exportToPDF}
              className="w-full bg-gradient-to-r from-blue-50 via-blue-50 to-blue-50   text-gray-700 font-semibold py-4 px-6 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 rounded-xl"
            >
              <Download className="w-5 h-5 text-gray-700" />
              <span className='text-gray-700 font-semibold'>Export as PDF</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};