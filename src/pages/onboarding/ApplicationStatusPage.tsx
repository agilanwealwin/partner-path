import React from 'react';
import {
  CheckCircle2, Clock, AlertTriangle, RefreshCw, Gem, Upload,
  DollarSign, Wallet, Globe2, LifeBuoy, MessageSquare, Mail, Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const timelineSteps = [
  { icon: CheckCircle2, status: 'done' as const, title: 'Application Submitted', date: '14 Mar 11:24 AM', desc: 'ID IFP-2026-0087 generated and assigned' },
  { icon: CheckCircle2, status: 'done' as const, title: 'Document Verification', date: '14 Mar 03:00 PM', desc: 'Initial scan done. 1 document flagged.' },
  { icon: AlertTriangle, status: 'action' as const, title: 'Document Resubmission', date: '15 Mar — ACTION REQUIRED', desc: 'Electrical License expired.', action: 'Re-upload Now' },
  { icon: Clock, status: 'pending' as const, title: 'Technical Score Evaluation', date: 'Est: 17–18 Mar', desc: 'EPC credentials and project portfolio assessed' },
  { icon: Clock, status: 'pending' as const, title: 'Financial Review', date: 'Est: 18–19 Mar', desc: 'Bank solvency and financial standing' },
  { icon: Clock, status: 'pending' as const, title: 'Eligibility Decision', date: 'Est: 19–20 Mar', desc: 'Final tier confirmation' },
  { icon: Clock, status: 'pending' as const, title: 'Fee Payment', date: 'After approval', desc: 'Pay ₹10 Lakhs within 7 days' },
  { icon: Clock, status: 'pending' as const, title: 'Partner Activation', date: 'After payment', desc: '150,000 DLN credited · Portal access granted' },
];

const infoCards = [
  { icon: DollarSign, title: 'Pay Partnership Fee', desc: 'NEFT / RTGS / Crypto accepted. Payment must be completed within 7 days of approval.' },
  { icon: Wallet, title: 'Token Allocation', desc: '150,000 DLN credited at TGE. Vested over 208 weeks with monthly releases after 6-month cliff.' },
  { icon: Globe2, title: 'Territory Selection', desc: 'Browse the territory registry and subscribe to regions where you plan to deploy projects.' },
];

export default function ApplicationStatusPage() {
  return (
    <div className="p-6 max-w-[900px] mx-auto space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-foreground">Application Status</h1>
        <p className="text-sm text-muted-foreground mt-1">Track your Infrastructure Partner application progress</p>
      </div>

      {/* Status Hero */}
      <div className="rounded-card bg-surface p-6 shadow-surface" style={{ background: 'linear-gradient(135deg, #0d1525, #111827)' }}>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Application ID</span>
              <p className="font-mono text-sm text-foreground mt-0.5 px-2 py-1 rounded-md bg-surface-2 border border-border inline-block">IFP-2026-0087</p>
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Submitted</span>
              <p className="text-sm text-foreground">14 Mar 2025, 11:24 AM IST</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Tier Selected</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Gem size={14} className="text-status-cyan" />
                <span className="text-sm text-foreground">Pulse Partner</span>
              </div>
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Status</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <RefreshCw size={12} className="text-status-orange animate-spin" style={{ animationDuration: '3s' }} />
                <span className="text-sm text-status-orange font-medium">Under Review</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="rounded-card bg-surface p-6 shadow-surface">
        <span className="section-label mb-4 block">Review Timeline</span>
        <div className="space-y-0">
          {timelineSteps.map((step, i) => {
            const isLast = i === timelineSteps.length - 1;
            return (
              <div key={i} className="flex gap-4">
                {/* Line + Icon */}
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                    step.status === 'done' ? 'bg-green-soft' : step.status === 'action' ? 'bg-orange-soft' : 'bg-surface-3'
                  )}>
                    <step.icon size={14} className={cn(
                      step.status === 'done' ? 'text-status-green' : step.status === 'action' ? 'text-status-orange' : 'text-muted-foreground'
                    )} />
                  </div>
                  {!isLast && (
                    <div className={cn(
                      "w-px flex-1 min-h-[32px]",
                      step.status === 'done' ? 'bg-status-green/30' : 'bg-border'
                    )} />
                  )}
                </div>
                {/* Content */}
                <div className="pb-6">
                  <p className="text-sm font-medium text-foreground">{step.title}</p>
                  <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{step.date}</p>
                  <p className="text-[11px] text-muted-foreground mt-1">{step.desc}</p>
                  {step.action && (
                    <Button variant="outline-amber" size="xs" className="mt-2">
                      <Upload size={12} /> {step.action}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* After Approval Info Cards */}
      <div>
        <span className="section-label mb-3 block">After Approval</span>
        <div className="grid grid-cols-3 gap-3">
          {infoCards.map((card) => (
            <div key={card.title} className="rounded-card bg-surface p-4 shadow-surface">
              <card.icon size={18} className="text-primary mb-2" />
              <p className="text-sm font-medium text-foreground">{card.title}</p>
              <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Support */}
      <div className="rounded-card bg-surface p-5 shadow-surface">
        <div className="flex items-center gap-2 mb-3">
          <LifeBuoy size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Need Help?</span>
        </div>
        <div className="flex items-center gap-6 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1"><Mail size={12} /> partner.support@delen.io</span>
          <span className="flex items-center gap-1"><Phone size={12} /> +91 98765 00001</span>
          <Button variant="outline" size="xs"><MessageSquare size={12} /> Open Chat</Button>
        </div>
      </div>
    </div>
  );
}
