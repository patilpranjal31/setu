import React, { useState } from 'react';
import { Search, Layers, Filter, Eye, ZoomIn, ZoomOut, RotateCcw, MapPin, Info, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { MOCK_PARCELS, MOCK_PROJECTS, CURRENT_CITIZEN } from '../../data/mockData';
import { LandParcel, ActiveTab } from '../../types';
import { TrustBanner } from '../common/TrustBanner';

interface InteractiveMapProps {
  selectedParcelId: string | null;
  onSelectParcel: (parcelId: string) => void;
  onNavigateTab: (tab: ActiveTab) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  selectedParcelId,
  onSelectParcel,
  onNavigateTab,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('Examplegaon');
  const [mapMode, setMapMode] = useState<'cadastral' | 'satellite'>('cadastral');
  const [zoomLevel, setZoomLevel] = useState(1);

  // Layer filters
  const [layers, setLayers] = useState({
    parcels: true,
    corridor: true,
    roads: true,
    waterBodies: true,
    forestAreas: true,
  });

  const activeParcel = MOCK_PARCELS.find((p) => p.id === (selectedParcelId || 'parcel-102-3')) || MOCK_PARCELS[0];

  const filteredParcels = MOCK_PARCELS.filter((p) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      p.surveyNumber.toLowerCase().includes(query) ||
      p.village.toLowerCase().includes(query) ||
      p.ownerName.toLowerCase().includes(query) ||
      p.landType.toLowerCase().includes(query)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
      {/* Title & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Spatial Intelligence System
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Explore Your Land
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Cadastral parcel boundaries with real-time acquisition corridor buffer overlay (Village: {selectedVillage}, Haveli, Pune)
          </p>
        </div>

        {/* Base view switch */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs font-medium">
            <button
              onClick={() => setMapMode('cadastral')}
              className={`px-3 py-1 rounded-md transition-colors ${
                mapMode === 'cadastral'
                  ? 'bg-white text-blue-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cadastral Map
            </button>
            <button
              onClick={() => setMapMode('satellite')}
              className={`px-3 py-1 rounded-md transition-colors ${
                mapMode === 'satellite'
                  ? 'bg-white text-blue-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Satellite Hybrid
            </button>
          </div>
        </div>
      </div>

      {/* Main Map Layout: Sidebar + Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Sidebar */}
        <div className="lg:col-span-1 space-y-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          {/* Search Box */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Search
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search village, survey number..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-800 focus:bg-white text-slate-900"
              />
            </div>
            {searchQuery && (
              <span className="text-[10px] text-slate-500">
                Found {filteredParcels.length} matching parcels
              </span>
            )}
          </div>

          {/* Quick Village Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Revenue Village
            </label>
            <select
              value={selectedVillage}
              onChange={(e) => setSelectedVillage(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden text-slate-800"
            >
              <option value="Examplegaon">Examplegaon (Pune)</option>
              <option value="Rampur">Rampur (Pune)</option>
              <option value="Shivapur">Shivapur (Pune)</option>
              <option value="Karanjgaon">Karanjgaon (Pune)</option>
            </select>
          </div>

          {/* Layer Filters */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              <span>Map Layers</span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-700">
              <label className="flex items-center justify-between p-1.5 rounded hover:bg-slate-50 cursor-pointer">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                  <span>Land Parcels</span>
                </span>
                <input
                  type="checkbox"
                  checked={layers.parcels}
                  onChange={(e) => setLayers({ ...layers, parcels: e.target.checked })}
                  className="rounded text-blue-900 focus:ring-blue-800"
                />
              </label>

              <label className="flex items-center justify-between p-1.5 rounded hover:bg-slate-50 cursor-pointer">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" />
                  <span>Acquisition Projects</span>
                </span>
                <input
                  type="checkbox"
                  checked={layers.corridor}
                  onChange={(e) => setLayers({ ...layers, corridor: e.target.checked })}
                  className="rounded text-blue-900 focus:ring-blue-800"
                />
              </label>

              <label className="flex items-center justify-between p-1.5 rounded hover:bg-slate-50 cursor-pointer">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-slate-600" />
                  <span>Roads & Highways</span>
                </span>
                <input
                  type="checkbox"
                  checked={layers.roads}
                  onChange={(e) => setLayers({ ...layers, roads: e.target.checked })}
                  className="rounded text-blue-900 focus:ring-blue-800"
                />
              </label>

              <label className="flex items-center justify-between p-1.5 rounded hover:bg-slate-50 cursor-pointer">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-blue-500" />
                  <span>Water Bodies & Canals</span>
                </span>
                <input
                  type="checkbox"
                  checked={layers.waterBodies}
                  onChange={(e) => setLayers({ ...layers, waterBodies: e.target.checked })}
                  className="rounded text-blue-900 focus:ring-blue-800"
                />
              </label>

              <label className="flex items-center justify-between p-1.5 rounded hover:bg-slate-50 cursor-pointer">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-800" />
                  <span>Forest & Grazing Areas</span>
                </span>
                <input
                  type="checkbox"
                  checked={layers.forestAreas}
                  onChange={(e) => setLayers({ ...layers, forestAreas: e.target.checked })}
                  className="rounded text-blue-900 focus:ring-blue-800"
                />
              </label>
            </div>
          </div>

          {/* Quick Parcel list buttons */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Example Parcels
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {MOCK_PARCELS.slice(0, 6).map((parcel) => (
                <button
                  key={parcel.id}
                  onClick={() => onSelectParcel(parcel.id)}
                  className={`p-2 text-left rounded text-xs transition-colors border ${
                    activeParcel.id === parcel.id
                      ? 'bg-blue-900 text-white border-blue-900 font-semibold'
                      : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-mono">Survey {parcel.surveyNumber}</div>
                  <div className="text-[10px] opacity-80">{parcel.areaHectares} ha · {parcel.landType.slice(0, 5)}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Map Canvas and Selected Parcel Card */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-md relative">
            {/* Interactive SVG GIS Canvas */}
            <div className="relative w-full h-[480px] overflow-hidden select-none bg-[#111827]">
              {/* Satellite texture simulation or Cadastral background */}
              {mapMode === 'satellite' ? (
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-85 transition-opacity"
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, #1e293b 0%, #0f172a 100%)`,
                  }}
                >
                  {/* Agricultural field grids overlay */}
                  <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,#34d399_1px,transparent_1px),linear-gradient(-45deg,#059669_1px,transparent_1px)] [background-size:36px_36px]" />
                </div>
              ) : (
                <div className="absolute inset-0 bg-[#f8fafc]">
                  {/* Cadastral grid graph paper style */}
                  <div className="absolute inset-0 opacity-60 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] [background-size:24px_24px]" />
                </div>
              )}

              {/* Vector SVG layers */}
              <svg
                viewBox="50 50 820 400"
                className="w-full h-full transition-transform duration-200"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'center center',
                }}
              >
                {/* Forest / Grazing Layer */}
                {layers.forestAreas && (
                  <path
                    d="M 50,50 L 180,50 L 150,140 L 50,130 Z"
                    fill={mapMode === 'cadastral' ? '#dcfce7' : '#064e3b'}
                    fillOpacity={mapMode === 'cadastral' ? 0.7 : 0.4}
                    stroke="#16a34a"
                    strokeWidth="1"
                    strokeDasharray="4 2"
                  />
                )}

                {/* Irrigation Canal / Water Body */}
                {layers.waterBodies && (
                  <path
                    d="M 60,390 Q 240,360 440,380 T 820,350"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeOpacity="0.8"
                  />
                )}

                {/* Proposed Project Corridor Buffer (Highway Alignment) */}
                {layers.corridor && (
                  <g>
                    {/* Highway Right-of-Way Buffer Zone */}
                    <path
                      d="M 60,260 L 860,200 L 860,290 L 60,350 Z"
                      fill="#f59e0b"
                      fillOpacity={mapMode === 'cadastral' ? 0.22 : 0.3}
                      stroke="#d97706"
                      strokeWidth="2"
                      strokeDasharray="6 3"
                    />
                    {/* Highway Centerline */}
                    <path
                      d="M 60,305 L 860,245"
                      fill="none"
                      stroke="#b45309"
                      strokeWidth="3"
                      strokeDasharray="8 6"
                    />
                    {/* Highway Corridor Label */}
                    <text
                      x="460"
                      y="270"
                      fill="#92400e"
                      fontSize="11"
                      fontWeight="bold"
                      fontFamily="system-ui"
                      textAnchor="middle"
                      className="pointer-events-none"
                    >
                      XYZ REGIONAL HIGHWAY CORRIDOR (PROPOSED 60m ROW)
                    </text>
                  </g>
                )}

                {/* Cadastral Land Parcels */}
                {layers.parcels &&
                  MOCK_PARCELS.map((parcel) => {
                    const isSelected = activeParcel.id === parcel.id;
                    const isProposedAcquisition = parcel.acquisitionStatus === 'Proposed';

                    let fillColor = mapMode === 'cadastral' ? '#f0fdf4' : '#1e3a2f';
                    let strokeColor = '#10b981';

                    if (isProposedAcquisition) {
                      fillColor = mapMode === 'cadastral' ? '#fef3c7' : '#78350f';
                      strokeColor = '#d97706';
                    }

                    if (isSelected) {
                      fillColor = mapMode === 'cadastral' ? '#dbeafe' : '#1e40af';
                      strokeColor = '#1d4ed8';
                    }

                    return (
                      <g
                        key={parcel.id}
                        onClick={() => onSelectParcel(parcel.id)}
                        className="cursor-pointer group"
                      >
                        <polygon
                          points={parcel.polygonPoints}
                          fill={fillColor}
                          fillOpacity={isSelected ? 0.8 : 0.55}
                          stroke={isSelected ? '#1d4ed8' : strokeColor}
                          strokeWidth={isSelected ? 3 : 1.5}
                          className="transition-all hover:fill-opacity-80"
                        />
                        {/* Survey Number Label */}
                        <text
                          x={
                            parcel.polygonPoints
                              .split(' ')[0]
                              .split(',')[0]
                          }
                          y={
                            parcel.polygonPoints
                              .split(' ')[0]
                              .split(',')[1]
                          }
                          dx="25"
                          dy="35"
                          fill={mapMode === 'cadastral' ? '#0f172a' : '#f8fafc'}
                          fontSize="11"
                          fontWeight={isSelected ? 'bold' : 'normal'}
                          fontFamily="monospace"
                          className="pointer-events-none select-none"
                        >
                          {parcel.surveyNumber}
                        </text>
                      </g>
                    );
                  })}
              </svg>

              {/* Map Floating Controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-1.5 bg-white/95 backdrop-blur-xs p-1.5 rounded-lg border border-slate-200 shadow-md">
                <button
                  onClick={() => setZoomLevel((z) => Math.min(2, z + 0.2))}
                  className="p-1.5 text-slate-700 hover:bg-slate-100 rounded transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.2))}
                  className="p-1.5 text-slate-700 hover:bg-slate-100 rounded transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="p-1.5 text-slate-700 hover:bg-slate-100 rounded transition-colors"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Map Legend Overlay */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xs p-3 rounded-lg border border-slate-200 text-xs shadow-md space-y-1.5 max-w-xs">
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block">
                  Map Legend
                </span>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-amber-200 border border-amber-500" />
                    <span>Proposed Highway ROW</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-emerald-100 border border-emerald-500" />
                    <span>Agricultural Parcel</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-blue-100 border border-blue-600" />
                    <span>Selected Holding</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-1 bg-sky-400" />
                    <span>Irrigation Canal</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Popup / Card for Clicked Parcel */}
          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200">
                  Survey No. {activeParcel.surveyNumber}
                </span>
                <span className="text-xs text-slate-500">
                  {activeParcel.subDivision || 'Main'} · {activeParcel.village}, {activeParcel.taluka}
                </span>
                {activeParcel.id === 'parcel-102-3' && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Your Land
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-700">
                <div>
                  <span className="text-slate-400 block text-[11px]">Area:</span>
                  <span className="font-bold text-slate-900 font-mono">
                    {activeParcel.areaHectares} hectares
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Land Type:</span>
                  <span className="font-semibold text-slate-900">
                    {activeParcel.landType}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Acquisition:</span>
                  <span className="font-bold text-amber-700">
                    {activeParcel.acquisitionStatus}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Project:</span>
                  <span className="font-semibold text-slate-900">
                    XYZ Regional Highway
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Corridor Overlap:</span>
                  <span className="font-bold font-mono text-rose-700">
                    {activeParcel.corridorOverlapPercentage}%
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onNavigateTab('land-details')}
                className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <span>View Land Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust notice */}
      <TrustBanner customMessage="Spatial coordinates and parcel geometries shown are synthetic vector boundaries for demonstration under Smart India Hackathon 2026." />
    </div>
  );
};
