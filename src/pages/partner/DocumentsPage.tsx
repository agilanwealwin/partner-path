import React, { useState, useRef } from 'react';
import { FileText, FilePlus, Search, Eye, Download, X, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

const tabDefs = ['Company Docs', 'Project Docs', 'Node Certificates', 'Agreements', 'Compliance'];

const DOC_TYPES = [
  'Company Docs',
  'Project Docs',
  'Node Certificates',
  'Agreements',
  'Compliance',
];

const docs: Record<string, { name: string; status: string; date: string; type: string }[]> = {
  'Company Docs': [
    { name: 'Certificate of Incorporation', status: 'Verified', date: 'Jan 2024', type: 'PDF' },
    { name: 'GST Registration Certificate', status: 'Verified', date: 'Jan 2024', type: 'PDF' },
    { name: 'PAN Card (Company)', status: 'Verified', date: 'Jan 2024', type: 'PDF' },
    { name: 'MOA / AOA', status: 'Verified', date: 'Jan 2024', type: 'PDF' },
  ],
  'Project Docs': [
    { name: 'DPR — Thar Solar Farm Ph.2', status: 'Active', date: 'Mar 2024', type: 'PDF' },
    { name: 'Grid Interconnection Agreement — Thar', status: 'Active', date: 'Jul 2024', type: 'PDF' },
    { name: 'CEI Approval — Bikaner Solar Park', status: 'Active', date: 'Jun 2024', type: 'PDF' },
    { name: 'Commissioning Report — Nellore RE Park', status: 'Active', date: 'Dec 2024', type: 'PDF' },
  ],
  'Node Certificates': [
    { name: 'Node Fleet Certificate — Thar Cluster', status: 'Active', date: 'Jan 2025', type: 'PDF' },
    { name: 'Calibration Certificate — Weather Nodes', status: 'Expiring', date: 'Mar 2025', type: 'PDF' },
  ],
  'Agreements': [
    { name: 'DeLEN Partner Agreement', status: 'Signed', date: 'Jan 2024', type: 'PDF' },
    { name: 'O&M Service Contract', status: 'Signed', date: 'Feb 2024', type: 'PDF' },
    { name: 'Host Entity MoU — Rajasthan RE Corp', status: 'Signed', date: 'Mar 2024', type: 'PDF' },
  ],
  'Compliance': [
    { name: 'Annual Compliance Report 2024', status: 'Submitted', date: 'Feb 2025', type: 'PDF' },
    { name: 'Safety Audit Report', status: 'Under Review', date: 'Mar 2025', type: 'PDF' },
  ],
};

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState('Company Docs');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Upload form state
  const [docType, setDocType] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [formError, setFormError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentDocs = (docs[activeTab] || []).filter(d =>
    !search || d.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleFileChange = (file: File | null) => {
    if (!file) return;
    const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowed.includes(file.type)) {
      setFormError('Only PDF and image files (JPG, PNG, WEBP, GIF) are accepted.');
      setSelectedFile(null);
      return;
    }
    setFormError('');
    setSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0] ?? null;
    handleFileChange(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docType) { setFormError('Please select a document type.'); return; }
    if (!selectedFile) { setFormError('Please select a file to upload.'); return; }
    setFormError('');
    // TODO: wire to actual upload API
    toast.success('Document uploaded successfully', {
      description: `"${selectedFile.name}" submitted as ${docType}.`,
    });
    resetModal();
  };

  const resetModal = () => {
    setShowModal(false);
    setDocType('');
    setSelectedFile(null);
    setFormError('');
    setDragOver(false);
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">Documents</h1>
          <p className="text-sm text-muted-foreground mt-1">Document management and compliance tracking</p>
        </div>
        <Button size="sm" onClick={() => setShowModal(true)}>
          <FilePlus size={14} /> Upload Document
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border overflow-x-auto">
        {tabDefs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={cn(
            "px-4 py-2.5 text-[12px] transition-colors border-b-2 -mb-px whitespace-nowrap",
            activeTab === tab ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'
          )}>{tab}</button>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface border border-border max-w-sm">
        <Search size={14} className="text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search documents..." className="bg-transparent text-sm text-foreground outline-none w-full placeholder:text-muted-foreground" />
      </div>

      {/* Table */}
      <div className="rounded-card border border-border overflow-x-auto">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-border bg-surface">
              {['Document', 'Type', 'Status', 'Date', 'Actions'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentDocs.map((d, i) => (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-[rgba(255,255,255,0.02)]">
                <td className="px-4 py-2.5 text-foreground flex items-center gap-2"><FileText size={14} className="text-muted-foreground" /> {d.name}</td>
                <td className="px-4 py-2.5 font-mono text-muted-foreground">{d.type}</td>
                <td className="px-4 py-2.5">
                  <span className={cn("px-1.5 py-0.5 rounded-md text-[10px]",
                    d.status === 'Verified' || d.status === 'Active' || d.status === 'Signed' ? 'bg-green-soft text-status-green' :
                    d.status === 'Expiring' ? 'bg-orange-soft text-status-orange' :
                    d.status === 'Under Review' ? 'bg-accent-soft text-primary' : 'bg-blue-soft text-status-blue'
                  )}>{d.status}</span>
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">{d.date}</td>
                <td className="px-4 py-2.5">
                  <div className="flex gap-1">
                    <button className="p-1 rounded hover:bg-surface-2"><Eye size={14} className="text-muted-foreground" /></button>
                    <button className="p-1 rounded hover:bg-surface-2"><Download size={14} className="text-muted-foreground" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Upload Document Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={e => { if (e.target === e.currentTarget) resetModal(); }}
        >
          <div className="bg-background border border-border rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 space-y-5">
            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display font-semibold text-lg text-foreground">Upload Document</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Select type and attach your file</p>
              </div>
              <button
                onClick={resetModal}
                className="p-1.5 rounded-lg hover:bg-surface-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Document Type Dropdown */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                  Document Type <span className="text-red-400">*</span>
                </label>
                <select
                  value={docType}
                  onChange={e => { setDocType(e.target.value); setFormError(''); }}
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select document type…</option>
                  {DOC_TYPES.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* File Drop Zone */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                  File (PDF or Image) <span className="text-red-400">*</span>
                </label>
                <div
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    "flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl py-8 px-4 cursor-pointer transition-colors",
                    dragOver ? 'border-primary bg-accent-soft' : 'border-border hover:border-primary/50 bg-surface'
                  )}
                >
                  <UploadCloud size={28} className={cn("transition-colors", dragOver ? 'text-primary' : 'text-muted-foreground')} />
                  {selectedFile ? (
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground truncate max-w-[220px]">{selectedFile.name}</p>
                      <p className="text-xs text-muted-foreground">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-sm text-foreground">Drag & drop or <span className="text-primary font-medium">browse</span></p>
                      <p className="text-xs text-muted-foreground mt-0.5">PDF, JPG, PNG, WEBP, GIF accepted</p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,image/*"
                  className="hidden"
                  onChange={e => handleFileChange(e.target.files?.[0] ?? null)}
                />
                {selectedFile && (
                  <button
                    type="button"
                    onClick={() => { setSelectedFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                    className="text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Remove file
                  </button>
                )}
              </div>

              {/* Error */}
              {formError && (
                <p className="text-xs text-red-400 bg-red-500/10 rounded-lg px-3 py-2">{formError}</p>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-1">
                <Button type="button" variant="outline" size="sm" className="flex-1" onClick={resetModal}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="flex-1">
                  <UploadCloud size={14} /> Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
