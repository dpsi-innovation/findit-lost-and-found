import React from 'react';
import { LostFoundItem } from '../types';
import { useApp } from '../context/AppContext';
import { 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  HelpCircle, 
  ArrowRight,
  Sparkles,
  Archive,
  UserCheck
} from 'lucide-react';

interface ItemCardProps {
  item: LostFoundItem;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const { setSelectedItem } = useApp();

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Recently';
    }
  };

  const getStatusBadge = () => {
    switch (item.status) {
      case 'in_custody':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">
            <ShieldCheck className="w-3 h-3 text-amber-600" />
            In School Bin
          </span>
        );
      case 'handed_over':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
            <UserCheck className="w-3 h-3 text-emerald-600" />
            Returned
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
            Available
          </span>
        );
    }
  };

  const isFound = item.type === 'found';

  return (
    <div 
      onClick={() => setSelectedItem(item)}
      className="group bg-white rounded-xl border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col cursor-pointer"
    >
      {/* Image Container with Badges */}
      <div className="relative aspect-video sm:aspect-4/3 w-full bg-slate-100 overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          loading="lazy"
        />

        {/* Found vs Lost Tag */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <span
            className={`text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs text-white ${
              isFound ? 'bg-emerald-600' : 'bg-rose-600'
            }`}
          >
            {isFound ? 'FOUND' : 'LOST'}
          </span>
          {item.isImportant && (
            <span className="text-[10px] font-bold bg-amber-500 text-white px-1.5 py-0.5 rounded shadow-xs flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5" /> High Priority
            </span>
          )}
        </div>

        {/* Status Tag */}
        <div className="absolute top-2.5 right-2.5">
          {getStatusBadge()}
        </div>

        {/* Storage Bin Ribbon if In Custody */}
        {item.custodyBin && item.status !== 'handed_over' && (
          <div className="absolute bottom-2 left-2 right-2 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-md flex items-center gap-1.5 line-clamp-1">
            <Archive className="w-3 h-3 text-blue-400 shrink-0" />
            <span className="font-mono text-[10px] text-blue-200 font-bold shrink-0">STORED IN:</span>
            <span className="truncate">{item.custodyBin}</span>
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <span className="text-[11px] font-semibold text-blue-600 tracking-wide uppercase block mb-1">
            {item.category}
          </span>
          <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-blue-600 transition">
            {item.title}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Location & Date Footer */}
        <div className="pt-2 border-t border-slate-100 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1 truncate max-w-[65%]">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{item.locationFound}</span>
            </span>
            <span className="flex items-center gap-1 text-[11px] text-slate-400 shrink-0">
              <Calendar className="w-3 h-3 text-slate-400" />
              {formatDate(item.dateReported)}
            </span>
          </div>

          {/* Verification Protection Badge */}
          {item.verificationQuestion && (
            <div className="flex items-center gap-1 text-[11px] text-slate-600 bg-slate-50 px-2 py-1 rounded">
              <HelpCircle className="w-3 h-3 text-blue-500 shrink-0" />
              <span className="truncate">Secret verification required to claim</span>
            </div>
          )}

          {/* Quick Action Link */}
          <div className="pt-1 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
            <span>{isFound ? 'Claim or View Details' : 'View Lost Report'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};
