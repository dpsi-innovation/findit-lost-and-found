import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ItemCategory, ItemType } from '../types';
import { WebcamCapture, SAMPLE_PHOTO_PRESETS } from './WebcamCapture';
import { 
  X, 
  Camera, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  Archive,
  ArrowRight
} from 'lucide-react';

const CATEGORIES: ItemCategory[] = [
  'Electronics & Gadgets',
  'Clothing & Uniform',
  'Books & Stationery',
  'Bottles & Lunchboxes',
  'Student IDs & Cards',
  'Keys, Bags & Wallets',
  'Sports Equipment',
  'Other Accessories'
];

export const ReportItemModal: React.FC = () => {
  const { 
    isReportModalOpen, 
    setIsReportModalOpen, 
    addItem, 
    defaultReportType, 
    zones 
  } = useApp();

  const [type, setType] = useState<ItemType>(defaultReportType || 'found');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ItemCategory>('Electronics & Gadgets');
  const [locationFound, setLocationFound] = useState(zones[0]?.name || 'Library & Media Center');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState<string>(SAMPLE_PHOTO_PRESETS[0].url);
  const [verificationQuestion, setVerificationQuestion] = useState('');
  const [custodyBin, setCustodyBin] = useState('Bin #1B - Library Front Desk');
  
  // Reporter identification
  const [reporterName, setReporterName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [grade, setGrade] = useState('Grade 10');
  const [isImportant, setIsImportant] = useState(false);

  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!isReportModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTitle = title.trim() || 'Unspecified Student Item';
    const finalDescription = description.trim() || 'Found inside school premises. Inquire with staff or check custody bin.';

    const newItem = addItem({
      title: finalTitle,
      category,
      type,
      description: finalDescription,
      locationFound,
      imageUrl: imageUrl || SAMPLE_PHOTO_PRESETS[0].url,
      verificationQuestion: verificationQuestion.trim() || undefined,
      custodyBin: type === 'found' ? custodyBin : undefined,
      isImportant,
      reportedBy: {
        name: reporterName.trim() || (type === 'found' ? 'Campus Student' : 'Student'),
        rollNumber: rollNumber.trim() || 'Campus Student',
        grade: grade || 'School',
        role: 'student'
      }
    });

    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setIsReportModalOpen(false);
      // Reset form
      setTitle('');
      setDescription('');
      setVerificationQuestion('');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {type === 'found' ? 'Report a Found Item' : 'Report a Lost Item'}
            </h2>
            <p className="text-xs text-slate-500">
              Terminal quick logging — No mobile phone needed
            </p>
          </div>
          <button
            onClick={() => setIsReportModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Splash */}
        {submittedSuccess ? (
          <div className="p-12 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">
              Item Logged Successfully!
            </h3>
            <p className="text-xs text-slate-500 max-w-sm">
              {type === 'found'
                ? 'Thank you for your honesty! The item is now listed on the school board and in custody.'
                : 'Your inquiry has been broadcasted. School supervisors have been notified.'}
            </p>
          </div>
        ) : (
          /* Form Content */
          <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5">
            {/* Type Switcher (Found vs Lost) */}
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
              <button
                type="button"
                onClick={() => setType('found')}
                className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition ${
                  type === 'found'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'hover:text-slate-900'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                I Found An Item on Campus
              </button>
              <button
                type="button"
                onClick={() => setType('lost')}
                className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition ${
                  type === 'lost'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'hover:text-slate-900'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                I Lost My Item
              </button>
            </div>

            {/* Webcam / Photo Capture */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-blue-600" />
                Terminal Camera / Item Photo
              </label>
              <WebcamCapture
                initialImage={imageUrl}
                onCapture={(url) => setImageUrl(url)}
              />
            </div>

            {/* Title & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Item Title / Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Casio fx-991EX, Blue Hydro Flask, Blazer..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ItemCategory)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location & Custody Locker */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> Campus Location Found / Lost
                </label>
                <select
                  value={locationFound}
                  onChange={(e) => setLocationFound(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
                >
                  {zones.map((z) => (
                    <option key={z.id} value={z.name}>{z.name}</option>
                  ))}
                </select>
              </div>

              {type === 'found' ? (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Archive className="w-3.5 h-3.5 text-amber-600" /> Storage / Drop-off Bin
                  </label>
                  <select
                    value={custodyBin}
                    onChange={(e) => setCustodyBin(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
                  >
                    <option value="Bin #1B - Library Front Desk">Bin #1B - Library Front Desk</option>
                    <option value="Bin #2A - Cafeteria Manager Office">Bin #2A - Cafeteria Office</option>
                    <option value="Bin #3A - Science Lab Assistant Cabin">Bin #3A - Science Lab Cabin</option>
                    <option value="Bin #4B - Physical Education Office">Bin #4B - Gym / PE Office</option>
                    <option value="Bin #5A - 3rd Floor Supervisor Desk">Bin #5A - Floor Supervisor</option>
                    <option value="Bin #7 - Gate 1 Main Security Booth">Bin #7 - Security Gate 1</option>
                    <option value="Holding personally (Teacher/Student)">Holding Personally</option>
                  </select>
                </div>
              ) : (
                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isImportant}
                      onChange={(e) => setIsImportant(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    <span className="text-xs font-semibold text-slate-700">
                      Mark as High-Value / Urgently Needed
                    </span>
                  </label>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Description &amp; Condition (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Include color, visible branding, stickers or where it was found / lost..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            {/* Secret Verification Prompt (Anti-Theft Protection) */}
            {type === 'found' && (
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
                <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  Anti-Theft Verification Prompt (Recommended)
                </label>
                <p className="text-[11px] text-slate-500">
                  Ask a question that only the real owner can answer before taking the item:
                </p>
                <input
                  type="text"
                  placeholder="e.g. What name is written on the inner label? or What keychain is attached?"
                  value={verificationQuestion}
                  onChange={(e) => setVerificationQuestion(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            )}

            {/* Reporter Quick Identification (No phone required) */}
            <div className="border-t border-slate-200 pt-4">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Reporter Student ID / Roll Number (No Login Required)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name (or Anonymous)"
                    value={reporterName}
                    onChange={(e) => setReporterName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Roll Number (e.g. 10-B-24)"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Grade / Section (e.g. 10th-B)"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition"
              >
                <span>Publish Item to School Lost &amp; Found</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
