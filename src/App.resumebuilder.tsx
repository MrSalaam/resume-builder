import type { FC } from 'react';
import { ResumeProvider } from './contexts/ResumeContext';
import { ResumePreview } from './ResumePreview';

const App: FC = () => {
  return (
    <ResumeProvider>
      <div className="min-h-screen bg-black">
        <ResumePreview />
      </div>
    </ResumeProvider>
  );
};

export default App;