import type { FC } from 'react';
import { User } from 'lucide-react';

interface ProfessionalSummaryProps {
  summary: string;
}

export const ProfessionalSummary: FC<ProfessionalSummaryProps> = ({ summary }) => {
  if (!summary) return null;

  return (
    <section className="relative">
    
      
      <div className="relative bg-red rounded-2xl shadow-lg border border-gray-100 p-8 lg:p-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
            <User className="w-6 h-6 text-gray-700" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Work Summary
          </h2>
        </div>
        
        <div className="relative">
          <div className="absolute -left-4 top-0 w-1 h-full bg-gray-700 rounded-full"></div>
          <p className="text-lg text-gray-700 leading-relaxed font-light">
            {summary}
          </p>
        </div>
      </div>
    </section>
  );
};