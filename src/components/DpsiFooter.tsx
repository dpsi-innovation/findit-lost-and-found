import React from 'react';
import { ChevronLeft } from 'lucide-react';

export const DpsiFooter: React.FC = () => {
  return (
    <footer className="relative bg-[#fbfbf9] border-t border-[#cca43b]/60 py-3 px-4 sm:px-8 text-xs select-none">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[#cca43b]">
        {/* Left: School for Schools copyright */}
        <div className="font-semibold text-xs tracking-tight">
          © 2026 School For Schools. All rights reserved.
        </div>

        {/* Center: drag pill handle bar */}
        <div className="w-12 h-1.5 rounded-full bg-slate-500/70 opacity-80" />

        {/* Right: T&C and Privacy */}
        <div className="flex items-center gap-2 font-semibold text-xs">
          <a href="#terms" className="hover:underline">
            T&amp;C
          </a>
          <span>|</span>
          <a href="#privacy" className="hover:underline">
            Privacy Policy
          </a>
        </div>
      </div>

      {/* Floating Bottom Right Button Tab (As seen in the screenshot) */}
      <button 
        className="fixed bottom-6 right-0 w-7 h-10 bg-[#cca43b] hover:bg-[#b8912e] text-white rounded-l-md shadow-md flex items-center justify-center transition z-30"
        title="Quick panel"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
    </footer>
  );
};
