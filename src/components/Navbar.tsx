import React from 'react';
import { useApp } from '../context/AppContext';
import { ViewMode } from '../types';
import { 
  Compass, 
  PlusCircle, 
  Search, 
  ShieldCheck, 
  Monitor, 
  GraduationCap, 
  MapPin, 
  RotateCcw,
  SlidersHorizontal,
  Code2
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    viewMode, 
    setViewMode, 
    setIsReportModalOpen, 
    setDefaultReportType,
    setIsMapModalOpen,
    resetToDefaults,
    items
  } = useApp();

  const handleOpenReport = (type: 'found' | 'lost') => {
    setDefaultReportType(type);
    setIsReportModalOpen(true);
  };

  const pendingClaimsCount = items.reduce(
    (acc, item) => acc + item.claims.filter(c => c.status === 'pending').length,
    0
  );

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Institution Branding */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-slate-900 tracking-tight">
                  CampusFound
                </span>
                <span className="hidden sm:inline-block text-[11px] font-semibold uppercase tracking-wider bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200/60">
                  School L&amp;F System
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                No-Phone Kiosk &amp; LMS Lost Property Hub
              </p>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="hidden lg:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 text-xs font-semibold">
            <button
              onClick={() => setViewMode('portal')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                viewMode === 'portal'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Student Portal
            </button>
            <button
              onClick={() => setViewMode('kiosk')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                viewMode === 'kiosk'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              Terminal Kiosk
            </button>
            <button
              onClick={() => setViewMode('staff')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition relative ${
                viewMode === 'staff'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Staff Custody
              {pendingClaimsCount > 0 && (
                <span className="ml-1 bg-amber-500 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center font-bold">
                  {pendingClaimsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setViewMode('lms_embed')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                viewMode === 'lms_embed'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              LMS Integration
            </button>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* School Map Button */}
            <button
              onClick={() => setIsMapModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-lg transition"
              title="View School Zone Directory & Custody Lockers"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              Lockers &amp; Zones
            </button>

            {/* Quick Report Buttons */}
            <button
              onClick={() => handleOpenReport('lost')}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden xs:inline">I Lost Item</span>
            </button>

            <button
              onClick={() => handleOpenReport('found')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 rounded-lg shadow-xs shadow-blue-500/20 transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Report Found</span>
            </button>

            {/* Reset mock data button */}
            <button
              onClick={resetToDefaults}
              title="Reset Sample Data"
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile View Selector */}
        <div className="flex lg:hidden overflow-x-auto py-2 gap-1 border-t border-slate-100 text-xs">
          {(['portal', 'kiosk', 'staff', 'lms_embed'] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
                viewMode === mode
                  ? 'bg-blue-50 text-blue-700 border border-blue-200 font-semibold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {mode === 'portal' && 'Student Portal'}
              {mode === 'kiosk' && 'Terminal Kiosk'}
              {mode === 'staff' && `Staff Custody (${pendingClaimsCount})`}
              {mode === 'lms_embed' && 'LMS Widget'}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
