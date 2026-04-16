import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TerritorySelectionStage from '@/components/onboarding/TerritorySelectionStage';
import {
    Building2, Users, Wrench, DollarSign, Globe2, Zap, Sun, Wind,
    BatteryCharging, Radio, BarChart3, ChevronDown, ChevronUp, Upload,
    CheckCircle2, Clock, AlertTriangle, XCircle, Eye, Download, Info,
    ShieldCheck, Activity, ArrowRight, MapPinned, MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { useOnboarding } from '@/hooks/use-onboarding';
import { territories } from '@/data/mockData';

// --- Shared Data & Types ---

const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Puducherry',
    'Chandigarh', 'Andaman & Nicobar', 'Dadra & Nagar Haveli', 'Lakshadweep',
];

const assetTypes = [
    { icon: Sun, label: 'Rooftop Solar' },
    { icon: Sun, label: 'Ground Mount' },
    { icon: Wind, label: 'Wind Integration' },
    { icon: BatteryCharging, label: 'BESS' },
    { icon: Zap, label: 'EV Charging' },
    { icon: Radio, label: 'IoT/Edge Node' },
];

const scoringCriteria = [
    { criteria: 'EPC Experience', max: 20, est: 16 },
    { criteria: 'MW Deployed', max: 25, est: 20 },
    { criteria: 'No. of Projects', max: 15, est: 12 },
    { criteria: 'Financial Strength', max: 15, est: 10 },
    { criteria: 'IoT/DePIN Experience', max: 10, est: 7 },
    { criteria: 'Geographic Coverage', max: 10, est: 8 },
    { criteria: 'References & Portfolio', max: 5, est: 5 },
];

type DocStatus = 'verified' | 'review' | 'rejected' | 'not-uploaded' | 'optional';

interface Doc {
    id: number;
    name: string;
    required: boolean;
    status: DocStatus;
    count?: string;
    rejectReason?: string;
}

const docSections: { title: string; icon: React.ElementType; docs: Doc[] }[] = [
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

const docStatusDisplay: Record<DocStatus, { icon: React.ElementType; label: string; cls: string }> = {
    verified: { icon: CheckCircle2, label: 'Verified', cls: 'text-status-green' },
    review: { icon: Clock, label: 'Under Review', cls: 'text-status-orange' },
    rejected: { icon: XCircle, label: 'Rejected', cls: 'text-status-red' },
    'not-uploaded': { icon: Upload, label: 'Not Uploaded', cls: 'text-muted-foreground' },
    optional: { icon: Upload, label: 'Optional', cls: 'text-muted-foreground' },
};

// --- Unified Page Component ---

export default function UnifiedOnboardingPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { onboardingData, updateData } = useOnboarding();

    const [stage, setStage] = useState<'pre-qual' | 'documents' | 'select-territory' | 'status'>(() => {
        if (location.pathname.includes('documents')) return 'documents';
        if (location.pathname.includes('select-territory')) return 'select-territory';
        if (location.pathname.includes('status')) return 'status';
        return 'pre-qual';
    });

    // Keep state in sync with URL and enforce sequence
    React.useEffect(() => {
        const path = location.pathname;
        if (path.includes('status')) {
            if (!onboardingData.selectedTerritories?.length) {
                navigate('/onboarding/infra-partner/select-territory', { replace: true });
            } else {
                setStage('status');
            }
        } else if (path.includes('select-territory')) {
            if (!onboardingData.isSubmitted) {
                navigate('/onboarding/infra-partner/pre-qualification', { replace: true });
            } else {
                setStage('select-territory');
            }
        } else if (path.includes('pre-qualification')) {
            if (!onboardingData.docsSubmitted) {
                navigate('/onboarding/infra-partner/documents', { replace: true });
            } else {
                setStage('pre-qual');
            }
        } else if (path.includes('documents')) {
            setStage('documents');
        }
    }, [location.pathname, onboardingData.docsSubmitted, onboardingData.isSubmitted, onboardingData.selectedTerritories, navigate]);

    // --- Pre-Qual State ---
    const [selectedTier, setSelectedTier] = useState(1);
    const [showScoring, setShowScoring] = useState(true);
    const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
    const [selectedStates, setSelectedStates] = useState<string[]>(['Rajasthan', 'Gujarat']);
    const [declarations, setDeclarations] = useState<boolean[]>([false, false, false, false]);
    const totalEst = scoringCriteria.reduce((s, c) => s + c.est, 0);

    // --- Documents State ---
    const [openDocSections, setOpenDocSections] = useState<Record<number, boolean>>({ 0: true, 1: true, 2: true, 3: true });
    const [uploadingDoc, setUploadingDoc] = useState<number | null>(null);
    const totalDocsRequired = 14;
    const docsUploaded = 6;
    const docPct = Math.round((docsUploaded / totalDocsRequired) * 100);

    // --- Handlers ---
    const handleDocsSubmit = () => {
        // Mark docs as completed in a real app
        updateData({ ...onboardingData, docsSubmitted: true });
        navigate('/onboarding/infra-partner/pre-qualification');
        window.scrollTo(0, 0);
    };

    const handlePreQualSubmit = () => {
        updateData({ ...onboardingData, isSubmitted: true });
        navigate('/onboarding/infra-partner/select-territory', { state: { selectionMode: true } });
        window.scrollTo(0, 0);
    };

    // --- Render Functions ---

    const renderPreQualification = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                    <h1 className="font-display font-bold text-xl sm:text-2xl text-foreground tracking-tight uppercase">Pre-Qualification <span className="text-primary">Assessment</span></h1>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-mono uppercase tracking-widest opacity-60">Section 1: Technical & Financial Standing</p>
                </div>
                <div className="flex items-center w-fit gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] text-primary font-bold tracking-widest uppercase">
                    Stage 1 of 3
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 space-y-6 min-w-0">
                    {/* Block 1 — Company Information */}
                    <div className="rounded-card bg-surface p-5 shadow-surface space-y-4">
                        <div className="flex items-center gap-2 mb-1">
                            <Building2 size={16} className="text-muted-foreground" />
                            <span className="section-label">Block 1 — Company Information</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div><label className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider">Company/Entity Name *</label><Input className="mt-1 h-9 text-sm bg-surface-2 border-border" defaultValue="SunVolt EPC Ltd." /></div>
                            <div><label className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider">Registration Number *</label><Input className="mt-1 h-9 text-sm bg-surface-2 border-border" /></div>
                            <div><label className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider">Company Type *</label>
                                <select className="mt-1 w-full h-9 rounded-md border border-border bg-surface-2 px-3 text-sm text-foreground">
                                    <option>Private Limited</option><option>LLP</option><option>Partnership</option><option>Proprietorship</option>
                                </select>
                            </div>
                            <div><label className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider">Year of Incorporation *</label><Input className="mt-1 h-9 text-sm bg-surface-2 border-border" type="number" /></div>
                            <div className="sm:col-span-2"><label className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider">Registered Office Address *</label><Textarea className="mt-1 text-sm bg-surface-2 border-border min-h-[60px]" /></div>
                        </div>
                    </div>

                    {/* Block 3 — Technical Credentials */}
                    <div className="rounded-card bg-surface p-5 shadow-surface space-y-4">
                        <div className="flex items-center gap-2 mb-1">
                            <Wrench size={16} className="text-muted-foreground" />
                            <span className="section-label">Block 2 — Technical Credentials</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div><label className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider">Total Solar EPC Experience (years) *</label><Input className="mt-1 h-9 text-sm bg-surface-2 border-border" type="number" /></div>
                            <div><label className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider">Total MW Deployed *</label><Input className="mt-1 h-9 text-sm bg-surface-2 border-border" type="number" /></div>
                        </div>
                        <div>
                            <label className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider">Asset Types</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                                {assetTypes.map((a) => (
                                    <button
                                        key={a.label}
                                        onClick={() => setSelectedAssets(prev => prev.includes(a.label) ? prev.filter(item => item !== a.label) : [...prev, a.label])}
                                        className={cn(
                                            "flex items-center gap-2 px-3 py-2 rounded-lg border text-[11px] transition-all",
                                            selectedAssets.includes(a.label) ? 'border-primary bg-primary/5 text-foreground' : 'border-border bg-surface-2 text-muted-foreground hover:border-primary/30'
                                        )}
                                    >
                                        <a.icon size={14} className="shrink-0" /> <span className="truncate">{a.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Block 6 — Territory Interest */}
                    <div className="rounded-card bg-surface p-5 shadow-surface space-y-4">
                        <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                                <Globe2 size={16} className="text-muted-foreground" />
                                <span className="section-label">Block 3 — Territory Interest</span>
                            </div>
                        </div>
                        <p className="text-[11px] text-muted-foreground">Which states are you interested in deploying projects?</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 max-h-[160px] overflow-y-auto pr-2">
                            {indianStates.map(s => (
                                <button
                                    key={s}
                                    onClick={() => setSelectedStates(prev => prev.includes(s) ? prev.filter(item => item !== s) : [...prev, s])}
                                    className={cn(
                                        "px-2 py-1.5 rounded-md text-[10px] text-left transition-all truncate",
                                        selectedStates.includes(s) ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-surface-2 text-muted-foreground border border-transparent hover:border-border'
                                    )}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Declarations */}
                    <div className="rounded-card bg-surface p-5 shadow-surface space-y-3">
                        <span className="section-label">Declarations</span>
                        {[
                            'I confirm all information provided is accurate and complete.',
                            'I agree to the DeLEN Partner Agreement terms and conditions.',
                        ].map((text, i) => (
                            <label key={i} className="flex items-start gap-2 cursor-pointer">
                                <input type="checkbox" checked={declarations[i]} onChange={() => setDeclarations(prev => { const n = [...prev]; n[i] = !n[i]; return n; })}
                                    className="mt-0.5 rounded border-border bg-surface-2" />
                                <span className="text-[11px] text-muted-foreground">{text}</span>
                            </label>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <Button variant="outline" size="lg" className="rounded-xl px-8 w-full sm:w-auto">Save Draft</Button>
                        <Button size="lg" className="rounded-xl px-8 w-full sm:w-auto" disabled={!declarations.slice(0, 2).every(Boolean)} onClick={handlePreQualSubmit}>
                            Complete Application <ArrowRight size={16} className="ml-2" />
                        </Button>
                    </div>
                </div>

                <div className="w-full lg:w-[300px] shrink-0">
                    <div className="rounded-card bg-surface p-6 shadow-surface sticky top-6 border border-border/50">
                        <div className="flex items-center gap-2 mb-4">
                            <BarChart3 size={16} className="text-primary" />
                            <span className="text-xs font-bold text-foreground uppercase tracking-widest">Scoring Dashboard</span>
                        </div>
                        <table className="w-full text-[10px] mb-4">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left py-2 text-muted-foreground font-bold uppercase tracking-wider">Criteria</th>
                                    <th className="text-right py-2 text-primary font-bold uppercase tracking-wider">Est.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scoringCriteria.slice(0, 4).map(c => (
                                    <tr key={c.criteria} className="border-b border-border/50 last:border-0">
                                        <td className="py-2 text-muted-foreground">{c.criteria}</td>
                                        <td className="py-2 text-right text-primary font-mono font-bold">{c.est}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="pt-3 border-t border-border flex justify-between items-center mb-4">
                            <span className="text-xs font-bold text-foreground">Tier Qualification</span>
                            <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-black">PULSE</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground leading-relaxed">Your current profile qualifies for the Pulse tier (Active Infrastructure Partner).</p>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderDocuments = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                    <h1 className="font-display font-bold text-xl sm:text-2xl text-foreground tracking-tight">Technical & Compliance <span className="text-primary">Records</span></h1>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-mono uppercase tracking-widest opacity-60">Section 2: Verifiable Credentials</p>
                </div>
                <div className="flex items-center w-fit gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] text-primary font-bold tracking-widest uppercase">
                    Stage 2 of 3
                </div>
            </div>

            <div className="rounded-card bg-surface p-5 border border-border shadow-sm">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-foreground uppercase tracking-widest">{docsUploaded} of {totalDocsRequired} Documents Verified</span>
                    <span className="text-[10px] text-primary font-mono">{docPct}% complete</span>
                </div>
                <Progress value={docPct} className="h-2 bg-surface-2" />
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 space-y-3 min-w-0">
                    {docSections.map((sec, si) => (
                        <div key={si} className="rounded-card bg-surface border border-border shadow-sm overflow-hidden group">
                            <button
                                onClick={() => setOpenDocSections(prev => ({ ...prev, [si]: !prev[si] }))}
                                className="w-full flex items-center gap-3 px-5 py-4 hover:bg-surface-2 transition-colors"
                            >
                                <sec.icon size={16} className="text-primary opacity-60" />
                                <span className="text-sm font-bold text-foreground flex-1 text-left uppercase tracking-wider">{sec.title}</span>
                                <ChevronDown size={14} className={cn("text-muted-foreground transition-transform", openDocSections[si] && "rotate-180")} />
                            </button>
                            {openDocSections[si] && (
                                <div className="border-t border-border/50 divide-y divide-border/30">
                                    {sec.docs.map((doc) => {
                                        const sd = docStatusDisplay[doc.status];
                                        return (
                                            <div key={doc.id} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-4 sm:px-6 py-3.5 hover:bg-surface-2/50 transition-colors">
                                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                                    <span className="font-mono text-[10px] text-muted-foreground w-6">0{doc.id}</span>
                                                    <span className="text-sm font-medium text-foreground truncate">{doc.name}{doc.required ? '*' : ''}</span>
                                                </div>
                                                <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-6 pl-9 sm:pl-0">
                                                    <span className={cn("inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-tight", sd.cls)}>
                                                        <sd.icon size={12} /> {sd.label}
                                                    </span>
                                                    {doc.status === 'verified' || doc.status === 'review' ? (
                                                        <button className="p-1.5 rounded-lg hover:bg-surface-3 transition-colors text-muted-foreground hover:text-primary"><Eye size={14} /></button>
                                                    ) : (
                                                        <Button variant="outline" size="xs" className="rounded-lg h-8 px-3 text-[10px] font-bold uppercase tracking-widest border-primary/20 text-primary hover:bg-primary/5">
                                                            <Upload size={12} className="mr-1.5" /> Upload
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="pt-4 flex flex-col sm:flex-row gap-3">
                        <Button variant="outline" size="lg" className="rounded-xl px-8 w-full sm:w-auto" onClick={() => setStage('pre-qual')}>Back</Button>
                        <Button size="lg" className="rounded-xl px-8 w-full sm:w-auto" onClick={handleDocsSubmit}>Save & Continue <ArrowRight size={16} className="ml-2" /></Button>
                    </div>
                </div>

                <div className="w-full lg:w-[300px] shrink-0 space-y-4">
                    <div className="rounded-card bg-surface p-6 border border-border shadow-sm space-y-4">
                        <div className="flex items-center gap-2">
                            <Info size={16} className="text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-foreground">Compliance Notice</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">To ensure protocol integrity, all technical licenses must be verified by the compliance committee. This typically takes 3 business days.</p>
                        <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/10 space-y-1.5">
                            <div className="flex items-center gap-1.5">
                                <AlertTriangle size={12} className="text-amber-500" />
                                <span className="text-[9px] font-bold text-amber-600 uppercase">Attention</span>
                            </div>
                            <p className="text-[10px] text-amber-700/80 leading-tight font-medium">Your Electrical Contractor License was rejected. Please upload a valid document.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderStatus = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                    <h1 className="font-display font-black text-2xl sm:text-3xl text-foreground tracking-tighter uppercase">Application <span className="text-primary">Status</span></h1>
                    <p className="text-[11px] text-muted-foreground mt-1 font-mono uppercase tracking-widest opacity-60">Partner Lifecycle Tracking · VERSION 2.0</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="rounded-xl" onClick={() => navigate('/onboarding/infra-partner/territory-map')}>
                        <Globe2 size={14} className="mr-2" /> Global Map
                    </Button>
                </div>
            </div>

            <div className="relative rounded-2xl md:rounded-[2.5rem] bg-gradient-to-br from-primary/5 via-primary/[0.02] to-transparent p-6 md:p-10 border border-primary/10 overflow-hidden shadow-sm">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
                <div className="relative z-10 grid grid-cols-12 gap-10 items-center">
                    <div className="col-span-12 lg:col-span-7 space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                                    Current Application
                                </span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-display font-black text-foreground tracking-tight leading-tight">
                                Your application is <span className="text-primary italic">under review.</span>
                            </h2>
                            <p className="text-sm text-muted-foreground font-medium max-w-md">Our team is reviewing your project portfolio and technical capacity.</p>
                        </div>
                        <div className="space-y-2 max-w-sm">
                            <div className="flex justify-between items-end mb-1">
                                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Onboarding Progress</span>
                                <span className="text-sm font-black text-primary">65%</span>
                            </div>
                            <div className="h-2 w-full bg-muted/20 rounded-full overflow-hidden border border-border/10">
                                <div className="h-full bg-primary transition-all duration-[2000ms] w-[65%]" />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-5 grid grid-cols-1 gap-4 h-full items-center">
                        <div className="p-6 rounded-3xl bg-surface border border-border/60 space-y-3 shadow-inner">
                            <div className="flex items-center justify-between">
                                <p className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">Reference ID</p>
                                <div className="w-8 h-8 rounded-xl bg-primary/5 flex items-center justify-center">
                                    <ShieldCheck size={14} className="text-primary" />
                                </div>
                            </div>
                            <p className="text-lg sm:text-xl font-mono font-black text-foreground tracking-tighter">IFP-26-0087</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="rounded-2xl md:rounded-[2rem] bg-surface p-6 sm:p-8 shadow-sm border border-border">
                <h3 className="section-label mb-8">Onboarding Milestones</h3>
                <div className="space-y-0 relative ml-2 sm:ml-4">
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-border/60 ml-[15px]" />
                    {[
                        { icon: CheckCircle2, status: 'done', title: 'Pre-Qualification Submitted', date: 'Yesterday', desc: 'ID IFP-2026-0087 generated and assigned' },
                        { icon: Upload, status: 'done', title: 'Documents Uploaded', date: 'Today', desc: '14/14 technical and financial records received' },
                        { icon: MapPinned, status: 'action', title: 'Territory Request Approval', date: 'PENDING', desc: 'Verification of requested regional infrastructure nodes' },
                        { icon: Clock, status: 'pending', title: 'Compliance Verification', date: 'EST: 3 DAYS', desc: 'Final review by infrastructure committee' },
                        { icon: DollarSign, status: 'pending', title: 'Partner Fee & Activation', date: 'STEP 4', desc: 'Token allocation and portal access' },
                    ].map((milestone, i) => (
                        <div key={i} className="flex gap-4 sm:gap-8 group/item relative pb-10 last:pb-0">
                            <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-all duration-500",
                                milestone.status === 'done' ? "bg-status-green" : (milestone.status === 'action' ? "bg-status-orange shadow-[0_0_15px_rgba(249,115,22,0.3)]" : "bg-surface-3 border border-border")
                            )}>
                                <milestone.icon size={14} className={cn(milestone.status === 'pending' ? "text-muted-foreground" : "text-white")} />
                            </div>
                            <div className="flex-1 space-y-1">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                    <h4 className={cn("text-sm sm:text-base font-bold", milestone.status === 'pending' ? "text-muted-foreground" : "text-foreground")}>{milestone.title}</h4>
                                    <span className="text-[9px] font-black font-mono tracking-widest text-muted-foreground/50 uppercase">{milestone.date}</span>
                                </div>
                                <p className="text-[11px] sm:text-[12px] text-muted-foreground font-medium leading-relaxed">{milestone.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="w-full min-h-screen px-4 md:px-10 pt-6 md:pt-10 pb-24 max-w-[1400px] mx-auto">
            {/* Universal Breadcrumb / Mini-Stepper */}
            <div className="flex items-center gap-2 sm:gap-3 mb-8 md:mb-12 overflow-x-auto pb-2 no-scrollbar">
                {[
                    { id: 'documents', label: '1. Documents' },
                    { id: 'pre-qual', label: '2. Assessment' },
                    { id: 'select-territory', label: '3. Select Territory' },
                    { id: 'status', label: '4. Status' }
                ].map((s, i) => (
                    <React.Fragment key={s.id}>
                        <button
                            onClick={() => {
                                if (
                                    (s.id === 'documents') ||
                                    (s.id === 'pre-qual' && onboardingData.docsSubmitted) ||
                                    (s.id === 'select-territory' && onboardingData.isSubmitted) ||
                                    (s.id === 'status' && onboardingData.selectedTerritories?.length)
                                ) {
                                    setStage(s.id as any);
                                    const path = s.id === 'pre-qual' ? 'pre-qualification' : s.id;
                                    const navState = s.id === 'select-territory' ? { selectionMode: true } : {};
                                    navigate(`/onboarding/infra-partner/${path}`, { state: navState });
                                }
                            }}
                            className={cn(
                                "text-[10px] font-black uppercase tracking-[0.2em] transition-all",
                                stage === s.id ? "text-primary border-b-2 border-primary pb-1" : "text-muted-foreground opacity-40 hover:opacity-100"
                            )}
                        >
                            {s.label}
                        </button>
                        {i < 3 && <ArrowRight size={10} className="text-muted-foreground opacity-20" />}
                    </React.Fragment>
                ))}
            </div>

            {stage === 'pre-qual' && renderPreQualification()}
            {stage === 'documents' && renderDocuments()}
            {stage === 'status' && renderStatus()}
            {stage === 'select-territory' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <TerritorySelectionStage />
                </div>
            )}
        </div>
    );
}
