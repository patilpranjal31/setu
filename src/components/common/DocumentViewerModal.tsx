import React from 'react';
import { X, Download, Printer, CheckCircle, FileText, Building2 } from 'lucide-react';
import { DocumentItem } from '../../types';

interface DocumentViewerModalProps {
  document: DocumentItem | null;
  onClose: () => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({ document, onClose }) => {
  if (!document) return null;

  const handleDownload = () => {
    // Generate text/pdf simulation download
    const content = `GOVERNMENT OF MAHARASHTRA / UNION OF INDIA\nREVENUE & FOREST DEPARTMENT / LAND ACQUISITION CELL\n\nTitle: ${document.title}\nDocument Type: ${document.type}\nIssuing Authority: ${document.issuingAuthority}\nDate: ${document.date}\nSurvey Number: ${document.surveyNumber || 'N/A'}\n\nCONTENT ABSTRACT:\n${document.contentSummary}\n\n[Certified Digital Extract - SETU Prototype]`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = window.document.createElement('a');
    link.href = url;
    link.download = `${document.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-900 text-white flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-base leading-tight">{document.title}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{document.issuingAuthority}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors text-xs flex items-center gap-1.5"
              title="Print Document"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg transition-colors text-xs font-medium flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document Body simulating official record format */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 bg-slate-100 flex-1">
          <div className="bg-white p-8 rounded-lg border border-slate-300 shadow-xs max-w-2xl mx-auto font-serif text-slate-800 relative">
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
              <span className="text-7xl font-sans font-black tracking-widest text-slate-900 rotate-[-30deg]">
                PROTOTYPE COPY
              </span>
            </div>

            {/* Official seal & top banner */}
            <div className="text-center pb-6 border-b-2 border-slate-800">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-slate-800 mb-2">
                <Building2 className="w-6 h-6 text-slate-800" />
              </div>
              <h2 className="text-sm uppercase tracking-widest font-sans font-bold text-slate-700">
                Government of Maharashtra · Revenue & Forest Department
              </h2>
              <h1 className="text-xl font-bold font-sans text-slate-900 mt-1">
                {document.type}
              </h1>
              <p className="text-xs font-sans text-slate-500 mt-1">
                National Land Records Modernization Programme (NLRMP) / RFCTLARR MIS
              </p>
            </div>

            {/* Metadata Table */}
            <div className="my-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-sans p-3 bg-slate-50 border border-slate-200 rounded">
              <div>
                <span className="text-slate-500 block">District:</span>
                <span className="font-semibold text-slate-800">Pune (पुणे)</span>
              </div>
              <div>
                <span className="text-slate-500 block">Taluka:</span>
                <span className="font-semibold text-slate-800">Haveli (हवेली)</span>
              </div>
              <div>
                <span className="text-slate-500 block">Village:</span>
                <span className="font-semibold text-slate-800">Examplegaon</span>
              </div>
              <div>
                <span className="text-slate-500 block">Survey No:</span>
                <span className="font-semibold text-slate-800">{document.surveyNumber || '102/3'}</span>
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-4 text-sm leading-relaxed text-slate-700">
              <div>
                <h4 className="font-sans font-bold text-slate-900 text-xs uppercase tracking-wide mb-1">
                  1. Official Summary & Entry Details
                </h4>
                <p>{document.contentSummary}</p>
              </div>

              <div className="p-4 bg-emerald-50/50 border-l-4 border-emerald-600 text-xs font-sans text-emerald-950 space-y-1">
                <div className="font-semibold flex items-center gap-1.5 text-emerald-900">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Cryptographic Integrity Verified (Hash: SHA-256 e8f102...9c2)
                </div>
                <p className="text-slate-600">
                  Digitally signed on {document.date} under the Information Technology Act 2000. Verified against state cadastral repository.
                </p>
              </div>

              <div>
                <h4 className="font-sans font-bold text-slate-900 text-xs uppercase tracking-wide mb-1">
                  2. Applicable Statutory References
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
                  <li>Right to Fair Compensation & Transparency in Land Acquisition (RFCTLARR) Act, 2013</li>
                  <li>Maharashtra Land Revenue Code (MLRC), 1966 Section 148</li>
                  <li>Social Impact Assessment & Consent Rules, 2014</li>
                </ul>
              </div>
            </div>

            {/* Footer Signatures */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-end text-xs font-sans text-slate-500">
              <div>
                <span className="block text-[11px]">System: SETU Node #Haveli-04</span>
                <span className="block text-[10px] text-slate-400">File Reference: {document.id}.pdf</span>
              </div>
              <div className="text-right">
                <span className="font-semibold text-slate-800 block">Competent Authority / Sub-Divisional Officer</span>
                <span className="text-[11px] text-emerald-700 font-medium">Certified Digital Signature Affixed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-white flex items-center justify-between text-xs text-slate-500">
          <span>File size: {document.fileSize} · Format: PDF/A-1b</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
