import React, { useState } from 'react';
import { Bot, Send, FileText, CheckCircle2, Upload, Sparkles, BookOpen, AlertCircle, RefreshCw } from 'lucide-react';
import { TrustBanner } from '../common/TrustBanner';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  citation?: string;
  timestamp: string;
}

export const AiSiaAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: 'Hello, I have analyzed the draft Social Impact Assessment report for the XYZ Regional Highway Project (SIA_Report_XYZ_Project.pdf). You can ask me any question about affected villages, community concerns, public consultation schedules, or rehabilitation packages.',
      citation: 'Source: SIA_Report_XYZ_Project.pdf, Executive Summary (pp. 4-8)',
      timestamp: '10:00 AM',
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedDocName, setUploadedDocName] = useState('SIA_Report_XYZ_Project.pdf');

  const SUGGESTED_QUERIES = [
    'What are the major concerns raised by affected communities?',
    'What rehabilitation packages are recommended for farmers?',
    'When and where is the public consultation scheduled?',
    'Which irrigation canals or water bodies will be impacted?',
  ];

  const handleSend = (queryToSend?: string) => {
    const q = queryToSend || inputQuery;
    if (!q.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsProcessing(true);

    // Simulated contextual AI knowledge base based on SIA document
    setTimeout(() => {
      let replyText = '';
      let citation = 'Source: SIA_Report_XYZ_Project.pdf, Section 4.2';

      const lower = q.toLowerCase();
      if (lower.includes('concern') || lower.includes('major concern') || lower.includes('community')) {
        replyText =
          'Based on field surveys of 286 affected households across 8 villages, the major concerns raised by affected communities are:\n\n' +
          '1. Loss of Agricultural Income (42%): Severance of prime double-cropped sugarcane & wheat holdings in Examplegaon and Rampur.\n' +
          '2. Relocation & Residential Displacement (24%): 28 families requiring complete physical resettlement.\n' +
          '3. Severance of Farm Access & Canal Feeder Lines (20%): Bisecting of underground micro-irrigation pipelines and tractor transit lanes.\n' +
          '4. Compensation Fairness & Timeliness (14%): Demands for updated ready reckoner rates and timely DBT disbursements.';
        citation = 'Source: SIA_Report_XYZ_Project.pdf, Section 4.2 (Community Feedback Synthesis, p. 58)';
      } else if (lower.includes('rehabilitation') || lower.includes('package') || lower.includes('resettlement')) {
        replyText =
          'The SIA Expert Group recommends the following statutory rehabilitation and resettlement provisions under the RFCTLARR Second Schedule:\n\n' +
          '• Subsistence allowance of ₹3,000 per month for 12 months for each displaced family.\n' +
          '• One-time resettlement grant of ₹50,000 for shifting assets and materials.\n' +
          '• Priority skill development vouchers for one eligible youth per affected household in industrial logistics.';
        citation = 'Source: SIA_Report_XYZ_Project.pdf, Section 6.1 (Rehabilitation Matrix, pp. 92-96)';
      } else if (lower.includes('public consultation') || lower.includes('schedule') || lower.includes('hearing') || lower.includes('when')) {
        replyText =
          'The public consultation schedule is notified as follows:\n\n' +
          '• Examplegaon & Rampur: 12th October 2026, 10:30 AM at Gram Panchayat Bhavan Examplegaon.\n' +
          '• Shivapur & Karanjgaon: 14th October 2026, 11:00 AM at Taluka Administrative Hall Haveli.\n\n' +
          'Oral submissions and written representations under Section 15 will be recorded verbatim by the CALA.';
        citation = 'Source: SIA_Report_XYZ_Project.pdf, Appendix C (Hearing Notifications & Minutes, p. 128)';
      } else if (lower.includes('canal') || lower.includes('water') || lower.includes('irrigation')) {
        replyText =
          'The alignment intersects 3 vital irrigation arteries:\n\n' +
          '• Haveli Canal Distributary #4 (Km 14.2) serving 48 ha in Examplegaon.\n' +
          '• 14 registered agricultural borewells and drip lines within the 60m right-of-way.\n\n' +
          'The SIA stipulates mandatory construction of box culverts and prepaid replacement of borewells prior to civil works.';
        citation = 'Source: SIA_Report_XYZ_Project.pdf, Section 3.4 (Hydrological & Infrastructure Impact, p. 44)';
      } else {
        replyText =
          `Regarding "${q}": The SIA Draft Report confirms that the project covers 242 total hectares across 8 revenue villages. Detailed surveys recommend comprehensive mitigation, replacement of canal cross-drains, and structured public hearings prior to Section 19 declaration.`;
        citation = 'Source: SIA_Report_XYZ_Project.pdf, Section 5.3 (Mitigation & Monitoring Framework)';
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        citation,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsProcessing(false);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Semantic Document Intelligence · LLM-Assisted Analysis
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            SIA Document Assistant
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Query multi-hundred page Social Impact Assessment reports and gazette notices in plain language with exact citations
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded bg-blue-50 text-blue-900 border border-blue-200 text-xs font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-700" />
            <span>AI Prototype Mode</span>
          </span>
        </div>
      </div>

      {/* Trust banner */}
      <TrustBanner type="ai" />

      {/* Upload & Analyzed Document Summary Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Upload Area (Left: 4 cols) */}
        <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Upload SIA / Project Document
            </h3>
            <span className="text-[10px] text-slate-400">PDF, DOCX up to 25MB</span>
          </div>

          <div className="border-2 border-dashed border-slate-300 hover:border-blue-700 rounded-lg p-4 text-center cursor-pointer transition-colors bg-slate-50">
            <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
            <span className="text-xs font-semibold text-slate-800 block">
              Drag & Drop SIA Report
            </span>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              or click to browse files
            </span>
          </div>

          {/* Current Loaded Document */}
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wide flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Document Analyzed
              </span>
              <span className="text-[10px] text-slate-500 font-mono">142 Pages</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <FileText className="w-4 h-4 text-blue-800 shrink-0" />
              <span className="truncate">{uploadedDocName}</span>
            </div>
            <div className="text-[11px] text-slate-600">
              Gokhale Institute Baseline Study (Pune District, Aug 2026)
            </div>
          </div>

          {/* Prompt specified Document Summary */}
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2.5 text-xs">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Extracted Synthesis Summary
            </h4>
            <div className="space-y-1.5 text-slate-700">
              <div>
                <span className="text-slate-500 block text-[10px]">Project:</span>
                <span className="font-semibold text-slate-900">XYZ Regional Highway</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-500 block text-[10px]">Villages affected:</span>
                  <span className="font-bold text-slate-900 font-mono">8</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Households affected:</span>
                  <span className="font-bold text-slate-900 font-mono">286</span>
                </div>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Major identified concerns:</span>
                <span className="font-medium text-slate-900">
                  Agricultural livelihood, Relocation, Road access
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Interface (Right: 8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col h-[580px] overflow-hidden">
          {/* Chat Header */}
          <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-blue-900 text-white flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-xs block">
                  SETU Evidence Assistant
                </span>
                <span className="text-[10px] text-emerald-700 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Indexed 142 pages with section embeddings
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                setMessages([
                  {
                    id: 'msg-init',
                    sender: 'assistant',
                    text: 'Hello, I have analyzed the draft Social Impact Assessment report for the XYZ Regional Highway Project (SIA_Report_XYZ_Project.pdf). You can ask me any question about affected villages, community concerns, public consultation schedules, or rehabilitation packages.',
                    citation: 'Source: SIA_Report_XYZ_Project.pdf, Executive Summary (pp. 4-8)',
                    timestamp: '10:00 AM',
                  },
                ]);
              }}
              className="text-xs text-slate-500 hover:text-slate-900 p-1.5 rounded hover:bg-slate-200"
              title="Reset Chat"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Chat Message Scroll */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 max-w-2xl ${m.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {m.sender === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center shrink-0 text-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`p-4 rounded-xl text-xs space-y-2 ${
                    m.sender === 'user'
                      ? 'bg-blue-900 text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200 shadow-2xs rounded-bl-xs'
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed">{m.text}</p>
                  {m.citation && (
                    <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-blue-900 font-semibold">
                      <BookOpen className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                      <span>{m.citation}</span>
                    </div>
                  )}
                  <span
                    className={`text-[9px] block text-right ${
                      m.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                    }`}
                  >
                    {m.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isProcessing && (
              <div className="flex gap-3 max-w-xl">
                <div className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center shrink-0 text-xs">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                  <span>Scanning SIA Section 4 and cross-referencing village records...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompts Chips */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 overflow-x-auto text-[11px]">
            <span className="text-slate-400 font-bold shrink-0 uppercase text-[10px]">
              Suggestions:
            </span>
            {SUGGESTED_QUERIES.map((sq, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(sq)}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-900 text-slate-700 whitespace-nowrap transition-colors border border-slate-200 shrink-0"
              >
                {sq}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask any question about the SIA report (e.g. community concerns, dates, packages)..."
                className="flex-1 px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900 text-slate-900"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim() || isProcessing}
                className="px-4 py-2.5 bg-blue-900 hover:bg-blue-800 disabled:opacity-40 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
