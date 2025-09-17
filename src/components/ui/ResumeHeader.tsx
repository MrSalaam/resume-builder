import type { FC } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ResumeHeaderProps {
  name: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
}

export const ResumeHeader: FC<ResumeHeaderProps> = ({
  name,
  jobTitle,
  email,
  phone,
  location
}) => {
  return (
    <header className="relative overflow-hidden bg-blue-100">
     
      
      {/* Content */}
      <div className="relative px-8 py-12 lg:px-12 lg:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-700 mb-4 tracking-tight">
              {name || 'Your Name'}
            </h1>
            <p className="text-xl lg:text-2xl text-gray-700 font-light ml-2 mb-8 max-w-2xl">
              {jobTitle || 'Your Professional Title'}
            </p>
            
            {/* Contact Info */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 lg:gap-8">
              {email && (
                <a href={`mailto:${email}`} 
                   className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors group">
                  <div className="w-10 h-10 bg-blue/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Mail className="w-5 h-5 text-red-500" />
                  </div>
                  <span className="text-sm font-medium">{email}</span>
                </a>
              )}
              {phone && (
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-500" />
                  </div>
                  <span className="text-sm font-medium">{phone}</span>
                </div>
              )}
              {location && (
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-red-600" />
                  </div>
                  <span className="text-sm font-medium">{location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-8 lg:h-12">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-white"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-white"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-white"></path>
        </svg>
      </div>
    </header>
  );
};