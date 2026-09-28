import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';
import { Users, Home, Trees, Building2, Info, FileSpreadsheet, ArrowRight, HelpCircle } from 'lucide-react';
import { MOCK_SIA_VILLAGES, MOCK_SIA_IMPACT_CATEGORIES, MOCK_SIA_COMMUNITY_CONCERNS, MOCK_PROJECTS } from '../../data/mockData';
import { ActiveTab } from '../../types';
import { TrustBanner } from '../common/TrustBanner';

interface SiaDashboardProps {
  onNavigateTab: (tab: ActiveTab) => void;
}

export const SiaDashboard: React.FC<SiaDashboardProps> = ({ onNavigateTab }) => {
  const project = MOCK_PROJECTS[0];

  const PIE_COLORS = ['#1e3a8a', '#059669', '#d97706', '#dc2626'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            SIA Expert Study · Gokhale Institute Report (Aug 2026)
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Social Impact Assessment
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Empirical baseline indicators for {project.name} (8 affected villages, Pune & Satara)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab('what-it-means')}
            className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <HelpCircle className="w-4 h-4" />
            <span>What Does This Mean For Me?</span>
          </button>
        </div>
      </div>

      {/* Top Statistics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6 text-blue-800" />
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Population Affected</span>
            <span className="text-2xl font-extrabold text-slate-900 font-mono">1,240</span>
            <span className="text-[10px] text-slate-400 block">Across 8 Gram Panchayats</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
            <Home className="w-6 h-6 text-emerald-700" />
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Households Affected</span>
            <span className="text-2xl font-extrabold text-slate-900 font-mono">286</span>
            <span className="text-[10px] text-slate-400 block">Identified in baseline survey</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
            <Trees className="w-6 h-6 text-amber-700" />
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Agricultural Land</span>
            <span className="text-2xl font-extrabold text-slate-900 font-mono">183 ha</span>
            <span className="text-[10px] text-slate-400 block">75.6% of project corridor</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-lg bg-indigo-50 text-indigo-900 flex items-center justify-center shrink-0">
            <Building2 className="w-6 h-6 text-indigo-800" />
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Public Facilities</span>
            <span className="text-2xl font-extrabold text-slate-900 font-mono">12</span>
            <span className="text-[10px] text-slate-400 block">Canals, wells, community sheds</span>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Impact Categories */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Chart 1: Impact Categories (Affected Families)
              </h3>
              <p className="text-xs text-slate-500">
                Number of rural families experiencing tangible disruption per sector
              </p>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Total Families: 286</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_SIA_IMPACT_CATEGORIES} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#475569' }} />
                <YAxis tick={{ fontSize: 11, fill: '#475569' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(value: any) => [`${value} Families`, 'Affected']}
                />
                <Bar dataKey="affectedFamilies" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[11px] text-slate-500">
            *Agriculture and rural livelihoods form over 85% of total recorded impact severity.
          </div>
        </div>

        {/* Chart 2: Affected Households by Village */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Chart 2: Affected Households by Village
              </h3>
              <p className="text-xs text-slate-500">
                Distribution of surveyed households across primary settlements
              </p>
            </div>
            <span className="text-[11px] font-mono text-emerald-700 font-semibold">Examplegaon: 64 HH</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_SIA_VILLAGES} layout="vertical" margin={{ top: 10, right: 20, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#475569' }} />
                <YAxis dataKey="village" type="category" tick={{ fontSize: 11, fill: '#475569' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(value: any) => [`${value} Households`, 'Surveyed']}
                />
                <Bar dataKey="households" fill="#059669" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[11px] text-slate-500">
            *Examplegaon and Rampur represent the highest density of affected farmland and residential structures.
          </div>
        </div>
      </div>

      {/* Chart 3: Community Concerns Breakdown & Explanatory Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 3 */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Chart 3: Primary Community Concerns Raised in Field Hearings
              </h3>
              <p className="text-xs text-slate-500">
                Key priority issues voiced by 505 participating villagers during preliminary hearings
              </p>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Total Voices: 505</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={MOCK_SIA_COMMUNITY_CONCERNS}
                    dataKey="percentage"
                    nameKey="concern"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={45}
                    paddingAngle={3}
                  >
                    {MOCK_SIA_COMMUNITY_CONCERNS.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                    formatter={(val: any) => [`${val}% of responses`, 'Share']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3 text-xs">
              {MOCK_SIA_COMMUNITY_CONCERNS.map((item, idx) => (
                <div key={item.concern} className="flex items-start justify-between gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}
                    />
                    <span className="font-medium text-slate-800">{item.concern}</span>
                  </div>
                  <span className="font-bold text-slate-900 font-mono">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Explanatory Panel required by prompt */}
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase tracking-wide">
              <Info className="w-4 h-4 text-blue-800 shrink-0" />
              <span>Data Methodology & Provenance</span>
            </div>

            <h4 className="text-base font-bold text-slate-900">
              SIA Data Extraction Protocol
            </h4>

            {/* Prompt mandatory explanatory panel sentence */}
            <div className="p-3.5 bg-blue-100/70 border border-blue-200 rounded-lg text-xs text-blue-950 font-medium leading-relaxed">
              These indicators are derived from the available project/SIA dataset in this prototype.
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Conducted pursuant to Section 4 of the RFCTLARR Act 2013 by the State Social Impact Assessment Unit. Baseline statistics incorporate household interviews, satellite parcel intersections, and public hearing minutes.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-200 space-y-2">
            <button
              onClick={() => onNavigateTab('ai-assistant')}
              className="w-full py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <span>Ask AI Document Assistant about SIA</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Trust notice */}
      <TrustBanner type="synthetic" />
    </div>
  );
};
