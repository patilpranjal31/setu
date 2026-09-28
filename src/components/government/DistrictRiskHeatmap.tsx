import React, { useState } from 'react';
import {
  MapPin,
  Layers,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Building,
  Clock,
  IndianRupee,
  Users,
  ShieldCheck,
  Eye,
  Info,
} from 'lucide-react';
import { MAHARASHTRA_DISTRICTS_RISK } from '../../data/districtHeatmapData';
import { DistrictRiskData, ActiveTab } from '../../types';

interface DistrictRiskHeatmapProps {
  onSelectProject?: (projectId: string) => void;
  onNavigateTab?: (tab: ActiveTab) => void;
  onSelectDistrictFilter?: (districtName: string) => void;
}

export const DistrictRiskHeatmap: React.FC<DistrictRiskHeatmapProps> = ({
  onSelectProject,
  onNavigateTab,
  onSelectDistrictFilter,
}) => {
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('dist-pune');
  const [heatmapMode, setHeatmapMode] = useState<'risk' | 'delay' | 'density'>('risk');
  const [hoveredDistrict, setHoveredDistrict] = useState<DistrictRiskData | null>(null);

  const selectedDistrict =
    MAHARASHTRA_DISTRICTS_RISK.find((d) => d.id === selectedDistrictId) ||
    MAHARASHTRA_DISTRICTS_RISK[0];

  const activeDistrict = hoveredDistrict || selectedDistrict;

  // Determine fill color for district depending on heatmapMode
  const getDistrictFill = (district: DistrictRiskData) => {
    const isSelected = district.id === selectedDistrictId;
    if (heatmapMode === 'risk') {
      if (district.riskScore >= 70) return isSelected ? '#dc2626' : '#ef4444'; // Red
      if (district.riskScore >= 45) return isSelected ? '#d97706' : '#f59e0b'; // Amber
      return isSelected ? '#059669' : '#10b981'; // Green
    } else if (heatmapMode === 'delay') {
      if (district.avgDelayDays >= 100) return isSelected ? '#991b1b' : '#b91c1c'; // Deep Red
      if (district.avgDelayDays >= 50) return isSelected ? '#ea580c' : '#f97316'; // Orange
      return isSelected ? '#047857' : '#059669'; // Emerald
    } else {
      // Density
      if (district.totalProjects >= 30) return isSelected ? '#1d4ed8' : '#3b82f6'; // Deep Blue
      if (district.totalProjects >= 18) return isSelected ? '#0284c7' : '#38bdf8'; // Sky
      return isSelected ? '#475569' : '#64748b'; // Slate
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-lg p-6 text-white space-y-6">
      {/* Top Header & Layer Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-400/30 uppercase tracking-widest font-mono">
              Spatial Risk Intelligence
            </span>
            <span className="text-xs text-slate-400">Maharashtra Infrastructure Grid</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1 flex items-center gap-2">
            <span>District Risk Heatmap View</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time geospatial aggregation of corridor bottlenecks, compensation disputes, and delay forecasts across administrative districts.
          </p>
        </div>

        {/* Heatmap Layer Mode Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setHeatmapMode('risk')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              heatmapMode === 'risk'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Risk Heatmap (High/Med/Low)
          </button>
          <button
            onClick={() => setHeatmapMode('delay')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              heatmapMode === 'delay'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Delay Days Heatmap
          </button>
          <button
            onClick={() => setHeatmapMode('density')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              heatmapMode === 'density'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Project Density
          </button>
        </div>
      </div>

      {/* Main Map + District Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Side: Interactive SVG GIS Heatmap Canvas */}
        <div className="lg:col-span-7 bg-slate-950 rounded-xl border border-slate-800 p-4 relative overflow-hidden flex flex-col justify-between min-h-[360px]">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

          {/* SVG Map Canvas */}
          <div className="relative w-full h-80 sm:h-96">
            <svg
              viewBox="0 0 800 320"
              className="w-full h-full select-none"
              style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.4))' }}
            >
              {/* Outer State Regional Boundary Outline */}
              <path
                d="M 140,25 Q 360,10 600,30 T 760,70 Q 750,220 540,240 T 170,220 Z"
                fill="#0f172a"
                stroke="#1e293b"
                strokeWidth="2"
              />

              {/* Major Highway Infrastructure Vector Corridors */}
              <path
                d="M 200,75 Q 350,115 540,145 T 730,160"
                fill="none"
                stroke="#475569"
                strokeWidth="4"
                strokeDasharray="6 3"
                opacity="0.6"
              />
              <path
                d="M 310,35 Q 340,120 320,240"
                fill="none"
                stroke="#334155"
                strokeWidth="3"
                strokeDasharray="4 4"
                opacity="0.5"
              />

              {/* District Heatmap Polygons */}
              {MAHARASHTRA_DISTRICTS_RISK.map((district) => {
                const isSelected = district.id === selectedDistrictId;
                const isHovered = hoveredDistrict?.id === district.id;
                const fillColor = getDistrictFill(district);

                return (
                  <g
                    key={district.id}
                    onClick={() => setSelectedDistrictId(district.id)}
                    onMouseEnter={() => setHoveredDistrict(district)}
                    onMouseLeave={() => setHoveredDistrict(null)}
                    className="cursor-pointer transition-all duration-300"
                  >
                    {/* District Shape */}
                    <path
                      d={district.svgPath}
                      fill={fillColor}
                      fillOpacity={isSelected ? 0.95 : isHovered ? 0.85 : 0.65}
                      stroke={isSelected ? '#ffffff' : '#334155'}
                      strokeWidth={isSelected ? 3 : 1.5}
                      className="transition-colors duration-200"
                    />

                    {/* District Centroid Pin / Label */}
                    <circle
                      cx={district.coordinates[0]}
                      cy={district.coordinates[1]}
                      r={isSelected ? 6 : 4}
                      fill={isSelected ? '#ffffff' : '#e2e8f0'}
                      stroke={fillColor}
                      strokeWidth="2"
                    />

                    {/* Text Label */}
                    <text
                      x={district.coordinates[0]}
                      y={district.coordinates[1] - 10}
                      fill="#ffffff"
                      fontSize={isSelected ? '12' : '10'}
                      fontWeight={isSelected ? 'bold' : '600'}
                      textAnchor="middle"
                      style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
                    >
                      {district.name}
                    </text>

                    {/* Metric pill on map */}
                    <text
                      x={district.coordinates[0]}
                      y={district.coordinates[1] + 16}
                      fill={isSelected ? '#fef08a' : '#cbd5e1'}
                      fontSize="9"
                      fontFamily="monospace"
                      fontWeight="bold"
                      textAnchor="middle"
                      style={{ textShadow: '0 1px 2px rgba(0,0,0,0.9)' }}
                    >
                      {heatmapMode === 'risk'
                        ? `${district.riskScore}/100`
                        : heatmapMode === 'delay'
                        ? `+${district.avgDelayDays}d`
                        : `${district.totalProjects} Proj`}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Map Legend Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-3 text-[11px] text-slate-300">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-slate-400">Legend:</span>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span>High Risk (≥ 70)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span>Medium (45-69)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span>Low (&lt; 45)</span>
              </div>
            </div>

            <span className="text-slate-500 font-mono text-[10px]">
              Click any district to inspect root-cause statistics
            </span>
          </div>
        </div>

        {/* Right Side: Selected District Deep-Dive Card */}
        <div className="lg:col-span-5 bg-slate-800/90 rounded-xl border border-slate-700/80 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-700 pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                Selected District Jurisdiction
              </span>
              <h3 className="text-xl font-extrabold text-white flex items-center gap-2 mt-0.5">
                <MapPin className="w-4 h-4 text-rose-400" />
                <span>{activeDistrict.name} District</span>
              </h3>
            </div>

            <span
              className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                activeDistrict.riskCategory === 'High'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : activeDistrict.riskCategory === 'Medium'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              }`}
            >
              {activeDistrict.riskCategory} Risk ({activeDistrict.riskScore}/100)
            </span>
          </div>

          {/* Key District Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-1">
              <span className="text-slate-400 flex items-center gap-1 text-[10px]">
                <Clock className="w-3 h-3 text-amber-400" />
                <span>Avg Schedule Delay</span>
              </span>
              <div className="text-lg font-mono font-extrabold text-white">
                +{activeDistrict.avgDelayDays} Days
              </div>
              <span className="text-[10px] text-rose-400">
                {activeDistrict.delayedProjects} of {activeDistrict.totalProjects} delayed
              </span>
            </div>

            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-1">
              <span className="text-slate-400 flex items-center gap-1 text-[10px]">
                <IndianRupee className="w-3 h-3 text-emerald-400" />
                <span>Budget at Slippage Risk</span>
              </span>
              <div className="text-lg font-mono font-extrabold text-emerald-400">
                ₹ {activeDistrict.budgetAtRiskCr} Cr
              </div>
              <span className="text-[10px] text-slate-400">State allocation</span>
            </div>

            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-1">
              <span className="text-slate-400 flex items-center gap-1 text-[10px]">
                <Users className="w-3 h-3 text-blue-400" />
                <span>Active Grievances</span>
              </span>
              <div className="text-lg font-mono font-extrabold text-white">
                {activeDistrict.activeGrievances}
              </div>
              <span className="text-[10px] text-slate-400">Sec 15 objections</span>
            </div>

            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-1">
              <span className="text-slate-400 flex items-center gap-1 text-[10px]">
                <Building className="w-3 h-3 text-purple-400" />
                <span>Active Projects</span>
              </span>
              <div className="text-lg font-mono font-extrabold text-white">
                {activeDistrict.totalProjects}
              </div>
              <span className="text-[10px] text-slate-400">Corridor works</span>
            </div>
          </div>

          {/* Primary Statutory Bottleneck in District */}
          <div className="p-3.5 bg-rose-950/40 rounded-xl border border-rose-500/30 space-y-1 text-xs">
            <span className="font-bold text-rose-300 flex items-center gap-1 text-[11px] uppercase tracking-wide">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>Primary Regional Bottleneck:</span>
            </span>
            <p className="text-slate-200 leading-snug text-[11px]">
              {activeDistrict.keyBottleneck}
            </p>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="pt-2 flex flex-col gap-2">
            {onSelectDistrictFilter && (
              <button
                onClick={() => onSelectDistrictFilter(activeDistrict.name)}
                className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Filter Projects in {activeDistrict.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {onNavigateTab && (
              <button
                onClick={() => {
                  if (activeDistrict.name === 'Pune' && onSelectProject) {
                    onSelectProject('proj-xyz-highway');
                  } else if (activeDistrict.name === 'Solapur' && onSelectProject) {
                    onSelectProject('proj-industrial-corridor');
                  }
                  onNavigateTab('project-risk-delay');
                }}
                className="w-full py-2 px-3 bg-slate-700 hover:bg-slate-600 text-slate-200 hover:text-white rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                <span>Inspect District Risk & SHAP Factors</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
