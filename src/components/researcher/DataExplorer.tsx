import React, { useState } from 'react';
import { Database, Download, Filter, Search, FileText, BarChart3, Table as TableIcon, CheckCircle2 } from 'lucide-react';
import { RESEARCH_DATASETS, MOCK_PROJECTS, MOCK_PARCELS, INITIAL_GRIEVANCES, MOCK_SIA_VILLAGES } from '../../data/mockData';
import { TrustBanner } from '../common/TrustBanner';

export const DataExplorer: React.FC = () => {
  const [selectedDataset, setSelectedDataset] = useState<string>('Land Acquisition');
  const [filterState, setFilterState] = useState<string>('All');
  const [filterDistrict, setFilterDistrict] = useState<string>('All');
  const [filterYear, setFilterYear] = useState<string>('2026');
  const [filterProjectType, setFilterProjectType] = useState<string>('All');
  const [filterLandType, setFilterLandType] = useState<string>('All');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const DATASET_OPTIONS = ['Land Acquisition', 'SIA', 'Compensation', 'Grievances', 'Projects'];

  // Export CSV handler
  const handleExportCSV = () => {
    let headers: string[] = [];
    let rows: (string | number)[][] = [];
    let filename = `SETU_${selectedDataset.replace(/\s+/g, '_')}_${Date.now()}.csv`;

    if (selectedDataset === 'Projects' || selectedDataset === 'Land Acquisition') {
      headers = ['ID', 'Code', 'Project Name', 'Category', 'State', 'Districts', 'Status', 'Budget (Cr)', 'Parcels', 'Villages', 'Land Acquired (%)'];
      rows = MOCK_PROJECTS.map((p) => [
        p.id,
        p.code,
        `"${p.name}"`,
        p.category,
        p.state,
        `"${p.districts.join(';')}"`,
        p.status,
        p.estimatedBudgetCr,
        p.affectedParcelsCount,
        p.affectedVillagesCount,
        p.landAcquiredPercentage,
      ]);
    } else if (selectedDataset === 'SIA') {
      headers = ['Village', 'Households Affected', 'Population Affected', 'Agricultural Land (ha)', 'Livelihood Risk (%)', 'Primary Concerns'];
      rows = MOCK_SIA_VILLAGES.map((v) => [
        v.village,
        v.households,
        v.population,
        v.agriculturalLandHa,
        v.livelihoodImpactRate,
        `"${v.primaryConcerns}"`,
      ]);
    } else if (selectedDataset === 'Compensation') {
      headers = ['Survey No', 'Village', 'Area (ha)', 'Land Type', 'Circle Rate (Rs/ha)', 'Multiplier', 'Solatium (%)', 'Est Total (Rs)'];
      rows = MOCK_PARCELS.map((p) => [
        p.surveyNumber,
        p.village,
        p.areaHectares,
        p.landType,
        p.marketRatePerHa,
        1.5,
        100,
        Math.round(p.areaHectares * p.marketRatePerHa * 1.5 * 2),
      ]);
    } else if (selectedDataset === 'Grievances') {
      headers = ['Tracking ID', 'Survey No', 'Village', 'Category', 'Submitted By', 'Status', 'Submitted Date'];
      rows = INITIAL_GRIEVANCES.map((g) => [
        g.trackingId,
        g.surveyNumber,
        g.village,
        `"${g.category}"`,
        `"${g.submittedBy}"`,
        g.status,
        `"${g.submittedAt}"`,
      ]);
    }

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportReport = () => {
    const reportText = `SETU NATIONAL PLATFORM\nPOLICY SYNTHESIS REPORT\nGenerated: 24-Sep-2026\nDataset: ${selectedDataset}\nJurisdiction: Maharashtra / Pune Region\nTotal Records Evaluated: 124 Projects / 18,420 Parcels\n\nMethodology: RFCTLARR Act 2013 Compliance Standard\nInteroperability: NDAP v2.1 Format\n\n[Certified Platform Prototype Export]`;
    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SETU_Policy_Report_${selectedDataset.replace(/\s+/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-semibold text-indigo-900 uppercase tracking-wider">
            Open Data Registry · National Data Analytics Platform (NDAP)
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Data Explorer
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Query, filter, and export microdata on land acquisitions, social impact assessments, and compensation awards
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleExportReport}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4 text-slate-400" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Dataset Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto p-1 bg-slate-100 rounded-xl border border-slate-200">
        {DATASET_OPTIONS.map((ds) => (
          <button
            key={ds}
            onClick={() => setSelectedDataset(ds)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
              selectedDataset === ds
                ? 'bg-white text-indigo-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {ds}
          </button>
        ))}
      </div>

      {/* Multi-Filters Grid */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span>Filter Query Criteria</span>
          </span>
          <span className="text-xs text-slate-400 font-mono">Dataset: {selectedDataset}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div>
            <label className="text-slate-500 block mb-1">State</label>
            <select
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
            >
              <option value="All">All States</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
            </select>
          </div>

          <div>
            <label className="text-slate-500 block mb-1">District</label>
            <select
              value={filterDistrict}
              onChange={(e) => setFilterDistrict(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
            >
              <option value="All">All Districts</option>
              <option value="Pune">Pune</option>
              <option value="Satara">Satara</option>
              <option value="Solapur">Solapur</option>
            </select>
          </div>

          <div>
            <label className="text-slate-500 block mb-1">Year</label>
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>

          <div>
            <label className="text-slate-500 block mb-1">Project Type</label>
            <select
              value={filterProjectType}
              onChange={(e) => setFilterProjectType(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
            >
              <option value="All">All Types</option>
              <option value="Highway">Highway</option>
              <option value="Irrigation">Irrigation</option>
              <option value="Industrial Corridor">Industrial Corridor</option>
            </select>
          </div>

          <div>
            <label className="text-slate-500 block mb-1">Land Type</label>
            <select
              value={filterLandType}
              onChange={(e) => setFilterLandType(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
            >
              <option value="All">All Land Types</option>
              <option value="Agricultural">Agricultural</option>
              <option value="Irrigated Double-Crop">Irrigated</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          <div>
            <label className="text-slate-500 block mb-1">Search Keywords</label>
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search..."
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
            />
          </div>
        </div>
      </div>

      {/* Summary Statistics Card */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 block">Total Records</span>
          <span className="text-2xl font-extrabold text-slate-900 font-mono">
            {selectedDataset === 'Land Acquisition' || selectedDataset === 'Projects' ? MOCK_PROJECTS.length : selectedDataset === 'SIA' ? MOCK_SIA_VILLAGES.length : selectedDataset === 'Compensation' ? MOCK_PARCELS.length : INITIAL_GRIEVANCES.length}
          </span>
          <span className="text-[10px] text-slate-400 block">Selected schema slice</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 block">Active District</span>
          <span className="text-2xl font-extrabold text-slate-900 font-mono">Pune</span>
          <span className="text-[10px] text-slate-400 block">Haveli Revenue Circle</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 block">Data Standard</span>
          <span className="text-xl font-extrabold text-indigo-900 font-mono">NDAP-2026</span>
          <span className="text-[10px] text-slate-400 block">Open Government Data</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 block">Export Ready</span>
          <span className="text-base font-bold text-emerald-700 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Clean CSV / UTF-8
          </span>
          <span className="text-[10px] text-slate-400 block">Machine-readable</span>
        </div>
      </div>

      {/* Data Table Display */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TableIcon className="w-4 h-4 text-slate-600" />
            <span className="font-bold text-slate-900 text-xs uppercase tracking-wide">
              {selectedDataset} Microdata Table
            </span>
          </div>
          <button
            onClick={handleExportCSV}
            className="text-xs font-semibold text-indigo-900 hover:underline flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Table as CSV</span>
          </button>
        </div>

        <div className="overflow-x-auto max-h-96">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 uppercase tracking-wider font-semibold border-b border-slate-200 text-[11px] sticky top-0">
              {selectedDataset === 'Land Acquisition' || selectedDataset === 'Projects' ? (
                <tr>
                  <th className="py-2.5 px-4">Code</th>
                  <th className="py-2.5 px-4">Project</th>
                  <th className="py-2.5 px-4">Category</th>
                  <th className="py-2.5 px-4 text-right">Budget (Cr)</th>
                  <th className="py-2.5 px-4 text-right">Parcels</th>
                  <th className="py-2.5 px-4">Status</th>
                </tr>
              ) : selectedDataset === 'SIA' ? (
                <tr>
                  <th className="py-2.5 px-4">Village</th>
                  <th className="py-2.5 px-4 text-right">Households</th>
                  <th className="py-2.5 px-4 text-right">Population</th>
                  <th className="py-2.5 px-4 text-right">Agri Land (ha)</th>
                  <th className="py-2.5 px-4 text-right">Livelihood Risk (%)</th>
                  <th className="py-2.5 px-4">Primary Concerns Voiced</th>
                </tr>
              ) : selectedDataset === 'Compensation' ? (
                <tr>
                  <th className="py-2.5 px-4">Survey No</th>
                  <th className="py-2.5 px-4">Village</th>
                  <th className="py-2.5 px-4 text-right">Area (ha)</th>
                  <th className="py-2.5 px-4">Land Type</th>
                  <th className="py-2.5 px-4 text-right">Base Circle Rate</th>
                  <th className="py-2.5 px-4 text-right">Est Compensation</th>
                </tr>
              ) : (
                <tr>
                  <th className="py-2.5 px-4">Tracking ID</th>
                  <th className="py-2.5 px-4">Survey No</th>
                  <th className="py-2.5 px-4">Category</th>
                  <th className="py-2.5 px-4">Submitted By</th>
                  <th className="py-2.5 px-4">Status</th>
                  <th className="py-2.5 px-4">Date</th>
                </tr>
              )}
            </thead>
            <tbody className="divide-y divide-slate-100">
              {selectedDataset === 'Land Acquisition' || selectedDataset === 'Projects'
                ? MOCK_PROJECTS.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-4 font-mono text-slate-500">{p.code}</td>
                      <td className="py-2.5 px-4 font-bold text-slate-900">{p.name}</td>
                      <td className="py-2.5 px-4 text-slate-600">{p.category}</td>
                      <td className="py-2.5 px-4 text-right font-mono font-bold text-slate-900">
                        ₹{p.estimatedBudgetCr}
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono text-slate-600">
                        {p.affectedParcelsCount}
                      </td>
                      <td className="py-2.5 px-4">
                        <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-900 font-bold text-[10px]">
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))
                : selectedDataset === 'SIA'
                ? MOCK_SIA_VILLAGES.map((v) => (
                    <tr key={v.village} className="hover:bg-slate-50">
                      <td className="py-2.5 px-4 font-bold text-slate-900">{v.village}</td>
                      <td className="py-2.5 px-4 text-right font-mono">{v.households}</td>
                      <td className="py-2.5 px-4 text-right font-mono">{v.population}</td>
                      <td className="py-2.5 px-4 text-right font-mono">{v.agriculturalLandHa}</td>
                      <td className="py-2.5 px-4 text-right font-mono font-bold text-amber-700">
                        {v.livelihoodImpactRate}%
                      </td>
                      <td className="py-2.5 px-4 text-slate-600 max-w-xs truncate">{v.primaryConcerns}</td>
                    </tr>
                  ))
                : selectedDataset === 'Compensation'
                ? MOCK_PARCELS.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-4 font-mono font-bold text-slate-900">{p.surveyNumber}</td>
                      <td className="py-2.5 px-4 text-slate-700">{p.village}</td>
                      <td className="py-2.5 px-4 text-right font-mono">{p.areaHectares}</td>
                      <td className="py-2.5 px-4 text-slate-600">{p.landType}</td>
                      <td className="py-2.5 px-4 text-right font-mono">₹{p.marketRatePerHa.toLocaleString('en-IN')}</td>
                      <td className="py-2.5 px-4 text-right font-mono font-bold text-emerald-700">
                        ₹{Math.round(p.areaHectares * p.marketRatePerHa * 3).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))
                : INITIAL_GRIEVANCES.map((g) => (
                    <tr key={g.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-4 font-mono font-bold text-blue-900">{g.trackingId}</td>
                      <td className="py-2.5 px-4 font-mono">{g.surveyNumber}</td>
                      <td className="py-2.5 px-4 font-medium text-slate-800">{g.category}</td>
                      <td className="py-2.5 px-4 text-slate-600">{g.submittedBy}</td>
                      <td className="py-2.5 px-4">
                        <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold text-[10px]">
                          {g.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-slate-400 font-mono text-[10px]">{g.submittedAt}</td>
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
