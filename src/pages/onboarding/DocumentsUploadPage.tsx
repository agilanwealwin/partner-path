import React, { useState } from 'react';
import {
  Building2, Wrench, DollarSign, Users, CheckCircle2, Clock, Upload, AlertTriangle,
  XCircle, Eye, Download, Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { useOnboarding } from '@/hooks/use-onboarding';

type DocStatus = 'verified' | 'review' | 'rejected' | 'not-uploaded' | 'optional';

interface Doc {
  id: number;
  name: string;
  required: boolean;
  status: DocStatus;
  count?: string;
  rejectReason?: string;
}

const sections: { title: string; icon: React.ElementType; docs: Doc[] }[] = [
  {
    title: 'A — Company Registration',
    icon: Building2,
    docs: [
      { id: 1, name: 'Certificate of Incorporation', required: true, status: 'verified' },
      { id: 2, name: 'MOA / AOA / LLP Deed', required: true, status: 'review' },
      { id: 3, name: 'GST Registration Certificate', required: true, status: 'not-uploaded' },
      { id: 4, name: 'PAN Card (Company)', required: true, status: 'verified' },
    ],
  },
  {
    title: 'B — Technical Credentials',
    icon: Wrench,
    docs: [
      { id: 5, name: 'MNRE / CEIG Certification', required: true, status: 'not-uploaded' },
      { id: 6, name: 'Electrical Contractor License', required: true, status: 'rejected', rejectReason: 'Electrical contractor license appears expired. Please upload a valid, current license issued within the last 12 months.' },
      { id: 7, name: 'Project Completion Certificates (min 5)', required: true, status: 'verified', count: '7 Uploaded' },
      { id: 8, name: 'Past MW Deployment Evidence', required: true, status: 'not-uploaded' },
      { id: 9, name: 'DPR / Technical Portfolio', required: false, status: 'optional' },
    ],
  },
  {
    title: 'C — Financial Documents',
    icon: DollarSign,
    docs: [
      { id: 10, name: 'Last 3 Years Audited Balance Sheet', required: true, status: 'verified' },
      { id: 11, name: 'Bank Solvency Certificate', required: true, status: 'not-uploaded' },
      { id: 12, name: 'IT Returns (Last 2 Years)', required: true, status: 'not-uploaded' },
    ],
  },
  {
    title: 'D — Personnel & Insurance',
    icon: Users,
    docs: [
      { id: 13, name: 'Director / Authorised Signatory KYC', required: true, status: 'verified' },
      { id: 14, name: 'Professional Indemnity Insurance', required: true, status: 'not-uploaded' },
      { id: 15, name: 'Labour License', required: false, status: 'optional' },
    ],
  },
];

const statusDisplay: Record<DocStatus, { icon: React.ElementType; label: string; cls: string }> = {
  verified: { icon: CheckCircle2, label: 'Verified', cls: 'text-status-green' },
  review: { icon: Clock, label: 'Under Review', cls: 'text-status-orange' },
  rejected: { icon: XCircle, label: 'Rejected', cls: 'text-status-red' },
  'not-uploaded': { icon: Upload, label: 'Not Uploaded', cls: 'text-muted-foreground' },
  optional: { icon: Upload, label: 'Optional', cls: 'text-muted-foreground' },
};

export default function DocumentsUploadPage() {
  const { nextStep } = useOnboarding();
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({ 0: true, 1: true, 2: true, 3: true });
  const [uploadingDoc, setUploadingDoc] = useState<number | null>(null);

  const toggleSection = (i: number) => setOpenSections(prev => ({ ...prev, [i]: !prev[i] }));

  const verified = 4;
  const underReview = 1;
  const rejected = 1;
  const notUploaded = 8;
  const totalRequired = 14;
  const uploaded = 6;
  const pct = Math.round((uploaded / totalRequired) * 100);

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">Document Upload</h1>
          <p className="text-sm text-muted-foreground mt-1 font-mono">DLN/PQ/2026/001 — Section 3: Credential Submission</p>
        </div>
        <Button variant="outline" size="sm"><Download size={14} /> Download Checklist PDF</Button>
      </div>

      {/* Progress Bar */}
      <div className="rounded-card bg-surface p-4 shadow-surface">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-foreground">{uploaded} of {totalRequired} documents uploaded · {pct}% complete</span>
          <span className="text-[10px] text-muted-foreground font-mono">{totalRequired} required + 2 optional</span>
        </div>
        <Progress value={pct} className="h-2 bg-surface-3" />
      </div>

      <div className="flex gap-6">
        {/* Main Accordion */}
        <div className="flex-1 space-y-3 min-w-0">
          {sections.map((sec, si) => (
            <div key={si} className="rounded-card bg-surface border border-border shadow-surface overflow-hidden">
              <button
                onClick={() => toggleSection(si)}
                className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-surface-2 transition-colors"
              >
                <sec.icon size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground flex-1 text-left">{sec.title}</span>
                <span className="text-[10px] text-muted-foreground">{sec.docs.filter(d => d.status === 'verified').length}/{sec.docs.filter(d => d.required).length} verified</span>
              </button>
              {openSections[si] && (
                <div className="border-t border-border">
                  {sec.docs.map((doc) => {
                    const sd = statusDisplay[doc.status];
                    return (
                      <div key={doc.id}>
                        <div className="flex items-center px-5 py-3 hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                          <span className="font-mono text-[10px] text-muted-foreground w-8">{doc.id}</span>
                          <span className="text-[12px] text-foreground flex-1">{doc.name}{doc.required ? '*' : ''}</span>
                          {doc.count && <span className="text-[10px] text-muted-foreground mr-3">{doc.count}</span>}
                          <span className={cn("inline-flex items-center gap-1 text-[10px] mr-4", sd.cls)}>
                            <sd.icon size={12} /> {sd.label}
                          </span>
                          {doc.status === 'verified' || doc.status === 'review' ? (
                            <button className="p-1 rounded hover:bg-surface-2"><Eye size={14} className="text-muted-foreground" /></button>
                          ) : (
                            <Button
                              variant="outline"
                              size="xs"
                              onClick={() => setUploadingDoc(uploadingDoc === doc.id ? null : doc.id)}
                            >
                              <Upload size={12} /> Upload
                            </Button>
                          )}
                        </div>
                        {/* Rejection Card */}
                        {doc.status === 'rejected' && doc.rejectReason && (
                          <div className="mx-5 mb-3 p-3 rounded-lg bg-red-soft border border-status-red/20">
                            <div className="flex items-center gap-1.5 mb-1">
                              <XCircle size={12} className="text-status-red" />
                              <span className="text-[11px] font-medium text-status-red">Document Rejected</span>
                            </div>
                            <p className="text-[11px] text-muted-foreground">{doc.rejectReason}</p>
                            <p className="text-[9px] text-muted-foreground mt-1.5">Reviewed by: DeLEN Compliance · 14 Mar 2025</p>
                          </div>
                        )}
                        {/* Upload Zone */}
                        {uploadingDoc === doc.id && (
                          <div className="mx-5 mb-3 p-6 rounded-lg border-2 border-dashed border-border hover:border-primary/30 transition-colors text-center bg-surface-2">
                            <Upload size={28} className="text-muted-foreground mx-auto mb-2" />
                            <p className="text-sm text-foreground">Drag & drop or click to browse</p>
                            <p className="text-[10px] text-muted-foreground mt-1">PDF / PNG / JPG / DOCX · Max 25MB</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Sidebar */}
        <div className="w-[260px] shrink-0 space-y-4">
          <div className="rounded-card bg-surface p-5 shadow-surface sticky top-6">
            {/* Progress Ring */}
            <div className="w-28 h-28 mx-auto relative mb-4">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--surface3))" strokeWidth="6" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--status-green))" strokeWidth="6"
                  strokeDasharray={2 * Math.PI * 42}
                  strokeDashoffset={2 * Math.PI * 42 * (1 - pct / 100)}
                  strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display font-bold text-xl text-foreground">{pct}%</span>
                <span className="text-[8px] text-muted-foreground uppercase tracking-wider">Complete</span>
              </div>
            </div>

            <div className="space-y-2 text-[11px]">
              <div className="flex justify-between"><span className="text-muted-foreground">Total Required</span><span className="text-foreground font-mono">{totalRequired}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Optional</span><span className="text-foreground font-mono">2</span></div>
              <div className="h-px bg-border my-1" />
              <div className="flex justify-between"><span className="text-status-green">Verified</span><span className="text-foreground font-mono">{verified}</span></div>
              <div className="flex justify-between"><span className="text-status-orange">Under Review</span><span className="text-foreground font-mono">{underReview}</span></div>
              <div className="flex justify-between"><span className="text-status-red">Rejected</span><span className="text-foreground font-mono">{rejected}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Not Uploaded</span><span className="text-foreground font-mono">{notUploaded}</span></div>
            </div>

            <Button className="w-full mt-4" size="sm" onClick={nextStep}>Submit for Review</Button>
            <p className="text-[9px] text-muted-foreground mt-2 text-center">All required documents must be uploaded before submission</p>

            <div className="mt-4 p-2.5 rounded-lg bg-accent-soft">
              <div className="flex items-start gap-1.5">
                <Info size={12} className="text-primary mt-0.5 shrink-0" />
                <p className="text-[10px] text-primary">Documents are reviewed within 3–5 business days after submission.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
