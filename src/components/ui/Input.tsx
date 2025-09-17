import type { FC, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: FC<InputProps> = ({ label, className = '', ...props }) => (
  <div className={`space-y-1 ${className}`}>
    {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
    <input
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      {...props}
    />
  </div>
);