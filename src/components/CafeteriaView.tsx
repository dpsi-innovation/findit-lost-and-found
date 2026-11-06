import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CAFETERIA_MENU } from '../data/mockData';
import { MenuItem } from '../types';
import { 
  Wallet, 
  PlusCircle, 
  UtensilsCrossed, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ShieldCheck, 
  Sliders, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  CreditCard,
  QrCode,
  History,
  Lock
} from 'lucide-react';

export const CafeteriaView: React.FC = () => {
  const { 
    walletBalance, 
    walletTransactions, 
    dailySpendingLimit, 
    setDailySpendingLimit,
    purchaseMeal, 
    setIsParentTopUpModalOpen,
    userRole
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [purchaseSuccessMessage, setPurchaseSuccessMessage] = useState<string | null>(null);

  const categories = ['All', 'Snacks', 'Meals', 'Beverages', 'Healthy'];

  const filteredMenu = activeCategory === 'All' 
    ? CAFETERIA_MENU 
    : CAFETERIA_MENU.filter(m => m.category === activeCategory);

  const handleSimulatePurchase = (item: MenuItem) => {
    const success = purchaseMeal(item);
    if (success) {
      setPurchaseSuccessMessage(`Purchased ${item.name} for ₹${item.price} via Student ID Smart Card.`);
      setTimeout(() => setPurchaseSuccessMessage(null), 3000);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Alert toast if meal purchased */}
      {purchaseSuccessMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-xl flex items-center justify-between text-xs font-semibold shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{purchaseSuccessMessage}</span>
          </div>
          <span className="text-emerald-600 font-mono text-[11px]">RFID TAP APPROVED</span>
        </div>
      )}

      {/* Top Banner: Smart Wallet Overview */}
      <div className="bg-gradient-to-r from-[#202020] via-[#2c281e] to-[#1c1c1c] text-white rounded-2xl p-6 sm:p-7 shadow-md relative overflow-hidden border border-[#cca43b]/40">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#cca43b] text-white flex items-center gap-1">
                <Wallet className="w-3 h-3" /> Student Smart RFID Wallet
              </span>
              <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                LMS Integrated
              </span>
            </div>
            
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                ₹{walletBalance.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-amber-200/80">Available Cafeteria Balance</span>
            </div>

            <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
              Card linked to <strong>Shashank Jangid (Class X-B | Roll No. 24)</strong>. Students tap their physical school ID card at the cafeteria counter without needing cash or a mobile phone.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => setIsParentTopUpModalOpen(true)}
              className="px-5 py-3 bg-[#cca43b] hover:bg-[#b8912e] active:scale-98 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Parent Wallet Top-Up</span>
            </button>
            
            <div className="px-3.5 py-2.5 bg-white/10 rounded-xl border border-white/15 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-300 block">Daily Limit</span>
              <span className="text-xs font-mono font-bold text-amber-300">₹{dailySpendingLimit}/day</span>
            </div>
          </div>
        </div>

        {/* Background decorative badge */}
        <div className="absolute right-4 -bottom-8 opacity-10 pointer-events-none">
          <UtensilsCrossed className="w-64 h-64 text-[#cca43b]" />
        </div>
      </div>

      {/* Main Grid: Canteen Menu + Transaction Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Today's Cafeteria Menu (cols 8) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-bold text-base text-slate-900 tracking-tight flex items-center gap-2">
                <UtensilsCrossed className="w-5 h-5 text-[#cca43b]" />
                Today's Fresh Cafeteria Menu
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Nutritious food prepared according to FSSAI &amp; School Health standards
              </p>
            </div>

            {/* Category tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                    activeCategory === cat
                      ? 'bg-[#cca43b] text-white shadow-2xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filteredMenu.map((item) => (
              <div 
                key={item.id}
                className="border border-slate-200 rounded-xl p-3.5 hover:border-[#cca43b]/80 transition flex gap-3 group bg-white shadow-2xs"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-lg object-cover shrink-0 border border-slate-200 group-hover:scale-102 transition"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#cca43b] transition line-clamp-1">
                        {item.name}
                      </h4>
                      <span className="font-bold text-xs text-slate-900 shrink-0">
                        ₹{item.price}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-1">
                      <span className="px-1.5 py-0.2 bg-emerald-50 text-emerald-700 font-semibold rounded border border-emerald-200">
                        {item.dietary}
                      </span>
                      <span>{item.calories} kcal</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">Available at counters</span>
                    <button
                      onClick={() => handleSimulatePurchase(item)}
                      className="px-2.5 py-1 bg-slate-900 hover:bg-[#cca43b] text-white text-[11px] font-bold rounded-lg transition"
                      title="Simulate tapping Student Smart ID at Canteen"
                    >
                      Tap ID &amp; Buy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Parent Controls & Recent Transactions (cols 4) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Parent Control Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#a88220] flex items-center justify-center shrink-0 border border-amber-200">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                  Parent Spending Controls
                </h4>
                <p className="text-[11px] text-slate-500">Limits enforced on student ID card</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                Set Maximum Daily Limit (₹)
              </label>
              <div className="flex items-center gap-2">
                {[100, 150, 200, 300].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setDailySpendingLimit(amt)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition ${
                      dailySpendingLimit === amt
                        ? 'bg-[#cca43b] text-white border-[#cca43b]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 pt-1">
                Prevents students from exceeding this amount during recess &amp; lunch.
              </p>
            </div>

            <button
              onClick={() => setIsParentTopUpModalOpen(true)}
              className="w-full py-2.5 bg-[#cca43b] hover:bg-[#b8912e] text-white text-xs font-bold rounded-xl transition shadow-2xs flex items-center justify-center gap-2"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Top Up Wallet Now</span>
            </button>
          </div>

          {/* Recent Wallet Transactions */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-[#cca43b]" />
                <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                  Recent Activity
                </h4>
              </div>
              <span className="text-[10px] text-slate-400">Live ledger</span>
            </div>

            <div className="space-y-3">
              {walletTransactions.slice(0, 5).map((txn) => {
                const isTopup = txn.type === 'topup';
                return (
                  <div key={txn.id} className="flex items-start justify-between gap-2 text-xs">
                    <div className="flex items-start gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        isTopup ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {isTopup ? <ArrowDownLeft className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 line-clamp-1">{txn.title}</p>
                        <p className="text-[10px] text-slate-400">
                          {new Date(txn.date).toLocaleDateString()} • {txn.method}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`font-bold ${isTopup ? 'text-emerald-700' : 'text-slate-900'}`}>
                        {isTopup ? '+' : '-'}₹{txn.amount}
                      </span>
                      <span className="block text-[10px] text-slate-400">
                        bal ₹{txn.balanceAfter}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
