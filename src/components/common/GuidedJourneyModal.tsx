import React from 'react';
import { CheckCircle2, ChevronRight, ChevronLeft, Play, Sparkles, X, Compass } from 'lucide-react';
import { ActiveTab, UserRole } from '../../types';

export interface DemoStep {
  step: number;
  title: string;
  role: UserRole;
  targetTab: ActiveTab;
  actionPrompt: string;
  details: string;
}

export const DEMO_STEPS: DemoStep[] = [
  {
    step: 1,
    title: 'Open Citizen Dashboard',
    role: 'citizen',
    targetTab: 'citizen-dashboard',
    actionPrompt: 'View personalized farmer portal',
    details: 'View Rajesh Patil’s land dashboard in Examplegaon with immediate acquisition status alert.',
  },
  {
    step: 2,
    title: 'View Affected Land Alert',
    role: 'citizen',
    targetTab: 'citizen-dashboard',
    actionPrompt: 'Review highway corridor alert banner',
    details: 'Note the high-priority notification: "Your land falls within the proposed area for XYZ Regional Highway Project".',
  },
  {
    step: 3,
    title: 'Open Interactive Cadastral Map',
    role: 'citizen',
    targetTab: 'explore-map',
    actionPrompt: 'Inspect GIS parcel boundaries',
    details: 'Navigate to cadastral map with vector survey boundaries and proposed highway right-of-way corridor buffer.',
  },
  {
    step: 4,
    title: 'Click Survey No. 102/3',
    role: 'citizen',
    targetTab: 'explore-map',
    actionPrompt: 'Select Survey 102/3 polygon',
    details: 'Click Rajesh’s parcel polygon (102/3) to inspect 82% corridor overlap and parcel popup.',
  },
  {
    step: 5,
    title: 'Open Land Details',
    role: 'citizen',
    targetTab: 'land-details',
    actionPrompt: 'Examine official digital records',
    details: 'Inspect 2.4 ha agricultural record with certified 7/12 extract, mutation 8A, and gazette notice.',
  },
  {
    step: 6,
    title: 'Click View Project',
    role: 'citizen',
    targetTab: 'project-details',
    actionPrompt: 'Open XYZ Regional Highway Project page',
    details: 'Understand the infrastructure purpose, budget (₹1,840 Cr), and 8 affected villages.',
  },
  {
    step: 7,
    title: 'Review Acquisition Timeline & SIA',
    role: 'citizen',
    targetTab: 'project-details',
    actionPrompt: 'Check multi-stage acquisition progress',
    details: 'Follow RFCTLARR 2013 milestone progression: Sec 11 -> SIA -> Public Consultation (current).',
  },
  {
    step: 8,
    title: 'Click "What Does This Mean For Me?"',
    role: 'citizen',
    targetTab: 'what-it-means',
    actionPrompt: 'Demystify legal proceedings in plain language',
    details: 'Translate complex statutory procedures into clear, accessible step-by-step guidance.',
  },
  {
    step: 9,
    title: 'Review Citizen Rights & Options',
    role: 'citizen',
    targetTab: 'what-it-means',
    actionPrompt: 'Understand statutory rights under RFCTLARR',
    details: 'Learn about rights to public hearings, certified notices, rehabilitation entitlements, and objections.',
  },
  {
    step: 10,
    title: 'Open Compensation Estimator',
    role: 'citizen',
    targetTab: 'compensation',
    actionPrompt: 'Simulate RFCTLARR 2013 compensation',
    details: 'Configure 2.4 hectares rural agricultural land, 1.5x rural multiplier, and 100% Solatium.',
  },
  {
    step: 11,
    title: 'Review Illustrative Compensation Breakdown',
    role: 'citizen',
    targetTab: 'compensation',
    actionPrompt: 'Inspect transparent formula components',
    details: 'View breakdown: Base Market Value + Rural Multiplier + Statutory Solatium + Assets & Trees valuation.',
  },
  {
    step: 12,
    title: 'Open SIA Document Assistant',
    role: 'citizen',
    targetTab: 'ai-assistant',
    actionPrompt: 'Simulate AI analysis of 142-page SIA PDF',
    details: 'Pre-loaded with SIA_Report_XYZ_Project.pdf, with automatic extraction of affected villages and concerns.',
  },
  {
    step: 13,
    title: 'Ask Community Concerns Question',
    role: 'citizen',
    targetTab: 'ai-assistant',
    actionPrompt: 'Query: "What are the major concerns raised by affected communities?"',
    details: 'Get evidence-grounded answers with exact section citations (e.g. SIA Section 4.2).',
  },
  {
    step: 14,
    title: 'Submit a Citizen Grievance',
    role: 'citizen',
    targetTab: 'grievances',
    actionPrompt: 'File formal objection with tracking ID',
    details: 'Submit an irrigation borewell realignment grievance; receive tracking ID LG-2026-001284 with live timeline.',
  },
  {
    step: 15,
    title: 'Command Center & District Risk Heatmap',
    role: 'government',
    targetTab: 'gov-dashboard',
    actionPrompt: 'Open Land Governance Command Center & Heatmap',
    details: 'View projects with color-coded risk scores (High/Medium/Low), interactive District Risk Heatmap across Maharashtra, and ranked risk tables.',
  },
  {
    step: 16,
    title: 'SHAP Explainability, What-If Simulator & Alert Simulation',
    role: 'government',
    targetTab: 'project-risk-delay',
    actionPrompt: 'Inspect SHAP factor breakdown, test what-if levers & fire mock alert',
    details: 'Click into project to see SHAP factor breakdown ("why is this project high-risk"), test interactive what-if levers to compress delay days, fire live threshold alert simulation with audio ping, and notify field engineers.',
  },
  {
    step: 17,
    title: 'Switch to Researcher / Policy Analyst Mode',
    role: 'researcher',
    targetTab: 'researcher-dashboard',
    actionPrompt: 'Open Research & Policy Intelligence hub',
    details: 'Explore aggregated policy datasets, cross-project comparison matrix, and displacement indices.',
  },
  {
    step: 18,
    title: 'Data Explorer & Live CSV Export',
    role: 'researcher',
    targetTab: 'data-explorer',
    actionPrompt: 'Filter and export synthetic datasets',
    details: 'Filter land acquisition and SIA records across districts and download local CSV for empirical research.',
  },
];

interface GuidedJourneyModalProps {
  currentStepIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigateStep: (stepIndex: number) => void;
}

export const GuidedJourneyModal: React.FC<GuidedJourneyModalProps> = ({
  currentStepIndex,
  isOpen,
  onClose,
  onNavigateStep,
}) => {
  if (!isOpen) return null;

  const currentStep = DEMO_STEPS[currentStepIndex];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-xs">
              TOUR
            </div>
            <div>
              <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                Interactive Platform Guide
              </div>
              <h3 className="font-bold text-base text-white">
                18-Step End-to-End Evaluation Journey
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current active step spotlight */}
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold text-blue-900">
              Step {currentStep.step} of 18
            </span>
            <span className="capitalize px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-medium">
              Role: {currentStep.role}
            </span>
          </div>

          <h4 className="text-lg font-bold text-slate-900 mb-1">
            {currentStep.title}
          </h4>
          <p className="text-sm text-slate-600 mb-4">{currentStep.details}</p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onNavigateStep(currentStepIndex);
                onClose();
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Go to Step {currentStep.step} Screen</span>
            </button>
            <span className="text-xs text-slate-500 italic">
              Goal: {currentStep.actionPrompt}
            </span>
          </div>
        </div>

        {/* All 18 Steps list */}
        <div className="p-4 overflow-y-auto flex-1 divide-y divide-slate-100">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 pb-2">
            Complete Journey Checklist
          </div>
          {DEMO_STEPS.map((s, idx) => {
            const isCurrent = idx === currentStepIndex;
            const isCompleted = idx < currentStepIndex;
            return (
              <button
                key={s.step}
                onClick={() => {
                  onNavigateStep(idx);
                  onClose();
                }}
                className={`w-full text-left p-3 rounded-lg flex items-center justify-between gap-3 text-xs transition-colors ${
                  isCurrent
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 ${
                      isCurrent
                        ? 'bg-blue-900 text-white'
                        : isCompleted
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : s.step}
                  </div>
                  <div className="truncate">
                    <span className="font-semibold text-slate-900 block truncate">
                      {s.title}
                    </span>
                    <span className="text-slate-500 text-[11px] truncate block">
                      {s.actionPrompt}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] uppercase font-medium text-slate-500">
                    {s.role}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer controls */}
        <div className="px-6 py-3 border-t border-slate-200 bg-white flex items-center justify-between text-xs">
          <button
            disabled={currentStepIndex === 0}
            onClick={() => onNavigateStep(Math.max(0, currentStepIndex - 1))}
            className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 flex items-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <span className="text-slate-500">
            Progress: {Math.round(((currentStepIndex + 1) / 18) * 100)}%
          </span>
          <button
            disabled={currentStepIndex === DEMO_STEPS.length - 1}
            onClick={() => onNavigateStep(Math.min(DEMO_STEPS.length - 1, currentStepIndex + 1))}
            className="px-3 py-1.5 bg-blue-900 text-white rounded-lg hover:bg-blue-800 disabled:opacity-40 flex items-center gap-1.5"
          >
            Next Step
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
