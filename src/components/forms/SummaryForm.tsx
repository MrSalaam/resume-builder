import React, { useState } from 'react';
import { Sparkles,  EqualApproximately, Wand2, Edit3, CheckCircle } from 'lucide-react';
import { useResumeData } from '../../contexts/ResumeContext';
import { generateAISummary, ValidationError, APIError } from '../../services/aiService';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';


// UI Components
const FormSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-2xl border border-gray-100 shadow-lg ${className}`}>
    {children}
  </div>
);

const Textarea = ({ label, placeholder, value, onChange, className = "" }: { label: string; placeholder: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; className?: string })=> (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${className}`}
      rows={4}
    />
  </div>
);

const Button = (
  {
    variant = 'ai',
    onClick,
    disabled = false,
    className = "",
    children,
  }: {
    variant?: 'ai' | 'outline';
    onClick: () => void;
    disabled?: boolean;
    className?: string;
    children: React.ReactNode;
  }
) => {
  const baseClasses = "inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 disabled:transform-none";
  const variants: Record<'ai' | 'outline', string> = {
    ai: "bg-blue-50 hover:from-blue-700 hover:to-blue-600 text-gray-700 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed",
    outline: "border-2 border-gray-200 hover:border-blue-50 text-gray-700 hover:text-purple-600 bg-white hover:bg-purple-50",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export const SummaryForm = () => {
  const { resumeData, updateResumeData } = useResumeData();
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
  };

  const handleGenerateSummary = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    setHasGenerated(false); // Reset on new generation
    try {
      const summary = await generateAISummary(resumeData);
      updateResumeData({ summary });
      setHasGenerated(true);
      toast.success('AI summary generated successfully!');
    } catch (error) {
      console.error('Failed to generate summary:', error);
      if (error instanceof ValidationError) {
        toast.error(error.message);
      } else if (error instanceof APIError) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const isDisabled = isGenerating || !resumeData.name || !resumeData.jobTitle;

  return (
    <motion.div variants={formVariants} initial="hidden" animate="visible">
      <FormSection className="overflow-hidden relative">
      {/* Header with gradient background */}
      <div className="bg-blue-50 px-8 py-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white rounded-xl shadow-sm">
            < EqualApproximately className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Professional Summary</h3>
            <p className="text-sm text-gray-600 mt-1">
              Craft a compelling overview of your professional experience
            </p>
          </div>
        </div>
      </div>

      {/* Form content */}
      <div className="p-8 space-y-6">
        {/* AI Generation Status */}
        {(isGenerating || hasGenerated) && (
          <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${
            isGenerating 
              ? 'border-blue-200 bg-blue-50' 
              : 'border-green-200 bg-green-50'
          }`}>
            <div className="flex items-center space-x-3">
              {isGenerating ? (
                <>
                  <div className="animate-spin">
                    <Wand2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-blue-800 font-medium">AI is crafting your summary...</p>
                    <p className="text-blue-600 text-sm">This may take a few moments</p>
                  </div>
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-green-800 font-medium">Summary generated successfully!</p>
                    <p className="text-green-600 text-sm">Feel free to customize it further</p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Text area with enhanced styling */}
        <div className="relative">
          <Textarea
            label=""
            placeholder="Write a brief professional summary that highlights your key strengths, experience, and career objectives..."
            value={resumeData.summary}
            onChange={(e) => updateResumeData({ summary: e.target.value })}
            className="min-h-[120px] text-gray-700 leading-relaxed"
          />
          {resumeData.summary && (
            <div className="absolute top-3 right-3">
              <Edit3 className="w-4 h-4 text-gray-400" />
            </div>
          )}
        </div>

        {/* Character count */}
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>
            {resumeData.summary?.length || 0} characters
          </span>
          <span>
            Recommended: 150-300 characters
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="ai"
            onClick={handleGenerateSummary}
            disabled={isDisabled}
            className="flex-1 relative overflow-hidden"
          >
            {isGenerating ? (
              <>
                <div className="animate-pulse flex items-center">
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generating with AI...
                </div>
                {/* Loading shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite] -skew-x-12"></div>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate AI Summary
              </>
            )}
          </Button>
          
          {resumeData.summary && (
            <Button
              variant="outline"
              onClick={() => updateResumeData({ summary: '' })}
              className="sm:w-auto"
            >
              Clear
            </Button>
          )}
        </div>

        {/* Requirement notice */}
        {isDisabled && !isGenerating && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <p className="text-amber-800 text-sm">
                Please fill in your name and job title first to generate an AI summary
              </p>
            </div>
          </div>
        )}

        {/* Tips section */}
        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
          <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
            <Edit3 size={18} className="mr-2" />
            Pro Tips for a Great Summary
          </h3>
          <ul className="text-blue-800 space-y-2 text-sm">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Keep it concise and impactful, ideally 2-3 sentences long.
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Highlight your most relevant skills and quantifiable achievements (e.g., "Increased efficiency by 20%").
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Tailor the summary to the specific job you are applying for.
            </li>
          </ul>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
      `}</style>
      </FormSection>
    </motion.div>
  );
};