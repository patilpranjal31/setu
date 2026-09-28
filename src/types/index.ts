export type UserRole = 'citizen' | 'government' | 'researcher';

export type ActiveTab = 
  | 'home'
  | 'citizen-dashboard'
  | 'explore-map'
  | 'land-details'
  | 'project-details'
  | 'sia-insights'
  | 'what-it-means'
  | 'compensation'
  | 'ai-assistant'
  | 'grievances'
  | 'gov-dashboard'
  | 'gov-project-analytics'
  | 'project-risk-delay'
  | 'researcher-dashboard'
  | 'data-explorer'
  | 'architecture'
  | 'about';

export interface LandParcel {
  id: string;
  surveyNumber: string;
  subDivision?: string;
  village: string;
  taluka: string;
  district: string;
  state: string;
  areaHectares: number;
  landType: 'Agricultural' | 'Irrigated Double-Crop' | 'Non-Agricultural' | 'Residential' | 'Commercial' | 'Forest Land';
  landStatus: 'Active' | 'Disputed' | 'Under Mutation' | 'Restricted';
  acquisitionStatus: 'None' | 'Proposed' | 'Notified (Sec 11)' | 'Declaration (Sec 19)' | 'Award Passed' | 'Possession Taken';
  associatedProjectId?: string;
  ownerName: string;
  mutationNumber: string;
  marketRatePerHa: number;
  coordinates: [number, number]; // approx relative coords for map [x, y] in %
  polygonPoints: string; // SVG polygon points
  corridorOverlapPercentage: number;
  khataNumber: string;
}

export interface AcquisitionProject {
  id: string;
  name: string;
  code: string;
  status: 'Proposed' | 'Preliminary Notification' | 'SIA Review' | 'Public Hearing' | 'Acquisition In Progress' | 'Completed';
  category: 'Highway' | 'Railways' | 'Irrigation' | 'Industrial Corridor' | 'Renewable Energy' | 'Urban Infrastructure';
  state: string;
  districts: string[];
  purpose: string;
  proposingAuthority: string;
  notificationDate: string;
  estimatedBudgetCr: number;
  affectedVillagesCount: number;
  affectedParcelsCount: number;
  affectedHouseholdsCount: number;
  agriculturalLandHa: number;
  totalLandRequiredHa: number;
  landAcquiredPercentage: number;
  siaCompletionPercentage: number;
  publicConsultationPercentage: number;
  compensationDisbursedPercentage: number;
  grievancesCount: number;
  timeline: {
    stage: string;
    description: string;
    date: string;
    completed: boolean;
    current: boolean;
  }[];
  issueIndicators: {
    title: string;
    severity: 'High' | 'Medium' | 'Low';
    status: 'Flagged' | 'Needs monitoring' | 'Normal';
    description: string;
    underlyingData: string;
  }[];
  riskScore?: number; // 0 to 100
  riskCategory?: 'Critical' | 'High' | 'Medium' | 'Low';
  projectedDelayDays?: number;
}

export interface ShapFactor {
  id: string;
  factorName: string;
  category: 'Grievance Backlog' | 'Fiscal Disbursement' | 'Statutory Clearances' | 'Revenue Title Mutation' | 'Social Acceptance' | 'Data Readiness';
  contributionPoints: number; // positive = pushes risk higher (+18 pts), negative = mitigating factor (-8 pts)
  delayContributionDays: number; // e.g. +52 days or -15 days
  description: string;
  baselineValue: string;
  observedValue: string;
  statutoryReference?: string;
  mitigationSuggestion?: string;
}

export interface DistrictRiskData {
  id: string;
  name: string;
  riskScore: number; // 0 - 100
  riskCategory: 'High' | 'Medium' | 'Low';
  color: string;
  totalProjects: number;
  delayedProjects: number;
  avgDelayDays: number;
  budgetAtRiskCr: number;
  activeGrievances: number;
  keyBottleneck: string;
  coordinates: [number, number]; // [x, y] in percentage or SVG viewBox
  svgPath: string;
}

export interface Grievance {
  id: string;
  trackingId: string;
  surveyNumber: string;
  village: string;
  category: 'Compensation' | 'Land Record Error' | 'Acquisition Alignment' | 'Rehabilitation & Resettlement' | 'Environmental/Water Access' | 'Other';
  description: string;
  submittedBy: string;
  contactNumber: string;
  submittedAt: string;
  status: 'Submitted' | 'Received' | 'Under Review' | 'Resolved';
  resolutionNotes?: string;
  timeline: {
    stage: 'Submitted' | 'Received' | 'Under Review' | 'Resolved';
    date: string;
    actor: string;
    completed: boolean;
  }[];
  documentAttachmentName?: string;
}

export interface SiaVillageData {
  village: string;
  households: number;
  population: number;
  agriculturalLandHa: number;
  livelihoodImpactRate: number; // percentage
  primaryConcerns: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  type: 'Land Record (Form 7/12)' | 'Ownership Record (Mutation 8A)' | 'Preliminary Notification' | 'SIA Report' | 'Public Hearing Notice';
  date: string;
  issuingAuthority: string;
  fileSize: string;
  downloadUrl: string;
  surveyNumber?: string;
  projectId?: string;
  contentSummary: string;
}

export interface DelayReason {
  id: string;
  category: 'Land Acquisition & RoW' | 'SIA & Public Objections' | 'Compensation & Escrow' | 'Statutory & Forest Approvals' | 'Utility Shifting & Technical';
  title: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  delayDays: number;
  locationChainage: string;
  affectedUnits: string;
  statutoryReference: string;
  description: string;
  mitigationRecommendation: string;
  status: 'Open Bottleneck' | 'Mitigation Underway' | 'Resolved';
}

export interface EngineerAlert {
  id: string;
  dispatchId: string;
  projectId: string;
  projectName: string;
  projectCode: string;
  dispatchedAt: string;
  severity: 'Critical (Red Alert)' | 'High Priority (Amber)' | 'Routine Advisory (Yellow)';
  subject: string;
  projectedDelayDays: number;
  projectedDelayMonths: string;
  estimatedCostOverrunCr: number;
  recipients: {
    name: string;
    role: string;
    department: string;
    email: string;
    phone: string;
  }[];
  channels: ('Email Memo' | 'SMS Alert' | 'WhatsApp Gateway' | 'PMIS Push')[];
  summaryReasons: string[];
  mitigationDirectives: string;
  status: 'Dispatched & Acknowledged' | 'Action In Progress' | 'Escalated to MoRTH';
}

