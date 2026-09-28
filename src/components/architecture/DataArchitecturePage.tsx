import React from 'react';
import { Database, ArrowDown, Cpu, Users, Shield, BarChart3, Layers, FileCode, CheckCircle2, Share2, Sparkles } from 'lucide-react';
import { ActiveTab, UserRole } from '../../types';
import { TrustBanner } from '../common/TrustBanner';

interface DataArchitecturePageProps {
  onNavigateTab: (tab: ActiveTab, role?: UserRole) => void;
}

export const DataArchitecturePage: React.FC<DataArchitecturePageProps> = ({ onNavigateTab }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-blue-900 uppercase tracking-widest px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
          Smart India Hackathon 2026 · Technical Specification
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Data Integration & Interoperability Architecture
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          How SETU bridges isolated state revenue records, central highway corridors, independent academic SIA reports, and satellite imagery into a single verifiable data pipeline.
        </p>
      </div>

      {/* The Visual Pipeline Stack Required by Prompt */}
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Tier 1: Input Data Sources */}
        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Tier 1: Upstream Federated Source Systems
            </span>
            <span className="text-[11px] text-slate-400">Open API & ETL Ingestion</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-center space-y-1">
              <span className="font-bold text-slate-900 block">LAND RECORDS</span>
              <span className="text-[10px] text-slate-500 block">Bhoomi / Mahabhulekh / Bhulekh (Forms 7/12 & 8A)</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-center space-y-1">
              <span className="font-bold text-slate-900 block">ACQUISITION DATA</span>
              <span className="text-[10px] text-slate-500 block">RFCTLARR MIS / NHAI / MoRTH Section 11 & 19</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-center space-y-1">
              <span className="font-bold text-slate-900 block">SIA REPORTS</span>
              <span className="text-[10px] text-slate-500 block">State SIA Units / Empanelled Academic Universities</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-center space-y-1">
              <span className="font-bold text-slate-900 block">GIS & SATELLITE</span>
              <span className="text-[10px] text-slate-500 block">ISRO Bhuvan / Survey of India / Cadastral Shapefiles</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-center space-y-1">
              <span className="font-bold text-slate-900 block">POLICY & LEGAL</span>
              <span className="text-[10px] text-slate-500 block">Gazette Notifications, Ready Reckoners, Court Precedents</span>
            </div>
          </div>
        </div>

        {/* Connecting Arrow */}
        <div className="flex justify-center text-slate-400">
          <ArrowDown className="w-6 h-6 animate-bounce" />
        </div>

        {/* Tier 2: The Core SETU Data Layer */}
        <div className="p-6 bg-gradient-to-r from-blue-900 to-indigo-950 rounded-xl text-white shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-blue-800 pb-2">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold tracking-wide uppercase">
                SETU Unified Data Layer
              </h2>
            </div>
            <span className="text-[11px] text-emerald-400 font-mono">
              Schema: OGC / LandXML / NDAP Compatible
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-white/10 rounded-lg border border-white/10 space-y-1">
              <span className="font-bold text-emerald-400 block">Cadastral Graph Matching</span>
              <p className="text-slate-300 text-[11px]">
                Vector polygon topology linking Survey Numbers across state revenue codes with highway Right-of-Way buffer geometries.
              </p>
            </div>

            <div className="p-3 bg-white/10 rounded-lg border border-white/10 space-y-1">
              <span className="font-bold text-emerald-400 block">Statutory Entitlement Engine</span>
              <p className="text-slate-300 text-[11px]">
                Deterministic calculation of First Schedule market values, rural factors (1.0-2.0x), and mandatory 100% Solatium.
              </p>
            </div>

            <div className="p-3 bg-white/10 rounded-lg border border-white/10 space-y-1">
              <span className="font-bold text-emerald-400 block">Grievance Audit Trail</span>
              <p className="text-slate-300 text-[11px]">
                Tamper-evident timestamped ledger enforcing Section 15 objection timelines before Section 19 declarations.
              </p>
            </div>
          </div>
        </div>

        {/* Connecting Arrow */}
        <div className="flex justify-center text-slate-400">
          <ArrowDown className="w-6 h-6 animate-bounce" />
        </div>

        {/* Tier 3: AI + Analytics Engine */}
        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-900" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                AI + Advanced Analytics Engine
              </h3>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              Vector Embeddings & Heuristic Early Warnings
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
              <strong className="text-slate-900 block">Document Parsing & Citations</strong>
              <p className="text-slate-600 text-[11px]">
                Extracts key tables, affected counts, and mitigation clauses from 100+ page SIA PDFs with exact section citations.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
              <strong className="text-slate-900 block">Farmland Overlap Detection</strong>
              <p className="text-slate-600 text-[11px]">
                Automated GIS overlay detecting prime double-cropped soil concentration to minimize agricultural displacement.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
              <strong className="text-slate-900 block">Disbursement Bottleneck Flags</strong>
              <p className="text-slate-600 text-[11px]">
                Monitors lags between Section 11 notices, joint measurement surveys, and direct bank account compensation transfers.
              </p>
            </div>
          </div>
        </div>

        {/* Connecting Arrow */}
        <div className="flex justify-center text-slate-400">
          <ArrowDown className="w-6 h-6 animate-bounce" />
        </div>

        {/* Tier 4: The 3 User Stakeholder Interfaces */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Stakeholder 1: CITIZEN */}
          <div
            onClick={() => onNavigateTab('citizen-dashboard', 'citizen')}
            className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-blue-400 cursor-pointer space-y-3 text-center group"
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-900 mx-auto flex items-center justify-center group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">CITIZEN PORTAL</h4>
            <p className="text-xs text-slate-600">
              Plain-language rights guidance, interactive 7/12 map, compensation estimator, and grievance filing.
            </p>
            <span className="text-[11px] font-semibold text-blue-900 group-hover:underline block">
              Enter Citizen View →
            </span>
          </div>

          {/* Stakeholder 2: GOVERNMENT */}
          <div
            onClick={() => onNavigateTab('gov-dashboard', 'government')}
            className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-emerald-400 cursor-pointer space-y-3 text-center group"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">GOVERNMENT COMMAND</h4>
            <p className="text-xs text-slate-600">
              Project pipeline monitoring, early warning issue indicators, and statutory compliance audits.
            </p>
            <span className="text-[11px] font-semibold text-emerald-800 group-hover:underline block">
              Enter Government View →
            </span>
          </div>

          {/* Stakeholder 3: RESEARCHER */}
          <div
            onClick={() => onNavigateTab('researcher-dashboard', 'researcher')}
            className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-indigo-400 cursor-pointer space-y-3 text-center group"
          >
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-900 mx-auto flex items-center justify-center group-hover:scale-105 transition-transform">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">RESEARCHER LAB</h4>
            <p className="text-xs text-slate-600">
              Cross-project comparative intelligence, impact indices, and direct CSV open-data downloads.
            </p>
            <span className="text-[11px] font-semibold text-indigo-900 group-hover:underline block">
              Enter Policy Lab →
            </span>
          </div>
        </div>
      </div>

      {/* Trust banner */}
      <TrustBanner type="synthetic" />
    </div>
  );
};
