import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Archive, 
  User, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Ticket
} from 'lucide-react';

export const ItemDetailModal: React.FC = () => {
  const { 
    selectedItem, 
    setSelectedItem, 
    submitClaim, 
    setActiveClaimPass,
    updateItemCustody,
    viewMode
  } = useApp();

  const [claimantName, setClaimantName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [grade, setGrade] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [answerVerification, setAnswerVerification] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState(false);

  // Staff quick edit
  const [newBin, setNewBin] = useState('');
  const [isEditingBin, setIsEditingBin] = useState(false);

  if (!selectedItem) return null;

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalClaimant = claimantName.trim() || 'Student Claimant';
    const finalRoll = rollNumber.trim() || 'Student';
    const finalAnswer = answerVerification.trim() || 'Claimed in person at campus desk';

    setIsSubmitting(true);
    setTimeout(() => {
      const claim = submitClaim(selectedItem.id, {
        claimantName: finalClaimant,
        rollNumber: finalRoll,
        grade: grade || 'Class 10',
        contactEmail: contactEmail || `${finalRoll.toLowerCase().replace(/[^a-z0-9]/g, '')}@student.school.edu`,
        answerVerification: finalAnswer
      });

      setIsSubmitting(false);
      setClaimSuccess(true);

      // Open digital claim pass for the student to print or show staff
      setActiveClaimPass({
        claim,
        item: selectedItem
      });
    }, 400);
  };

  const handleSaveBin = () => {
    if (newBin.trim()) {
      updateItemCustody(selectedItem.id, newBin.trim(), 'in_custody');
      setIsEditingBin(false);
    }
  };

  const handleMarkReturned = () => {
    if (confirm('Confirm item has been safely returned to verified owner?')) {
      updateItemCustody(selectedItem.id, selectedItem.custodyBin || 'Returned', 'handed_over');
    }
  };

  const isReturned = selectedItem.status === 'handed_over';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded shadow-xs text-white ${
                selectedItem.type === 'found' ? 'bg-emerald-600' : 'bg-rose-600'
              }`}
            >
              {selectedItem.type === 'found' ? 'FOUND ITEM' : 'LOST REPORT'}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              ID: {selectedItem.id}
            </span>
          </div>
          <button
            onClick={() => setSelectedItem(null)}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Main Visual & Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="rounded-xl overflow-hidden bg-slate-100 border border-slate-200 aspect-4/3 relative">
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
              {selectedItem.isImportant && (
                <div className="absolute top-2 left-2 bg-amber-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> High Value Item
                </div>
              )}
            </div>

            <div className="space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  {selectedItem.category}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                  {selectedItem.title}
                </h2>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>

              {/* Status and Custody info box */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> Location:
                  </span>
                  <span className="font-semibold text-slate-800">{selectedItem.locationFound}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> Reported:
                  </span>
                  <span className="text-slate-800">
                    {new Date(selectedItem.dateReported).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-400" /> Logged By:
                  </span>
                  <span className="text-slate-800">
                    {selectedItem.reportedBy.name} ({selectedItem.reportedBy.grade})
                  </span>
                </div>

                {selectedItem.custodyBin && (
                  <div className="pt-2 border-t border-slate-200 flex items-start justify-between gap-2">
                    <span className="text-amber-700 font-semibold flex items-center gap-1 shrink-0">
                      <Archive className="w-3.5 h-3.5 text-amber-600" /> Storage Bin:
                    </span>
                    <span className="font-mono text-[11px] bg-amber-100/70 text-amber-900 px-2 py-0.5 rounded font-bold text-right">
                      {selectedItem.custodyBin}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Verification Shield Prompt */}
          {selectedItem.verificationQuestion && (
            <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                    Owner Verification Prompt
                  </h4>
                  <p className="text-xs text-blue-800 mt-1 font-medium">
                    "{selectedItem.verificationQuestion}"
                  </p>
                  <p className="text-[11px] text-blue-600/80 mt-1">
                    To prevent wrongful pickup, the claimant must provide identifying details that only the true owner would know.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Student Claim Action Form */}
          {selectedItem.type === 'found' && !isReturned && (
            <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-slate-900 text-sm">
                    Is this your item? Claim &amp; Generate School Pass
                  </h3>
                </div>
                <span className="text-[11px] bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-full border border-blue-200">
                  Instant Verification Pass
                </span>
              </div>

              <form onSubmit={handleClaimSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Alex Rivera (or leave blank)"
                      value={claimantName}
                      onChange={(e) => setClaimantName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Student ID / Roll Number
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 10-B-24 or Student ID"
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Class / Grade / Section
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Grade 10-B"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      School Email (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. alex.r@student.school.edu"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Proof of Ownership / Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Describe unique marks, stickers, color, or notes for the front desk..."
                    value={answerVerification}
                    onChange={(e) => setAnswerVerification(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm rounded-lg shadow-sm flex items-center justify-center gap-2 transition active:scale-98"
                >
                  {isSubmitting ? (
                    'Generating Pass...'
                  ) : (
                    <>
                      <span>Submit Claim &amp; Get Verification Pass</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Already Returned notice */}
          {isReturned && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-emerald-900">
                  Item Resolved &amp; Handed Over
                </p>
                <p className="text-[11px] text-emerald-700 mt-0.5">
                  This item has already been claimed and collected by its verified student owner.
                </p>
              </div>
            </div>
          )}

          {/* Staff Custody Quick Controls (If viewed in staff mode or by supervisor) */}
          {(viewMode === 'staff' || viewMode === 'portal') && (
            <div className="border-t border-slate-200 pt-4">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Staff Custodian Actions
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {!isReturned && (
                  <button
                    onClick={handleMarkReturned}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Mark Handed Over to Student
                  </button>
                )}

                {isEditingBin ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Bin #4C - Reception"
                      value={newBin}
                      onChange={(e) => setNewBin(e.target.value)}
                      className="px-2 py-1 text-xs border border-slate-300 rounded"
                    />
                    <button
                      onClick={handleSaveBin}
                      className="px-2.5 py-1 bg-blue-600 text-white rounded text-xs font-medium"
                    >
                      Save Bin
                    </button>
                    <button
                      onClick={() => setIsEditingBin(false)}
                      className="px-2 py-1 text-slate-500 text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setNewBin(selectedItem.custodyBin || '');
                      setIsEditingBin(true);
                    }}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-1.5"
                  >
                    <Archive className="w-3.5 h-3.5" />
                    Update Storage Bin ({selectedItem.custodyBin || 'Unassigned'})
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
