import React from 'react';
import { useApp } from '../context/AppContext';
import { Package, ShieldAlert, CheckCircle2, Clock, Sparkles } from 'lucide-react';

export const StatsOverview: React.FC = () => {
  const { items } = useApp();

  const total = items.length;
  const inCustody = items.filter(i => i.status === 'in_custody').length;
  const returned = items.filter(i => i.status === 'handed_over').length;
  const pendingClaims = items.reduce(
    (acc, item) => acc + item.claims.filter(c => c.status === 'pending').length,
    0
  );

  const recoveryRate = total > 0 ? Math.round((returned / total) * 100) : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
      {/* Total Tracked */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
          <Package className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Total Cataloged
          </p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-slate-900">{total}</span>
            <span className="text-[11px] text-slate-500">items</span>
          </div>
        </div>
      </div>

      {/* Safe Custody */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            In Campus Bins
          </p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-slate-900">{inCustody}</span>
            <span className="text-[11px] text-amber-600 font-medium">Safe in Lockers</span>
          </div>
        </div>
      </div>

      {/* Reunited / Returned */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Recovery Rate
          </p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-slate-900">{recoveryRate}%</span>
            <span className="text-[11px] text-emerald-600 font-medium">Reunited</span>
          </div>
        </div>
      </div>

      {/* Pending Claims */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Verification Queue
          </p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-slate-900">{pendingClaims}</span>
            <span className="text-[11px] text-indigo-600 font-medium">Pending Claims</span>
          </div>
        </div>
      </div>
    </div>
  );
};
