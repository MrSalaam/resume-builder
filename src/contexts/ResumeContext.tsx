import { createContext, useContext, useState, type FC, type ReactNode } from 'react';

export interface Experience {
  id: number;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: number;
  degree: string;
  school: string;
  year: string;
  description: string;
}

export interface Skill {
  id: number;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string;
  url?: string;
  startDate: string;
  endDate: string;
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
}


export interface ResumeData {
  name: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
}

interface ResumeContextType {
  resumeData: ResumeData;
  updateResumeData: (updates: Partial<ResumeData>) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const useResumeData = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResumeData must be used within a ResumeProvider');
  }
  return context;
};

interface ResumeProviderProps {
  children: ReactNode;
}

export const ResumeProvider: FC<ResumeProviderProps> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    name: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    experiences: [],
    education: [],
    skills: [],
    projects: [],
    certifications: []
  });

  const updateResumeData = (updates: Partial<ResumeData>) => {
    setResumeData(prev => ({ ...prev, ...updates }));
  };

  return (
    <ResumeContext.Provider value={{ resumeData, updateResumeData }}>
      {children}
    </ResumeContext.Provider>
  );
};