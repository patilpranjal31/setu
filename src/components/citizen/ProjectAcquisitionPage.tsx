import React from 'react';
import { ArrowRight, CheckCircle2, Clock, Calendar, AlertCircle, Building2, MapPin, Users, HelpCircle, FileText, ChevronRight } from 'lucide-react';
import { MOCK_PROJECTS, CURRENT_CITIZEN } from '../../data/mockData';
import { ActiveTab } from '../../types';
import { TrustBanner } from '../common/TrustBanner';

interface ProjectAcquisitionPageProps {
  onNavigateTab: (tab: ActiveTab) => void;
}

export const ProjectAcquisitionPage: React.FC<ProjectAcquisitionPageProps> = ({ onNavigateTab }) => {
  const project = MOCK_PROJECTS[0]; // XYZ Regional Highway

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title & Status Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Acquisition Project Profile · Code: {project.code}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs uppercase tracking-wide">
              {project.status}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            {project.name}
          </h1>
          <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
            {project.purpose}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab('what-it-means')}
            className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs whitespace-nowrap"
          >
            <span>What Does This Mean For Me?</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Your Land's Status Spotlight Banner */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
            Personal Landholding Impact
          </span>
          <h2 className="text-lg font-bold">Your Land's Status: Survey {CURRENT_CITIZEN.primarySurveyNumber}</h2>
          <p className="text-xs text-slate-300 max-w-xl">
            Current stage for your parcel in Examplegaon: <strong className="text-white">Social Impact Assessment (SIA) Completed</strong>. Scheduled next for Gram Sabha Public Consultation on 12th October 2026.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onNavigateTab('sia-insights')}
            className="px-3.5 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-xs font-semibold text-white transition-colors"
          >
            Inspect SIA Report
          </button>
          <button
            onClick={() => onNavigateTab('compensation')}
            className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-lg text-xs font-bold transition-colors shadow-xs"
          >
            Simulate Compensation
          </button>
        </div>
      </div>

      {/* Synthetic Demo Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-medium text-slate-500 block">Affected Villages</span>
          <span className="text-2xl font-extrabold text-slate-900 font-mono">
            {project.affectedVillagesCount}
          </span>
          <span className="text-[11px] text-slate-400 block">
            Pune & Satara Districts
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-medium text-slate-500 block">Affected Land Parcels</span>
          <span className="text-2xl font-extrabold text-slate-900 font-mono">
            {project.affectedParcelsCount}
          </span>
          <span className="text-[11px] text-slate-400 block">
            Surveyed Cadastral Units
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-medium text-slate-500 block">Estimated Households</span>
          <span className="text-2xl font-extrabold text-slate-900 font-mono">
            {project.affectedHouseholdsCount}
          </span>
          <span className="text-[11px] text-slate-400 block">
            1,240 Total Population
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-medium text-slate-500 block">Agricultural Land Affected</span>
          <span className="text-2xl font-extrabold text-emerald-700 font-mono">
            {project.agriculturalLandHa} ha
          </span>
          <span className="text-[11px] text-slate-400 block">
            Out of {project.totalLandRequiredHa} ha required
          </span>
        </div>
      </div>

      {/* Engineering Schedule & Delay Risk Callout */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-rose-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800 uppercase font-mono">
                Schedule Risk Forecast
              </span>
              <span className="text-xs font-bold text-slate-900">
                Projected Schedule Slippage: +162 Days (~5.4 Months)
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Preliminary delay calculations indicate potential timeline adjustments owing to Section 15 irrigation canal severance objections and pending valuation hearings.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateTab('project-risk-delay')}
          className="px-4 py-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 whitespace-nowrap self-start sm:self-auto cursor-pointer"
        >
          <span>View Delay Risk Breakdown</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Acquisition Timeline */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide">
              Statutory Acquisition Timeline (RFCTLARR Act 2013)
            </h3>
            <p className="text-xs text-slate-500">
              Clear progression tracking each statutory milestone from initial notification to compensation award
            </p>
          </div>
          <span className="text-xs font-semibold text-blue-900 bg-blue-50 px-2.5 py-1 rounded">
            Current Stage: Public Consultation
          </span>
        </div>

        {/* Multi-step progression tree */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 pt-2">
          {project.timeline.map((step, idx) => {
            const isCompleted = step.completed;
            const isCurrent = step.current;

            return (
              <div
                key={step.stage}
                className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-blue-50/80 border-2 border-blue-600 shadow-sm ring-2 ring-blue-500/20'
                    : isCompleted
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-white border-slate-200 opacity-60'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      0{idx + 1}
                    </span>
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : isCurrent ? (
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
                      </span>
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-slate-300" />
                    )}
                  </div>

                  <h4 className={`text-xs font-bold ${isCurrent ? 'text-blue-950 font-extrabold' : 'text-slate-900'}`}>
                    {step.stage}
                  </h4>

                  <p className="text-[11px] text-slate-600 leading-snug line-clamp-3">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
                  <span className="font-semibold text-slate-700">{step.date}</span>
                  {isCurrent && (
                    <span className="font-bold text-blue-900 uppercase tracking-wider text-[9px]">
                      Active
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Proposing Authority & Affected Settlement Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Proposing Authority & Legal Jurisdiction
          </h4>
          <div className="space-y-2 text-xs text-slate-700">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Executing Agency:</span>
              <span className="font-semibold text-slate-900">{project.proposingAuthority}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Statutory Act:</span>
              <span className="font-semibold text-slate-900">RFCTLARR Act 2013</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Competent Authority (CALA):</span>
              <span className="font-semibold text-slate-900">Sub-Divisional Officer, Haveli Sub-Division</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Gazette Notification Date:</span>
              <span className="font-semibold text-slate-900">{project.notificationDate}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Key Affected Villages in Haveli Taluka
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 bg-slate-50 rounded border border-slate-100">
              <span className="font-semibold text-slate-900 block">Examplegaon</span>
              <span className="text-[11px] text-slate-500">64 households · 48 ha</span>
            </div>
            <div className="p-2 bg-slate-50 rounded border border-slate-100">
              <span className="font-semibold text-slate-900 block">Rampur</span>
              <span className="text-[11px] text-slate-500">58 households · 42 ha</span>
            </div>
            <div className="p-2 bg-slate-50 rounded border border-slate-100">
              <span className="font-semibold text-slate-900 block">Shivapur</span>
              <span className="text-[11px] text-slate-500">46 households · 36 ha</span>
            </div>
            <div className="p-2 bg-slate-50 rounded border border-slate-100">
              <span className="font-semibold text-slate-900 block">Karanjgaon</span>
              <span className="text-[11px] text-slate-500">38 households · 24 ha</span>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('sia-insights')}
            className="w-full text-center text-xs font-semibold text-blue-900 hover:underline pt-1 block"
          >
            Explore detailed Social Impact Assessment dashboard →
          </button>
        </div>
      </div>

      {/* Trust banner */}
      <TrustBanner type="synthetic" />
    </div>
  );
};
