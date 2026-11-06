import React, { useMemo } from 'react';
import { useApp } from './context/AppContext';
import { DpsiHeader } from './components/DpsiHeader';
import { DpsiSidebar } from './components/DpsiSidebar';
import { DpsiDashboard } from './components/DpsiDashboard';
import { DpsiFooter } from './components/DpsiFooter';
import { CafeteriaView } from './components/CafeteriaView';
import { ParentTopUpModal } from './components/ParentTopUpModal';
import { UserProfileModal } from './components/UserProfileModal';

// Lost & Found Components
import { KioskBanner } from './components/KioskBanner';
import { StatsOverview } from './components/StatsOverview';
import { FilterBar } from './components/FilterBar';
import { ItemCard } from './components/ItemCard';
import { ItemDetailModal } from './components/ItemDetailModal';
import { ReportItemModal } from './components/ReportItemModal';
import { ClaimPassModal } from './components/ClaimPassModal';
import { SchoolMapModal } from './components/SchoolMapModal';
import { StaffDashboard } from './components/StaffDashboard';

import { 
  PackageSearch, 
  ArrowLeft, 
  Compass, 
  PlusCircle, 
  Search, 
  MapPin,
  Calendar,
  GraduationCap,
  BookOpen,
  Radio,
  Building2,
  Users
} from 'lucide-react';

export const App: React.FC = () => {
  const { 
    currentLmsTab, 
    setCurrentLmsTab,
    items, 
    viewMode, 
    filters, 
    setIsReportModalOpen, 
    setDefaultReportType,
    setIsMapModalOpen 
  } = useApp();

  // Filtered lost & found items
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesLoc = item.locationFound.toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesLoc && !matchesCat) return false;
      }
      if (filters.type !== 'all' && item.type !== filters.type) return false;
      if (filters.category !== 'all' && item.category !== filters.category) return false;
      if (filters.location !== 'all' && item.locationFound !== filters.location) return false;
      if (filters.status !== 'all' && item.status !== filters.status) return false;
      return true;
    });
  }, [items, filters]);

  return (
    <div className="min-h-screen bg-[#fcfcfb] flex flex-col justify-between font-sans selection:bg-amber-100 selection:text-amber-900">
      
      {/* Top Header - Exact DPSI Header */}
      <DpsiHeader />

      {/* Main LMS Shell: Sidebar + Content Area */}
      <div className="flex-1 flex w-full">
        {/* Left Sidebar */}
        <DpsiSidebar />

        {/* Content Body */}
        <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8 bg-[#fdfdfc]">
          {/* TAB 1: DASHBOARD (Exact screenshot replication) */}
          {currentLmsTab === 'dashboard' && <DpsiDashboard />}

          {/* TAB 2: CAFETERIA & PARENT WALLET TOP-UP (Requested downside option) */}
          {currentLmsTab === 'cafeteria_wallet' && <CafeteriaView />}

          {/* TAB 3: CAMPUS LOST & FOUND PORTAL (Integrated Solution) */}
          {currentLmsTab === 'lost_found' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              {/* Lost & Found Sub-Header */}
              <div className="bg-white rounded-2xl border-2 border-[#cca43b]/80 p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-200">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Campus Lost &amp; Found Directory
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Phone-free school lost property hub • Report via terminal webcam or check lockers
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMapModalOpen(true)}
                    className="px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition flex items-center gap-1.5"
                  >
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    Lockers &amp; Zones
                  </button>
                  <button
                    onClick={() => {
                      setDefaultReportType('lost');
                      setIsReportModalOpen(true);
                    }}
                    className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                  >
                    I Lost An Item
                  </button>
                  <button
                    onClick={() => {
                      setDefaultReportType('found');
                      setIsReportModalOpen(true);
                    }}
                    className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-2xs transition flex items-center gap-1.5"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Report Found
                  </button>
                </div>
              </div>

              {/* Stats Overview */}
              <StatsOverview />

              {/* Filter Bar */}
              <FilterBar />

              {/* Items Grid */}
              {filteredItems.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
                  <PackageSearch className="w-12 h-12 text-slate-300 mx-auto" />
                  <h3 className="font-bold text-slate-800 text-base">
                    No matching items cataloged
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Try adjusting your search filters or report your missing item.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredItems.map(item => (
                    <ItemCard key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Other LMS Modules (Fallback preview) */}
          {currentLmsTab !== 'dashboard' && 
           currentLmsTab !== 'cafeteria_wallet' && 
           currentLmsTab !== 'lost_found' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4 max-w-2xl mx-auto my-8">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#cca43b] flex items-center justify-center mx-auto border border-[#cca43b]/40">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 capitalize">
                {currentLmsTab.replace('_', ' ')} Module
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Connected to Delhi Public School Indirapuram ERP Database. Records are synchronized with Academic Session 2026-27.
              </p>
              <button
                onClick={() => setCurrentLmsTab('dashboard')}
                className="px-4 py-2 bg-[#cca43b] hover:bg-[#b8912e] text-white text-xs font-bold rounded-xl transition inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Dashboard
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Footer - Exact DPSI Footer */}
      <DpsiFooter />

      {/* Global Interactive Modals */}
      <ParentTopUpModal />
      <UserProfileModal />
      <ItemDetailModal />
      <ReportItemModal />
      <ClaimPassModal />
      <SchoolMapModal />
    </div>
  );
};

export default App;
