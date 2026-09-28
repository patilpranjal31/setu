import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Info,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Scale,
  Activity,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { ShapFactor } from '../../types';
import { ProjectShapAnalysis } from '../../data/shapFactorData';

interface ShapFactorBreakdownProps {
  shapAnalysis: ProjectShapAnalysis;
  onOpenWhatIf?: () => void;
  onNotifyEngineers?: () => void;
  interactiveDelta?: number; // delta points from active simulation if any
}

export const ShapFactorBreakdown: React.FC<ShapFactorBreakdownProps> = ({
  shapAnalysis,
  onOpenWhatIf,
  onNotifyEngineers,
  interactiveDelta = 0,
}) => {
  const [viewMode, setViewMode] = useState<'riskPoints' | 'delayDays'>('riskPoints');
  const [selectedFactor, setSelectedFactor] = useState<ShapFactor | null>(
    shapAnalysis.factors[0] || null
  );

  const netRiskScore = Math.max(0, shapAnalysis.finalRiskScore - interactiveDelta);
  const positiveFactors = shapAnalysis.factors.filter((f) => f.contributionPoints > 0);
  const mitigatingFactors = shapAnalysis.factors.filter((f) => f.contributionPoints < 0);

  // Calculate total positive points
  const totalPositivePoints = positiveFactors.reduce((acc, f) => acc + f.contributionPoints, 0);

  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-purple-100 text-purple-900 border border-purple-200 flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-purple-700" />
              <span>SHAP XAI Explainability Engine</span>
            </span>
            <span className="text-xs font-mono font-bold text-slate-500">
              {shapAnalysis.projectCode}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Factor Breakdown: Why is this Project {shapAnalysis.riskCategory} Risk?</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
            Shapley Additive exPlanations (SHAP) decompose the machine learning risk model into explicit positive risk drivers (red/amber) and mitigating community factors (green).
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl self-start sm:self-auto border border-slate-200">
          <button
            onClick={() => setViewMode('riskPoints')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'riskPoints'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Risk Score (+pts)
          </button>
          <button
            onClick={() => setViewMode('delayDays')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'delayDays'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Schedule Impact (+Days)
          </button>
        </div>
      </div>

      {/* Executive Synthesis Callout */}
      <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Executive Explainability Verdict</span>
          </span>
          <span className="text-xs text-slate-400 font-mono">
            Baseline: 34 pts → Net: <strong className="text-rose-400">{netRiskScore} / 100</strong>
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
          {shapAnalysis.executiveSummary}
        </p>
      </div>

      {/* Waterfall Visual Breakdown */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
          <span>Feature Factor Breakdown & Relative Impact Weights</span>
          <span className="text-slate-400 font-normal">Click any factor to inspect statutory details</span>
        </div>

        <div className="space-y-3">
          {/* Baseline Bar */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
              <strong className="text-slate-700">Statewide Benchmark Base Value</strong>
              <span className="text-slate-400 text-[11px]">(Expected risk for typical corridor)</span>
            </div>
            <span className="font-mono font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
              {shapAnalysis.baseRiskScore} pts
            </span>
          </div>

          {/* Positive Risk Drivers (Pushing risk higher) */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-rose-600" />
              <span>Positive Risk Drivers (Pushing Risk Higher)</span>
            </span>

            {positiveFactors.map((factor) => {
              const barWidth = Math.min(100, Math.round((factor.contributionPoints / totalPositivePoints) * 100));
              const isSelected = selectedFactor?.id === factor.id;

              return (
                <div
                  key={factor.id}
                  onClick={() => setSelectedFactor(factor)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-rose-50/80 border-rose-300 ring-2 ring-rose-200'
                      : 'bg-white border-slate-200 hover:border-rose-200 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{factor.factorName}</span>
                        <span className="text-[10px] font-semibold px-2 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                          {factor.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{factor.description}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {viewMode === 'riskPoints' ? (
                        <span className="px-2.5 py-1 rounded bg-rose-600 text-white font-mono font-bold text-xs whitespace-nowrap shadow-2xs">
                          +{factor.contributionPoints} pts
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded bg-rose-600 text-white font-mono font-bold text-xs whitespace-nowrap shadow-2xs">
                          +{factor.delayContributionDays} Days
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Horizontal Bar */}
                  <div className="mt-2.5 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-rose-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mitigating Community Factors (Pushing risk down) */}
          {mitigatingFactors.length > 0 && (
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
                <span>Mitigating Factors (Compressing Risk)</span>
              </span>

              {mitigatingFactors.map((factor) => {
                const isSelected = selectedFactor?.id === factor.id;
                return (
                  <div
                    key={factor.id}
                    onClick={() => setSelectedFactor(factor)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50/80 border-emerald-300 ring-2 ring-emerald-200'
                        : 'bg-white border-slate-200 hover:border-emerald-200 hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{factor.factorName}</span>
                          <span className="text-[10px] font-semibold px-2 py-0.2 rounded bg-emerald-100 text-emerald-900 border border-emerald-200">
                            {factor.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{factor.description}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {viewMode === 'riskPoints' ? (
                          <span className="px-2.5 py-1 rounded bg-emerald-600 text-white font-mono font-bold text-xs whitespace-nowrap shadow-2xs">
                            {factor.contributionPoints} pts
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded bg-emerald-600 text-white font-mono font-bold text-xs whitespace-nowrap shadow-2xs">
                            {factor.delayContributionDays} Days
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-2.5 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.abs(factor.contributionPoints) * 6}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Net Result Bar */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 rounded-xl shadow-xs flex items-center justify-between text-xs mt-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
              <div>
                <strong className="text-white block text-sm">Net Calculated Risk Index</strong>
                <span className="text-slate-300 text-[11px]">
                  Projected Net Delay: <strong className="text-rose-300 font-mono">+{shapAnalysis.totalDelayDays} Days</strong>
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-2xl sm:text-3xl font-extrabold text-rose-400 font-mono">
                {netRiskScore}
                <span className="text-xs text-slate-400 font-sans">/100</span>
              </span>
              <span className="block text-[10px] text-rose-300 font-bold uppercase tracking-wider">
                {shapAnalysis.riskCategory} Risk
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Factor Deep-Dive Card */}
      {selectedFactor && (
        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-blue-900 bg-blue-100 px-2 py-0.5 rounded">
                Selected Bottleneck
              </span>
              <strong className="text-sm font-bold text-slate-900">{selectedFactor.factorName}</strong>
            </div>
            {selectedFactor.statutoryReference && (
              <span className="text-[11px] font-mono text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                {selectedFactor.statutoryReference}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase font-bold">Baseline Expectation</span>
              <p className="font-semibold text-slate-800">{selectedFactor.baselineValue}</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase font-bold">Observed Survey Metric</span>
              <p className="font-bold text-rose-700">{selectedFactor.observedValue}</p>
            </div>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed">{selectedFactor.description}</p>

          {selectedFactor.mitigationSuggestion && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs space-y-1">
              <span className="font-bold text-emerald-950 flex items-center gap-1 text-[11px] uppercase tracking-wide">
                <Sparkles className="w-3 h-3 text-emerald-700" />
                <span>Targeted Engineering Mitigation Directive:</span>
              </span>
              <p className="text-emerald-900 leading-relaxed text-[11px]">
                {selectedFactor.mitigationSuggestion}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
        <span className="text-xs text-slate-500">
          Want to test how resolving these SHAP bottlenecks compresses project schedule?
        </span>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {onOpenWhatIf && (
            <button
              onClick={onOpenWhatIf}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
            >
              <span>Test in What-If Simulator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {onNotifyEngineers && (
            <button
              onClick={onNotifyEngineers}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Notify Field Engineers</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
