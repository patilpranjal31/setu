import React, { useState } from 'react';
import { BarChart3, Database, FileSpreadsheet, ArrowRight, Download, Filter, Search, Layers, GitCompare, HelpCircle, FileText } from 'lucide-react';
import { MOCK_PROJECTS, RESEARCH_DATASETS } from '../../data/mockData';
import { ActiveTab } from '../../types';
import { TrustBanner } from '../common/TrustBanner';

interface ResearcherDashboardProps {
  onNavigateTab: (tab: ActiveTab) => void;
}

export const ResearcherDashboard: React.FC<ResearcherDashboardProps> = ({ onNavigateTab }) => {
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = MOCK_PROJECTS.filter((proj) => {
    if (filterCategory !== 'All' && proj.category !== filterCategory) return false;
    if (filterStatus !== 'All' && proj.status !== filterStatus) return false;
    if (searchQuery && !proj.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleExportComparisonCSV = () => {
    const headers = ['Project Name', 'State', 'Category', 'Land Acquired (%)', 'Population Affected', 'Households', 'Grievances', 'SIA Status'];
    const rows = filteredProjects.map((p) => [
      `"${p.name}"`,
      `"${p.state}"`,
      `"${p.category}"`,
      `${p.landAcquiredPercentage}%`,
      p.affectedHouseholdsCount * 4,
      p.affectedHouseholdsCount,
      p.grievancesCount,
      `"${p.status}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SETU_Project_Comparison_${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-semibold text-indigo-900 uppercase tracking-wider">
            Evidence-Based Policy Lab · NDAP Interoperable
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Research & Policy Intelligence
          </h1>
          {/* Prompt specified purpose */}
          <p className="text-xs text-slate-600 mt-0.5">
            Explore aggregated land and social-impact data to support evidence-based research.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab('data-explorer')}
            className="px-4 py-2 bg-indigo-900 hover:bg-indigo-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Database className="w-4 h-4" />
            <span>Open Data Explorer & CSV Export</span>
          </button>
        </div>
      </div>

      {/* Top 5 Features Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <button
          onClick={() => onNavigateTab('data-explorer')}
          className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all text-left space-y-1"
        >
          <Database className="w-5 h-5 text-indigo-800" />
          <h4 className="text-xs font-bold text-slate-900">Dataset Explorer</h4>
          <p className="text-[11px] text-slate-500">Query 4 national datasets</p>
        </button>

        <button
          onClick={() => {
            const tableEl = document.getElementById('project-comparison-table');
            tableEl?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all text-left space-y-1"
        >
          <GitCompare className="w-5 h-5 text-blue-800" />
          <h4 className="text-xs font-bold text-slate-900">Project Comparison</h4>
          <p className="text-[11px] text-slate-500">Cross-project indicators</p>
        </button>

        <button
          onClick={() => onNavigateTab('sia-insights')}
          className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all text-left space-y-1"
        >
          <BarChart3 className="w-5 h-5 text-emerald-800" />
          <h4 className="text-xs font-bold text-slate-900">Impact Analysis</h4>
          <p className="text-[11px] text-slate-500">Displacement & severity</p>
        </button>

        <button
          onClick={() => onNavigateTab('what-it-means')}
          className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all text-left space-y-1"
        >
          <HelpCircle className="w-5 h-5 text-amber-800" />
          <h4 className="text-xs font-bold text-slate-900">Policy Questions</h4>
          <p className="text-[11px] text-slate-500">RFCTLARR outcomes</p>
        </button>

        <button
          onClick={handleExportComparisonCSV}
          className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all text-left space-y-1 col-span-2 sm:col-span-1"
        >
          <Download className="w-5 h-5 text-rose-800" />
          <h4 className="text-xs font-bold text-slate-900">Export Matrix</h4>
          <p className="text-[11px] text-slate-500">Download formatted CSV</p>
        </button>
      </div>

      {/* Project Comparison Table Section */}
      <div id="project-comparison-table" className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide">
              Cross-Project Comparative Intelligence Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Correlating land acquisition velocity with social impact and citizen grievance densities
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportComparisonCSV}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search project name..."
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
            />
          </div>
          <div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
            >
              <option value="All">All Categories</option>
              <option value="Highway">Highway</option>
              <option value="Irrigation">Irrigation</option>
              <option value="Industrial Corridor">Industrial Corridor</option>
            </select>
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
            >
              <option value="All">All Statuses</option>
              <option value="Proposed">Proposed</option>
              <option value="Preliminary Notification">Preliminary Notification</option>
              <option value="SIA Review">SIA Review</option>
              <option value="Acquisition In Progress">Acquisition In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Table Required by Prompt:
            Columns: Project, State, Land Acquired, Population Affected, Households, Grievances, SIA Status
        */}
        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider font-semibold border-b border-slate-200 text-[11px]">
              <tr>
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4">State</th>
                <th className="py-3 px-4 text-right">Land Acquired</th>
                <th className="py-3 px-4 text-right">Population Affected</th>
                <th className="py-3 px-4 text-right">Households</th>
                <th className="py-3 px-4 text-right">Grievances</th>
                <th className="py-3 px-4">SIA Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProjects.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900 block">{p.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{p.code} · {p.category}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-700 font-medium">{p.state}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">
                    {p.landAcquiredPercentage}%
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-slate-700">
                    {(p.affectedHouseholdsCount * 4.3).toFixed(0)}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-slate-700">
                    {p.affectedHouseholdsCount}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`font-mono font-bold ${
                        p.grievancesCount > 30 ? 'text-rose-700' : 'text-slate-700'
                      }`}
                    >
                      {p.grievancesCount}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase ${
                        p.siaCompletionPercentage === 100
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-100 text-blue-900'
                      }`}
                    >
                      {p.siaCompletionPercentage === 100 ? 'Completed' : `${p.siaCompletionPercentage}% In Review`}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trust banner */}
      <TrustBanner type="synthetic" />
    </div>
  );
};
