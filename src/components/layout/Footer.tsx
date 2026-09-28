import React from 'react';
import { ShieldCheck, BookOpen, ExternalLink, Database } from 'lucide-react';
import { ActiveTab, UserRole } from '../../types';

interface FooterProps {
  onNavigateTab: (tab: ActiveTab, role?: UserRole) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-auto">
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand & Mission */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-blue-700 text-white flex items-center justify-center font-bold text-xs">
              SETU
            </div>
            <span className="text-white font-bold text-base tracking-tight">SETU</span>
          </div>
          <p className="text-slate-300 text-xs leading-relaxed">
            National Digital Platform for Research, Policy Innovation & Evidence-Based Land Governance.
          </p>
          <div className="pt-1">
            <span className="inline-block px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-[11px] text-emerald-400 font-medium">
              Smart India Hackathon 2026 Prototype
            </span>
          </div>
        </div>

        {/* Stakeholder Portals */}
        <div className="space-y-2">
          <h5 className="text-white font-semibold text-xs uppercase tracking-wider">Stakeholder Portals</h5>
          <ul className="space-y-1.5 text-slate-300">
            <li>
              <button
                onClick={() => onNavigateTab('citizen-dashboard', 'citizen')}
                className="hover:text-white transition-colors"
              >
                Citizen & Landowner Portal
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTab('gov-dashboard', 'government')}
                className="hover:text-white transition-colors"
              >
                Government Command Center
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTab('researcher-dashboard', 'researcher')}
                className="hover:text-white transition-colors"
              >
                Policy & Research Intelligence Lab
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTab('data-explorer', 'researcher')}
                className="hover:text-white transition-colors"
              >
                Open Datasets & CSV Export
              </button>
            </li>
          </ul>
        </div>

        {/* Core Capabilities */}
        <div className="space-y-2">
          <h5 className="text-white font-semibold text-xs uppercase tracking-wider">Key Tools</h5>
          <ul className="space-y-1.5 text-slate-300">
            <li>
              <button
                onClick={() => onNavigateTab('explore-map', 'citizen')}
                className="hover:text-white transition-colors"
              >
                Cadastral Parcel GIS Map
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTab('compensation', 'citizen')}
                className="hover:text-white transition-colors"
              >
                RFCTLARR Compensation Estimator
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTab('ai-assistant', 'citizen')}
                className="hover:text-white transition-colors"
              >
                SIA Document Assistant (AI)
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTab('grievances', 'citizen')}
                className="hover:text-white transition-colors"
              >
                Public Grievance Redressal
              </button>
            </li>
          </ul>
        </div>

        {/* Interoperability & Legal Framework */}
        <div className="space-y-2">
          <h5 className="text-white font-semibold text-xs uppercase tracking-wider">Statutory Standards</h5>
          <p className="text-slate-400 text-xs leading-relaxed">
            Formulated around the Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013 (RFCTLARR).
          </p>
          <div className="pt-2 space-y-1 text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-slate-400" />
              <span>Interoperable with DILRMP & Bhuvan</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Evidence-based decision architecture</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Disclaimer */}
      <div className="border-t border-slate-800 bg-slate-950 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div>
            <span>© 2026 SETU Prototype · Smart India Hackathon Submission</span>
            <span className="mx-2">·</span>
            <span className="text-amber-400/90">Synthetic Demonstration Data — not official government determinations</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Security: SHA-256 Validated</span>
            <span>·</span>
            <span>Version: 2026.1-BETA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
