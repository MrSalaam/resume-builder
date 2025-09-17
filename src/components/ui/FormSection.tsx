import type { FC, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

interface FormSectionProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export const FormSection: FC<FormSectionProps> = ({ 
  icon: Icon, 
  title, 
  subtitle,
  children, 
  className = "" 
}) => (
  <div className={`bg-white rounded-2xl border border-gray-100 shadow-lg ${className}`}>
    {/* Header */}
    <div className="bg-blue-50 text-white px-8 py-6 border-b  border-gray-100">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-white rounded-xl shadow-sm">
          <Icon className="w-7 h-7 text-gray-700" /> 
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
      </div>
    </div>
    
    {/* Content */}
    <div className="p-8">
      {children}
    </div>
  </div>
);