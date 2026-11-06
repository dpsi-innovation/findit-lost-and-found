import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  MapPin, 
  Archive, 
  BookOpen, 
  Utensils, 
  FlaskConical, 
  Trophy, 
  Layers, 
  Mic, 
  Bus,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const SchoolMapModal: React.FC = () => {
  const { isMapModalOpen, setIsMapModalOpen, zones, items, setFilters } = useApp();

  if (!isMapModalOpen) return null;

  const getZoneIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen className="w-5 h-5" />;
      case 'Utensils': return <Utensils className="w-5 h-5" />;
      case 'FlaskConical': return <FlaskConical className="w-5 h-5" />;
      case 'Trophy': return <Trophy className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Mic': return <Mic className="w-5 h-5" />;
      case 'Bus': return <Bus className="w-5 h-5" />;
      default: return <MapPin className="w-5 h-5" />;
    }
  };

  const handleFilterToZone = (zoneName: string) => {
    setFilters(prev => ({ ...prev, location: zoneName }));
    setIsMapModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Campus Zones &amp; Lost Property Lockers
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              Official drop-off bins and collection counters across the school
            </p>
          </div>
          <button
            onClick={() => setIsMapModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Directory List / Zone Cards */}
        <div className="overflow-y-auto p-6 space-y-4">
          <div className="bg-blue-50/70 border border-blue-200 p-4 rounded-xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-xs text-blue-900">
              <p className="font-bold">Where do items go when found?</p>
              <p className="text-blue-800/80 mt-0.5 leading-relaxed">
                Items found in any wing are immediately placed into that zone's secure Lost Property Bin. Students can retrieve them during breaks by showing their Claim Token code to the duty supervisor.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {zones.map((zone) => {
              const itemsInZone = items.filter(i => i.locationFound === zone.name);
              return (
                <div
                  key={zone.id}
                  className="bg-white border border-slate-200 hover:border-blue-400 rounded-xl p-4 transition shadow-xs flex flex-col justify-between space-y-3 group"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition">
                          {getZoneIcon(zone.iconName)}
                        </div>
                        <div>
                          <h3 className="font-bold text-sm text-slate-900">
                            {zone.name}
                          </h3>
                          <span className="text-[11px] text-slate-400 block font-medium">
                            {zone.building}
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {itemsInZone.length} {itemsInZone.length === 1 ? 'item' : 'items'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 mt-2.5">
                      {zone.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-amber-800 bg-amber-50/70 p-2 rounded-lg border border-amber-200/50">
                      <Archive className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="text-[11px] font-medium truncate">
                        <strong>Counter:</strong> {zone.custodyDesk}
                      </span>
                    </div>

                    <button
                      onClick={() => handleFilterToZone(zone.name)}
                      className="w-full py-1.5 px-3 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition"
                    >
                      <span>Filter items in this zone</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
