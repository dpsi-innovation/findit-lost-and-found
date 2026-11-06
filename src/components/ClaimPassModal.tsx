import React from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle2, MapPin, Archive, QrCode, Printer, ShieldCheck } from 'lucide-react';

export const ClaimPassModal: React.FC = () => {
  const { activeClaimPass, setActiveClaimPass } = useApp();

  if (!activeClaimPass) return null;

  const { claim, item } = activeClaimPass;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pass Top Ribbon */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 p-5 text-white relative">
          <button
            onClick={() => setActiveClaimPass(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-5 h-5 text-emerald-300" />
            <span className="text-xs font-bold uppercase tracking-wider text-blue-100">
              Campus Property Pass
            </span>
          </div>
          <h2 className="text-lg font-extrabold text-white">
            Lost Property Claim Pass
          </h2>
          <p className="text-xs text-blue-100">
            Show this verification token at the custody counter
          </p>
        </div>

        {/* Pass Body (Perforated ticket style) */}
        <div className="p-6 space-y-5 bg-slate-50/50">
          {/* Claim Token Box */}
          <div className="bg-white border-2 border-dashed border-blue-300 rounded-xl p-4 text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
              OFFICIAL VERIFICATION CODE
            </span>
            <div className="text-2xl font-black font-mono tracking-wider text-blue-700">
              {claim.tokenCode}
            </div>
            <span className="inline-block mt-1 text-[11px] bg-amber-50 text-amber-700 font-semibold px-2 py-0.5 rounded-full border border-amber-200">
              Status: Verification Pending Review
            </span>
          </div>

          {/* Item & Student Info */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 space-y-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Claimed Item</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">{item.title}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Student Name</span>
                <p className="font-semibold text-slate-700 mt-0.5">{claim.claimantName}</p>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Roll / ID Number</span>
                <p className="font-mono font-semibold text-blue-600 mt-0.5">{claim.rollNumber}</p>
              </div>
            </div>

            {item.custodyBin && (
              <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                <Archive className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Pickup Bin Location</span>
                  <p className="font-semibold text-amber-900 text-xs">{item.custodyBin}</p>
                </div>
              </div>
            )}
          </div>

          {/* Barcode / Scan Simulation */}
          <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <QrCode className="w-9 h-9 text-slate-700" />
              <div className="text-[11px]">
                <p className="font-bold text-slate-800">No Mobile Required</p>
                <p className="text-slate-500">Staff will scan or look up roll #{claim.rollNumber}</p>
              </div>
            </div>
            <div className="w-12 h-6 flex items-center gap-0.5 justify-center opacity-40">
              {[3, 7, 2, 8, 4, 9, 2, 5, 8, 3].map((h, i) => (
                <div key={i} className="bg-slate-900 w-1" style={{ height: `${h * 2.5}px` }} />
              ))}
            </div>
          </div>

          {/* Notice to Student */}
          <div className="text-[11px] text-slate-500 bg-blue-50/60 p-3 rounded-lg border border-blue-100 leading-relaxed">
            💡 <strong>Next Step:</strong> Visit the front desk, library, or security counter during recess or after school. Quote your Roll Number <strong>({claim.rollNumber})</strong> or Token <strong>({claim.tokenCode})</strong> to collect your item.
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save Receipt
            </button>
            <button
              onClick={() => setActiveClaimPass(null)}
              className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition"
            >
              Done / Close Pass
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
