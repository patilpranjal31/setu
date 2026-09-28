import React from 'react';
import { ArrowRight, Compass, Shield, MapPin, BarChart3, FileSearch, Users, Scale, CheckCircle2, Building, ChevronRight } from 'lucide-react';
import { ActiveTab, UserRole } from '../../types';

interface LandingPageProps {
  onNavigateTab: (tab: ActiveTab, role?: UserRole) => void;
  onOpenDemoGuide: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigateTab, onOpenDemoGuide }) => {
  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-950 via-slate-900 to-slate-900 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          {/* Trust kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/50 text-emerald-400 text-xs font-semibold tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Smart India Hackathon 2026 Innovation Showcase
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-4xl mx-auto text-balance">
            Know Your Land.{' '}
            <span className="text-emerald-400 block sm:inline">Understand Your Rights.</span>{' '}
            Shape Better Decisions.
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            SETU connects land records, acquisition information, Social Impact Assessment data and policy evidence into one accessible digital platform.
          </p>

          {/* Primary & Secondary Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={() => onNavigateTab('explore-map', 'citizen')}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-emerald-500/20 text-sm"
            >
              <span>Explore Your Land</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenDemoGuide}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-700 transition-colors flex items-center gap-2 text-sm"
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>View Platform Demo (18 Steps)</span>
            </button>
          </div>

          {/* Quick Portal Switcher Pills */}
          <div className="pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
            <span className="text-slate-500 uppercase tracking-wider font-semibold text-[11px]">
              Direct Portal Access:
            </span>
            <button
              onClick={() => onNavigateTab('citizen-dashboard', 'citizen')}
              className="px-3 py-1.5 rounded-lg bg-slate-800/90 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span>Citizen / Landowner (Rajesh)</span>
            </button>
            <button
              onClick={() => onNavigateTab('gov-dashboard', 'government')}
              className="px-3 py-1.5 rounded-lg bg-slate-800/90 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Government Command Center</span>
            </button>
            <button
              onClick={() => onNavigateTab('researcher-dashboard', 'researcher')}
              className="px-3 py-1.5 rounded-lg bg-slate-800/90 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              <span>Researcher & Policy Intelligence</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3 Core Platform Capabilities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
            Unified Architecture
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Three Pillars of Evidence-Based Land Governance
          </h3>
          <p className="text-sm text-slate-600">
            Eliminating information silos between rural citizens, acquiring departments, and policy researchers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: LAND INTELLIGENCE */}
          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-900">
                <MapPin className="w-6 h-6 text-blue-800" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 uppercase tracking-wide">
                Land Intelligence
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Understand land and project information. Access real-time cadastral overlays, survey boundary maps, 7/12 extracts, and project alignments in one unified GIS view.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 mt-6">
              <button
                onClick={() => onNavigateTab('explore-map', 'citizen')}
                className="text-xs font-semibold text-blue-900 hover:text-blue-700 flex items-center gap-1 group"
              >
                <span>Explore Cadastral GIS</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 2: SOCIAL IMPACT */}
          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800">
                <Users className="w-6 h-6 text-emerald-700" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 uppercase tracking-wide">
                Social Impact
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Explore how projects affect communities. Transparent Social Impact Assessment (SIA) metrics, village-level displacement counts, livelihood disruption scores, and public hearing schedules.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 mt-6">
              <button
                onClick={() => onNavigateTab('sia-insights', 'citizen')}
                className="text-xs font-semibold text-emerald-800 hover:text-emerald-900 flex items-center gap-1 group"
              >
                <span>View SIA Analytics</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 3: POLICY INSIGHTS */}
          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-900">
                <BarChart3 className="w-6 h-6 text-indigo-800" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 uppercase tracking-wide">
                Policy Insights
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Turn fragmented data into evidence for better decisions. Comparative cross-project monitoring, bottleneck indicators, compensation disbursement tracking, and CSV research exports.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 mt-6">
              <button
                onClick={() => onNavigateTab('researcher-dashboard', 'researcher')}
                className="text-xs font-semibold text-indigo-900 hover:text-indigo-700 flex items-center gap-1 group"
              >
                <span>Explore Policy Lab</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* The 4-Step Process: DATA -> ANALYSIS -> INSIGHT -> ACTION */}
      <section className="bg-slate-100 border-y border-slate-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <h2 className="text-xs font-bold text-blue-900 uppercase tracking-widest">
              Methodology Flow
            </h2>
            <h3 className="text-2xl font-extrabold text-slate-900">
              The Evidence-Based Governance Pipeline
            </h3>
            <p className="text-xs text-slate-600">
              From raw fragmented records to accountable, participatory decision-making.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {/* Step 1: DATA */}
            <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-slate-400">01</span>
                <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-semibold text-[11px]">
                  Aggregation
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">DATA</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Interoperable integration of state revenue 7/12 records, gazette notifications, satellite imagery, and SIA survey documents.
              </p>
            </div>

            {/* Step 2: ANALYSIS */}
            <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-slate-400">02</span>
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold text-[11px]">
                  Verification
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">ANALYSIS</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automated corridor buffer intersection, prime farmland overlap detection, and statutory RFCTLARR entitlement calculation.
              </p>
            </div>

            {/* Step 3: INSIGHT */}
            <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-slate-400">03</span>
                <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 font-semibold text-[11px]">
                  Interpretation
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">INSIGHT</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Plain-language "What this means for me" breakdowns for citizens, alongside early risk indicators for district administrators.
              </p>
            </div>

            {/* Step 4: ACTION */}
            <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-slate-400">04</span>
                <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-semibold text-[11px]">
                  Resolution
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">ACTION</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Empowered public consultation participation, auditable grievance tracking, and transparent compensation disbursements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Project Showcase Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden grid grid-cols-1 lg:grid-cols-3">
          <div className="p-6 sm:p-8 lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 uppercase">
              <Building className="w-4 h-4 text-blue-800" />
              <span>Simulated Flagship Project</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              XYZ Regional Highway Project (NHAI-MH-2026-08)
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              A 4-lane access-controlled highway corridor affecting 8 villages and 436 land parcels in Pune district. Current status: Social Impact Assessment completed, Public Consultations scheduled for October 2026.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-500 block text-[11px]">Affected Villages</span>
                <span className="text-base font-bold text-slate-900 font-mono">8</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-500 block text-[11px]">Survey Parcels</span>
                <span className="text-base font-bold text-slate-900 font-mono">436</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-500 block text-[11px]">Estimated Budget</span>
                <span className="text-base font-bold text-slate-900 font-mono">₹1,840 Cr</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-500 block text-[11px]">SIA Status</span>
                <span className="text-xs font-bold text-emerald-700">Completed (100%)</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigateTab('project-details', 'citizen')}
                className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>View Project Acquisition Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigateTab('what-it-means', 'citizen')}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
              >
                What Does This Mean For Affected Farmers?
              </button>
            </div>
          </div>

          <div className="bg-slate-50 p-6 sm:p-8 border-t lg:border-t-0 lg:border-l border-slate-200 flex flex-col justify-between space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Landowner Quick Test Case
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                <div className="font-semibold text-slate-900">Landholder: Rajesh Patil</div>
                <div className="text-slate-500">Survey No: 102/3 · Examplegaon, Pune</div>
                <div className="text-amber-700 font-medium">Overlaps 82% with proposed corridor</div>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Test the prototype as Rajesh Patil to review rights, run the compensation calculator, query the SIA document assistant, and file an objection.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('citizen-dashboard', 'citizen')}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg text-center transition-colors shadow-xs"
            >
              Enter Citizen Portal as Rajesh
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
