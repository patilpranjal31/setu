import React from 'react';
import { AlertTriangle, MapPin, ArrowRight, FileText, CheckCircle2, Calendar, Scale, HelpCircle, AlertCircle, Eye, ShieldCheck, ChevronRight } from 'lucide-react';
import { CURRENT_CITIZEN, MOCK_PARCELS, MOCK_PROJECTS, INITIAL_GRIEVANCES } from '../../data/mockData';
import { ActiveTab, UserRole } from '../../types';
import { TrustBanner } from '../common/TrustBanner';

interface CitizenDashboardProps {
  onNavigateTab: (tab: ActiveTab, role?: UserRole) => void;
  onSelectParcel: (parcelId: string) => void;
}

export const CitizenDashboard: React.FC<CitizenDashboardProps> = ({
  onNavigateTab,
  onSelectParcel,
}) => {
  const rajeshParcel = MOCK_PARCELS.find((p) => p.surveyNumber === CURRENT_CITIZEN.primarySurveyNumber) || MOCK_PARCELS[0];
  const highwayProject = MOCK_PROJECTS.find((p) => p.id === 'proj-xyz-highway');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Welcome & Location Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Landowner Portal · Citizen View
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Good morning, {CURRENT_CITIZEN.name}
          </h1>
          <div className="flex items-center gap-2 text-xs text-slate-600 mt-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>
              {CURRENT_CITIZEN.village}, Taluka {CURRENT_CITIZEN.taluka}, {CURRENT_CITIZEN.district}, {CURRENT_CITIZEN.state}
            </span>
            <span>·</span>
            <span className="text-slate-500">Khata No: {rajeshParcel.khataNumber}</span>
          </div>
        </div>

        {/* Quick action shortcuts */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigateTab('what-it-means')}
            className="px-3 py-2 bg-blue-50 text-blue-900 hover:bg-blue-100 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-blue-700" />
            <span>What Does This Mean For Me?</span>
          </button>
          <button
            onClick={() => onNavigateTab('compensation')}
            className="px-3 py-2 bg-emerald-50 text-emerald-900 hover:bg-emerald-100 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Scale className="w-4 h-4 text-emerald-700" />
            <span>Compensation Estimator</span>
          </button>
        </div>
      </div>

      {/* CRITICAL PROMINENT ALERT */}
      <div className="p-4 sm:p-5 rounded-xl bg-amber-500/10 border-2 border-amber-500/40 text-amber-950 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-900 font-bold text-[10px] uppercase tracking-wide">
                Notice Alert
              </span>
              <span className="text-xs text-amber-800 font-medium">Notification Ref: Sec 11(1) RFCTLARR</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-950">
              Your land falls within the proposed area for the XYZ Regional Highway Project.
            </h2>
            <p className="text-xs text-slate-700 max-w-2xl leading-relaxed">
              Survey No. 102/3 has been identified with an estimated 82% corridor right-of-way overlap. The Social Impact Assessment has completed; public hearings are currently scheduled.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigateTab('project-details')}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-2 shadow-xs whitespace-nowrap"
          >
            <span>View Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Your Land Card + 3 Status Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Card: "Your Land" */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                Primary Registered Holding
              </span>
              <h2 className="text-xl font-extrabold text-slate-900">Your Land</h2>
            </div>
            <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Verified 7/12 Extract</span>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-slate-500 text-xs block">Survey Number</span>
              <span className="text-lg font-bold text-slate-900 font-mono">
                {rajeshParcel.surveyNumber}
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                {rajeshParcel.subDivision}
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-slate-500 text-xs block">Total Area</span>
              <span className="text-lg font-bold text-slate-900 font-mono">
                {rajeshParcel.areaHectares} ha
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                (~5.93 Acres)
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-slate-500 text-xs block">Land Type</span>
              <span className="text-base font-bold text-slate-900 truncate block">
                {rajeshParcel.landType}
              </span>
              <span className="text-[11px] text-emerald-700 block mt-0.5">
                Canal-Irrigated
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-slate-500 text-xs block">Land Status</span>
              <span className="text-base font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Active
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                Clean Title
              </span>
            </div>
          </div>

          {/* Owners & Mutation row */}
          <div className="p-4 bg-slate-50/70 rounded-lg border border-slate-200/80 text-xs space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-700">
              <span>
                <strong className="text-slate-900">Registered Owners:</strong> {rajeshParcel.ownerName}
              </span>
              <span className="text-slate-500 font-mono">
                Mutation: {rajeshParcel.mutationNumber}
              </span>
            </div>
            <p className="text-slate-600 text-[11px]">
              Crops Recorded (Current Kharif/Rabi): Sugarcane (1.4 ha), Wheat & Fodder (1.0 ha). Electric irrigation pump connection registered.
            </p>
          </div>

          {/* Action triggers */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                onSelectParcel(rajeshParcel.id);
                onNavigateTab('explore-map');
              }}
              className="px-4 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-2 shadow-xs"
            >
              <Eye className="w-4 h-4" />
              <span>View Affected Land on Map</span>
            </button>
            <button
              onClick={() => onNavigateTab('land-details')}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-slate-600" />
              <span>Land Details & Official Records</span>
            </button>
            <button
              onClick={() => onNavigateTab('grievances')}
              className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
            >
              Submit Inquiry or Grievance
            </button>
          </div>
        </div>

        {/* 3 Status Cards & Quick Summary */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
              Official Status Tracker
            </h3>

            {/* Status 1 */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div>
                <span className="text-xs text-slate-500 block">Land Status</span>
                <span className="text-sm font-bold text-emerald-700">Active</span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </div>

            {/* Status 2 */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50/60 border border-amber-100">
              <div>
                <span className="text-xs text-slate-500 block">Acquisition Status</span>
                <span className="text-sm font-bold text-amber-800">Proposed (Under Sec 11)</span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            </div>

            {/* Status 3 */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50/60 border border-blue-100">
              <div>
                <span className="text-xs text-slate-500 block">SIA Status</span>
                <span className="text-sm font-bold text-blue-900">Completed (Report Published)</span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigateTab('sia-insights')}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium rounded-lg text-center transition-colors flex items-center justify-center gap-1"
              >
                <span>Read Village SIA Findings</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Grievance tracker card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                My Active Grievance
              </h4>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-semibold text-[10px]">
                Under Review
              </span>
            </div>
            <div className="text-xs space-y-1">
              <span className="font-mono text-slate-500 text-[11px] block">
                Tracking ID: LG-2026-001284
              </span>
              <p className="text-slate-700 font-medium line-clamp-2">
                Irrigation borewell & pipeline realignment request for Survey 102/3.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('grievances')}
              className="text-xs font-semibold text-blue-900 hover:underline flex items-center gap-1"
            >
              <span>Track resolution timeline</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Recent Updates & Milestone Timeline */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recent Project Updates</h3>
            <p className="text-xs text-slate-500">
              Timeline notifications affecting Examplegaon village and Survey 102/3
            </p>
          </div>
          <span className="text-xs text-slate-400">Last updated: 24 Sep 2026</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Update 1 */}
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                SIA Completed
              </span>
              <h4 className="text-xs font-semibold text-slate-900">
                Final SIA Report Submitted
              </h4>
              <p className="text-[11px] text-slate-600">
                Independent expert panel submitted the 142-page baseline report. 286 households surveyed.
              </p>
            </div>
          </div>

          {/* Update 2 */}
          <div className="p-4 rounded-lg bg-blue-50/70 border border-blue-200 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider block">
                Hearing Scheduled
              </span>
              <h4 className="text-xs font-semibold text-slate-900">
                Public Consultation in Examplegaon
              </h4>
              <p className="text-[11px] text-slate-600">
                Gram Sabha public hearing on 12th October 2026 at Gram Panchayat Bhavan.
              </p>
            </div>
          </div>

          {/* Update 3 */}
          <div className="p-4 rounded-lg bg-amber-50/70 border border-amber-200 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                Official Notice
              </span>
              <h4 className="text-xs font-semibold text-slate-900">
                Acquisition Notice Available
              </h4>
              <p className="text-[11px] text-slate-600">
                Preliminary Section 11 gazette notification copy available for digital download.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust banner */}
      <TrustBanner type="synthetic" />
    </div>
  );
};
