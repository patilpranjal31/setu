import React from 'react';
import { Compass, User, Shield, BarChart3, HelpCircle } from 'lucide-react';
import { ActiveTab, UserRole } from '../../types';

interface HeaderProps {
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenDemoGuide: () => void;
  currentDemoStep: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeRole,
  setActiveRole,
  activeTab,
  setActiveTab,
  onOpenDemoGuide,
  currentDemoStep,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      {/* Zone 1, 2, 3 Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center font-bold text-xs tracking-wider shadow-xs">
              SETU
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 leading-none group-hover:text-blue-900 transition-colors">
                SETU
              </span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">
                National Land Governance Platform
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('home')}
            className={`hover:text-slate-900 transition-colors ${
              activeTab === 'home' ? 'text-blue-900 font-semibold border-b-2 border-blue-900 pb-0.5' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => {
              setActiveRole('citizen');
              setActiveTab('explore-map');
            }}
            className={`hover:text-slate-900 transition-colors ${
              activeTab === 'explore-map' ? 'text-blue-900 font-semibold border-b-2 border-blue-900 pb-0.5' : ''
            }`}
          >
            Explore Land
          </button>
          <button
            onClick={() => {
              setActiveRole('citizen');
              setActiveTab('project-details');
            }}
            className={`hover:text-slate-900 transition-colors ${
              activeTab === 'project-details' ? 'text-blue-900 font-semibold border-b-2 border-blue-900 pb-0.5' : ''
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => {
              setActiveRole('citizen');
              setActiveTab('what-it-means');
            }}
            className={`hover:text-slate-900 transition-colors ${
              activeTab === 'what-it-means' ? 'text-blue-900 font-semibold border-b-2 border-blue-900 pb-0.5' : ''
            }`}
          >
            Citizen Rights
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`hover:text-slate-900 transition-colors ${
              activeTab === 'architecture' ? 'text-blue-900 font-semibold border-b-2 border-blue-900 pb-0.5' : ''
            }`}
          >
            Architecture
          </button>
          <button
            onClick={() => {
              setActiveRole('government');
              setActiveTab('project-risk-delay');
            }}
            className={`hover:text-slate-900 transition-colors flex items-center gap-1 ${
              activeTab === 'project-risk-delay' ? 'text-rose-700 font-bold border-b-2 border-rose-700 pb-0.5' : 'text-slate-700 font-medium'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
            <span>Risk & Delay</span>
          </button>
        </nav>

        {/* Zone 3: Actions & Role Switcher */}
        <div className="flex items-center gap-2.5">
          {/* 18-step interactive walkthrough guide */}
          <button
            onClick={onOpenDemoGuide}
            className="px-3 py-1.5 text-xs font-semibold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs whitespace-nowrap"
            title="Open Platform Guided Tour"
          >
            <Compass className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span className="hidden sm:inline">Demo Tour</span>
            <span className="bg-emerald-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-mono">
              {currentDemoStep}/18
            </span>
          </button>

          {/* User Role Switcher segmented control */}
          <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200">
            <button
              onClick={() => {
                setActiveRole('citizen');
                if (activeTab === 'gov-dashboard' || activeTab === 'gov-project-analytics' || activeTab === 'researcher-dashboard' || activeTab === 'data-explorer') {
                  setActiveTab('citizen-dashboard');
                }
              }}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeRole === 'citizen'
                  ? 'bg-white text-blue-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3 h-3 text-blue-800" />
              <span>Citizen</span>
            </button>
            <button
              onClick={() => {
                setActiveRole('government');
                setActiveTab('gov-dashboard');
              }}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeRole === 'government'
                  ? 'bg-white text-blue-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Shield className="w-3 h-3 text-emerald-700" />
              <span>Government</span>
            </button>
            <button
              onClick={() => {
                setActiveRole('researcher');
                setActiveTab('researcher-dashboard');
              }}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeRole === 'researcher'
                  ? 'bg-white text-blue-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3 h-3 text-indigo-700" />
              <span>Researcher</span>
            </button>
          </div>
        </div>
      </div>

      {/* Role-specific Context Sub-Navigation Bar */}
      {activeTab !== 'home' && activeTab !== 'architecture' && (
        <div className="bg-slate-50 border-t border-slate-200 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto py-2">
            {activeRole === 'citizen' && (
              <div className="flex items-center gap-1 text-xs">
                <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider mr-2">
                  Citizen Portal:
                </span>
                <button
                  onClick={() => setActiveTab('citizen-dashboard')}
                  className={`px-3 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                    activeTab === 'citizen-dashboard'
                      ? 'bg-white text-blue-900 shadow-2xs font-semibold border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('explore-map')}
                  className={`px-3 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                    activeTab === 'explore-map'
                      ? 'bg-white text-blue-900 shadow-2xs font-semibold border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Explore Map
                </button>
                <button
                  onClick={() => setActiveTab('land-details')}
                  className={`px-3 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                    activeTab === 'land-details'
                      ? 'bg-white text-blue-900 shadow-2xs font-semibold border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Land Details (102/3)
                </button>
                <button
                  onClick={() => setActiveTab('project-details')}
                  className={`px-3 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                    activeTab === 'project-details'
                      ? 'bg-white text-blue-900 shadow-2xs font-semibold border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Highway Project
                </button>
                <button
                  onClick={() => setActiveTab('sia-insights')}
                  className={`px-3 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                    activeTab === 'sia-insights'
                      ? 'bg-white text-blue-900 shadow-2xs font-semibold border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  SIA Insights
                </button>
                <button
                  onClick={() => setActiveTab('what-it-means')}
                  className={`px-3 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                    activeTab === 'what-it-means'
                      ? 'bg-white text-blue-900 shadow-2xs font-semibold border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  What This Means For Me
                </button>
                <button
                  onClick={() => setActiveTab('compensation')}
                  className={`px-3 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                    activeTab === 'compensation'
                      ? 'bg-white text-blue-900 shadow-2xs font-semibold border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Compensation Estimator
                </button>
                <button
                  onClick={() => setActiveTab('ai-assistant')}
                  className={`px-3 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                    activeTab === 'ai-assistant'
                      ? 'bg-white text-blue-900 shadow-2xs font-semibold border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  SIA Document Assistant
                </button>
                <button
                  onClick={() => setActiveTab('grievances')}
                  className={`px-3 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                    activeTab === 'grievances'
                      ? 'bg-white text-blue-900 shadow-2xs font-semibold border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Grievances
                </button>
              </div>
            )}

            {activeRole === 'government' && (
              <div className="flex items-center gap-1 text-xs">
                <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider mr-2">
                  Administration:
                </span>
                <button
                  onClick={() => setActiveTab('gov-dashboard')}
                  className={`px-3 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                    activeTab === 'gov-dashboard'
                      ? 'bg-white text-blue-900 shadow-2xs font-semibold border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Command Center
                </button>
                <button
                  onClick={() => setActiveTab('project-risk-delay')}
                  className={`px-3 py-1 rounded-md font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    activeTab === 'project-risk-delay'
                      ? 'bg-rose-600 text-white shadow-2xs'
                      : 'text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
                  <span>Risk Delay Forecaster</span>
                </button>
                <button
                  onClick={() => setActiveTab('gov-project-analytics')}
                  className={`px-3 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                    activeTab === 'gov-project-analytics'
                      ? 'bg-white text-blue-900 shadow-2xs font-semibold border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Project Analytics (XYZ Highway)
                </button>
                <button
                  onClick={() => setActiveTab('explore-map')}
                  className={`px-3 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                    activeTab === 'explore-map'
                      ? 'bg-white text-blue-900 shadow-2xs font-semibold border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Cadastral GIS Map
                </button>
                <button
                  onClick={() => setActiveTab('grievances')}
                  className={`px-3 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                    activeTab === 'grievances'
                      ? 'bg-white text-blue-900 shadow-2xs font-semibold border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Grievance Monitoring
                </button>
              </div>
            )}

            {activeRole === 'researcher' && (
              <div className="flex items-center gap-1 text-xs">
                <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider mr-2">
                  Policy Lab:
                </span>
                <button
                  onClick={() => setActiveTab('researcher-dashboard')}
                  className={`px-3 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                    activeTab === 'researcher-dashboard'
                      ? 'bg-white text-blue-900 shadow-2xs font-semibold border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Research Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('data-explorer')}
                  className={`px-3 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                    activeTab === 'data-explorer'
                      ? 'bg-white text-blue-900 shadow-2xs font-semibold border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Dataset Explorer & CSV Export
                </button>
                <button
                  onClick={() => setActiveTab('sia-insights')}
                  className={`px-3 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                    activeTab === 'sia-insights'
                      ? 'bg-white text-blue-900 shadow-2xs font-semibold border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Impact Comparative Matrix
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
