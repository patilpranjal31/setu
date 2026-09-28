import React, { useState } from 'react';
import { FileText, Eye, Download, ArrowRight, ShieldCheck, MapPin, Building, ExternalLink, Calendar, HelpCircle, Scale } from 'lucide-react';
import { MOCK_PARCELS, MOCK_DOCUMENTS, CURRENT_CITIZEN } from '../../data/mockData';
import { DocumentItem, ActiveTab } from '../../types';
import { DocumentViewerModal } from '../common/DocumentViewerModal';
import { TrustBanner } from '../common/TrustBanner';

interface LandDetailsPageProps {
  onNavigateTab: (tab: ActiveTab) => void;
}

export const LandDetailsPage: React.FC<LandDetailsPageProps> = ({ onNavigateTab }) => {
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const parcel = MOCK_PARCELS.find((p) => p.surveyNumber === '102/3') || MOCK_PARCELS[0];

  const handleDownload = (doc: DocumentItem) => {
    const content = `GOVERNMENT OF MAHARASHTRA\nREVENUE DEPARTMENT\nTitle: ${doc.title}\nDocument Type: ${doc.type}\nSurvey Number: 102/3\nDate: ${doc.date}\nAuthority: ${doc.issuingAuthority}\n\nSUMMARY:\n${doc.contentSummary}\n\n[Certified Digital Extract - SETU Prototype]`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${doc.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Verified Cadastral Record · NLRMP Node
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Land Details
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Cadastral Survey Record for {parcel.village}, Haveli Taluka, Pune District
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab('project-details')}
            className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span>View Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Clean Information Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold px-2.5 py-1 rounded bg-blue-50 text-blue-900 border border-blue-200">
              Survey No: {parcel.surveyNumber}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Sub-Division: {parcel.subDivision}
            </span>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified Record
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-slate-400 text-[11px] block">Survey Number</span>
            <span className="text-base font-bold text-slate-900 font-mono">
              {parcel.surveyNumber}
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-slate-400 text-[11px] block">Area</span>
            <span className="text-base font-bold text-slate-900 font-mono">
              {parcel.areaHectares} hectares
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-slate-400 text-[11px] block">Land Use</span>
            <span className="text-base font-bold text-slate-900">
              {parcel.landType}
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-slate-400 text-[11px] block">Location</span>
            <span className="text-base font-bold text-slate-900 truncate block">
              {parcel.village}, {parcel.district}
            </span>
          </div>

          <div className="p-3 bg-amber-50/70 rounded-lg border border-amber-200">
            <span className="text-amber-800 text-[11px] block">Acquisition Status</span>
            <span className="text-base font-bold text-amber-900">
              {parcel.acquisitionStatus}
            </span>
          </div>

          <div className="p-3 bg-blue-50/70 rounded-lg border border-blue-200">
            <span className="text-blue-800 text-[11px] block">Associated Project</span>
            <span className="text-xs font-bold text-blue-900 truncate block mt-0.5">
              XYZ Regional Highway
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-lg border border-slate-200">
          <div>
            <span className="text-slate-500 block">Registered Title Holders:</span>
            <span className="font-semibold text-slate-900 text-sm">{parcel.ownerName}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Mutation Register Entry:</span>
            <span className="font-mono text-slate-900">{parcel.mutationNumber} · Approved 2018</span>
          </div>
        </div>
      </div>

      {/* Official Documents Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide">
              Official Digital Documents & Records
            </h2>
            <p className="text-xs text-slate-500">
              Digitally certified extracts synchronized from state revenue repository and acquisition gazette
            </p>
          </div>
          <span className="text-xs text-slate-400">4 records found</span>
        </div>

        <div className="divide-y divide-slate-100">
          {MOCK_DOCUMENTS.map((doc) => (
            <div
              key={doc.id}
              className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/60 rounded-lg p-2 transition-colors"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-900">{doc.title}</h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-medium text-slate-700">{doc.type}</span>
                    <span>·</span>
                    <span>{doc.issuingAuthority}</span>
                    <span>·</span>
                    <span>{doc.fileSize}</span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-1 max-w-2xl">
                    {doc.contentSummary}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <button
                  onClick={() => setSelectedDoc(doc)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-600" />
                  <span>View</span>
                </button>
                <button
                  onClick={() => handleDownload(doc)}
                  className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-slate-600" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Navigation Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-blue-50/60 rounded-xl border border-blue-200">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-blue-950">
            Next recommended steps for Survey 102/3:
          </h4>
          <p className="text-xs text-blue-800">
            Explore how this proposed acquisition affects your legal rights and estimated compensation under RFCTLARR.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigateTab('what-it-means')}
            className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            <span>What Does This Mean For Me?</span>
          </button>
          <button
            onClick={() => onNavigateTab('compensation')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Scale className="w-4 h-4" />
            <span>Calculate Compensation</span>
          </button>
        </div>
      </div>

      {/* Simulated Document Viewer Modal */}
      <DocumentViewerModal
        document={selectedDoc}
        onClose={() => setSelectedDoc(null)}
      />

      {/* Trust banner */}
      <TrustBanner customMessage="Land records and mutation numbers displayed are synthetic demonstrations mirroring the Mahabhulekh / Bhulekh standard format." />
    </div>
  );
};
