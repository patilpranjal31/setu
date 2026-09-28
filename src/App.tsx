import React, { useState } from 'react';
import { UserRole, ActiveTab } from './types';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { TrustBanner } from './components/common/TrustBanner';
import { GuidedJourneyModal, DEMO_STEPS } from './components/common/GuidedJourneyModal';

// Views
import { LandingPage } from './components/landing/LandingPage';
import { CitizenDashboard } from './components/citizen/CitizenDashboard';
import { InteractiveMap } from './components/citizen/InteractiveMap';
import { LandDetailsPage } from './components/citizen/LandDetailsPage';
import { ProjectAcquisitionPage } from './components/citizen/ProjectAcquisitionPage';
import { SiaDashboard } from './components/citizen/SiaDashboard';
import { WhatItMeansPage } from './components/citizen/WhatItMeansPage';
import { CompensationEstimator } from './components/citizen/CompensationEstimator';
import { AiSiaAssistant } from './components/citizen/AiSiaAssistant';
import { GrievanceSystem } from './components/citizen/GrievanceSystem';

import { GovernmentDashboard } from './components/government/GovernmentDashboard';
import { GovernmentProjectAnalytics } from './components/government/GovernmentProjectAnalytics';
import { ProjectRiskDelayAnalyzer } from './components/government/ProjectRiskDelayAnalyzer';

import { ResearcherDashboard } from './components/researcher/ResearcherDashboard';
import { DataExplorer } from './components/researcher/DataExplorer';
import { DataArchitecturePage } from './components/architecture/DataArchitecturePage';

import { Compass, ChevronRight, ChevronLeft, Play, Sparkles } from 'lucide-react';

export default function App() {
  const [activeRole, setActiveRole] = useState<UserRole>('citizen');
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedParcelId, setSelectedParcelId] = useState<string>('parcel-102-3');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('proj-xyz-highway');

  // Interactive Guided Journey (18 Steps)
  const [demoStepIndex, setDemoStepIndex] = useState<number>(0);
  const [isDemoGuideOpen, setIsDemoGuideOpen] = useState<boolean>(false);
  const [isDemoBarVisible, setIsDemoBarVisible] = useState<boolean>(true);

  const handleNavigateStep = (stepIdx: number) => {
    const target = DEMO_STEPS[stepIdx];
    if (!target) return;
    setDemoStepIndex(stepIdx);
    setActiveRole(target.role);
    setActiveTab(target.targetTab);
    if (target.targetTab === 'explore-map' || target.targetTab === 'land-details') {
      setSelectedParcelId('parcel-102-3');
    }
    if (target.targetTab === 'gov-project-analytics' || target.targetTab === 'project-details' || target.targetTab === 'project-risk-delay') {
      setSelectedProjectId('proj-xyz-highway');
    }
  };

  const handleNextStep = () => {
    if (demoStepIndex < DEMO_STEPS.length - 1) {
      handleNavigateStep(demoStepIndex + 1);
    }
  };

  const handlePrevStep = () => {
    if (demoStepIndex > 0) {
      handleNavigateStep(demoStepIndex - 1);
    }
  };

  const handleSelectParcel = (parcelId: string) => {
    setSelectedParcelId(parcelId);
  };

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  const handleGeneralNavigate = (tab: ActiveTab, role?: UserRole) => {
    if (role) {
      setActiveRole(role);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentStep = DEMO_STEPS[demoStepIndex];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Universal Trust Banner at top */}
      <TrustBanner type="synthetic" />

      {/* Main Top Header */}
      <Header
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDemoGuide={() => setIsDemoGuideOpen(true)}
        currentDemoStep={demoStepIndex + 1}
      />

      {/* Guided Tour Floating Assistant Bar (Collapsible) */}
      {isDemoBarVisible && (
        <div className="bg-slate-900 text-white text-xs border-b border-slate-800 shadow-md transition-all">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsDemoGuideOpen(true)}
                className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 hover:bg-emerald-400"
              >
                <Compass className="w-3 h-3" />
                <span>Platform Guided Tour</span>
              </button>
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="font-bold text-white font-mono">Step {currentStep.step}/18:</span>
                <span className="font-semibold text-emerald-400">{currentStep.title}</span>
                <span className="hidden md:inline text-slate-400">— {currentStep.actionPrompt}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={demoStepIndex === 0}
                onClick={handlePrevStep}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 font-medium flex items-center gap-1"
                title="Previous Demo Step"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Prev</span>
              </button>

              <button
                onClick={() => setIsDemoGuideOpen(true)}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium"
              >
                All 18 Steps
              </button>

              <button
                disabled={demoStepIndex === DEMO_STEPS.length - 1}
                onClick={handleNextStep}
                className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 disabled:opacity-30 text-white font-semibold flex items-center gap-1 shadow-xs"
                title="Advance to Next Demo Step"
              >
                <span>Next Step</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <LandingPage
            onNavigateTab={handleGeneralNavigate}
            onOpenDemoGuide={() => setIsDemoGuideOpen(true)}
          />
        )}

        {/* Citizen Screens */}
        {activeTab === 'citizen-dashboard' && (
          <CitizenDashboard
            onNavigateTab={handleGeneralNavigate}
            onSelectParcel={handleSelectParcel}
          />
        )}

        {activeTab === 'explore-map' && (
          <InteractiveMap
            selectedParcelId={selectedParcelId}
            onSelectParcel={handleSelectParcel}
            onNavigateTab={handleGeneralNavigate}
          />
        )}

        {activeTab === 'land-details' && (
          <LandDetailsPage onNavigateTab={handleGeneralNavigate} />
        )}

        {activeTab === 'project-details' && (
          <ProjectAcquisitionPage onNavigateTab={handleGeneralNavigate} />
        )}

        {activeTab === 'sia-insights' && (
          <SiaDashboard onNavigateTab={handleGeneralNavigate} />
        )}

        {activeTab === 'what-it-means' && (
          <WhatItMeansPage onNavigateTab={handleGeneralNavigate} />
        )}

        {activeTab === 'compensation' && <CompensationEstimator />}

        {activeTab === 'ai-assistant' && <AiSiaAssistant />}

        {activeTab === 'grievances' && <GrievanceSystem />}

        {/* Government Screens */}
        {activeTab === 'gov-dashboard' && (
          <GovernmentDashboard
            onNavigateTab={handleGeneralNavigate}
            onSelectProject={handleSelectProject}
          />
        )}

        {activeTab === 'gov-project-analytics' && (
          <GovernmentProjectAnalytics
            projectId={selectedProjectId}
            onNavigateTab={handleGeneralNavigate}
          />
        )}

        {activeTab === 'project-risk-delay' && (
          <ProjectRiskDelayAnalyzer
            projectId={selectedProjectId}
            onNavigateTab={handleGeneralNavigate}
            onSelectProject={handleSelectProject}
          />
        )}

        {/* Researcher Screens */}
        {activeTab === 'researcher-dashboard' && (
          <ResearcherDashboard onNavigateTab={handleGeneralNavigate} />
        )}

        {activeTab === 'data-explorer' && <DataExplorer />}

        {/* Architecture Page */}
        {activeTab === 'architecture' && (
          <DataArchitecturePage onNavigateTab={handleGeneralNavigate} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigateTab={handleGeneralNavigate} />

      {/* 18-Step Interactive Guide Modal */}
      <GuidedJourneyModal
        currentStepIndex={demoStepIndex}
        isOpen={isDemoGuideOpen}
        onClose={() => setIsDemoGuideOpen(false)}
        onNavigateStep={handleNavigateStep}
      />
    </div>
  );
}
