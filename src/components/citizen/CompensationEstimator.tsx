import React, { useState } from 'react';
import { Calculator, Info, HelpCircle, AlertTriangle, ShieldCheck, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { TrustBanner } from '../common/TrustBanner';

export const CompensationEstimator: React.FC = () => {
  // Inputs
  const [landArea, setLandArea] = useState<number>(2.4);
  const [landType, setLandType] = useState<string>('Agricultural');
  const [locationType, setLocationType] = useState<string>('Rural');
  const [projectType, setProjectType] = useState<string>('Infrastructure');
  const [hasAssets, setHasAssets] = useState<boolean>(true); // Borewell + Orchard
  const [assetValuation, setAssetValuation] = useState<number>(385000);

  // Results State
  const [isCalculated, setIsCalculated] = useState<boolean>(true);
  const [isExplainerOpen, setIsExplainerOpen] = useState<boolean>(false);

  // Calculation logic based on RFCTLARR Act 2013
  const getBaseRatePerHectare = () => {
    switch (landType) {
      case 'Irrigated Double-Crop':
        return 4500000;
      case 'Agricultural':
        return 4200000;
      case 'Residential':
        return 7500000;
      case 'Commercial':
        return 9500000;
      default:
        return 4000000;
    }
  };

  const getRuralMultiplier = () => {
    switch (locationType) {
      case 'Rural':
        return 1.5; // RFCTLARR rural factor between 1.0 and 2.0
      case 'Semi-Urban':
        return 1.25;
      case 'Urban':
        return 1.0;
      default:
        return 1.5;
    }
  };

  const baseRate = getBaseRatePerHectare();
  const multiplier = getRuralMultiplier();

  // 1. Illustrative Market Value = Area * Base Circle Rate
  const illustrativeMarketValue = Math.round(landArea * baseRate);

  // 2. Value after Rural Multiplier = Market Value * Multiplier
  const multipliedLandValue = Math.round(illustrativeMarketValue * multiplier);

  // 3. Multiplier component addition
  const multiplierComponent = multipliedLandValue - illustrativeMarketValue;

  // 4. Assets & Improvements
  const assetsValue = hasAssets ? assetValuation : 0;

  // Total Base for Solatium = Multiplied Land Value + Assets
  const totalBaseForSolatium = multipliedLandValue + assetsValue;

  // 5. Statutory 100% Solatium (mandatory under RFCTLARR Section 30(1))
  const solatiumAmount = totalBaseForSolatium; // 100%

  // 6. Additional 12% interest allowance from Sec 11 notification date (est. 6 months)
  const statutoryInterest = Math.round(illustrativeMarketValue * 0.12 * 0.5);

  // Total Estimated Compensation
  const totalCompensation = totalBaseForSolatium + solatiumAmount + statutoryInterest;

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculated(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Simulated Entitlement Calculator · RFCTLARR Act 2013
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Compensation Estimator
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Transparent simulation of land acquisition awards according to statutory Central & State formula components
          </p>
        </div>

        <button
          onClick={() => setIsExplainerOpen(true)}
          className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <Info className="w-4 h-4 text-blue-800" />
          <span>Learn how compensation is determined</span>
        </button>
      </div>

      {/* Mandatory Disclaimer Callout */}
      <TrustBanner
        type="compensation"
        customMessage="This is an illustrative prototype estimate based on synthetic data and should not be treated as an official compensation determination."
      />

      {/* Main Grid: Inputs vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (Left: 5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Parcel Input Parameters</h2>
            <span className="text-[11px] text-slate-500 font-mono">Survey 102/3 Preset</span>
          </div>

          <form onSubmit={handleEstimate} className="space-y-4 text-xs">
            {/* Input 1: Land Area */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Land Area (Hectares)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="100"
                  value={landArea}
                  onChange={(e) => setLandArea(parseFloat(e.target.value) || 0.1)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900 text-slate-900 font-mono font-bold"
                />
                <span className="absolute right-3 top-2 text-slate-500">ha</span>
              </div>
              <span className="text-[10px] text-slate-500 mt-0.5 block">
                ≈ {(landArea * 2.471).toFixed(2)} Acres
              </span>
            </div>

            {/* Input 2: Land Type */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Land Type / Soil Classification
              </label>
              <select
                value={landType}
                onChange={(e) => setLandType(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden text-slate-800"
              >
                <option value="Agricultural">Agricultural (Seasonal Crop)</option>
                <option value="Irrigated Double-Crop">Irrigated Double-Crop (Canal/Perennial)</option>
                <option value="Residential">Residential / Abadi Land</option>
                <option value="Commercial">Commercial / Highway Facing</option>
              </select>
            </div>

            {/* Input 3: Location */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Location Category (Multiplier Factor)
              </label>
              <select
                value={locationType}
                onChange={(e) => setLocationType(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden text-slate-800"
              >
                <option value="Rural">Rural Settlement (1.5x Multiplier Factor)</option>
                <option value="Semi-Urban">Semi-Urban / Peri-Urban (1.25x Multiplier)</option>
                <option value="Urban">Urban Municipal Limits (1.0x Multiplier)</option>
              </select>
            </div>

            {/* Input 4: Project Type */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Project Classification
              </label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden text-slate-800"
              >
                <option value="Infrastructure">Infrastructure (Highway / Expressways)</option>
                <option value="Irrigation">Irrigation / Dam / Water Canal</option>
                <option value="Industrial">Industrial Corridor / MIDC</option>
              </select>
            </div>

            {/* Assets & Borewells toggle */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasAssets}
                  onChange={(e) => setHasAssets(e.target.checked)}
                  className="rounded text-blue-900 focus:ring-blue-900"
                />
                <span className="font-semibold text-slate-800">
                  Include Immovable Assets & Improvements
                </span>
              </label>

              {hasAssets && (
                <div className="pl-6 space-y-1">
                  <div className="relative">
                    <input
                      type="number"
                      value={assetValuation}
                      onChange={(e) => setAssetValuation(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs font-mono"
                    />
                    <span className="absolute right-3 top-1.5 text-slate-500">₹</span>
                  </div>
                  <span className="text-[10px] text-slate-500 block">
                    Borewell, electric pump shed, 40 pomegranate trees & drip irrigation lines.
                  </span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs shadow-xs transition-colors mt-2"
            >
              Recalculate Estimate
            </button>
          </form>
        </div>

        {/* Results Breakdown (Right: 7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {isCalculated && (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 uppercase tracking-wide">
                    Simulated Compensation Breakdown
                  </h3>
                  <p className="text-xs text-slate-500">
                    Calculated for {landArea} ha in {locationType} Area under RFCTLARR 2013 First Schedule
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded bg-blue-50 text-blue-900 font-mono font-bold text-xs">
                  RFCTLARR Formula
                </span>
              </div>

              {/* Itemized Components */}
              <div className="space-y-3 text-xs">
                {/* 1. Illustrative Land Value */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div>
                    <span className="font-semibold text-slate-900 block">
                      1. Illustrative Land Value (Market Rate)
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Circle rate of {formatINR(baseRate)}/ha × {landArea} ha
                    </span>
                  </div>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    {formatINR(illustrativeMarketValue)}
                  </span>
                </div>

                {/* 2. Applicable Components (Multiplier) */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div>
                    <span className="font-semibold text-slate-900 block">
                      2. Applicable Components (Rural Multiplier Factor: {multiplier}x)
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Statutory enhancement factor for rural distance under Section 26(2)
                    </span>
                  </div>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    + {formatINR(multiplierComponent)}
                  </span>
                </div>

                {/* 3. Assets / Improvements */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div>
                    <span className="font-semibold text-slate-900 block">
                      3. Assets / Improvements & Crops
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Borewell, pipeline, standing crops and plantation valuation (Section 29)
                    </span>
                  </div>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    + {formatINR(assetsValue)}
                  </span>
                </div>

                {/* 4. Other Applicable Components: Statutory Solatium (100%) */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-50/60 border border-emerald-200">
                  <div>
                    <span className="font-semibold text-emerald-950 block">
                      4. Statutory 100% Solatium (RFCTLARR Section 30)
                    </span>
                    <span className="text-[11px] text-emerald-800">
                      Mandatory central solatium equivalent to 100% of aggregate land & asset value
                    </span>
                  </div>
                  <span className="font-mono font-bold text-emerald-900 text-sm">
                    + {formatINR(solatiumAmount)}
                  </span>
                </div>

                {/* 5. Statutory Additional Interest Allowance */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div>
                    <span className="font-semibold text-slate-900 block">
                      5. Other Applicable Components (12% p.a. Interest)
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Interest from Sec 11 notification date to award under Section 30(3)
                    </span>
                  </div>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    + {formatINR(statutoryInterest)}
                  </span>
                </div>
              </div>

              {/* Total Card */}
              <div className="p-5 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider block font-semibold">
                    Estimated Total Compensation
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">
                    {formatINR(totalCompensation)}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    Includes Market Value, 1.5x Multiplier, 100% Solatium, and Assets
                  </span>
                </div>

                <div className="text-right">
                  <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-emerald-400 font-mono font-bold text-xs">
                    DBT Direct Transfer Eligible
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* "Learn How Compensation is Determined" Explainer Modal */}
      {isExplainerOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-base">
                  How Compensation is Determined Under RFCTLARR 2013
                </h3>
              </div>
              <button
                onClick={() => setIsExplainerOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs leading-relaxed text-slate-700">
              <p>
                The <strong>Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013 (RFCTLARR)</strong> replaced the colonial 1894 Act to ensure fair and transparent awards.
              </p>

              <div className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <h5 className="font-bold text-slate-900 mb-1">1. Market Value Determination (Section 26)</h5>
                  <p>
                    The Competent Authority determines the highest of: (a) minimum circle rate specified in the ready reckoner, (b) average sale price of top 50% similar sale deeds in the vicinity in the preceding 3 years, or (c) consented amount in private purchase.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <h5 className="font-bold text-slate-900 mb-1">2. Rural Multiplier Factor (Section 26(2))</h5>
                  <p>
                    In rural areas, the market value is multiplied by a state-notified factor between 1.0 and 2.0 based on radial distance from nearest urban municipality.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <h5 className="font-bold text-slate-900 mb-1">3. Solatium (Section 30(1))</h5>
                  <p>
                    A mandatory <strong>100% Solatium</strong> (additional equivalent sum) is added on top of the total value of land, buildings, and attached trees for the compulsory nature of acquisition.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <h5 className="font-bold text-slate-900 mb-1">4. Rehabilitation & Resettlement (Second Schedule)</h5>
                  <p>
                    Affected families are also entitled to mandatory subsistence allowances, one-time resettlement grants, transport allowances, and cattle shed support.
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 py-3 border-t border-slate-200 bg-white flex justify-end">
              <button
                onClick={() => setIsExplainerOpen(false)}
                className="px-4 py-2 bg-blue-900 text-white rounded-lg text-xs font-semibold hover:bg-blue-800"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
