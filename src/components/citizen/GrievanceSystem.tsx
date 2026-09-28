import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2, Clock, FileText, Send, Upload, Plus, ShieldCheck, ChevronRight, Filter } from 'lucide-react';
import { INITIAL_GRIEVANCES, CURRENT_CITIZEN } from '../../data/mockData';
import { Grievance } from '../../types';
import { TrustBanner } from '../common/TrustBanner';

export const GrievanceSystem: React.FC = () => {
  const [grievances, setGrievances] = useState<Grievance[]>(() => {
    const saved = localStorage.getItem('setu_grievances') || localStorage.getItem('landgov_grievances');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_GRIEVANCES;
      }
    }
    return INITIAL_GRIEVANCES;
  });

  const [activeTab, setActiveTab] = useState<'raise' | 'list'>('raise');
  const [selectedGrievance, setSelectedGrievance] = useState<Grievance | null>(null);

  // Form State
  const [category, setCategory] = useState<Grievance['category']>('Acquisition Alignment');
  const [surveyNumber, setSurveyNumber] = useState(CURRENT_CITIZEN.primarySurveyNumber);
  const [locationVillage, setLocationVillage] = useState(CURRENT_CITIZEN.village);
  const [description, setDescription] = useState(
    'The proposed highway buffer bisects my primary irrigation borewell and drip distribution line installed under PMKSY. Requesting realignment or compensatory tubewell installation.'
  );
  const [attachedFileName, setAttachedFileName] = useState('Borewell_Sanction_Invoice_2023.pdf');
  const [submittedSuccessId, setSubmittedSuccessId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('setu_grievances', JSON.stringify(grievances));
  }, [grievances]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    // Generate tracking ID
    const newSeq = 1284 + grievances.length - 2;
    const generatedId = `LG-2026-00${newSeq}`;

    const newGrievance: Grievance = {
      id: `gr-${Date.now()}`,
      trackingId: generatedId,
      surveyNumber,
      village: locationVillage,
      category,
      description,
      submittedBy: CURRENT_CITIZEN.name,
      contactNumber: CURRENT_CITIZEN.phoneMasked,
      submittedAt: new Date().toLocaleString([], {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'Under Review',
      resolutionNotes: 'Field verification initiated by Sub-Divisional Officer Haveli. Notice served to acquiring authority.',
      timeline: [
        { stage: 'Submitted', date: 'Just now', actor: 'Citizen Portal', completed: true },
        { stage: 'Received', date: 'Today', actor: 'CALA Haveli', completed: true },
        { stage: 'Under Review', date: 'In Progress', actor: 'Joint Inspection Committee', completed: true },
        { stage: 'Resolved', date: 'Estimated 14 days', actor: 'District Collector Committee', completed: false },
      ],
      documentAttachmentName: attachedFileName || undefined,
    };

    setGrievances([newGrievance, ...grievances]);
    setSubmittedSuccessId(generatedId);
    setSelectedGrievance(newGrievance);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Public Redressal & Representation System · RFCTLARR Section 15
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Grievance Redressal
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            File objections, claim discrepancies, or alignment concerns with auditable resolution timelines
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs font-medium">
          <button
            onClick={() => setActiveTab('raise')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'raise'
                ? 'bg-white text-blue-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Raise a Grievance
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'list'
                ? 'bg-white text-blue-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            My Grievances ({grievances.length})
          </button>
        </div>
      </div>

      {/* Main View: Raise vs List */}
      {activeTab === 'raise' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form (Left: 7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">
                Submit Formal Objection or Grievance
              </h2>
              <p className="text-xs text-slate-500">
                Lodged directly to the Competent Authority Land Acquisition (CALA), Haveli
              </p>
            </div>

            {submittedSuccessId && (
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
                <div className="flex items-center gap-2 font-bold text-sm text-emerald-900">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Grievance Successfully Registered</span>
                </div>
                <p className="text-xs text-emerald-800">
                  Your tracking reference number is <strong className="font-mono">{submittedSuccessId}</strong>. Status is now set to <strong>Under Review</strong>.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Category */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Grievance Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden text-slate-800"
                >
                  <option value="Compensation">Compensation Rate Dispute</option>
                  <option value="Land Record Error">Land Record / Name / Boundary Error</option>
                  <option value="Acquisition Alignment">Acquisition Alignment (Borewell/Road Severance)</option>
                  <option value="Rehabilitation & Resettlement">Rehabilitation & Resettlement Entitlements</option>
                  <option value="Environmental/Water Access">Water Body / Irrigation Feeder Disruption</option>
                  <option value="Other">Other Statutory Objection</option>
                </select>
              </div>

              {/* Survey No & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Survey Number
                  </label>
                  <input
                    type="text"
                    value={surveyNumber}
                    onChange={(e) => setSurveyNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Location / Village
                  </label>
                  <input
                    type="text"
                    value={locationVillage}
                    onChange={(e) => setLocationVillage(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Detailed Description & Relief Sought
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain the specific issue regarding your parcel or asset..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900 text-slate-900"
                  required
                />
              </div>

              {/* Upload Supporting Document */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Upload Supporting Document (Optional)
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 flex items-center justify-between">
                    <span className="truncate">{attachedFileName}</span>
                    <button
                      type="button"
                      onClick={() => setAttachedFileName('Electricity_Bill_Borewell.pdf')}
                      className="text-xs text-blue-900 font-medium hover:underline shrink-0"
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Grievance</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Preview Card showing timeline */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Live Resolution Timeline
                </h3>
                <span className="font-mono text-xs font-bold text-blue-900">
                  {submittedSuccessId || 'LG-2026-001284'}
                </span>
              </div>

              <div className="space-y-4 pt-1">
                {/* Timeline item 1: Submitted */}
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 text-xs block">
                      Submitted ✓
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Lodged by Rajesh Patil on Citizen Portal
                    </span>
                  </div>
                </div>

                {/* Timeline item 2: Received */}
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 text-xs block">
                      Received ✓
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Acknowledged by Sub-Divisional Officer Haveli
                    </span>
                  </div>
                </div>

                {/* Timeline item 3: Under Review */}
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-700 animate-pulse" />
                  </div>
                  <div>
                    <span className="font-bold text-blue-950 text-xs block">
                      Under Review ● (Current Stage)
                    </span>
                    <span className="text-[11px] text-slate-600">
                      Joint inspection ordered with NHAI engineering cell
                    </span>
                  </div>
                </div>

                {/* Timeline item 4: Resolved */}
                <div className="flex items-start gap-3 opacity-50">
                  <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full border border-slate-400" />
                  </div>
                  <div>
                    <span className="font-medium text-slate-700 text-xs block">
                      Resolved ○
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Final written order by District Collector Committee
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-[11px] text-slate-600 space-y-1">
                <span className="font-semibold text-slate-800 block">Statutory Mandate:</span>
                <p>
                  Every Section 15 objection must be addressed in writing prior to Section 19 declaration under RFCTLARR.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* My Grievances List View */
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <h2 className="font-bold text-slate-900 text-base">
              My Registered Grievances ({grievances.length})
            </h2>
            <button
              onClick={() => setActiveTab('raise')}
              className="px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Raise New</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {grievances.map((g) => (
              <div key={g.id} className="p-5 hover:bg-slate-50 transition-colors space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200">
                      {g.trackingId}
                    </span>
                    <span className="text-xs font-semibold text-slate-900">
                      {g.category}
                    </span>
                    <span className="text-xs text-slate-500">
                      Survey {g.surveyNumber} ({g.village})
                    </span>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded text-[11px] font-bold self-start sm:self-auto ${
                      g.status === 'Resolved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-blue-100 text-blue-900'
                    }`}
                  >
                    {g.status}
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">
                  {g.description}
                </p>

                {g.resolutionNotes && (
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-600">
                    <strong className="text-slate-800">Action Update: </strong>
                    {g.resolutionNotes}
                  </div>
                )}

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Submitted: {g.submittedAt}</span>
                  {g.documentAttachmentName && (
                    <span className="text-slate-500 font-mono">
                      Attached: {g.documentAttachmentName}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trust banner */}
      <TrustBanner customMessage="Grievance tracking references and status workflows operate as simulated administrative nodes under Smart India Hackathon 2026." />
    </div>
  );
};
