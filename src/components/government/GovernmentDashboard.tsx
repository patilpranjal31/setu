import React, { useState } from 'react';
import {
  Building2,
  Layers,
  Filter,
  Search,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  MapPin,
  IndianRupee,
  Users,
  Activity,
  Sliders,
  LayoutGrid,
  ListFilter,
  Clock,
  Sparkles,
  TrendingDown,
  BellRing,
} from 'lucide-react';
import { MOCK_PROJECTS } from '../../data/mockData';
import { AcquisitionProject, ActiveTab } from '../../types';
import { TrustBanner } from '../common/TrustBanner';
import { DistrictRiskHeatmap } from './DistrictRiskHeatmap';

interface GovernmentDashboardProps {
  onNavigateTab: (tab: ActiveTab) => void;
  onSelectProject: (projectId: string) => void;
}

export const GovernmentDashboard: React.FC<GovernmentDashboardProps> = ({
  onNavigateTab,
  onSelectProject,
}) => {
  const [selectedState, setSelectedState] = useState('Maharashtra');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [sortBy, setSortBy] = useState<'risk' | 'delay' | 'budget'>('risk');

  // Filter projects
  const filteredProjects = MOCK_PROJECTS.filter((proj) => {
    if (selectedDistrict !== 'All' && !proj.districts.includes(selectedDistrict)) return false;
    if (selectedType !== 'All' && proj.category !== selectedType) return false;
    if (selectedStatus !== 'All' && proj.status !== selectedStatus) return false;
    if (selectedRiskLevel !== 'All' && (proj.riskCategory || 'Low') !== selectedRiskLevel) return false;
    if (searchQuery && !proj.name.toLowerCase().includes(searchQuery.toLowerCase()) && !proj.code.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'risk') return (b.riskScore || 0) - (a.riskScore || 0);
    if (sortBy === 'delay') return (b.projectedDelayDays || 0) - (a.projectedDelayDays || 0);
    if (sortBy === 'budget') return b.estimatedBudgetCr - a.estimatedBudgetCr;
    return 0;
  });

  // Aggregated risk counts
  const highRiskCount = MOCK_PROJECTS.filter((p) => p.riskCategory === 'High' || p.riskCategory === 'Critical').length;
  const mediumRiskCount = MOCK_PROJECTS.filter((p) => p.riskCategory === 'Medium').length;
  const lowRiskCount = MOCK_PROJECTS.filter((p) => p.riskCategory === 'Low').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title & Top Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-semibold text-blue-900 uppercase tracking-wider">
            State & District Oversight Console · DILRMP Interoperable
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Land Governance Command Center
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Aggregated monitoring of infrastructure acquisitions, statutory SIA milestones, SHAP risk explainability, and compensation flows
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab('project-risk-delay')}
            className="px-3.5 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Risk Delay Forecaster & What-If</span>
          </button>
          <span className="px-3 py-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>State MIS Online</span>
          </span>
        </div>
      </div>

      {/* Top Aggregated Statistics Required by Prompt */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-medium text-slate-500 block">Projects</span>
          <span className="text-2xl font-extrabold text-slate-900 font-mono">124</span>
          <span className="text-[10px] text-slate-400 block">Active statewide</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-medium text-slate-500 block">Affected Villages</span>
          <span className="text-2xl font-extrabold text-slate-900 font-mono">683</span>
          <span className="text-[10px] text-slate-400 block">Revenue jurisdictions</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-medium text-slate-500 block">Land Parcels</span>
          <span className="text-2xl font-extrabold text-slate-900 font-mono">18,420</span>
          <span className="text-[10px] text-slate-400 block">Survey units mapped</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-medium text-slate-500 block">Population Affected</span>
          <span className="text-2xl font-extrabold text-slate-900 font-mono">74,320</span>
          <span className="text-[10px] text-slate-400 block">Surveyed in SIAs</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1 col-span-2 sm:col-span-1">
          <span className="text-xs font-medium text-slate-500 block">Compensation Disbursed</span>
          <span className="text-2xl font-extrabold text-emerald-700 font-mono">₹ 1,420 Cr</span>
          <span className="text-[10px] text-slate-400 block">Through DBT Direct</span>
        </div>
      </div>

      {/* Corridor Delay Early Warning & Alert Simulation Banner */}
      <div className="p-5 bg-gradient-to-r from-rose-900 via-slate-900 to-slate-900 text-white rounded-2xl shadow-md border border-rose-800/60 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-rose-600/30 text-rose-300 border border-rose-500/40 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6 text-rose-400 animate-pulse" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500 text-slate-950 uppercase tracking-wider font-mono">
                Early Slippage Warning
              </span>
              <span className="text-xs text-rose-200 font-bold">
                {highRiskCount} High-Risk Corridors Flagged for Schedule Delay
              </span>
            </div>
            <p className="text-xs text-slate-200 max-w-3xl leading-relaxed">
              Automated critical-path analysis identified <strong className="text-white font-mono">+162 Days delay</strong> on XYZ Regional Highway (Pune) and <strong className="text-white font-mono">+175 Days</strong> on Pune-Solapur Industrial Corridor. Financial holding escalation estimated at ₹ 61.5 Cr.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start lg:self-auto shrink-0">
          <button
            onClick={() => {
              onSelectProject('proj-xyz-highway');
              onNavigateTab('project-risk-delay');
            }}
            className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Open Delay Forecaster & What-If</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive District Risk Heatmap View */}
      <DistrictRiskHeatmap
        onSelectProject={onSelectProject}
        onNavigateTab={onNavigateTab}
        onSelectDistrictFilter={(dName) => {
          setSelectedDistrict(dName);
          // scroll down to project list smoothly
          const el = document.getElementById('project-list-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Color-Coded Risk Score KPIs & Filter Tabs (High / Medium / Low) */}
      <div id="project-list-section" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-widest px-2.5 py-0.5 rounded bg-blue-50 border border-blue-200">
                Risk Categorization
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {filteredProjects.length} Projects Shown
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight mt-1">
              Infrastructure Risk & Schedule Slippage Registry
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Filter by color-coded risk category to inspect SHAP factor breakdown (&quot;why is this project high-risk&quot;) and projected delay periods.
            </p>
          </div>

          {/* View Mode Toggle: Grid vs Table */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                  viewMode === 'grid'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Card Grid</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                  viewMode === 'table'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ListFilter className="w-3.5 h-3.5" />
                <span>Risk Ranking Table</span>
              </button>
            </div>
          </div>
        </div>

        {/* Risk Score Filter Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => setSelectedRiskLevel('All')}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              selectedRiskLevel === 'All'
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold">All Projects</span>
              <span className={`font-mono text-xs px-2 py-0.5 rounded font-bold ${
                selectedRiskLevel === 'All' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-700'
              }`}>
                {MOCK_PROJECTS.length}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 block mt-1">Full state monitoring pipeline</span>
          </button>

          <button
            onClick={() => setSelectedRiskLevel('High')}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              selectedRiskLevel === 'High'
                ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-300 shadow-sm'
                : 'bg-white text-slate-800 border-slate-200 hover:border-rose-200'
            }`}
          >
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-rose-800 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse" />
                <span>High Risk (≥ 70)</span>
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-rose-100 text-rose-900 font-bold">
                {highRiskCount}
              </span>
            </div>
            <span className="text-[11px] text-rose-700 font-medium block mt-1">
              Avg Delay: +152 Days · Critical RoW
            </span>
          </button>

          <button
            onClick={() => setSelectedRiskLevel('Medium')}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              selectedRiskLevel === 'Medium'
                ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-300 shadow-sm'
                : 'bg-white text-slate-800 border-slate-200 hover:border-amber-200'
            }`}
          >
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-amber-800 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>Medium Risk (40-69)</span>
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold">
                {mediumRiskCount}
              </span>
            </div>
            <span className="text-[11px] text-amber-700 font-medium block mt-1">
              Avg Delay: +52 Days · Needs Monitoring
            </span>
          </button>

          <button
            onClick={() => setSelectedRiskLevel('Low')}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              selectedRiskLevel === 'Low'
                ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-300 shadow-sm'
                : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-200'
            }`}
          >
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Low Risk (&lt; 40)</span>
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold">
                {lowRiskCount}
              </span>
            </div>
            <span className="text-[11px] text-emerald-700 font-medium block mt-1">
              On Schedule / Minor Slippage
            </span>
          </button>
        </div>

        {/* Multi-Filters & Search Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <span>Multi-Dimensional Corridor Filters</span>
            </span>
            <span className="text-slate-400 font-normal">
              Showing {filteredProjects.length} of {MOCK_PROJECTS.length} records
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            <div>
              <label className="text-slate-500 block mb-1">District</label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
              >
                <option value="All">All Districts</option>
                <option value="Pune">Pune</option>
                <option value="Solapur">Solapur</option>
                <option value="Satara">Satara</option>
                <option value="Nashik">Nashik</option>
                <option value="Ahmednagar">Ahmednagar</option>
              </select>
            </div>

            <div>
              <label className="text-slate-500 block mb-1">Project Category</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
              >
                <option value="All">All Categories</option>
                <option value="Highway">Highway</option>
                <option value="Irrigation">Irrigation</option>
                <option value="Industrial Corridor">Industrial Corridor</option>
                <option value="Renewable Energy">Renewable Energy</option>
              </select>
            </div>

            <div>
              <label className="text-slate-500 block mb-1">Statutory Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
              >
                <option value="All">All Statuses</option>
                <option value="Proposed">Proposed</option>
                <option value="Preliminary Notification">Preliminary Notification</option>
                <option value="SIA Review">SIA Review</option>
                <option value="Acquisition In Progress">Acquisition In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="text-slate-500 block mb-1">Sort Projects By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold"
              >
                <option value="risk">Highest Risk Score</option>
                <option value="delay">Longest Projected Delay</option>
                <option value="budget">Largest Estimated Budget</option>
              </select>
            </div>

            <div>
              <label className="text-slate-500 block mb-1">Search Name / Code</label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search project..."
                  className="w-full pl-8 pr-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>
            </div>
          </div>
        </div>

        {/* View Mode: Card Grid */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj) => {
              const isHigh = proj.riskCategory === 'High' || proj.riskCategory === 'Critical';
              const isMedium = proj.riskCategory === 'Medium';

              return (
                <div
                  key={proj.id}
                  className={`bg-white rounded-2xl border-2 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between space-y-4 cursor-pointer ${
                    isHigh
                      ? 'border-rose-300 hover:border-rose-400 bg-gradient-to-b from-white to-rose-50/20'
                      : isMedium
                      ? 'border-amber-300 hover:border-amber-400 bg-gradient-to-b from-white to-amber-50/20'
                      : 'border-emerald-300 hover:border-emerald-400 bg-gradient-to-b from-white to-emerald-50/20'
                  }`}
                  onClick={() => {
                    onSelectProject(proj.id);
                    onNavigateTab('project-risk-delay');
                  }}
                >
                  <div className="space-y-3">
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                        {proj.code}
                      </span>

                      {/* Color-Coded Risk Score Category Badge */}
                      <span
                        className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs ${
                          isHigh
                            ? 'bg-rose-600 text-white'
                            : isMedium
                            ? 'bg-amber-500 text-white'
                            : 'bg-emerald-600 text-white'
                        }`}
                      >
                        {isHigh && <span className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                        <span>{proj.riskCategory?.toUpperCase()} RISK · {proj.riskScore}/100</span>
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                        {proj.name}
                      </h3>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {proj.districts.join(', ')} · {proj.category}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {proj.purpose}
                    </p>

                    {/* Delay & Risk Highlight Callout */}
                    <div className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                      isHigh
                        ? 'bg-rose-50 border-rose-200 text-rose-900'
                        : isMedium
                        ? 'bg-amber-50 border-amber-200 text-amber-900'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    }`}>
                      <div className="flex items-center gap-1.5 font-semibold">
                        <Clock className={`w-3.5 h-3.5 ${isHigh ? 'text-rose-600' : isMedium ? 'text-amber-600' : 'text-emerald-600'}`} />
                        <span>Projected Delay:</span>
                      </div>
                      <span className="font-extrabold font-mono text-sm">
                        +{proj.projectedDelayDays || 14} Days
                      </span>
                    </div>

                    {/* Metrics Row */}
                    <div className="grid grid-cols-3 gap-2 pt-1 text-xs">
                      <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                        <span className="text-slate-400 block text-[10px]">Villages</span>
                        <span className="font-bold text-slate-900 font-mono">
                          {proj.affectedVillagesCount}
                        </span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                        <span className="text-slate-400 block text-[10px]">Parcels</span>
                        <span className="font-bold text-slate-900 font-mono">
                          {proj.affectedParcelsCount}
                        </span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                        <span className="text-slate-400 block text-[10px]">Budget</span>
                        <span className="font-bold text-slate-900 font-mono">
                          ₹{proj.estimatedBudgetCr} Cr
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(proj.id);
                        onNavigateTab('project-risk-delay');
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold border border-purple-200 text-[11px] flex items-center gap-1 transition-all"
                    >
                      <Sparkles className="w-3 h-3 text-purple-700" />
                      <span>Why High-Risk? (SHAP)</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(proj.id);
                        onNavigateTab('gov-project-analytics');
                      }}
                      className="text-blue-900 hover:text-blue-700 font-bold flex items-center gap-1 text-[11px]"
                    >
                      <span>Analytics</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View Mode: Risk Ranking Table */}
        {viewMode === 'table' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Risk Score</th>
                    <th className="p-3.5">Project Name & Code</th>
                    <th className="p-3.5">Category & District</th>
                    <th className="p-3.5">Projected Delay</th>
                    <th className="p-3.5">Budget</th>
                    <th className="p-3.5">Land Acquired</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProjects.map((proj) => {
                    const isHigh = proj.riskCategory === 'High' || proj.riskCategory === 'Critical';
                    const isMedium = proj.riskCategory === 'Medium';

                    return (
                      <tr
                        key={proj.id}
                        onClick={() => {
                          onSelectProject(proj.id);
                          onNavigateTab('project-risk-delay');
                        }}
                        className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                      >
                        <td className="p-3.5 whitespace-nowrap">
                          <span
                            className={`font-mono font-extrabold px-2.5 py-1 rounded-full text-xs inline-flex items-center gap-1 ${
                              isHigh
                                ? 'bg-rose-100 text-rose-800 border border-rose-300'
                                : isMedium
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            }`}
                          >
                            <span>{proj.riskScore}/100</span>
                            <span className="text-[10px] font-sans font-bold">({proj.riskCategory})</span>
                          </span>
                        </td>
                        <td className="p-3.5">
                          <strong className="text-slate-900 block font-bold">{proj.name}</strong>
                          <span className="text-[11px] font-mono text-slate-400">{proj.code}</span>
                        </td>
                        <td className="p-3.5 whitespace-nowrap text-slate-600">
                          {proj.category} · <span className="font-semibold text-slate-800">{proj.districts.join(', ')}</span>
                        </td>
                        <td className="p-3.5 whitespace-nowrap">
                          <span className={`font-mono font-extrabold ${isHigh ? 'text-rose-700' : isMedium ? 'text-amber-700' : 'text-emerald-700'}`}>
                            +{proj.projectedDelayDays || 14} Days
                          </span>
                        </td>
                        <td className="p-3.5 whitespace-nowrap font-mono font-bold text-slate-800">
                          ₹ {proj.estimatedBudgetCr} Cr
                        </td>
                        <td className="p-3.5 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                              <div
                                className="bg-blue-800 h-full rounded-full"
                                style={{ width: `${proj.landAcquiredPercentage}%` }}
                              />
                            </div>
                            <span className="font-mono text-slate-700">{proj.landAcquiredPercentage}%</span>
                          </div>
                        </td>
                        <td className="p-3.5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => {
                                onSelectProject(proj.id);
                                onNavigateTab('project-risk-delay');
                              }}
                              className="px-2.5 py-1 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold text-[11px] flex items-center gap-1"
                            >
                              <Sparkles className="w-3 h-3 text-purple-700" />
                              <span>SHAP Breakdown</span>
                            </button>
                            <button
                              onClick={() => {
                                onSelectProject(proj.id);
                                onNavigateTab('gov-project-analytics');
                              }}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px]"
                            >
                              Analytics
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Trust Notice */}
      <TrustBanner type="synthetic" />
    </div>
  );
};
