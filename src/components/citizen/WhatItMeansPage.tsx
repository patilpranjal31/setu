import React from 'react';
import { ArrowRight, CheckCircle2, Clock, AlertCircle, HelpCircle, FileText, Users, Scale, MessageSquare, ShieldCheck, Calendar } from 'lucide-react';
import { CURRENT_CITIZEN, MOCK_PARCELS } from '../../data/mockData';
import { ActiveTab } from '../../types';
import { TrustBanner } from '../common/TrustBanner';

interface WhatItMeansPageProps {
  onNavigateTab: (tab: ActiveTab) => void;
}

export const WhatItMeansPage: React.FC<WhatItMeansPageProps> = ({ onNavigateTab }) => {
  const parcel = MOCK_PARCELS.find((p) => p.surveyNumber === CURRENT_CITIZEN.primarySurveyNumber) || MOCK_PARCELS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
            Demystified Citizen Guide · RFCTLARR Act 2013
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            What Does This Mean For Me?
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Clear, non-technical explanation of your legal rights, timeline, and next steps for Survey No. {parcel.surveyNumber}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab('compensation')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Scale className="w-4 h-4" />
            <span>Estimate Compensation</span>
          </button>
        </div>
      </div>

      {/* YOUR CURRENT SITUATION CARD */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wider">
          <AlertCircle className="w-4 h-4 text-blue-800" />
          <span>Your Current Situation</span>
        </div>

        {/* Prompt primary headline text */}
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          Your land has been identified within the proposed project area.
        </h2>

        <p className="text-sm text-slate-700 leading-relaxed max-w-4xl">
          The government is in the preliminary stages of planning the <strong>XYZ Regional Highway Project</strong>. Your agricultural parcel (Survey No. 102/3 in Examplegaon, 2.4 hectares) falls within the projected highway corridor. <strong>Your ownership remains completely legally active.</strong> You retain all agricultural and residential rights until any formal final acquisition award is completed.
        </p>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <span className="font-semibold text-slate-900">Can you still farm your land?</span>
            <span>Yes. Continue your normal farming and seasonal harvesting.</span>
          </div>
          <span className="text-slate-500 font-mono text-[11px]">Village: Examplegaon · Taluka: Haveli</span>
        </div>
      </div>

      {/* Simple Step-by-Step Explanation */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-6">
        <div>
          <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide">
            Where Are We Right Now? (4 Key Stages)
          </h3>
          <p className="text-xs text-slate-500">
            Track where the acquisition process stands in simple terms, without bureaucratic jargon
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Step 1: Social Impact Assessment */}
          <div className="p-5 rounded-xl border border-slate-200 bg-emerald-50/40 space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-800">Step 1</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Completed
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              1. Social Impact Assessment
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Experts surveyed affected families, evaluated farm livelihoods, and drafted a mitigation report.
            </p>
            <div className="pt-2 border-t border-slate-200/60 text-[11px] text-emerald-800 font-medium">
              Status: Completed (Aug 2026)
            </div>
          </div>

          {/* Step 2: Public Consultation */}
          <div className="p-5 rounded-xl border-2 border-blue-600 bg-blue-50/60 space-y-3 relative shadow-xs ring-2 ring-blue-500/20">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-blue-900">Step 2</span>
              <span className="px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider animate-pulse">
                Upcoming
              </span>
            </div>
            <h4 className="text-sm font-bold text-blue-950">
              2. Public Consultation
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              Open Gram Sabha meeting where you and your neighbors can speak directly to officials and voice any objections.
            </p>
            <div className="pt-2 border-t border-blue-200 text-[11px] text-blue-900 font-bold flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>Status: Upcoming (12 Oct 2026)</span>
            </div>
          </div>

          {/* Step 3: Final Acquisition Decision */}
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 opacity-75 space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-400">Step 3</span>
              <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px] font-bold uppercase tracking-wider">
                Pending
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              3. Final Acquisition Decision
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              The District Collector reviews feedback before deciding whether to formally declare the corridor boundary under Section 19.
            </p>
            <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500">
              Status: Pending (Expected Dec 2026)
            </div>
          </div>

          {/* Step 4: Compensation Assessment */}
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 opacity-75 space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-400">Step 4</span>
              <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px] font-bold uppercase tracking-wider">
                Pending
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              4. Compensation Assessment
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Detailed valuation of land, crops, borewells, and rehabilitation packages according to statutory central law.
            </p>
            <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500">
              Status: Pending (Expected Feb 2027)
            </div>
          </div>
        </div>
      </div>

      {/* YOUR RIGHTS & OPTIONS (CARDS) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Your Rights & Options
          </h3>
          <p className="text-xs text-slate-500">
            Under the Right to Fair Compensation & Transparency in Land Acquisition (RFCTLARR) Act 2013
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              Access Relevant Information
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              You are entitled to complete copies of the Preliminary Notification, Social Impact Assessment, and map alignment. You do not need to pay any informal fees to see project records.
            </p>
            <button
              onClick={() => onNavigateTab('land-details')}
              className="text-xs font-semibold text-blue-900 hover:underline flex items-center gap-1 pt-1"
            >
              <span>View & download your official records</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2 */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              Participate in Applicable Consultations
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every landowner has the legal right to attend the village Gram Sabha hearing, speak on record, suggest route adjustments, and demand protections for water canals and farm access roads.
            </p>
            <div className="text-xs text-slate-700 bg-white p-2.5 rounded border border-slate-200">
              Next Hearing: <strong>12th October 2026</strong> · Gram Panchayat Hall, Examplegaon
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              Review Notices and Documents
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              You have 60 days from the publication of the preliminary notice to submit formal objections regarding the public purpose, land classification, or survey boundary overlap.
            </p>
            <button
              onClick={() => onNavigateTab('compensation')}
              className="text-xs font-semibold text-amber-900 hover:underline flex items-center gap-1 pt-1"
            >
              <span>Calculate your estimated entitlements</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 4 */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-900 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              Submit Grievances & Objections
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              If your irrigation borewell, crops, or boundary is wrongly recorded, you can raise a tracked digital grievance directly through SETU with automatic acknowledgment and timeline monitoring.
            </p>
            <button
              onClick={() => onNavigateTab('grievances')}
              className="text-xs font-semibold text-indigo-900 hover:underline flex items-center gap-1 pt-1"
            >
              <span>Open Grievance Redressal Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Trust banner */}
      <TrustBanner type="synthetic" />
    </div>
  );
};
