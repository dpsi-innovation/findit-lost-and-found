import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Archive, 
  Clock, 
  UserCheck, 
  Search,
  FileText,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';

export const StaffDashboard: React.FC = () => {
  const { items, updateClaimStatus, updateItemCustody, setSelectedItem } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'pending_claims' | 'inventory'>('pending_claims');

  // Extract all claims across all items
  const allClaims = items.flatMap(item => 
    item.claims.map(claim => ({
      claim,
      item
    }))
  );

  const pendingClaims = allClaims.filter(c => c.claim.status === 'pending');

  const filteredClaims = pendingClaims.filter(c => 
    c.claim.claimantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.claim.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.claim.tokenCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApprove = (itemId: string, claimId: string) => {
    if (confirm('Approve this claim and confirm item handover to student?')) {
      updateClaimStatus(itemId, claimId, 'approved');
    }
  };

  const handleReject = (itemId: string, claimId: string) => {
    if (confirm('Reject this claim request?')) {
      updateClaimStatus(itemId, claimId, 'rejected');
    }
  };

  return (
    <div className="space-y-6">
      {/* Staff Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 border border-indigo-100">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">
                Staff &amp; Custody Desk Manager
              </h2>
              <span className="text-[11px] font-bold bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full border border-indigo-200">
                Authorized Personnel
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Verify student identity, inspect secret ownership proof, and release items from lockers
            </p>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
          <button
            onClick={() => setActiveTab('pending_claims')}
            className={`px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition ${
              activeTab === 'pending_claims'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'hover:text-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Verification Queue ({pendingClaims.length})
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition ${
              activeTab === 'inventory'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'hover:text-slate-900'
            }`}
          >
            <Archive className="w-3.5 h-3.5" />
            Locker Inventory ({items.filter(i => i.status === 'in_custody').length})
          </button>
        </div>
      </div>

      {/* Pending Claims Section */}
      {activeTab === 'pending_claims' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Student Claims Awaiting Identity &amp; Answer Verification
              </h3>
              <p className="text-xs text-slate-500">
                Cross-check the student's answer against the item's hidden details before handing over
              </p>
            </div>

            {/* Quick search by roll no / name */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Roll No or Token..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>

          {filteredClaims.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <h4 className="font-bold text-sm text-slate-800">
                Queue is All Caught Up!
              </h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                There are no pending claims waiting for staff verification right now.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredClaims.map(({ claim, item }) => (
                <div
                  key={claim.id}
                  className="border border-slate-200 rounded-xl p-4 sm:p-5 hover:border-blue-300 transition bg-slate-50/30 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-sm">
                            {item.title}
                          </h4>
                          <span className="text-[11px] font-mono font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                            {claim.tokenCode}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Stored in: <strong className="text-amber-800">{item.custodyBin || 'Unassigned'}</strong> • Found at: {item.locationFound}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedItem(item)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 self-start sm:self-auto"
                    >
                      <span>Inspect Item</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Claimant Details & Verification Answer */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                      <span className="text-slate-400 font-bold uppercase text-[10px]">Student Claimant</span>
                      <p className="font-bold text-slate-800 text-sm">{claim.claimantName}</p>
                      <p className="text-slate-600">Roll No: <strong className="font-mono text-blue-700">{claim.rollNumber}</strong> ({claim.grade})</p>
                      <p className="text-slate-500 text-[11px]">{claim.contactEmail}</p>
                    </div>

                    <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-200 space-y-1">
                      <span className="text-blue-700 font-bold uppercase text-[10px] flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-blue-600" /> Proof Submitted by Student:
                      </span>
                      <p className="text-slate-800 font-medium italic">
                        "{claim.answerVerification}"
                      </p>
                      {item.verificationQuestion && (
                        <p className="text-[11px] text-slate-500 pt-1 border-t border-blue-100">
                          Original Question: <em>{item.verificationQuestion}</em>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      onClick={() => handleReject(item.id, claim.id)}
                      className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      Reject Claim
                    </button>
                    <button
                      onClick={() => handleApprove(item.id, claim.id)}
                      className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-xs transition"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Approve &amp; Hand Over Item
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Locker Inventory Tab */}
      {activeTab === 'inventory' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Active Items Stored Across Campus Custody Bins
              </h3>
              <p className="text-xs text-slate-500">
                Physical inventory audit and locker bin reassignments
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-y border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Item</th>
                  <th className="py-2.5 px-3">Location Found</th>
                  <th className="py-2.5 px-3">Storage Bin</th>
                  <th className="py-2.5 px-3">Date Logged</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-8 h-8 rounded object-cover"
                        />
                        <span className="font-semibold text-slate-800 line-clamp-1">{item.title}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">{item.locationFound}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-amber-800">
                      {item.custodyBin || 'Unassigned'}
                    </td>
                    <td className="py-2.5 px-3 text-slate-500">
                      {new Date(item.dateReported).toLocaleDateString()}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === 'handed_over'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {item.status === 'handed_over' ? 'Handed Over' : 'In Custody'}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
