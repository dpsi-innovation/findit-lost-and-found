import React from 'react';
import { useApp } from '../context/AppContext';
import { LmsNavigationTab } from '../types';
import { 
  Home, 
  Radio, 
  Building2, 
  CalendarDays, 
  GraduationCap, 
  UserCheck, 
  BookOpen, 
  Coins, 
  FileText, 
  Image as ImageIcon, 
  Users, 
  UtensilsCrossed, 
  Compass, 
  Pencil, 
  ChevronLeft, 
  ChevronRight,
  MoreHorizontal
} from 'lucide-react';

interface MenuItemDef {
  id: LmsNavigationTab;
  label: string;
  icon: React.ReactNode;
  hasSubmenu?: boolean;
}

export const DpsiSidebar: React.FC = () => {
  const { 
    currentLmsTab, 
    setCurrentLmsTab, 
    isSidebarCollapsed, 
    setIsSidebarCollapsed,
    walletBalance
  } = useApp();

  const primaryMenuItems: MenuItemDef[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <Home className="w-4 h-4" />
    },
    {
      id: 'communications',
      label: 'Communications',
      icon: <Radio className="w-4 h-4" />,
      hasSubmenu: true
    },
    {
      id: 'estate',
      label: 'Estate Management',
      icon: <Building2 className="w-4 h-4" />,
      hasSubmenu: true
    },
    {
      id: 'events',
      label: 'Events & Calendars',
      icon: <CalendarDays className="w-4 h-4" />
    },
    {
      id: 'examinations',
      label: 'Examination Management',
      icon: <GraduationCap className="w-4 h-4" />,
      hasSubmenu: true
    },
    {
      id: 'hr',
      label: 'HR Management',
      icon: <UserCheck className="w-4 h-4" />,
      hasSubmenu: true
    },
    {
      id: 'library',
      label: 'Library Management',
      icon: <BookOpen className="w-4 h-4" />,
      hasSubmenu: true
    },
    {
      id: 'payroll',
      label: 'Payroll Management',
      icon: <Coins className="w-4 h-4" />,
      hasSubmenu: true
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: <FileText className="w-4 h-4" />
    },
    {
      id: 'gallery',
      label: 'School Gallery',
      icon: <ImageIcon className="w-4 h-4" />
    },
    {
      id: 'students',
      label: 'Students Management',
      icon: <Users className="w-4 h-4" />,
      hasSubmenu: true
    },

    // Downside options requested by user
    {
      id: 'cafeteria_wallet',
      label: 'Cafeteria Management',
      icon: <UtensilsCrossed className="w-4 h-4" />,
      hasSubmenu: true
    },
    {
      id: 'lost_found',
      label: 'Lost & Found System',
      icon: <Compass className="w-4 h-4" />
    }
  ];

  return (
    <aside 
      className={`relative bg-white border-r border-slate-200/90 transition-all duration-200 flex flex-col justify-between shrink-0 select-none ${
        isSidebarCollapsed ? 'w-16' : 'w-60 sm:w-64'
      }`}
    >
      {/* Session Header Strip */}
      <div className="h-11 border-b border-slate-100 px-4 flex items-center justify-between">
        {!isSidebarCollapsed && (
          <div className="flex items-center gap-1.5 text-xs text-[#cca43b] font-medium">
            <span>Current Session: <strong className="text-[#a88220] font-bold">2026-27</strong></span>
            <button className="text-[#cca43b] hover:text-[#a88220] p-0.5 cursor-pointer">
              <Pencil className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Circular Collapse Toggle Button */}
        <button
          onClick={() => setIsSidebarCollapsed(prev => !prev)}
          className="absolute -right-3 top-3 w-6 h-6 rounded-full bg-white border border-slate-300 text-slate-600 hover:text-slate-900 shadow-2xs flex items-center justify-center z-30 transition cursor-pointer hover:scale-105"
          title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="w-3.5 h-3.5" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
        {primaryMenuItems.map((item) => {
          const isActive = currentLmsTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentLmsTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition group cursor-pointer ${
                isActive
                  ? 'bg-amber-50/70 text-[#a88220] font-bold border-l-2 border-[#cca43b]'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-normal'
              }`}
              title={item.label}
            >
              <div className="flex items-center gap-3 truncate">
                <span className={`shrink-0 ${isActive ? 'text-[#cca43b]' : 'text-slate-500'}`}>
                  {item.icon}
                </span>
                {!isSidebarCollapsed && (
                  <span className="truncate tracking-tight text-[12px]">{item.label}</span>
                )}
              </div>

              {!isSidebarCollapsed && item.hasSubmenu && (
                <MoreHorizontal className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 shrink-0 ml-1" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Downside Wallet Quick Tag for Parents / Students */}
      {!isSidebarCollapsed && (
        <div className="px-3 py-2.5 border-t border-slate-100 bg-[#fbfaf6] flex items-center justify-between text-[11px]">
          <span className="text-slate-500 font-medium">RFID Wallet:</span>
          <button 
            onClick={() => setCurrentLmsTab('cafeteria_wallet')}
            className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 hover:bg-emerald-100 transition cursor-pointer"
          >
            ₹{walletBalance} (Top-up)
          </button>
        </div>
      )}
    </aside>
  );
};
