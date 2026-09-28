import React, { useState } from 'react';
import { ArrowLeft, AlertTriangle, CheckCircle2, AlertCircle, Info, ChevronRight, X, Building, Scale, Users, FileSpreadsheet } from 'lucide-react';
import { MOCK_PROJECTS, MOCK_SIA_VILLAGES } from '../../data/mockData';
import { AcquisitionProject, ActiveTab } from '../../types';
import { TrustBanner } from '../common/TrustBanner';

interface GovernmentProjectAnalyticsProps {
  projectId: string;
  onNavigateTab: (tab: ActiveTab) => void;
}

export const GovernmentProjectAnalytics: React.FC<GovernmentProjectAnalyticsProps> = ({
  projectId,
  onNavigateTab,
}) => {
  const project = MOCK_PROJECTS.find((p) => p.id === projectId) || MOCK_PROJECTS[0];
  const [selectedIndicator, setSelectedIndicator] = useState<{
    title: string;
    severity: string;
    status: string;
    description: string;
    underlyingData: string;
  } | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Back button & Title */}
      <div className="space-y-2">
        <button
          onClick={() => onNavigateTab('gov-dashboard')}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Command Center</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                {project.code}
              </span>
              <span className="text-xs font-semibold text-blue-900 uppercase tracking-wider">
                {project.category} · {project.districts.join(', ')}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              {project.name}
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl">
              {project.purpose}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateTab('project-risk-delay')}
              className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-lg shadow-sm transition-all flex items-center gap-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Analyze Delay Risk (+162d)</span>
            </button>
            <span className="px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs rounded-full uppercase tracking-wider">
              {project.status}
            </span>
          </div>
        </div>
      </div>

      {/* Early Warning Risk Forecaster Callout */}
      <div className="p-4 bg-rose-50 border-2 border-rose-200 rounded-xl shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-rose-600 text-white flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-200 text-rose-950 uppercase tracking-wider">
                Corridor Slippage Alert
              </span>
              <strong className="text-sm font-bold text-rose-950">
                Projected Completion Delay: +162 Days (5.4 Months)
              </strong>
            </div>
            <p className="text-xs text-rose-900 mt-0.5">
              4 identified statutory & RoW bottlenecks. Estimated idle machinery cost escalation: <strong className="font-mono">₹ 61.56 Cr</strong>.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateTab('project-risk-delay')}
          className="px-4 py-2 rounded-lg bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 whitespace-nowrap self-start sm:self-auto"
        >
          <span>Open Delay Forecaster & Notify Engineers</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Project Overview Metrics Required by Prompt:
          Land Acquired: 62%
          SIA Completion: 100%
          Public Consultation: 75%
          Compensation Disbursed: 43%
          Grievances: 42
      */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-6">
        <div>
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide">
            Project Overview & Administrative Progress
          </h2>
          <p className="text-xs text-slate-500">
            Real-time pipeline metrics aggregated across {project.affectedVillagesCount} revenue villages and {project.affectedParcelsCount} parcels
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {/* Metric 1 */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span>Land Acquired</span>
              <span className="font-bold text-slate-900 font-mono">{project.landAcquiredPercentage}%</span>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono">
              {project.landAcquiredPercentage}%
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-blue-800 h-full rounded-full"
                style={{ width: `${project.landAcquiredPercentage}%` }}
              />
            </div>
          </div>

          {/* Metric 2 */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span>SIA Completion</span>
              <span className="font-bold text-emerald-700 font-mono">{project.siaCompletionPercentage}%</span>
            </div>
            <div className="text-2xl font-extrabold text-emerald-700 font-mono">
              {project.siaCompletionPercentage}%
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full"
                style={{ width: `${project.siaCompletionPercentage}%` }}
              />
            </div>
          </div>

          {/* Metric 3 */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span>Public Consultation</span>
              <span className="font-bold text-blue-900 font-mono">{project.publicConsultationPercentage}%</span>
            </div>
            <div className="text-2xl font-extrabold text-blue-900 font-mono">
              {project.publicConsultationPercentage}%
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full"
                style={{ width: `${project.publicConsultationPercentage}%` }}
              />
            </div>
          </div>

          {/* Metric 4 */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span>Compensation Disbursed</span>
              <span className="font-bold text-amber-800 font-mono">{project.compensationDisbursedPercentage}%</span>
            </div>
            <div className="text-2xl font-extrabold text-amber-800 font-mono">
              {project.compensationDisbursedPercentage}%
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-amber-600 h-full rounded-full"
                style={{ width: `${project.compensationDisbursedPercentage}%` }}
              />
            </div>
          </div>

          {/* Metric 5 */}
          <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200 space-y-2 col-span-2 sm:col-span-1">
            <div className="flex justify-between items-center text-xs text-rose-800">
              <span>Active Grievances</span>
              <span className="font-bold font-mono">{project.grievancesCount}</span>
            </div>
            <div className="text-2xl font-extrabold text-rose-800 font-mono">
              {project.grievancesCount}
            </div>
            <div className="text-[10px] text-rose-600">
              19 related to canal severance
            </div>
          </div>
        </div>
      </div>

      {/* ISSUE INDICATORS SECTION
          Mandatory Requirement:
          Do not present these as legal conclusions.
          Label them: "Platform-generated indicators based on configured prototype metrics."
          Allow clicking an indicator to see the underlying data.
      */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-5">
        <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide">
              Issue Indicators & Early Warning Matrix
            </h3>
            {/* Prompt mandatory label */}
            <p className="text-xs font-medium text-blue-900 mt-0.5">
              Platform-generated indicators based on configured prototype metrics.
            </p>
          </div>
          <span className="text-[11px] text-slate-400">
            Click any indicator card to inspect underlying spatial & survey evidence
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {project.issueIndicators.map((ind, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedIndicator(ind)}
              className="p-5 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer bg-slate-50/60 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                      ind.status === 'Flagged'
                        ? 'bg-rose-100 text-rose-800 border border-rose-200'
                        : ind.status === 'Needs monitoring'
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {ind.status}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Severity: {ind.severity}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900">
                  {ind.title}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {ind.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs text-blue-900 font-semibold">
                <span>View Underlying Data</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Underlying Data Inspection Modal */}
      {selectedIndicator && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-slate-900 text-base">
                  Indicator Evidence: {selectedIndicator.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedIndicator(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900">
                <span className="font-semibold block mb-0.5">Platform Classification:</span>
                {selectedIndicator.description}
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-900 uppercase tracking-wide text-[11px]">
                  Underlying Quantitative Data
                </h4>
                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 font-mono text-[11px] text-slate-800 leading-relaxed">
                  {selectedIndicator.underlyingData}
                </div>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-blue-950 text-[11px]">
                <strong className="block mb-0.5">Administrative Recommendation:</strong>
                District Collector Haveli recommends scheduling an inter-departmental coordination hearing between PWD, Irrigation Department, and affected Gram Panchayats.
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedIndicator(null)}
                className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold"
              >
                Close Evidence Viewer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Trust banner */}
      <TrustBanner customMessage="Issue indicators are simulated automated heuristics to assist administrative prioritization and do not constitute formal legal determinations." />
    </div>
  );
};
