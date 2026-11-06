import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  GraduationCap, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  ShieldCheck, 
  Wallet, 
  BookOpen, 
  CheckCircle2,
  Award,
  CreditCard
} from 'lucide-react';

export const UserProfileModal: React.FC = () => {
  const { 
    isProfileModalOpen, 
    setIsProfileModalOpen, 
    userRole, 
    setUserRole, 
    walletBalance,
    setIsParentTopUpModalOpen
  } = useApp();

  if (!isProfileModalOpen) return null;

  const isStudent = userRole === 'student';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-2xs">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#1c1c1c] text-white p-6 relative border-b border-[#cca43b]/40">
          <button
            onClick={() => setIsProfileModalOpen(false)}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                alt="Shashank Jangid"
                className="w-16 h-16 rounded-full object-cover border-2 border-[#cca43b]"
              />
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <img src="/dps-logo.png" alt="DPS Logo" className="w-5 h-5 object-contain" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#cca43b] block">
                  DELHI PUBLIC SCHOOL INDIRAPURAM
                </span>
              </div>
              <h3 className="text-xl font-black text-white">
                SHASHANK JANGID
              </h3>
              <p className="text-xs text-slate-300">
                {isStudent ? 'Class X - Section B • Roll No: 24' : 'Projects & Competition Coordinator (SESC181)'}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 text-xs max-h-[75vh] overflow-y-auto">
          {/* Persona Switcher inside modal */}
          <div className="p-3 bg-amber-50/60 border border-[#cca43b]/40 rounded-xl flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900 block">Switch LMS Login View</span>
              <span className="text-slate-500 text-[11px]">Toggle between Student profile &amp; Coordinator</span>
            </div>
            <div className="flex gap-1 bg-white p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => setUserRole('student')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition ${
                  isStudent ? 'bg-[#cca43b] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Student
              </button>
              <button
                onClick={() => setUserRole('coordinator')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition ${
                  !isStudent ? 'bg-[#cca43b] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Staff
              </button>
            </div>
          </div>

          {/* Academic Details Card */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-2.5">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-[#cca43b]" />
              {isStudent ? 'Student Academic Enrollment' : 'Staff Department Credentials'}
            </h4>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Admission / Reg No</span>
                <span className="font-mono font-bold text-slate-800 text-xs">
                  {isStudent ? 'DPSI/2026/4102' : 'SESC181'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Academic Session</span>
                <span className="font-bold text-slate-800 text-xs">2026 - 2027</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Class / House</span>
                <span className="font-bold text-slate-800 text-xs">
                  {isStudent ? 'Class 10-B (Ganga House)' : 'Senior Secondary Wing'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Attendance Record</span>
                <span className="font-bold text-emerald-700 text-xs">96.4% Present</span>
              </div>
            </div>
          </div>

          {/* Smart Card & Cafeteria Wallet */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-emerald-600" />
                Integrated Smart RFID Wallet
              </h4>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="text-slate-400 text-[10px] block uppercase font-bold">Smart Card Chip ID</span>
                <span className="font-mono font-bold text-slate-800">RFID-DPSI-9402</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 text-[10px] block uppercase font-bold">Available Balance</span>
                <span className="text-base font-black text-emerald-700">₹{walletBalance}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsProfileModalOpen(false);
                setIsParentTopUpModalOpen(true);
              }}
              className="w-full py-2 bg-[#cca43b] hover:bg-[#b8912e] text-white font-bold text-xs rounded-lg transition"
            >
              Recharge Cafeteria Wallet
            </button>
          </div>

          {/* Parent & Emergency Contact */}
          <div className="border-t border-slate-200 pt-3 space-y-1.5 text-[11px] text-slate-500">
            <div className="flex justify-between">
              <span>Parent / Guardian:</span>
              <strong className="text-slate-800">Mr. Rajesh Jangid (Father)</strong>
            </div>
            <div className="flex justify-between">
              <span>Parent Contact:</span>
              <span className="font-mono text-slate-700">+91 9810X XXXXX</span>
            </div>
            <div className="flex justify-between">
              <span>Registered LMS Email:</span>
              <span className="text-slate-700">shashank.j@student.dpsindirapuram.com</span>
            </div>
          </div>

          <button
            onClick={() => setIsProfileModalOpen(false)}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};
