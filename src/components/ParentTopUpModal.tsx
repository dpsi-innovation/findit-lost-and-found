import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Wallet, 
  CreditCard, 
  QrCode, 
  Building2, 
  CheckCircle2, 
  ShieldCheck, 
  Lock,
  ArrowRight
} from 'lucide-react';

export const ParentTopUpModal: React.FC = () => {
  const { 
    isParentTopUpModalOpen, 
    setIsParentTopUpModalOpen, 
    topUpWallet, 
    walletBalance 
  } = useApp();

  const [amount, setAmount] = useState<number>(500);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'netbanking' | 'card'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isParentTopUpModalOpen) return null;

  const quickAmounts = [200, 500, 1000, 2000];

  const handleSelectQuick = (val: number) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    const parsed = parseFloat(e.target.value);
    if (!isNaN(parsed) && parsed > 0) {
      setAmount(parsed);
    }
  };

  const handleRecharge = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) {
      alert('Please enter a valid top-up amount.');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      const methodName = paymentMethod === 'upi' ? 'Google Pay UPI' : paymentMethod === 'netbanking' ? 'NetBanking' : 'Credit/Debit Card';
      topUpWallet(amount, methodName, `Parent Top-Up (${methodName})`);
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsParentTopUpModalOpen(false);
      }, 1500);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-2xs">
      <div 
        className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#1c1c1c] text-white p-5 relative border-b border-[#cca43b]/40">
          <button
            onClick={() => setIsParentTopUpModalOpen(false)}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-bold text-[#cca43b] uppercase tracking-wider">
              DPSI Parent Payment Portal
            </span>
          </div>

          <h3 className="text-lg font-black text-white">
            Top Up Student Cafeteria Wallet
          </h3>
          <p className="text-xs text-slate-300">
            For Shashank Jangid (Class X-B | Roll No. 24)
          </p>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">
              Payment Successful!
            </h4>
            <p className="text-xs text-slate-500">
              ₹{amount} has been credited to the student's RFID Smart Card.
            </p>
            <div className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 py-1 px-3 rounded-full inline-block">
              New Balance: ₹{(walletBalance + amount).toLocaleString('en-IN')}
            </div>
          </div>
        ) : (
          <form onSubmit={handleRecharge} className="p-5 sm:p-6 space-y-5">
            {/* Amount Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Select Recharge Amount (INR)
              </label>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {quickAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => handleSelectQuick(amt)}
                    className={`py-2 text-xs font-bold rounded-xl border transition ${
                      amount === amt && !customAmount
                        ? 'bg-[#cca43b] text-white border-[#cca43b] shadow-2xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  placeholder="Or enter custom amount..."
                  value={customAmount}
                  onChange={handleCustomChange}
                  className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#cca43b]/20 focus:border-[#cca43b]"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Select Payment Mode
              </label>
              <div className="space-y-2">
                <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                  paymentMethod === 'upi' ? 'border-[#cca43b] bg-amber-50/30' : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}>
                  <div className="flex items-center gap-3">
                    <QrCode className="w-5 h-5 text-[#cca43b]" />
                    <div>
                      <p className="font-bold text-xs text-slate-900">Instant UPI (GPay / PhonePe / Paytm)</p>
                      <p className="text-[10px] text-slate-500">Zero transaction charges</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="method"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="text-[#cca43b] focus:ring-[#cca43b]"
                  />
                </label>

                <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                  paymentMethod === 'netbanking' ? 'border-[#cca43b] bg-amber-50/30' : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}>
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-[#cca43b]" />
                    <div>
                      <p className="font-bold text-xs text-slate-900">NetBanking (HDFC / SBI / ICICI)</p>
                      <p className="text-[10px] text-slate-500">Direct bank authorization</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="method"
                    checked={paymentMethod === 'netbanking'}
                    onChange={() => setPaymentMethod('netbanking')}
                    className="text-[#cca43b] focus:ring-[#cca43b]"
                  />
                </label>

                <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                  paymentMethod === 'card' ? 'border-[#cca43b] bg-amber-50/30' : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}>
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-[#cca43b]" />
                    <div>
                      <p className="font-bold text-xs text-slate-900">Debit / Credit Card</p>
                      <p className="text-[10px] text-slate-500">Visa, MasterCard, RuPay</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="method"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="text-[#cca43b] focus:ring-[#cca43b]"
                  />
                </label>
              </div>
            </div>

            {/* Security note */}
            <div className="flex items-center gap-2 text-[10px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>256-bit SSL encrypted. Funds reflect immediately on the school RFID card.</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3 bg-[#cca43b] hover:bg-[#b8912e] active:scale-98 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition"
            >
              {isProcessing ? (
                'Processing Top-Up...'
              ) : (
                <>
                  <span>Proceed to Pay ₹{amount}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
