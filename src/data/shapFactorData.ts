import { ShapFactor } from '../types';

export interface ProjectShapAnalysis {
  projectId: string;
  projectName: string;
  projectCode: string;
  baseRiskScore: number; // e.g. 34 (average regional benchmark)
  finalRiskScore: number; // e.g. 84
  riskCategory: 'Critical' | 'High' | 'Medium' | 'Low';
  totalDelayDays: number;
  executiveSummary: string;
  topContributingCategory: string;
  factors: ShapFactor[];
}

export const MOCK_PROJECT_SHAP: Record<string, ProjectShapAnalysis> = {
  'proj-xyz-highway': {
    projectId: 'proj-xyz-highway',
    projectName: 'XYZ Regional Highway Project',
    projectCode: 'NHAI-MH-2026-08',
    baseRiskScore: 34,
    finalRiskScore: 84,
    riskCategory: 'High',
    totalDelayDays: 162,
    topContributingCategory: 'Grievance Backlog & Escrow Withholding',
    executiveSummary:
      'This project is classified as HIGH RISK (+50 points above regional baseline) primarily due to unmitigated irrigation canal severance objections in Examplegaon (+24 pts) and slow Section 38 compensation escrow deposits in Rampur (+18 pts). Together, these two bottlenecks account for 72% of the projected 162-day schedule slippage.',
    factors: [
      {
        id: 'shap-xyz-1',
        factorName: 'Irrigation Canal Feeder Severance (Sec 15 Objections)',
        category: 'Grievance Backlog',
        contributionPoints: 24,
        delayContributionDays: 52,
        baselineValue: '≤ 3 Objections per 10km',
        observedValue: '19 Objections / 48 Farmland Parcels',
        statutoryReference: 'RFCTLARR Act 2013 — Section 15(2)',
        description:
          'Severance of active gravity canal feeder distributaries without cross-drainage siphons generated acute community resistance and halted joint peg-marking.',
        mitigationSuggestion:
          'Issue PWD variation order for 2 reinforced concrete box-culvert irrigation siphons at Ch 16+400 (-22 Days).',
      },
      {
        id: 'shap-xyz-2',
        factorName: 'CALA Compensation Escrow Backlog (Sec 38 Protection)',
        category: 'Fiscal Disbursement',
        contributionPoints: 18,
        delayContributionDays: 45,
        baselineValue: '≥ 80% Disbursed at Possession',
        observedValue: 'Only 43% Disbursed (₹ 42.8 Cr Pending)',
        statutoryReference: 'RFCTLARR Act 2013 — Section 38',
        description:
          'Under Section 38, physical handover of land is legally unenforceable until full compensation award is credited. Landholders refuse entry.',
        mitigationSuggestion:
          'Deploy special revenue camp court with 2 dedicated Tehsildars to finalize 84 pending valuation hearings (-25 Days).',
      },
      {
        id: 'shap-xyz-3',
        factorName: 'Section 19 Declaration 12-Month Expiry Risk',
        category: 'Statutory Clearances',
        contributionPoints: 12,
        delayContributionDays: 38,
        baselineValue: 'Gazetted within 6-8 Months',
        observedValue: 'Month 10 / 12 Expiry Countdown',
        statutoryReference: 'RFCTLARR Act 2013 — Section 19(7)',
        description:
          'Statutory lapse countdown under Section 19(7): if final declaration is not published within 12 months of Section 11, entire acquisition lapses.',
        mitigationSuggestion:
          'Fast-track Gram Sabha report submission to District Collector for final approval before 15-Nov-2026.',
      },
      {
        id: 'shap-xyz-4',
        factorName: 'Disputed Heirship Mutations & Unpartitioned Titles',
        category: 'Revenue Title Mutation',
        contributionPoints: 8,
        delayContributionDays: 27,
        baselineValue: '≤ 5% Disputed Records',
        observedValue: '24 Disputed Survey Records (11%)',
        statutoryReference: 'Maharashtra Land Revenue Code Sec 149',
        description:
          'Succession disputes among co-parceners prevent issuance of certified Form 8A mutation extracts required for award cheques.',
        mitigationSuggestion:
          'Authorize CALA deposit into Revenue Court Escrow under Section 77(2) to secure lawful RoW handover immediately (-16 Days).',
      },
      {
        id: 'shap-xyz-5',
        factorName: 'High SIA Gram Sabha Consultation Quorum',
        category: 'Social Acceptance',
        contributionPoints: -8,
        delayContributionDays: -15,
        baselineValue: '60% Quorum',
        observedValue: '92% Gram Sabha Quorum Recorded',
        description:
          'High civic participation and formal consensus on solatium entitlement established a constructive negotiating baseline (Mitigating Factor).',
        mitigationSuggestion: 'Maintain institutional trust through regular weekly village liaison desk.',
      },
      {
        id: 'shap-xyz-6',
        factorName: '100% Digital Cadastral Form 7/12 Records Mapped',
        category: 'Data Readiness',
        contributionPoints: -4,
        delayContributionDays: -8,
        baselineValue: 'Partial Paper Survey',
        observedValue: '100% Geo-referenced DILRMP GIS',
        description:
          'Full digital land parcel boundary verification reduced boundary boundary demarcation disputes by 60% (Mitigating Factor).',
        mitigationSuggestion: 'Ensure continuous live sync with Mahabhulekh state server.',
      },
    ],
  },
  'proj-industrial-corridor': {
    projectId: 'proj-industrial-corridor',
    projectName: 'Pune-Solapur Industrial Growth Corridor',
    projectCode: 'MIDC-2026-03',
    baseRiskScore: 34,
    finalRiskScore: 88,
    riskCategory: 'High',
    totalDelayDays: 175,
    topContributingCategory: 'Landholder Demands for Developed Plots & Grid Relocation',
    executiveSummary:
      'Ranked as CRITICAL/HIGH RISK (+54 points above baseline) due to unified farmer refusal to accept cash compensation, insisting instead on 15% developed commercial plot return (+32 pts), compounded by a 400 kV extra-high-voltage power corridor intersection (+16 pts).',
    factors: [
      {
        id: 'shap-ind-1',
        factorName: 'Collective Demand for 15% Developed Commercial Plots',
        category: 'Fiscal Disbursement',
        contributionPoints: 32,
        delayContributionDays: 78,
        baselineValue: 'Standard Solatium Cash Settlement',
        observedValue: '72% Landowners Demanding Plot Buyback',
        statutoryReference: 'MIDC Act 1961 & R&R Policy Schedule II',
        description:
          'Landowner coalition has stayed Section 11 gazette notification hearings demanding developed commercial enclave allotments.',
        mitigationSuggestion:
          'MIDC Board and Industries Department cabinet sub-committee approval for 12.5% developed plot buyback scheme (-40 Days).',
      },
      {
        id: 'shap-ind-2',
        factorName: '400 kV EHV Power Transmission Grid Realignment',
        category: 'Statutory Clearances',
        contributionPoints: 16,
        delayContributionDays: 45,
        baselineValue: 'No High-Tension Obstruction',
        observedValue: '6 Double-Circuit EHV Towers on RoW',
        statutoryReference: 'Central Electricity Authority Safety Rules',
        description:
          'Transmission corridor bisects proposed EV battery zone, necessitating 12km underground cabling or rerouting.',
        mitigationSuggestion:
          'Approve ₹ 18.4 Cr turnkey deposit work with MSETCL for high-tension cable undergrounding (-25 Days).',
      },
      {
        id: 'shap-ind-3',
        factorName: 'Village Boundary Demarcation in Barren Scrubland',
        category: 'Data Readiness',
        contributionPoints: 10,
        delayContributionDays: 28,
        baselineValue: 'Updated Revenue Boundaries',
        observedValue: 'Survey Maps Dating to 1984',
        description:
          'Historical border disputes between 3 revenue villages causing survey overlap in 52 parcels.',
        mitigationSuggestion: 'Deploy DGPS drone survey team to finalize orthorectified boundary maps (-18 Days).',
      },
      {
        id: 'shap-ind-4',
        factorName: 'Strong Institutional Industrial Board Sponsorship',
        category: 'Social Acceptance',
        contributionPoints: -4,
        delayContributionDays: -10,
        baselineValue: 'Routine Departmental Oversight',
        observedValue: 'Dedicated State MIDC Single-Window Cell',
        description:
          'High political priority and dedicated funding ensure rapid budget release once policy terms are settled.',
        mitigationSuggestion: 'Leverage single-window desk to expedite municipal sanctions.',
      },
    ],
  },
  'proj-river-infra': {
    projectId: 'proj-river-infra',
    projectName: 'River Infrastructure & Flood Mitigation Project',
    projectCode: 'WRD-MH-2025-41',
    baseRiskScore: 34,
    finalRiskScore: 52,
    riskCategory: 'Medium',
    totalDelayDays: 48,
    topContributingCategory: 'Wetland Buffer Zone Compliance & Jetty Allotment',
    executiveSummary:
      'Classified as MEDIUM RISK (+18 points above baseline). Project has achieved 81% land acquisition; the primary residual delay stems from environmental buffer zone sanctions and fisherfolk mooring jetty relocation.',
    factors: [
      {
        id: 'shap-riv-1',
        factorName: 'NGT Eco-Sensitive Wetland Buffer Clearance',
        category: 'Statutory Clearances',
        contributionPoints: 14,
        delayContributionDays: 42,
        baselineValue: 'General Municipal Clearance',
        observedValue: 'Special NGT Buffer Review Required',
        statutoryReference: 'NGT Eco-Sensitive Riverfront Guidelines',
        description:
          'Environmental clearances required for river training revetments and retention basins along Mula-Mutha riverbed.',
        mitigationSuggestion:
          'Convene joint WRD and Pune Municipal Corporation committee to sign off on eco-sensitive riprap design (-20 Days).',
      },
      {
        id: 'shap-riv-2',
        factorName: 'Traditional Fisherfolk Resettlement & Mooring Rights',
        category: 'Social Acceptance',
        contributionPoints: 10,
        delayContributionDays: 18,
        baselineValue: 'Standard Rehabilitation',
        observedValue: '24 Registered Families Awaiting Landing Site',
        description:
          'Alternative boat landing jetty allocation pending municipal approval.',
        mitigationSuggestion: 'Allot municipal riverfront parcel for permanent mechanized boat slips (-12 Days).',
      },
      {
        id: 'shap-riv-3',
        factorName: 'Advanced Civil Construction Readiness (81% Acquired)',
        category: 'Fiscal Disbursement',
        contributionPoints: -6,
        delayContributionDays: -12,
        baselineValue: '50% RoW Handover',
        observedValue: '81% Parcels Handed Over to WRD',
        description:
          'Main riverbank widening earthworks already active on cleared reaches with minimal community disruption.',
        mitigationSuggestion: 'Proceed with revetment works on non-disputed reaches.',
      },
    ],
  },
  'proj-rural-connectivity': {
    projectId: 'proj-rural-connectivity',
    projectName: 'PMGSY Phase-IV Rural Connectivity Project',
    projectCode: 'PMGSY-MH-2025-112',
    baseRiskScore: 34,
    finalRiskScore: 18,
    riskCategory: 'Low',
    totalDelayDays: 8,
    topContributingCategory: 'None (Project on Schedule / Completed)',
    executiveSummary:
      'Classified as LOW RISK (-16 points below baseline). 100% of required land has been acquired and 98% compensation disbursed. Minor schedule buffer of 8 days is for standard drain masonry under contractor guarantee.',
    factors: [
      {
        id: 'shap-rur-1',
        factorName: 'Drainage Culvert Masonry Defect Guarantee',
        category: 'Statutory Clearances',
        contributionPoints: 4,
        delayContributionDays: 8,
        baselineValue: 'Zero Defect Handover',
        observedValue: 'Minor Shoulder Pitching Pending',
        description:
          'Minor stone pitching required along agricultural drainage canal to prevent monsoon siltation.',
        mitigationSuggestion: 'Direct contractor under defect liability period (DLP) to complete within 7 days.',
      },
      {
        id: 'shap-rur-2',
        factorName: '100% Community Consent & Gram Sabha Settlement',
        category: 'Social Acceptance',
        contributionPoints: -12,
        delayContributionDays: -24,
        baselineValue: 'Standard Negotiation',
        observedValue: 'Unanimous 6-Village Gram Panchayat Resolution',
        description:
          'Agricultural hamlets voluntarily expedited right-of-way handover for all-weather road connectivity.',
        mitigationSuggestion: 'Document best practices for replication in neighboring blocks.',
      },
      {
        id: 'shap-rur-3',
        factorName: 'Full DBT Compensation Clearance (98% Settled)',
        category: 'Fiscal Disbursement',
        contributionPoints: -8,
        delayContributionDays: -16,
        baselineValue: '75% Settled',
        observedValue: '98% Direct Bank Transfer Complete',
        description:
          '62 of 64 landholder families received full solatium within 45 days of award publication.',
        mitigationSuggestion: 'None required.',
      },
    ],
  },
  'proj-irrigation-expansion': {
    projectId: 'proj-irrigation-expansion',
    projectName: 'Nira-Deoghar Canal Distributary Network',
    projectCode: 'ID-MH-2026-77',
    baseRiskScore: 34,
    finalRiskScore: 62,
    riskCategory: 'Medium',
    totalDelayDays: 74,
    topContributingCategory: 'Pomegranate Orchard Trenching & RoU Demand',
    executiveSummary:
      'Classified as MEDIUM/HIGH RISK (+28 points above baseline). 140 fruit orchard owners object to open trenching through high-value perennial orchards, requesting underground horizontal directional drilling (HDD) instead.',
    factors: [
      {
        id: 'shap-irr-1',
        factorName: 'Open Trenching through Perennial Fruit Orchards',
        category: 'Grievance Backlog',
        contributionPoints: 20,
        delayContributionDays: 60,
        baselineValue: 'Standard Trench Alignment',
        observedValue: '64 Hectares High-Value Pomegranate Orchards',
        statutoryReference: 'RFCTLARR Section 15 & Horticulture Valuation Matrix',
        description:
          'Farmers demand micro-tunneling or HDD to prevent cutting mature fruiting pomegranate trees.',
        mitigationSuggestion:
          'Approve trenchless HDD design variation for 4.2km orchard reach (-35 Days).',
      },
      {
        id: 'shap-irr-2',
        factorName: 'Demand for Pipeline Right-of-User (RoU) vs Acquisition',
        category: 'Revenue Title Mutation',
        contributionPoints: 12,
        delayContributionDays: 24,
        baselineValue: 'Permanent Title Transfer',
        observedValue: 'Demand for 10% Annual RoU Surface Lease',
        description:
          'Farmers wish to retain agricultural land ownership while granting subterranean passage rights.',
        mitigationSuggestion: 'Adopt Central Petroleum & Minerals Pipelines RoU compensation model (-15 Days).',
      },
      {
        id: 'shap-irr-3',
        factorName: 'High Command Area Irrigation Demand',
        category: 'Social Acceptance',
        contributionPoints: -4,
        delayContributionDays: -10,
        baselineValue: 'Neutral Demand',
        observedValue: 'High Demand in Downstream Villages',
        description:
          'Downstream tail-end farmers actively advocate for project completion to alleviate drought vulnerability.',
        mitigationSuggestion: 'Convene joint village committee with upstream and downstream representatives.',
      },
    ],
  },
};

export function getProjectShapAnalysis(projectId: string): ProjectShapAnalysis {
  return (
    MOCK_PROJECT_SHAP[projectId] ||
    MOCK_PROJECT_SHAP['proj-xyz-highway']
  );
}
