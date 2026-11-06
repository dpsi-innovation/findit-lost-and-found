import React, { useState, useEffect } from 'react';
import { Monitor, Camera, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const KioskBanner: React.FC = () => {
  const { setIsReportModalOpen, setDefaultReportType } = useApp();
  const [sessionSeconds, setSessionSeconds] = useState(120);

  // Auto reset timer simulation for shared public school terminals
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionSeconds((prev) => (prev > 0 ? prev - 1 : 120));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden mb-8">
      {/* Background decoration */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-12 pointer-events-none" />
      <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-blue-500/20 blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-white backdrop-blur-md border border-white/20">
            <Monitor className="w-3.5 h-3.5" />
            School Terminal / Library Station
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-400/20 text-emerald-200 border border-emerald-300/30">
            <Sparkles className="w-3.5 h-3.5" />
            No Phone Needed
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs text-white/80 bg-black/20 font-mono ml-auto">
            <Clock className="w-3 h-3" /> Terminal resets in: {formatTimer(sessionSeconds)}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
          Lost or Found an Item on Campus?
        </h1>
        <p className="text-blue-100 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
          Quickly log found items using this station's camera, or look up lost belongings. Your claim pass can be shown to the duty supervisor at the front desk.
        </p>

        {/* 3 Step Process Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/15">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-blue-500/30 flex items-center justify-center font-bold text-xs shrink-0 border border-white/30">
              1
            </div>
            <div>
              <p className="text-xs font-bold text-white">Snap &amp; Tag</p>
              <p className="text-[11px] text-blue-100">Use terminal webcam to capture the item</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-blue-500/30 flex items-center justify-center font-bold text-xs shrink-0 border border-white/30">
              2
            </div>
            <div>
              <p className="text-xs font-bold text-white">Drop in Bin</p>
              <p className="text-[11px] text-blue-100">Deposit at the labeled campus locker/bin</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-blue-500/30 flex items-center justify-center font-bold text-xs shrink-0 border border-white/30">
              3
            </div>
            <div>
              <p className="text-xs font-bold text-white">Digital Pass</p>
              <p className="text-[11px] text-blue-100">Owner claims with secret answer &amp; student ID</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              setDefaultReportType('found');
              setIsReportModalOpen(true);
            }}
            className="px-5 py-2.5 bg-white text-blue-800 hover:bg-blue-50 active:scale-98 text-xs sm:text-sm font-bold rounded-xl shadow-md flex items-center gap-2 transition"
          >
            <Camera className="w-4 h-4 text-blue-600" />
            Found an Item? Quick Report Now
          </button>

          <button
            onClick={() => {
              setDefaultReportType('lost');
              setIsReportModalOpen(true);
            }}
            className="px-4 py-2.5 bg-blue-800/80 hover:bg-blue-800 text-white border border-white/20 active:scale-98 text-xs sm:text-sm font-semibold rounded-xl transition"
          >
            I Lost Something
          </button>
        </div>
      </div>
    </div>
  );
};
