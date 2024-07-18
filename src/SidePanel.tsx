// SidePanel.tsx

import React from 'react';

interface SidePanelProps {
  isOpen: boolean;
  togglePanel: () => void;
  children: any;
}

const SidePanel: React.FC<SidePanelProps> = ({ isOpen, togglePanel, children }) => {
  return (
    <div className={`fixed top-0 right-0 h-full bg-white w-64 shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex justify-end p-4">
        <button className="focus:outline-none" onClick={togglePanel}>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default SidePanel;
