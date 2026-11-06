import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Bell, 
  Moon, 
  ChevronDown, 
  CheckCircle2, 
  GraduationCap, 
  ShieldCheck, 
  UserCheck 
} from 'lucide-react';

export const DpsiHeader: React.FC = () => {
  const { 
    userRole, 
    setUserRole, 
    setIsProfileModalOpen, 
    walletBalance, 
    setIsParentTopUpModalOpen 
  } = useApp();

  const isStudent = userRole === 'student';

  return (
    <header className="sticky top-0 z-40 bg-[#fbfbf9] border-b border-[#cca43b]/90 shadow-2xs">
      <div className="w-full px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        
        {/* Left: DPSI School Branding */}
        <div className="flex items-center gap-3">
          {/* Official School Emblem */}
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-emerald-600/40 bg-white flex items-center justify-center p-0.5 shadow-2xs shrink-0 overflow-hidden">
            <img 
              src="/dps-logo.png" 
              alt="Delhi Public School Logo" 
              className="w-full h-full object-contain"
            />
          </div>

          {/* School Name Text */}
          <div className="flex flex-col">
            <h1 className="font-extrabold text-sm sm:text-base md:text-[17px] tracking-tight text-[#1c1c1c] font-sans uppercase">
              DELHI PUBLIC SCHOOL INDIRAPURAM
            </h1>
          </div>

          {/* Right School Emblem */}
          <div className="hidden sm:flex w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-emerald-600/40 bg-white items-center justify-center p-0.5 shadow-2xs shrink-0 overflow-hidden">
            <img 
              src="/dps-logo.png" 
              alt="Delhi Public School Emblem" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Right Header Navigation */}
        <div className="flex items-center gap-2 sm:gap-4.5">
          {/* Role Switcher Pill */}
          <div className="hidden md:flex items-center bg-[#f0eee6] rounded-full p-0.5 border border-[#cca43b]/40 text-xs">
            <button
              onClick={() => setUserRole('student')}
              className={`px-3 py-1 rounded-full font-semibold transition ${
                isStudent ? 'bg-white text-[#1c1c1c] shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🎓 Student Login
            </button>
            <button
              onClick={() => setUserRole('coordinator')}
              className={`px-3 py-1 rounded-full font-semibold transition ${
                !isStudent ? 'bg-white text-[#1c1c1c] shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              👔 Coordinator Login
            </button>
          </div>

          {/* SchoolsOS Dropdown */}
          <div className="flex items-center gap-1 text-xs sm:text-[13px] font-medium text-slate-700 cursor-pointer hover:text-slate-900">
            <span>SchoolsOS</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </div>

          {/* Notification Bell with Badge 1 */}
          <div className="relative cursor-pointer p-1 text-slate-700 hover:text-slate-900">
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#ef4444] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
              1
            </span>
          </div>

          {/* Dark Mode Moon Icon */}
          <button 
            className="p-1 text-slate-700 hover:text-slate-900 cursor-pointer"
            title="Toggle theme"
          >
            <Moon className="w-4.5 h-4.5" />
          </button>

          {/* User Profile Block */}
          <div 
            onClick={() => setIsProfileModalOpen(true)}
            className="flex items-center gap-2.5 cursor-pointer pl-1.5 hover:opacity-90 transition group"
          >
            {/* Text column */}
            <div className="text-right hidden sm:block leading-tight">
              <div className="font-bold text-xs sm:text-[13px] text-[#1c1c1c] tracking-tight group-hover:text-amber-800 transition">
                SHASHANK JANGID
              </div>
              <div className="text-[10px] text-slate-500 font-medium">
                {isStudent ? '(DPSI-2026-4102)' : '(SESC181)'}
              </div>
              <div className="text-[10px] text-slate-500 truncate max-w-[170px]">
                {isStudent ? 'Class X - Sec B (Roll No. 24)' : 'Projects & Competition Coordinator'}
              </div>
            </div>

            {/* Profile Avatar with online green badge */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                alt="Shashank Jangid"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-[#cca43b]/80 shadow-2xs"
              />
              {/* Online Green Indicator Dot */}
              <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#10b981] border-2 border-white" />
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
