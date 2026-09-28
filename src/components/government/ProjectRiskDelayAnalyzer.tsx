import React, { useState } from 'react';
import {
  ArrowLeft,
  AlertTriangle,
  Clock,
  Send,
  CheckCircle2,
  TrendingDown,
  Calendar,
  AlertOctagon,
  FileText,
  Sliders,
  Users,
  ShieldAlert,
  BellRing,
  Download,
  PhoneCall,
  Mail,
  MessageSquare,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import { MOCK_PROJECTS } from '../../data/mockData';
import {
  MOCK_ENGINEERS,
  PROJECT_DELAY_REASONS,
  INITIAL_SENT_ALERTS,
  calculateProjectDelayRisk,
  SimulationFactors,
  EngineerContact
} from '../../data/riskDelayData';
import { AcquisitionProject, ActiveTab, DelayReason, EngineerAlert } from '../../types';
import { TrustBanner } from '../common/TrustBanner';
import { ShapFactorBreakdown } from './ShapFactorBreakdown';
import { getProjectShapAnalysis } from '../../data/shapFactorData';
import { LiveRiskAlertSimulator } from './LiveRiskAlertSimulator';

interface ProjectRiskDelayAnalyzerProps {
  projectId: string;
  onNavigateTab: (tab: ActiveTab) => void;
  onSelectProject?: (projId: string) => void;
}

export const ProjectRiskDelayAnalyzer: React.FC<ProjectRiskDelayAnalyzerProps> = ({
  projectId,
  onNavigateTab,
  onSelectProject,
}) => {
  const [selectedProjId, setSelectedProjId] = useState<string>(projectId || 'proj-xyz-highway');
  const project = MOCK_PROJECTS.find((p) => p.id === selectedProjId) || MOCK_PROJECTS[0];

  // Simulation controls state
  const [simulation, setSimulation] = useState<SimulationFactors>({
    grievanceResolutionBoost: 0,
    compensationAcceleration: 0,
    fastTrackDesignVariation: false,
    expediteRevenueMutations: false,
  });

  // Delay reasons for this project (or fallback)
  const defaultReasons = PROJECT_DELAY_REASONS[selectedProjId] || PROJECT_DELAY_REASONS['proj-xyz-highway'];
  const [reasons, setReasons] = useState<DelayReason[]>(defaultReasons);

  // Recalculate when project changes
  const handleProjectChange = (newProjId: string) => {
    setSelectedProjId(newProjId);
    if (onSelectProject) onSelectProject(newProjId);
    const newReasons = PROJECT_DELAY_REASONS[newProjId] || PROJECT_DELAY_REASONS['proj-xyz-highway'];
    setReasons(newReasons);
    // Reset simulation
    setSimulation({
      grievanceResolutionBoost: 0,
      compensationAcceleration: 0,
      fastTrackDesignVariation: false,
      expediteRevenueMutations: false,
    });
  };

  // Run the calculation engine
  const calculation = calculateProjectDelayRisk(project, reasons, simulation);
  const shapAnalysis = getProjectShapAnalysis(selectedProjId);

  // Notification state
  const [selectedEngineers, setSelectedEngineers] = useState<string[]>(
    MOCK_ENGINEERS.filter((e) => e.selectedByDefault).map((e) => e.id)
  );
  const [channels, setChannels] = useState<string[]>([
    'Email Memo',
    'SMS Alert',
    'WhatsApp Gateway',
    'PMIS Push',
  ]);
  const [alertSeverity, setAlertSeverity] = useState<
    'Critical (Red Alert)' | 'High Priority (Amber)' | 'Routine Advisory (Yellow)'
  >(
    calculation.riskCategory === 'Critical'
      ? 'Critical (Red Alert)'
      : calculation.riskCategory === 'High'
      ? 'High Priority (Amber)'
      : 'Routine Advisory (Yellow)'
  );

  const [customDirectives, setCustomDirectives] = useState(
    `Immediate site intervention required: Convene special joint camp court with CALA Pune East and PWD Executive Engineer to resolve canal severance objections and expedite escrow award releases.`
  );

  const [isSending, setIsSending] = useState(false);
  const [sendSuccessMessage, setSendSuccessMessage] = useState<string | null>(null);

  // Sent alerts log (persisted in localStorage or initial)
  const [sentAlerts, setSentAlerts] = useState<EngineerAlert[]>(() => {
    const saved = localStorage.getItem('setu_sent_engineer_alerts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_SENT_ALERTS;
      }
    }
    return INITIAL_SENT_ALERTS;
  });

  const toggleEngineer = (engId: string) => {
    if (selectedEngineers.includes(engId)) {
      if (selectedEngineers.length > 1) {
        setSelectedEngineers(selectedEngineers.filter((id) => id !== engId));
      }
    } else {
      setSelectedEngineers([...selectedEngineers, engId]);
    }
  };

  const toggleChannel = (channel: string) => {
    if (channels.includes(channel)) {
      if (channels.length > 1) {
        setChannels(channels.filter((c) => c !== channel));
      }
    } else {
      setChannels([...channels, channel]);
    }
  };

  const handleDispatchNotification = () => {
    setIsSending(true);
    setSendSuccessMessage(null);

    setTimeout(() => {
      const recipientObjects = MOCK_ENGINEERS.filter((e) =>
        selectedEngineers.includes(e.id)
      ).map((e) => ({
        name: e.name,
        role: e.role,
        department: e.department,
        email: e.email,
        phone: e.phone,
      }));

      const newAlert: EngineerAlert = {
        id: `alert-${Date.now()}`,
        dispatchId: `SETU-ENG-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        projectId: project.id,
        projectName: project.name,
        projectCode: project.code,
        dispatchedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
        severity: alertSeverity,
        subject: `URGENT PROJECT DELAY ADVISORY: +${calculation.delayDays} Days Forecast on ${project.code}`,
        projectedDelayDays: calculation.delayDays,
        projectedDelayMonths: `${calculation.delayMonths} Months`,
        estimatedCostOverrunCr: calculation.costEscalationCr,
        recipients: recipientObjects,
        channels: channels as any,
        summaryReasons: reasons.map((r) => `${r.title} (+${r.delayDays}d)`),
        mitigationDirectives: customDirectives,
        status: 'Dispatched & Acknowledged',
      };

      const updated = [newAlert, ...sentAlerts];
      setSentAlerts(updated);
      try {
        localStorage.setItem('setu_sent_engineer_alerts', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }

      setIsSending(false);
      setSendSuccessMessage(
        `Dispatched successfully! Reference: ${newAlert.dispatchId} sent to ${recipientObjects.length} engineers across ${channels.length} channels.`
      );
    }, 900);
  };

  const handleDownloadNotice = () => {
    const content = `GOVERNMENT OF MAHARASHTRA / NATIONAL HIGHWAYS AUTHORITY OF INDIA
OFFICE OF THE SUPERINTENDING ENGINEER & CALA MONITORING CELL
FORM ENG-7: STATUTORY PROJECT DELAY & RISK ADVISORY NOTICE

Dispatch ID: SETU-ENG-2026-${Math.floor(1000 + Math.random() * 9000)}
Date & Time: ${new Date().toLocaleString('en-IN')}
Project Name: ${project.name}
Project Code: ${project.code}
Current Status: ${project.status}
Jurisdiction: ${project.districts.join(', ')} (${project.state})
Proposing Authority: ${project.proposingAuthority}

========================================================================
1. QUANTITATIVE DELAY & RISK FORECAST
========================================================================
Calculated Critical Path Delay: ${calculation.delayDays} Days (${calculation.delayMonths} Months)
Baseline Scheduled Commissioning: ${calculation.baseDateFormatted}
Revised Forecast Commissioning: ${calculation.revisedDateFormatted}
Composite Risk Index Score: ${calculation.riskScore} / 100 (${calculation.riskCategory.toUpperCase()} ALERT)
Estimated Idle Machinery & Cost Overrun Escalation: ₹ ${calculation.costEscalationCr} Crores

========================================================================
2. ITEMIZED ROOT CAUSES FOR PROJECT DELAY
========================================================================
${reasons
  .map(
    (r, idx) => `
[Bottleneck ${idx + 1}] ${r.title.toUpperCase()}
Category: ${r.category} | Severity: ${r.severity}
Delay Contribution: +${r.delayDays} Days
Location / Chainage: ${r.locationChainage}
Affected Units: ${r.affectedUnits}
Statutory Reference: ${r.statutoryReference}
Detailed Impact:
${r.description}
Engineering Mitigation Directive:
${r.mitigationRecommendation}
`
  )
  .join('\n------------------------------------------------------------------------')}

========================================================================
3. EXECUTIVE DIRECTIVES & ACTION MANDATE
========================================================================
${customDirectives}

Action Required By:
- Chief Resident Engineer & Project Director (NHAI / PWD)
- Executive Engineer (RoW & Utility Relocation)
- Competent Authority for Land Acquisition (CALA)
- Social Impact Assessment & Resettlement Director

[Certified Digital Dispatch — SETU Platform / National Land Governance Platform]
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SETU_Form_ENG7_Delay_Notice_${project.code}_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header & Breadcrumbs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigateTab('gov-dashboard')}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Command Center</span>
          </button>

          <button
            onClick={() => onNavigateTab('gov-project-analytics')}
            className="text-xs font-semibold text-blue-900 hover:text-blue-700 flex items-center gap-1"
          >
            <span>View Administrative Overview</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1">
                <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
                <span>Predictive Risk Engine</span>
              </span>
              <span className="text-xs font-semibold text-blue-900 uppercase tracking-wider">
                RFCTLARR Act 2013 & PWD Corridor Interoperable
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Project Risk & Delay Forecaster
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
              Synthesizes land parcel acquisition deficits, Section 15 public grievance clusters, statutory approval milestones, and CALA escrow disbursement velocity to calculate quantitative project completion delays and dispatch alerts to field engineers.
            </p>
          </div>

          {/* Project Selector Dropdown */}
          <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-medium text-slate-500 whitespace-nowrap pl-1">
              Active Project:
            </span>
            <select
              value={selectedProjId}
              onChange={(e) => handleProjectChange(e.target.value)}
              className="text-xs font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {MOCK_PROJECTS.map((proj) => (
                <option key={proj.id} value={proj.id}>
                  {proj.name} ({proj.code})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Quick Jump Navigation Bar */}
      <div className="flex flex-wrap items-center gap-2 pb-2">
        <a
          href="#metrics-highlights"
          className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-2xs"
        >
          Key Metrics
        </a>
        <a
          href="#shap-factors-section"
          className="px-3 py-1.5 rounded-lg bg-purple-50 border border-purple-200 text-purple-900 hover:bg-purple-100 text-xs font-bold shadow-2xs flex items-center gap-1"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-700" />
          <span>SHAP Factor Breakdown (&quot;Why High-Risk?&quot;)</span>
        </a>
        <a
          href="#what-if-simulator-section"
          className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white hover:bg-slate-800 text-xs font-bold shadow-2xs flex items-center gap-1"
        >
          <Sliders className="w-3.5 h-3.5 text-emerald-400" />
          <span>What-If Simulator</span>
        </a>
        <a
          href="#live-alert-simulation-section"
          className="px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-900 hover:bg-rose-100 text-xs font-bold shadow-2xs flex items-center gap-1"
        >
          <BellRing className="w-3.5 h-3.5 text-rose-600" />
          <span>Live Alert Simulation</span>
        </a>
        <a
          href="#root-causes-section"
          className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-2xs"
        >
          Itemized Bottlenecks ({reasons.length})
        </a>
        <a
          href="#notify-engineers-section"
          className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 hover:bg-blue-100 text-xs font-bold shadow-2xs"
        >
          Dispatch Console
        </a>
      </div>

      {/* Top 5 Critical Calculation Highlights */}
      <div id="metrics-highlights" className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Metric 1: Calculated Delay Period */}
        <div className="bg-white p-4 rounded-xl border-2 border-rose-200 shadow-xs space-y-1.5 bg-gradient-to-br from-white to-rose-50/40">
          <div className="flex items-center justify-between text-xs text-rose-800 font-semibold">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-rose-600" />
              <span>Projected Delay</span>
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-200 text-rose-950 font-bold uppercase">
              Critical
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-rose-700 font-mono tracking-tight">
            +{calculation.delayDays} <span className="text-sm font-sans font-medium text-rose-800">Days</span>
          </div>
          <span className="text-xs text-slate-600 block">
            Approx. <strong className="text-slate-900">{calculation.delayMonths} months</strong> slippage
          </span>
        </div>

        {/* Metric 2: Revised Target Date */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>Forecast Date</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">Target</span>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono">
            {calculation.revisedDateFormatted}
          </div>
          <span className="text-[11px] text-slate-500 block">
            Baseline: <del className="text-slate-400">{calculation.baseDateFormatted}</del>
          </span>
        </div>

        {/* Metric 3: Financial Cost Overrun */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Projected Overrun</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-bold">
              Escalation
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-700 font-mono tracking-tight">
            ₹ {calculation.costEscalationCr} <span className="text-sm font-sans font-medium text-amber-800">Cr</span>
          </div>
          <span className="text-[11px] text-slate-500 block">
            Idle machinery & price index impact
          </span>
        </div>

        {/* Metric 4: Risk Index Score */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Composite Risk</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                calculation.riskCategory === 'Critical'
                  ? 'bg-rose-100 text-rose-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {calculation.riskCategory}
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
            {calculation.riskScore}<span className="text-sm font-sans text-slate-400">/100</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                calculation.riskScore > 70
                  ? 'bg-rose-600'
                  : calculation.riskScore > 40
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${calculation.riskScore}%` }}
            />
          </div>
        </div>

        {/* Metric 5: Active Statutory Bottlenecks */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1.5 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Identified Causes</span>
            <span className="text-[10px] text-slate-400">RFCTLARR</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
            {reasons.length} <span className="text-sm font-sans font-medium text-slate-500">Factors</span>
          </div>
          <span className="text-[11px] text-rose-700 font-medium block">
            {calculation.criticalBottlenecksCount} high-severity bottlenecks
          </span>
        </div>
      </div>

      {/* SHAP Factor Breakdown Section */}
      <div id="shap-factors-section">
        <ShapFactorBreakdown
          shapAnalysis={shapAnalysis}
          onOpenWhatIf={() => {
            const el = document.getElementById('what-if-simulator-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onNotifyEngineers={() => {
            const el = document.getElementById('notify-engineers-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          interactiveDelta={
            calculation.rawDelayDays - calculation.delayDays > 0
              ? Math.round((calculation.rawDelayDays - calculation.delayDays) * 0.35)
              : 0
          }
        />
      </div>

      {/* Interactive What-If Mitigation Workbench */}
      <div id="what-if-simulator-section" className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Interactive Mitigation Simulator (What-If Levers)</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold uppercase tracking-wider">
                  Live Engine
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Adjust administrative interventions to see how fast-track dispute resolutions immediately compress project delay days and avert fiscal cost overruns.
              </p>
            </div>
          </div>

          <button
            onClick={() =>
              setSimulation({
                grievanceResolutionBoost: 0,
                compensationAcceleration: 0,
                fastTrackDesignVariation: false,
                expediteRevenueMutations: false,
              })
            }
            className="text-xs font-semibold text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors self-start sm:self-auto"
          >
            Reset Levers
          </button>
        </div>

        {/* Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Lever 1: Grievance Resolution */}
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/70 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-200">Grievance Fast-Track</span>
              <span className="text-emerald-400 font-mono font-bold">
                {simulation.grievanceResolutionBoost}% resolved
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={10}
              value={simulation.grievanceResolutionBoost}
              onChange={(e) =>
                setSimulation({
                  ...simulation,
                  grievanceResolutionBoost: parseInt(e.target.value),
                })
              }
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <p className="text-[10px] text-slate-400 leading-snug">
              Fast-track resolving irrigation canal severance objections in Examplegaon & Rampur.
            </p>
          </div>

          {/* Lever 2: Compensation Acceleration */}
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/70 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-200">Compensation DBT Speed</span>
              <span className="text-emerald-400 font-mono font-bold">
                +{simulation.compensationAcceleration}% speed
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={10}
              value={simulation.compensationAcceleration}
              onChange={(e) =>
                setSimulation({
                  ...simulation,
                  compensationAcceleration: parseInt(e.target.value),
                })
              }
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <p className="text-[10px] text-slate-400 leading-snug">
              Disburse remaining 57% award to landholders to lift Section 38 possession resistance.
            </p>
          </div>

          {/* Lever 3: Fast-Track Design Variation */}
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/70 flex flex-col justify-between space-y-2">
            <div>
              <span className="text-xs font-semibold text-slate-200 block">
                Box-Culvert Design Variation
              </span>
              <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                Issue advance variation for 2 box culverts and agricultural cattle underpass at Ch 16+400.
              </p>
            </div>
            <button
              onClick={() =>
                setSimulation({
                  ...simulation,
                  fastTrackDesignVariation: !simulation.fastTrackDesignVariation,
                })
              }
              className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                simulation.fastTrackDesignVariation
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {simulation.fastTrackDesignVariation ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Approved (-22 Days)</span>
                </>
              ) : (
                <span>Approve Variation (-22 Days)</span>
              )}
            </button>
          </div>

          {/* Lever 4: Special Revenue Camp Court */}
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/70 flex flex-col justify-between space-y-2">
            <div>
              <span className="text-xs font-semibold text-slate-200 block">
                Special Revenue Camp Court
              </span>
              <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                Convene joint Tehsildar camp to resolve 24 disputed heirship mutations on site.
              </p>
            </div>
            <button
              onClick={() =>
                setSimulation({
                  ...simulation,
                  expediteRevenueMutations: !simulation.expediteRevenueMutations,
                })
              }
              className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                simulation.expediteRevenueMutations
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {simulation.expediteRevenueMutations ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Deployed (-16 Days)</span>
                </>
              ) : (
                <span>Deploy Special Camp (-16 Days)</span>
              )}
            </button>
          </div>
        </div>

        {/* Live Simulation Comparison Banner */}
        <div className="p-4 bg-emerald-950/60 rounded-xl border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <TrendingDown className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <span className="font-bold text-white block">
                Simulation Impact Result:
              </span>
              <span className="text-slate-300">
                Baseline Delay was <strong className="text-rose-400 font-mono">{calculation.rawDelayDays} Days</strong>. With configured interventions, projected delay reduces to <strong className="text-emerald-400 font-mono">{calculation.delayDays} Days</strong>.
              </span>
            </div>
          </div>
          <div className="text-right whitespace-nowrap self-start sm:self-auto pl-7 sm:pl-0">
            <span className="text-[11px] text-slate-400 block">Net Schedule Saved:</span>
            <span className="text-base font-extrabold text-emerald-400 font-mono">
              +{calculation.rawDelayDays - calculation.delayDays} Days Saved
            </span>
          </div>
        </div>
      </div>

      {/* Itemized Reasons for Delay Section */}
      <div id="root-causes-section" className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-widest px-2.5 py-0.5 rounded bg-blue-50 border border-blue-200">
                Root Cause Synthesis
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {reasons.length} Bottlenecks Mapped
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1">
              Itemized Contributing Reasons for Project Delay
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Specific statutory, technical, social, and fiscal friction points impeding Right-of-Way (RoW) acquisition
            </p>
          </div>

          <button
            onClick={handleDownloadNotice}
            className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto border border-slate-200"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>Download Form ENG-7 Report</span>
          </button>
        </div>

        {/* Reasons Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reasons.map((reason, idx) => (
            <div
              key={reason.id}
              className={`p-5 rounded-xl border flex flex-col justify-between space-y-4 transition-all ${
                reason.severity === 'Critical'
                  ? 'bg-rose-50/40 border-rose-200 hover:border-rose-300'
                  : reason.severity === 'High'
                  ? 'bg-amber-50/40 border-amber-200 hover:border-amber-300'
                  : 'bg-slate-50 border-slate-200 hover:border-blue-200'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-bold">
                    Bottleneck #{idx + 1}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        reason.severity === 'Critical'
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : reason.severity === 'High'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-blue-100 text-blue-900 border border-blue-200'
                      }`}
                    >
                      {reason.severity}
                    </span>
                    <span className="text-xs font-mono font-extrabold text-rose-700 bg-white px-2 py-0.5 rounded border border-rose-200">
                      +{reason.delayDays}d
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wide block">
                    {reason.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 leading-snug mt-0.5">
                    {reason.title}
                  </h3>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 bg-white/70 p-3 rounded-lg border border-slate-200/60">
                  <div className="flex items-start gap-1.5">
                    <strong className="text-slate-800 shrink-0">Location:</strong>
                    <span>{reason.locationChainage}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <strong className="text-slate-800 shrink-0">Affected Units:</strong>
                    <span>{reason.affectedUnits}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <strong className="text-slate-800 shrink-0">Statute:</strong>
                    <span className="text-blue-900 font-medium">{reason.statutoryReference}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">
                  {reason.description}
                </p>
              </div>

              {/* Mitigation Directive Box */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs space-y-1">
                <span className="font-bold text-emerald-950 flex items-center gap-1 text-[11px] uppercase tracking-wide">
                  <Sparkles className="w-3 h-3 text-emerald-700" />
                  <span>Mandated Engineering Mitigation:</span>
                </span>
                <p className="text-emerald-900 leading-relaxed text-[11px]">
                  {reason.mitigationRecommendation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Risk Alert Simulator */}
      <div id="live-alert-simulation-section">
        <LiveRiskAlertSimulator
          project={project}
          currentRiskScore={calculation.riskScore}
          currentDelayDays={calculation.delayDays}
          onOpenWhatIf={() => {
            const el = document.getElementById('what-if-simulator-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onAlertDispatched={(newAlert) => {
            const updated = [newAlert, ...sentAlerts];
            setSentAlerts(updated);
            try {
              localStorage.setItem('setu_sent_engineer_alerts', JSON.stringify(updated));
            } catch (e) {
              console.error(e);
            }
          }}
        />
      </div>

      {/* Field Engineer Notification Dispatch Console */}
      <div id="notify-engineers-section" className="bg-white rounded-2xl border-2 border-blue-900 shadow-lg p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-900 text-white flex items-center justify-center shadow-md">
              <BellRing className="w-5 h-5 text-amber-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 uppercase tracking-wider">
                  Automated Dispatch Hub
                </span>
                <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>NIC Gateway Ready</span>
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight mt-0.5">
                Notify Field Engineers & Project Directors
              </h2>
              <p className="text-xs text-slate-600">
                Broadcast official risk delay metrics, statutory citations, and mitigation action directives directly to relevant highway, revenue, and utility engineers.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs text-slate-500">Selected:</span>
            <span className="font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 text-xs font-mono">
              {selectedEngineers.length} Engineers
            </span>
          </div>
        </div>

        {/* Success Alert Banner */}
        {sendSuccessMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl flex items-start gap-3 animate-in fade-in duration-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <strong className="text-emerald-900 block font-bold text-sm">
                Official Engineering Alert Dispatched!
              </strong>
              <p className="text-emerald-800 leading-relaxed font-mono">
                {sendSuccessMessage}
              </p>
              <div className="pt-1 flex items-center gap-2 text-emerald-950 font-medium">
                <span>Receipt acknowledgments auto-logged into state PMIS audit trail.</span>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Engineer Directory Checklist (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-800" />
                <span>Designated Project Engineers & Administrative Officers</span>
              </h3>
              <button
                onClick={() => {
                  if (selectedEngineers.length === MOCK_ENGINEERS.length) {
                    setSelectedEngineers([MOCK_ENGINEERS[0].id]);
                  } else {
                    setSelectedEngineers(MOCK_ENGINEERS.map((e) => e.id));
                  }
                }}
                className="text-[11px] font-semibold text-blue-900 hover:underline"
              >
                {selectedEngineers.length === MOCK_ENGINEERS.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>

            <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
              {MOCK_ENGINEERS.map((eng) => {
                const isChecked = selectedEngineers.includes(eng.id);
                return (
                  <div
                    key={eng.id}
                    onClick={() => toggleEngineer(eng.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isChecked
                        ? 'bg-blue-50/60 border-blue-300 shadow-2xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 opacity-70'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="mt-1 h-4 w-4 rounded text-blue-900 border-slate-300 focus:ring-blue-500 cursor-pointer"
                    />
                    <div className="flex-1 text-xs space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className="font-bold text-slate-900 text-sm">{eng.name}</span>
                        <span className="text-[11px] font-medium text-blue-900 bg-blue-100/70 px-2 py-0.5 rounded">
                          {eng.role}
                        </span>
                      </div>
                      <p className="text-slate-600 text-[11px] font-medium">{eng.designation}</p>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 pt-0.5">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span>{eng.email}</span>
                        </span>
                        <span className="flex items-center gap-1 font-mono">
                          <PhoneCall className="w-3 h-3 text-slate-400" />
                          <span>{eng.phone}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dispatch Channels Multi-Select */}
            <div className="pt-2 space-y-2">
              <span className="text-xs font-bold text-slate-700 block">
                Integrated Dispatch Channels:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'Email Memo', icon: Mail, label: 'Official Email Memo' },
                  { id: 'SMS Alert', icon: PhoneCall, label: 'High-Priority SMS' },
                  { id: 'WhatsApp Gateway', icon: MessageSquare, label: 'WhatsApp Broadcast' },
                  { id: 'PMIS Push', icon: ExternalLink, label: 'Central PMIS Push' },
                ].map((ch) => {
                  const Icon = ch.icon;
                  const active = channels.includes(ch.id);
                  return (
                    <button
                      key={ch.id}
                      onClick={() => toggleChannel(ch.id)}
                      className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        active
                          ? 'bg-blue-900 text-white border-blue-900 shadow-xs'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{ch.id}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Alert Configuration & Dispatch Button (5 cols) */}
          <div className="lg:col-span-5 bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Severity Selector */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Notification Escalation Severity:
                </label>
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  {[
                    { label: 'Critical (Red Alert)', color: 'bg-rose-600 text-white' },
                    { label: 'High Priority (Amber)', color: 'bg-amber-600 text-white' },
                    { label: 'Routine Advisory (Yellow)', color: 'bg-slate-700 text-white' },
                  ].map((lvl) => (
                    <button
                      key={lvl.label}
                      onClick={() => setAlertSeverity(lvl.label as any)}
                      className={`p-2 rounded-lg text-center font-bold text-[11px] transition-all border ${
                        alertSeverity === lvl.label
                          ? `${lvl.color} shadow-xs border-transparent`
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {lvl.label.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary Preview */}
              <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs space-y-1.5">
                <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wide">
                  Calculated Dispatch Summary:
                </span>
                <div className="text-slate-600 text-[11px] space-y-0.5">
                  <div>
                    <strong>Project:</strong> {project.name} ({project.code})
                  </div>
                  <div>
                    <strong>Calculated Delay:</strong>{' '}
                    <span className="text-rose-700 font-bold font-mono">
                      +{calculation.delayDays} Days ({calculation.delayMonths} mo)
                    </span>
                  </div>
                  <div>
                    <strong>Revised Completion:</strong>{' '}
                    <span className="font-mono font-bold text-slate-900">
                      {calculation.revisedDateFormatted}
                    </span>
                  </div>
                  <div>
                    <strong>Fiscal Cost Overrun:</strong>{' '}
                    <span className="text-amber-800 font-mono font-bold">
                      ₹ {calculation.costEscalationCr} Cr
                    </span>
                  </div>
                </div>
              </div>

              {/* Directives text area */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Executive Mitigation Directives for Engineers:
                </label>
                <textarea
                  rows={4}
                  value={customDirectives}
                  onChange={(e) => setCustomDirectives(e.target.value)}
                  placeholder="Enter specific instructions, site inspection dates, or variation order mandates..."
                  className="w-full text-xs p-3 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                disabled={isSending || selectedEngineers.length === 0}
                onClick={handleDispatchNotification}
                className="w-full py-3 px-4 rounded-xl bg-blue-900 hover:bg-blue-800 disabled:opacity-50 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSending ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Transmitting Official Dispatch via NIC Gateway...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Dispatch Alert to {selectedEngineers.length} Engineers</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownloadNotice}
                className="w-full py-2 px-3 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-300 transition-colors flex items-center justify-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                <span>Preview & Print Official Form ENG-7 Notice</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dispatched Engineering Alerts Ledger */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Dispatched Engineering Alerts & Acknowledgment Log
            </h3>
            <p className="text-xs text-slate-500">
              Auditable register of formal delay warnings transmitted to field engineers and project directors
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
            {sentAlerts.length} Dispatches Recorded
          </span>
        </div>

        <div className="space-y-3">
          {sentAlerts.map((alert) => (
            <div
              key={alert.id}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 text-[11px]">
                    {alert.dispatchId}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      alert.severity.includes('Critical')
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {alert.severity}
                  </span>
                  <span className="font-bold text-slate-900">{alert.projectCode}</span>
                </div>

                <div className="flex items-center gap-3 text-slate-500 text-[11px]">
                  <span>{alert.dispatchedAt}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{alert.status}</span>
                  </span>
                </div>
              </div>

              <div className="text-sm font-semibold text-slate-900">
                {alert.subject}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-600 pt-1">
                <div>
                  <span className="text-slate-400 block">Forecast Delay:</span>
                  <strong className="text-rose-700 font-mono text-xs">
                    +{alert.projectedDelayDays} Days ({alert.projectedDelayMonths})
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Cost Overrun Estimate:</span>
                  <strong className="text-amber-800 font-mono text-xs">
                    ₹ {alert.estimatedCostOverrunCr} Cr
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Recipients Notified:</span>
                  <span className="font-medium text-slate-800">
                    {alert.recipients.map((r) => r.name.split(' ')[1] || r.name).join(', ')}
                  </span>
                </div>
              </div>

              <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-[11px] text-slate-700">
                <strong className="text-blue-900 font-semibold">Directives Issued: </strong>
                {alert.mitigationDirectives}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust disclaimer */}
      <TrustBanner customMessage="Project risk delays, critical path days, and financial escalation figures are simulated administrative heuristics computed from configured survey data and do not replace statutory arbitration or official engineer determinations." />
    </div>
  );
};
