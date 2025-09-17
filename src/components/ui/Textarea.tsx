import type { FC, TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const Textarea: FC<TextareaProps> = ({ label, className = '', ...props }) => (
  <div className={`space-y-1 ${className}`}>
    {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
    <textarea
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
      {...props}
    />
  </div>
);