import { AcquisitionProject, DelayReason, EngineerAlert } from '../types';

export interface EngineerContact {
  id: string;
  name: string;
  role: string;
  designation: string;
  department: string;
  email: string;
  phone: string;
  jurisdiction: string;
  selectedByDefault?: boolean;
}

export const MOCK_ENGINEERS: EngineerContact[] = [
  {
    id: 'eng-1',
    name: 'Er. Vikram Deshmukh',
    role: 'Project Director & Chief Resident Engineer',
    designation: 'Superintending Engineer (NHAI / PWD Corridor Division)',
    department: 'National Highways Authority of India (NHAI)',
    email: 'vikram.deshmukh@infrastructure.gov.in',
    phone: '+91 98230 44102',
    jurisdiction: 'Maharashtra Corridor Division (Pune-Satara)',
    selectedByDefault: true,
  },
  {
    id: 'eng-2',
    name: 'Er. Sneha Kulkarni',
    role: 'Executive Engineer (RoW & Utility Relocation)',
    designation: 'Executive Engineer (Civil & Utility Shifting)',
    department: 'State Public Works Department (PWD Pune)',
    email: 's.kulkarni@pwddiv.mah.gov.in',
    phone: '+91 94220 88291',
    jurisdiction: 'Chainage Km 0+000 to Km 48+500',
    selectedByDefault: true,
  },
  {
    id: 'eng-3',
    name: 'Shri Arvind Shinde, IAS',
    role: 'Competent Authority for Land Acquisition (CALA)',
    designation: 'Sub-Divisional Magistrate & CALA Officer',
    department: 'Revenue & Land Reforms Department, Pune East',
    email: 'cala.pune.east@revenue.gov.in',
    phone: '+91 98901 12340',
    jurisdiction: 'Haveli & Daund Revenue Talukas',
    selectedByDefault: true,
  },
  {
    id: 'eng-4',
    name: 'Dr. Rajeshwari Nair',
    role: 'Lead SIA & Environmental Compliance Officer',
    designation: 'Director (Social Impact & Resettlement)',
    department: 'State Environmental & Social Assessment Consortium',
    email: 'r.nair@sia-consortium.org',
    phone: '+91 97654 32189',
    jurisdiction: 'Western Maharashtra Infrastructure Cell',
    selectedByDefault: false,
  },
  {
    id: 'eng-5',
    name: 'Er. Amitav Ganguly',
    role: 'Senior Quality & Geotechnical Field Engineer',
    designation: 'Lead Construction Supervision Consultant',
    department: 'Project Management & Engineering Unit',
    email: 'amitav.ganguly@pmc-consulting.in',
    phone: '+91 91588 77231',
    jurisdiction: 'Site Field Section Office-2 (Examplegaon)',
    selectedByDefault: false,
  },
];

export const PROJECT_DELAY_REASONS: Record<string, DelayReason[]> = {
  'proj-xyz-highway': [
    {
      id: 'dr-xyz-1',
      category: 'SIA & Public Objections',
      title: 'High Concentration of Irrigation Canal Severance Objections',
      severity: 'Critical',
      delayDays: 52,
      locationChainage: 'Km 14+200 to Km 18+800 (Examplegaon Block)',
      affectedUnits: '19 Active Objections · 48 Farmland Parcels',
      statutoryReference: 'RFCTLARR Act 2013 — Section 15(2) Objection Hearings',
      description:
        'Farmers in Examplegaon and Rampur have stalled joint land demarcation because the alignment cuts across primary gravity-fed irrigation distributaries without planned cross-drainage conduits.',
      mitigationRecommendation:
        'Executive Engineer must issue variation order for 2 reinforced concrete box-culvert irrigation siphons and 1 farm machinery underpass at Ch 16+400.',
      status: 'Open Bottleneck',
    },
    {
      id: 'dr-xyz-2',
      category: 'Compensation & Escrow',
      title: 'CALA Compensation Escrow Backlog & Section 38 Withholding',
      severity: 'Critical',
      delayDays: 45,
      locationChainage: 'Km 22+000 to Km 34+500 (Rampur Sub-Division)',
      affectedUnits: '84 Pending Valuation Determinations · ₹ 42.8 Cr Pending DBT',
      statutoryReference: 'RFCTLARR Act 2013 — Section 38 (Physical Possession Contingent on Award Payment)',
      description:
        'Only 43% of total compensation has been deposited into landholders escrow accounts due to delayed joint revenue measurement hearings. Landowners refuse physical entry under statutory Sec 38 protection.',
      mitigationRecommendation:
        'Deploy special revenue camp court in Rampur Taluka with 2 dedicated Tehsildars to clear remaining 84 award calculations within 15 days.',
      status: 'Open Bottleneck',
    },
    {
      id: 'dr-xyz-3',
      category: 'Statutory & Forest Approvals',
      title: 'Section 19 Declaration 12-Month Expiry Countdown Risk',
      severity: 'High',
      delayDays: 38,
      locationChainage: 'Entire Project Corridor (8 Villages)',
      affectedUnits: '436 Total Cadastral Parcels',
      statutoryReference: 'RFCTLARR Act 2013 — Section 19(7) Mandatory Limitation',
      description:
        'Under Section 19(7), the final declaration must be gazetted within 12 months of Section 11 preliminary notification (issued 14-Apr-2026). Failure causes automatic legal lapse of the entire acquisition.',
      mitigationRecommendation:
        'Fast-track Gram Sabha consultation report submission to District Collector for approval by 15-Nov-2026 to prevent statutory lapse.',
      status: 'Mitigation Underway',
    },
    {
      id: 'dr-xyz-4',
      category: 'Land Acquisition & RoW',
      title: 'Disputed Heirship Mutations & Unpartitioned Khata Titles',
      severity: 'Medium',
      delayDays: 27,
      locationChainage: 'Km 6+100 to Km 11+400 (Shivapur Revenue Boundary)',
      affectedUnits: '24 Disputed Survey Records',
      statutoryReference: 'Maharashtra Land Revenue Code 1966 — Section 149 Heirship Mutation',
      description:
        '24 agricultural parcels have conflicting succession claims between co-parceners, delaying preparation of certified Form 8A ownership certificates necessary for award disbursement.',
      mitigationRecommendation:
        'Authorize CALA to deposit disputed compensation sums into Revenue Court Escrow pursuant to Section 77(2) to permit lawful RoW handover while court decides shares.',
      status: 'Open Bottleneck',
    },
  ],
  'proj-river-infra': [
    {
      id: 'dr-river-1',
      category: 'Statutory & Forest Approvals',
      title: 'MoEFCC Wetland Buffer Zone Resettlement Clearance',
      severity: 'High',
      delayDays: 42,
      locationChainage: 'River Reach 3 (Km 4+200 to 7+800)',
      affectedUnits: '24 Fishing Families · 142 Riverfront Structures',
      statutoryReference: 'National Green Tribunal Eco-Sensitive Buffer Guidelines',
      description:
        'Requisite approval for alternative permanent boat landing jetty and fish drying yards is delayed at Pune Municipal Corporation Planning Board.',
      mitigationRecommendation:
        'Schedule high-level municipal coordination committee meeting with WRD Chief Engineer to sign off jetty lease deed.',
      status: 'Open Bottleneck',
    },
    {
      id: 'dr-river-2',
      category: 'Compensation & Escrow',
      title: 'Disputed Land Title Escrow Deposit',
      severity: 'Medium',
      delayDays: 19,
      locationChainage: 'Reach 1 (Sangam Area)',
      affectedUnits: '8 Riparian Parcels',
      statutoryReference: 'RFCTLARR Section 77 Reference to Court',
      description:
        'Two historical trust land claims are undergoing civil court title determination.',
      mitigationRecommendation:
        'Direct court deposit under Section 77 to secure clear bank revetment possession.',
      status: 'Mitigation Underway',
    },
  ],
  'proj-industrial-corridor': [
    {
      id: 'dr-ind-1',
      category: 'Land Acquisition & RoW',
      title: 'Aggregated Landholder Demand for Developed Industrial Plot Allotment',
      severity: 'Critical',
      delayDays: 78,
      locationChainage: 'Phase 1 Core Industrial Zone (540 Hectares)',
      affectedUnits: '780 Land Parcels · 14 Revenue Villages',
      statutoryReference: 'Maharashtra Industrial Development Act 1961 / RFCTLARR R&R Schedule II',
      description:
        '72% of landholders across 14 villages have formed a sangharsh samiti demanding 15% developed commercial plot return instead of standard cash compensation, freezing Section 11 gazette process.',
      mitigationRecommendation:
        'MIDC Board and Industries Department must convene special ministerial cabinet sub-committee to approve composite 12.5% developed land buyback scheme.',
      status: 'Open Bottleneck',
    },
    {
      id: 'dr-ind-2',
      category: 'Utility Shifting & Technical',
      title: '400 kV Extra High Voltage (EHV) Power Grid Corridor Realignment',
      severity: 'High',
      delayDays: 45,
      locationChainage: 'Corridor Spine Km 18 to 28',
      affectedUnits: '6 Double-Circuit EHV Transmission Towers',
      statutoryReference: 'Central Electricity Authority (Measures Relating to Safety and Electric Supply)',
      description:
        'MSETCL grid line right-of-way intersects the proposed EV battery manufacturing zone, requiring 12km re-routing.',
      mitigationRecommendation:
        'Approve ₹ 18.4 Cr turnkey deposit work order with MSETCL for high-tension cable undergrounding.',
      status: 'Open Bottleneck',
    },
  ],
  'proj-rural-connectivity': [
    {
      id: 'dr-rural-1',
      category: 'Land Acquisition & RoW',
      title: 'Minor Drain Culvert Maintenance Guarantee',
      severity: 'Low',
      delayDays: 8,
      locationChainage: 'Chainage Km 12+400',
      affectedUnits: '2 Parcels',
      statutoryReference: 'PMGSY Standard Bidding Document Works Clause',
      description:
        'Minor shoulder run-off erosion requiring stone pitching along agricultural bund.',
      mitigationRecommendation:
        'Instruct contractor under defect liability period (DLP) to complete masonry work.',
      status: 'Mitigation Underway',
    },
  ],
  'proj-irrigation-expansion': [
    {
      id: 'dr-irr-1',
      category: 'SIA & Public Objections',
      title: 'Pipeline Trench Alignment through Perennial Pomegranate Orchards',
      severity: 'Critical',
      delayDays: 60,
      locationChainage: 'Distributary Channel D-4 (Km 8+000 to 14+500)',
      affectedUnits: '140 Farmers · 64 Hectares Fruit Orchards',
      statutoryReference: 'RFCTLARR Section 15 & Horticulture Valuation Matrix',
      description:
        'Orchard owners object to destructive open trenching during fruiting season and demand directional drilling (HDD) or micro-tunneling under orchards.',
      mitigationRecommendation:
        'Trenchless horizontal directional drilling (HDD) design variation approved for 4.2km orchard stretch.',
      status: 'Open Bottleneck',
    },
  ],
};

export const INITIAL_SENT_ALERTS: EngineerAlert[] = [
  {
    id: 'alert-hist-1',
    dispatchId: 'SETU-ENG-2026-0814',
    projectId: 'proj-xyz-highway',
    projectName: 'XYZ Regional Highway Project',
    projectCode: 'NHAI-MH-2026-08',
    dispatchedAt: '2026-09-22 14:35:10',
    severity: 'Critical (Red Alert)',
    subject: 'URGENT RO-W NOTICE: Projected 162-Day Corridor Delay on NHAI-MH-2026-08',
    projectedDelayDays: 162,
    projectedDelayMonths: '5.4 Months',
    estimatedCostOverrunCr: 61.56,
    recipients: [
      {
        name: 'Er. Vikram Deshmukh',
        role: 'Project Director',
        department: 'NHAI Maharashtra Corridor',
        email: 'vikram.deshmukh@infrastructure.gov.in',
        phone: '+91 98230 44102',
      },
      {
        name: 'Er. Sneha Kulkarni',
        role: 'Executive Engineer',
        department: 'State PWD Pune Division',
        email: 's.kulkarni@pwddiv.mah.gov.in',
        phone: '+91 94220 88291',
      },
      {
        name: 'Shri Arvind Shinde, IAS',
        role: 'CALA Officer',
        department: 'Revenue & Land Reforms, Pune East',
        email: 'cala.pune.east@revenue.gov.in',
        phone: '+91 98901 12340',
      },
    ],
    channels: ['Email Memo', 'SMS Alert', 'WhatsApp Gateway', 'PMIS Push'],
    summaryReasons: [
      'High Concentration of Irrigation Canal Severance Objections (+52 Days)',
      'CALA Compensation Escrow Backlog & Section 38 Withholding (+45 Days)',
      'Section 19 Declaration 12-Month Expiry Countdown (+38 Days)',
      'Disputed Heirship Mutations & Unpartitioned Titles (+27 Days)',
    ],
    mitigationDirectives:
      'Executive Engineer instructed to convene joint camp court at Examplegaon Taluka office on 28-Sep-2026 with CALA and design consultants for box-culvert revision.',
    status: 'Dispatched & Acknowledged',
  },
];

export interface SimulationFactors {
  grievanceResolutionBoost: number; // 0 to 100%
  compensationAcceleration: number; // 0 to 100%
  fastTrackDesignVariation: boolean;
  expediteRevenueMutations: boolean;
}

export function calculateProjectDelayRisk(
  project: AcquisitionProject,
  reasons: DelayReason[],
  simulation: SimulationFactors
) {
  // Sum individual delay contributions
  const rawDelayDays = reasons.reduce((sum, r) => sum + r.delayDays, 0);

  // Apply mitigations from simulation
  let mitigatedDays = rawDelayDays;

  // Grievance resolution reduction (affects SIA & public objection delays up to 70%)
  const grievanceFactor = (simulation.grievanceResolutionBoost / 100) * 0.45;
  mitigatedDays -= rawDelayDays * grievanceFactor;

  // Compensation acceleration reduction (affects up to 35%)
  const compFactor = (simulation.compensationAcceleration / 100) * 0.35;
  mitigatedDays -= rawDelayDays * compFactor;

  // Fast track design variation (reduces 20 days)
  if (simulation.fastTrackDesignVariation) {
    mitigatedDays -= 22;
  }

  // Expedite revenue mutations (reduces 15 days)
  if (simulation.expediteRevenueMutations) {
    mitigatedDays -= 16;
  }

  // Ensure reasonable bounds
  const delayDays = Math.max(12, Math.round(mitigatedDays));
  const delayMonths = (delayDays / 30).toFixed(1);

  // Calculate revised dates
  // Assume baseline scheduled commissioning is 15-Dec-2026
  const baseDate = new Date('2026-12-15');
  const revisedDate = new Date(baseDate.getTime() + delayDays * 24 * 60 * 60 * 1000);
  const revisedFormatted = revisedDate.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  // Cost escalation estimate: project budget * 0.002 per month of delay + equipment holding
  const budget = project.estimatedBudgetCr || 500;
  const monthlyEscalationRate = budget * 0.006; // ~0.6% per month in idle machinery, price index, overheads
  const costEscalationCr = parseFloat((parseFloat(delayMonths) * monthlyEscalationRate).toFixed(2));

  // Risk Score (0 - 100)
  let riskScore = Math.min(
    98,
    Math.round((delayDays / 180) * 70 + (project.grievancesCount / 50) * 15 + (100 - project.landAcquiredPercentage) * 0.15)
  );
  if (delayDays < 45) riskScore = Math.min(riskScore, 42);

  let riskCategory: 'Critical' | 'High' | 'Medium' | 'Low' = 'Low';
  if (riskScore >= 75) riskCategory = 'Critical';
  else if (riskScore >= 55) riskCategory = 'High';
  else if (riskScore >= 35) riskCategory = 'Medium';

  return {
    rawDelayDays,
    delayDays,
    delayMonths,
    baseDateFormatted: '15-Dec-2026',
    revisedDateFormatted: revisedFormatted,
    costEscalationCr,
    riskScore,
    riskCategory,
    criticalBottlenecksCount: reasons.filter((r) => r.severity === 'Critical' || r.severity === 'High').length,
  };
}
