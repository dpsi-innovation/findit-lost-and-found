import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Code2, 
  Copy, 
  Check, 
  ExternalLink, 
  GraduationCap, 
  Lock, 
  ShieldCheck, 
  Globe,
  Layers,
  Sparkles
} from 'lucide-react';
import { ItemCard } from './ItemCard';

export const LmsEmbedDemo: React.FC = () => {
  const { items } = useApp();
  const [platform, setPlatform] = useState<'canvas' | 'moodle' | 'classroom'>('canvas');
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const embedSnippet = `<iframe
  src="https://lostfound.school.edu/embed?theme=light&auth=lti_v1p3"
  width="100%"
  height="700"
  frameborder="0"
  allow="camera; microphone"
  title="Campus Lost & Found Hub"
></iframe>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedSnippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-100">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">
                LMS Integration &amp; Embedded Student Widget
              </h2>
              <span className="text-[11px] font-bold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200">
                LTI 1.3 &amp; OAuth 2.0 Ready
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Embed directly into student dashboards so students can check lost items from classroom computers or home
            </p>
          </div>
        </div>

        {/* LMS Brand Selector */}
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
          <button
            onClick={() => setPlatform('canvas')}
            className={`px-3 py-1.5 rounded-lg transition ${
              platform === 'canvas' ? 'bg-white text-rose-700 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            Canvas LMS
          </button>
          <button
            onClick={() => setPlatform('moodle')}
            className={`px-3 py-1.5 rounded-lg transition ${
              platform === 'moodle' ? 'bg-white text-amber-700 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            Moodle
          </button>
          <button
            onClick={() => setPlatform('classroom')}
            className={`px-3 py-1.5 rounded-lg transition ${
              platform === 'classroom' ? 'bg-white text-emerald-700 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            Google Classroom
          </button>
        </div>
      </div>

      {/* Simulated LMS Dashboard Wrapper */}
      <div className="rounded-2xl border-2 border-slate-300 bg-slate-900/5 shadow-lg overflow-hidden">
        {/* Fake LMS Browser Frame / Navbar */}
        <div className={`px-4 py-3 text-white flex items-center justify-between ${
          platform === 'canvas' ? 'bg-[#c8102e]' : platform === 'moodle' ? 'bg-[#f98012]' : 'bg-[#137333]'
        }`}>
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
            </div>
            <span className="font-bold text-xs tracking-wide">
              {platform === 'canvas' && 'Canvas LMS — Student Portal'}
              {platform === 'moodle' && 'Moodle Course Management — Student Dashboard'}
              {platform === 'classroom' && 'Google Classroom — Academic Hub'}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-white/90">
            <span className="hidden sm:inline text-[11px] bg-black/20 px-2 py-0.5 rounded">
              Logged in as: Alex Rivera (Grade 10-B)
            </span>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
              A
            </div>
          </div>
        </div>

        {/* LMS Inner Canvas Content */}
        <div className="bg-white p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                School Services / L&amp;F Module
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500">Live Campus Feed</span>
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Single Sign-On Active
            </span>
          </div>

          {/* Embedded widget view inside LMS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.slice(0, 3).map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>

          <p className="text-center text-xs text-slate-400 pt-2">
            Viewing embedded widget simulation. In full production, this is hosted at <code className="bg-slate-100 px-1 py-0.5 rounded">/embed</code>.
          </p>
        </div>
      </div>

      {/* Developer / IT Admin Embed Specs */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-sm">
              LTI 1.3 &amp; Iframe Embed Code for IT Admins
            </h3>
          </div>
          <button
            onClick={copyToClipboard}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
          >
            {copiedSnippet ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Embed Code</span>
              </>
            )}
          </button>
        </div>

        <pre className="p-4 bg-slate-900 text-slate-100 text-xs rounded-xl overflow-x-auto font-mono leading-relaxed">
          {embedSnippet}
        </pre>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-600 pt-2">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80">
            <strong className="text-slate-800 block mb-1">🔐 Zero-Password SSO</strong>
            Inherits the authenticated student session from Canvas, Clever, or Google Workspace automatically.
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80">
            <strong className="text-slate-800 block mb-1">📷 Camera Permissions</strong>
            Permits shared Chromebook and lab PC webcams through the standard <code className="text-blue-600">allow="camera"</code> policy.
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80">
            <strong className="text-slate-800 block mb-1">🛡️ Anti-Theft Guard</strong>
            Requires owner verification answers to prevent students claiming peer items maliciously.
          </div>
        </div>
      </div>
    </div>
  );
};
