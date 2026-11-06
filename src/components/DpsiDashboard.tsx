import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Calendar, 
  User, 
  ArrowRight, 
  Clock, 
  CalendarDays,
  Sparkles
} from 'lucide-react';

export const DpsiDashboard: React.FC = () => {
  const { 
    userRole, 
    setIsProfileModalOpen, 
    setCurrentLmsTab 
  } = useApp();

  const isStudent = userRole === 'student';

  return (
    <div className="space-y-6 w-full">
      
      {/* Top Row: Welcome Card + Recent & Frequent Actions Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Card 1: User Profile & Welcome (approx 38% width) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border-2 border-[#cca43b]/90 p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
          <div>
            {/* Avatar & Welcome text */}
            <div className="flex items-start gap-4">
              {/* Profile Avatar with green online dot */}
              <div className="relative shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                  alt="Shashank Jangid"
                  className="w-16 h-16 sm:w-18 sm:h-18 rounded-full object-cover border-2 border-[#cca43b]/80 shadow-2xs"
                />
                <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#10b981] border-2 border-white flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
              </div>

              {/* Greeting & Name */}
              <div className="space-y-1">
                <p className="text-[11px] font-bold tracking-wider text-[#cca43b] uppercase">
                  GOOD AFTERNOON,
                </p>
                <h2 className="text-xl sm:text-2xl font-black text-[#1c1c1c] tracking-tight">
                  SHASHANK JANGID
                </h2>
                
                {/* Gold Pill Badge */}
                <div className="inline-block bg-[#cca43b] text-slate-900 text-[10px] sm:text-[11px] font-bold px-3 py-0.5 rounded-full shadow-2xs">
                  {isStudent ? 'STUDENT • CLASS X - SEC B (ROLL: 24)' : 'PROJECTS & COMPETITION COORDIN...'}
                </div>
              </div>
            </div>

            {/* Session Month & ID Row */}
            <div className="flex items-center gap-4 mt-5 pt-3 border-t border-slate-100 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5 text-[#cca43b] font-medium">
                <Calendar className="w-4 h-4 text-[#cca43b]" />
                <span>October 2026</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-500">
                <User className="w-4 h-4 text-slate-400" />
                <span className="font-mono">{isStudent ? 'ID: DPSI-2026-4102' : 'ID: SESC181'}</span>
              </div>
            </div>
          </div>

          {/* View Profile Button */}
          <div className="mt-5">
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="w-full sm:w-52 py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 shadow-2xs flex items-center justify-between transition group cursor-pointer"
            >
              <span>View Profile</span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Card 2: Recent & Frequent Actions (approx 62% width) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border-2 border-[#cca43b]/90 p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#cca43b] text-white flex items-center justify-center shadow-2xs shrink-0">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#1c1c1c] tracking-tight">
                  Recent &amp; frequent actions
                </h3>
                <p className="text-xs text-slate-400">
                  Continue where you left off
                </p>
              </div>
            </div>

            {/* Exactly matching empty-state inner container from screenshot */}
            <div 
              onClick={() => setCurrentLmsTab('cafeteria_wallet')}
              className="w-full h-36 sm:h-40 bg-[#f7f6f2] rounded-xl flex items-center justify-center p-6 text-center cursor-pointer hover:bg-[#f3f1eb] transition group border border-slate-200/40"
            >
              <p className="text-xs sm:text-[13px] text-slate-500 font-medium max-w-md select-none group-hover:text-slate-700 transition">
                Your four most recently clicked menu actions will appear here.
              </p>
            </div>
          </div>

          {/* Subtle bottom note / helper */}
          <div className="mt-3 text-right">
            <span className="text-[11px] text-slate-400">
              Quick actions auto-populate on use
            </span>
          </div>
        </div>

      </div>

      {/* Row 2: Upcoming Events Card (constrained width matching screenshot) */}
      <div className="w-full lg:max-w-2xl bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#faf3e0] text-[#cca43b] flex items-center justify-center shrink-0 border border-[#e5d5a8]">
              <CalendarDays className="w-5 h-5 text-[#cca43b]" />
            </div>
            <h3 className="font-bold text-base sm:text-lg text-[#1c1c1c] tracking-tight">
              Upcoming Events
            </h3>
          </div>
          <span className="w-7 h-7 rounded-full bg-[#f6efe0] text-[#a88220] font-bold text-xs flex items-center justify-center border border-[#e5d5a8]">
            3
          </span>
        </div>

        {/* Event List Items */}
        <div className="p-5 sm:p-6 space-y-3.5">
          
          {/* Event 1 */}
          <div className="relative p-4 sm:p-4.5 rounded-xl border border-slate-200/90 bg-white hover:border-[#cca43b]/60 transition shadow-2xs space-y-1.5 overflow-hidden">
            {/* Scroll/strip indicator on right edge */}
            <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-slate-300 rounded-r" />

            <div className="flex items-start justify-between gap-3 pr-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                  PTM (XI &amp; XII), Answer Scripts showing (III-V)
                </h4>
              </div>
              <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full font-medium shrink-0">
                1 day
              </span>
            </div>
            <p className="text-[11px] text-slate-400 pl-6">
              PTM (XI &amp; XII)
            </p>
            <div className="pl-6 pt-0.5">
              <span className="inline-block text-[10px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                event 2026-10-10 - 2026-10-10
              </span>
            </div>
          </div>

          {/* Event 2 */}
          <div className="relative p-4 sm:p-4.5 rounded-xl border border-slate-200/90 bg-white hover:border-[#cca43b]/60 transition shadow-2xs space-y-1.5 overflow-hidden">
            <div className="flex items-start justify-between gap-3 pr-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                  PT-3 (X)
                </h4>
              </div>
              <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full font-medium shrink-0">
                3 days
              </span>
            </div>
            <p className="text-[11px] text-slate-400 pl-6">
              PT-3 (X)
            </p>
            <div className="pl-6 pt-0.5">
              <span className="inline-block text-[10px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                event 2026-10-12 - 2026-10-12
              </span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
