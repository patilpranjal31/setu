import React, { useState } from 'react';
import {
  BellRing,
  AlertTriangle,
  Send,
  CheckCircle2,
  Sliders,
  Volume2,
  VolumeX,
  Phone,
  MessageSquare,
  Mail,
  ShieldAlert,
  Sparkles,
  ArrowRight,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { AcquisitionProject, EngineerAlert } from '../../types';
import { MOCK_ENGINEERS } from '../../data/riskDelayData';

interface LiveRiskAlertSimulatorProps {
  project: AcquisitionProject;
  currentRiskScore: number;
  currentDelayDays: number;
  onOpenWhatIf?: () => void;
  onAlertDispatched?: (alert: EngineerAlert) => void;
}

export const LiveRiskAlertSimulator: React.FC<LiveRiskAlertSimulatorProps> = ({
  project,
  currentRiskScore,
  currentDelayDays,
  onOpenWhatIf,
  onAlertDispatched,
}) => {
  const [threshold, setThreshold] = useState<number>(70);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [activeAlert, setActiveAlert] = useState<{
    id: string;
    timestamp: string;
    title: string;
    message: string;
    recipientsCount: number;
    thresholdBreached: number;
    actualScore: number;
  } | null>(null);

  const [previewTab, setPreviewTab] = useState<'sms' | 'whatsapp' | 'email'>('whatsapp');

  const isBreached = currentRiskScore >= threshold;

  // Web Audio API Chime
  const playAlertChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // Osc 1
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc1.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5

      gain1.gain.setValueAtTime(0.15, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);

      osc1.start();
      osc1.stop(ctx.currentTime + 0.5);

      // Osc 2 (second ping)
      setTimeout(() => {
        try {
          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(880, ctx.currentTime);
          osc2.frequency.exponentialRampToValueAtTime(1174.66, ctx.currentTime + 0.2); // D6

          gain2.gain.setValueAtTime(0.18, ctx.currentTime);
          gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

          osc2.connect(gain2);
          gain2.connect(ctx.destination);

          osc2.start();
          osc2.stop(ctx.currentTime + 0.6);
        } catch (e) {
          // ignore
        }
      }, 160);
    } catch (e) {
      // Audio not permitted or supported
    }
  };

  const handleTriggerSimulation = () => {
    setIsSimulating(true);

    setTimeout(() => {
      playAlertChime();

      const newAlertData = {
        id: `alert-sim-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        title: `CRITICAL THRESHOLD BREACH: ${project.code}`,
        message: `Project risk score of ${currentRiskScore}/100 crossed configured threshold limit (${threshold}/100). Projected critical-path delay: +${currentDelayDays} Days.`,
        recipientsCount: 4,
        thresholdBreached: threshold,
        actualScore: currentRiskScore,
      };

      setActiveAlert(newAlertData);
      setIsSimulating(false);

      if (onAlertDispatched) {
        const fullAlert: EngineerAlert = {
          id: newAlertData.id,
          dispatchId: `SETU-SIM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          projectId: project.id,
          projectName: project.name,
          projectCode: project.code,
          dispatchedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
          severity: 'Critical (Red Alert)',
          subject: `AUTOMATED ESCALATION: Threshold ${threshold}/100 Exceeded (+${currentDelayDays}d Delay)`,
          projectedDelayDays: currentDelayDays,
          projectedDelayMonths: `${(currentDelayDays / 30).toFixed(1)} Months`,
          estimatedCostOverrunCr: parseFloat(((currentDelayDays / 30) * 0.006 * project.estimatedBudgetCr).toFixed(2)),
          recipients: MOCK_ENGINEERS.slice(0, 4).map((e) => ({
            name: e.name,
            role: e.role,
            department: e.department,
            email: e.email,
            phone: e.phone,
          })),
          channels: ['SMS Alert', 'WhatsApp Gateway', 'Email Memo', 'PMIS Push'],
          summaryReasons: ['Threshold alert simulation executed via Live Simulator'],
          mitigationDirectives: 'Convene joint emergency site conference to review box-culvert design variations and accelerate Section 38 compensation disbursements.',
          status: 'Dispatched & Acknowledged',
        };
        onAlertDispatched(fullAlert);
      }
    }, 400);
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-rose-200 shadow-md p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1">
              <BellRing className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
              <span>Live Alert Simulation</span>
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Working Prototype Differentiator
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Automated Risk Threshold Alert Simulation
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Test the automated early warning system. Set an alert threshold and fire a simulated trigger to demonstrate instant dispatch to field engineers across SMS, WhatsApp, and official email.
          </p>
        </div>

        {/* Audio Toggle */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all self-start sm:self-auto ${
            soundEnabled
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-slate-100 text-slate-500 border-slate-200'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          <span>Audio Ping: {soundEnabled ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      {/* Threshold Setting & Live Trigger Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center p-5 bg-slate-50 rounded-xl border border-slate-200">
        {/* Left: Slider */}
        <div className="md:col-span-2 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-slate-500" />
              <span>Alert Trigger Threshold Slider</span>
            </span>
            <span className="font-mono font-bold text-base text-rose-700 bg-white px-2.5 py-0.5 rounded border border-rose-200">
              {threshold} / 100
            </span>
          </div>

          <input
            type="range"
            min={40}
            max={90}
            step={5}
            value={threshold}
            onChange={(e) => setThreshold(parseInt(e.target.value))}
            className="w-full accent-rose-600 cursor-pointer"
          />

          <div className="flex justify-between text-[11px] text-slate-500">
            <span>Aggressive (40 pts)</span>
            <span>Standard Recommended (70 pts)</span>
            <span>Critical Only (90 pts)</span>
          </div>

          <div className="pt-1 flex items-center gap-2 text-xs">
            <span className="text-slate-600">Current Project Risk:</span>
            <strong className="font-mono text-slate-900">{currentRiskScore} / 100</strong>
            <span className="text-slate-300">·</span>
            {isBreached ? (
              <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold text-[11px] flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-rose-600" />
                <span>Threshold Breached ({currentRiskScore} ≥ {threshold})</span>
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Within Tolerance ({currentRiskScore} &lt; {threshold})</span>
              </span>
            )}
          </div>
        </div>

        {/* Right: Big Fire Button */}
        <div className="flex flex-col gap-2">
          <button
            onClick={handleTriggerSimulation}
            disabled={isSimulating}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 active:scale-95 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <BellRing className={`w-4 h-4 ${isSimulating ? 'animate-spin' : 'animate-bounce'}`} />
            <span>{isSimulating ? 'Dispatching Test Broadcast...' : '⚡ Fire Mock Alert Simulation'}</span>
          </button>
          <span className="text-[10px] text-center text-slate-500">
            Triggers audible chime, in-app notification & mock webhook
          </span>
        </div>
      </div>

      {/* Live Dispatched Alert Banner (Visible when fired) */}
      {activeAlert && (
        <div className="p-5 rounded-xl bg-gradient-to-r from-rose-900 to-slate-900 text-white shadow-lg border-2 border-rose-500 animate-in fade-in slide-in-from-top-3 duration-300 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rose-800/80 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center animate-pulse">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500 text-slate-950 uppercase font-mono tracking-wider">
                  Live Dispatch Triggered
                </span>
                <h4 className="text-base font-bold text-white mt-0.5">{activeAlert.title}</h4>
              </div>
            </div>

            <div className="text-right text-xs text-slate-300 font-mono">
              Timestamp: <span className="text-white font-bold">{activeAlert.timestamp}</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {activeAlert.message}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700/60">
              <span className="text-[10px] text-slate-400 block">Trigger Value</span>
              <span className="font-bold text-white font-mono">{activeAlert.actualScore} pts</span>
            </div>
            <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700/60">
              <span className="text-[10px] text-slate-400 block">Configured Limit</span>
              <span className="font-bold text-rose-300 font-mono">{activeAlert.thresholdBreached} pts</span>
            </div>
            <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700/60">
              <span className="text-[10px] text-slate-400 block">Field Recipients</span>
              <span className="font-bold text-emerald-400 font-mono">4 Engineers</span>
            </div>
            <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700/60">
              <span className="text-[10px] text-slate-400 block">Delivery Status</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1 font-mono">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Acknowledged</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Multi-Channel Notification Payload Preview Box */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Send className="w-3.5 h-3.5 text-slate-500" />
            <span>Multi-Channel Field Engineer Broadcast Preview</span>
          </span>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setPreviewTab('whatsapp')}
              className={`px-3 py-1 rounded-md transition-all flex items-center gap-1 ${
                previewTab === 'whatsapp' ? 'bg-white text-emerald-800 shadow-2xs font-bold' : 'text-slate-600'
              }`}
            >
              <MessageSquare className="w-3 h-3 text-emerald-600" />
              <span>WhatsApp</span>
            </button>
            <button
              onClick={() => setPreviewTab('sms')}
              className={`px-3 py-1 rounded-md transition-all flex items-center gap-1 ${
                previewTab === 'sms' ? 'bg-white text-blue-900 shadow-2xs font-bold' : 'text-slate-600'
              }`}
            >
              <Phone className="w-3 h-3 text-blue-600" />
              <span>SMS Gateway</span>
            </button>
            <button
              onClick={() => setPreviewTab('email')}
              className={`px-3 py-1 rounded-md transition-all flex items-center gap-1 ${
                previewTab === 'email' ? 'bg-white text-purple-900 shadow-2xs font-bold' : 'text-slate-600'
              }`}
            >
              <Mail className="w-3 h-3 text-purple-600" />
              <span>Official Memo Email</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {previewTab === 'whatsapp' && (
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2 text-xs">
            <div className="flex items-center justify-between text-emerald-900 font-bold border-b border-emerald-200 pb-2">
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>SETU National Land Platform Priority Bot (Verified WhatsApp)</span>
              </span>
              <span className="text-[10px] text-emerald-700 font-mono">Delivered · Read Receipt 14:35</span>
            </div>
            <div className="bg-white p-3.5 rounded-lg border border-emerald-100 space-y-2 shadow-2xs text-slate-800">
              <p className="font-bold text-rose-700">
                🚨 URGENT CORRIDOR DELAY ADVISORY: {project.code}
              </p>
              <p className="text-slate-700">
                To: <strong>Er. Vikram Deshmukh (Project Director)</strong> & <strong>Er. Sneha Kulkarni (Executive Engineer)</strong>
              </p>
              <p className="text-slate-700">
                Predictive risk engine flagged a projected <strong>+{currentDelayDays} Days completion delay</strong> on {project.name}.
                Composite Risk Index: <strong className="text-rose-700">{currentRiskScore}/100</strong> (Threshold {threshold} exceeded).
              </p>
              <div className="p-2 bg-slate-50 rounded border border-slate-200 text-[11px] text-slate-600 space-y-0.5">
                <div>• Primary Bottleneck: Irrigation canal feeder severance (Ch 16+400)</div>
                <div>• Section 38 Escrow Withheld: ₹ 42.8 Cr pending joint measurement</div>
                <div>• Mandated Directive: Convene joint camp court at Examplegaon Taluka</div>
              </div>
              <div className="pt-2 flex items-center gap-2">
                <span className="px-2.5 py-1 bg-emerald-600 text-white font-bold rounded text-[11px]">
                  [1] Acknowledge Receipt
                </span>
                <span className="px-2.5 py-1 bg-slate-100 text-slate-700 font-semibold rounded text-[11px] border border-slate-200">
                  [2] Open Mitigation Workbench
                </span>
              </div>
            </div>
          </div>
        )}

        {previewTab === 'sms' && (
          <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2 text-xs">
            <div className="flex items-center justify-between text-blue-900 font-bold border-b border-blue-200 pb-2">
              <span className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-blue-600" />
                <span>Govt NIC SMS Gateway (Header: GOV-MAH-SETU)</span>
              </span>
              <span className="text-[10px] text-blue-700 font-mono">DLR: Success (4/4)</span>
            </div>
            <div className="bg-white p-3.5 rounded-lg border border-blue-100 font-mono text-[11px] text-slate-800 space-y-1 shadow-2xs">
              <p>
                [SETU ALERT] CRITICAL SLIPPAGE on {project.code}: Delay forecast +{currentDelayDays}d. Risk Score {currentRiskScore}/100 exceeded limit {threshold}. Urgent action mandated under Sec 15 RFCTLARR. Joint site inspection convened. Ref: SETU-ENG-{Math.floor(1000 + Math.random() * 9000)} -NIC GOV
              </p>
            </div>
          </div>
        )}

        {previewTab === 'email' && (
          <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-xl space-y-2 text-xs">
            <div className="flex items-center justify-between text-purple-900 font-bold border-b border-purple-200 pb-2">
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-purple-600" />
                <span>Form ENG-7 Statutory Project Delay & Escalation Memo</span>
              </span>
              <span className="text-[10px] text-purple-700 font-mono">SSL Encrypted / PGP Signed</span>
            </div>
            <div className="bg-white p-3.5 rounded-lg border border-purple-100 space-y-1.5 text-slate-800 shadow-2xs">
              <div className="text-[11px] text-slate-500">
                <strong>Subject:</strong> [STATUTORY ADVISORY] Form ENG-7: Corridor Acquisition Delay Notification — {project.name} ({project.code})
              </div>
              <div className="text-[11px] text-slate-500">
                <strong>From:</strong> SETU Land Governance Command Center &lt;notifications@setu.infrastructure.gov.in&gt;
              </div>
              <p className="pt-1 text-slate-700">
                Please take formal cognizance of automated critical path delay calculations indicating a +{currentDelayDays} day schedule elongation and ₹ {((currentDelayDays / 30) * 0.006 * project.estimatedBudgetCr).toFixed(2)} Cr fiscal cost escalation risk. Full itemized statutory root-causes and remedial directives attached.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* What-If Simulator Link */}
      {onOpenWhatIf && (
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <strong className="text-white block font-bold text-sm">
              Want to eliminate this critical threshold breach?
            </strong>
            <span className="text-slate-300 text-xs">
              Simulate accelerated grievance hearings and box-culvert design variations to bring risk score back below {threshold}.
            </span>
          </div>

          <button
            onClick={onOpenWhatIf}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-lg text-xs transition-all shadow-sm flex items-center gap-1.5 whitespace-nowrap self-start sm:self-auto cursor-pointer"
          >
            <span>Launch What-If Simulator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
