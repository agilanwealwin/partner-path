import React from 'react';
import { LifeBuoy, MessageSquare, Mail, Phone, Ticket, BookOpen, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const tickets = [
  { id: 'TKT-0124', subject: 'Node firmware update assistance', status: 'Open', date: 'Mar 18, 2025' },
  { id: 'TKT-0118', subject: 'Territory allocation query — Haryana', status: 'Resolved', date: 'Mar 12, 2025' },
  { id: 'TKT-0105', subject: 'DLN reward calculation discrepancy', status: 'Resolved', date: 'Feb 28, 2025' },
];

export default function SupportPage() {
  return (
    <div className="p-4 md:p-6 max-w-[900px] mx-auto space-y-4 md:space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-foreground">Protocol Support</h1>
        <p className="text-sm text-muted-foreground mt-1">Get help with your DeLEN partner account</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-card bg-surface p-5 shadow-surface text-center">
          <Mail size={20} className="text-primary mx-auto mb-2" />
          <p className="text-sm font-medium text-foreground">Email Support</p>
          <p className="text-[11px] text-muted-foreground mt-1">partner.support@delen.io</p>
          <p className="text-[10px] text-muted-foreground">Response within 24h</p>
        </div>
        <div className="rounded-card bg-surface p-5 shadow-surface text-center">
          <Phone size={20} className="text-primary mx-auto mb-2" />
          <p className="text-sm font-medium text-foreground">Phone Support</p>
          <p className="text-[11px] text-muted-foreground mt-1">+91 98765 00001</p>
          <p className="text-[10px] text-muted-foreground">Mon–Fri 9AM–6PM IST</p>
        </div>
        <div className="rounded-card bg-surface p-5 shadow-surface text-center">
          <MessageSquare size={20} className="text-primary mx-auto mb-2" />
          <p className="text-sm font-medium text-foreground">Live Chat</p>
          <p className="text-[11px] text-muted-foreground mt-1">WhatsApp or in-app chat</p>
          <Button variant="outline" size="xs" className="mt-2">Open Chat</Button>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="section-label">Recent Support Tickets</span>
          <Button size="xs"><Ticket size={12} /> New Ticket</Button>
        </div>
        <div className="rounded-card border border-border overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-border bg-surface">
                {['Ticket ID', 'Subject', 'Status', 'Date'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tickets.map(t => (
                <tr key={t.id} className="border-b border-border last:border-0 hover:bg-[rgba(255,255,255,0.02)]">
                  <td className="px-4 py-2.5 font-mono text-primary">{t.id}</td>
                  <td className="px-4 py-2.5 text-foreground">{t.subject}</td>
                  <td className="px-4 py-2.5">
                    <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${t.status === 'Open' ? 'bg-orange-soft text-status-orange' : 'bg-green-soft text-status-green'}`}>{t.status}</span>
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground">{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <span className="section-label mb-3 block">Resources</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { title: 'Partner Handbook', desc: 'Complete guide to the DeLEN partner programme' },
            { title: 'API Documentation', desc: 'Technical docs for DeLEN protocol integration' },
            { title: 'FAQ', desc: 'Frequently asked questions and answers' },
            { title: 'Community Forum', desc: 'Connect with other DeLEN partners' },
          ].map(r => (
            <div key={r.title} className="rounded-card bg-surface p-4 shadow-surface flex items-center gap-3 hover:shadow-surface-hover transition-all cursor-pointer">
              <BookOpen size={16} className="text-muted-foreground shrink-0" />
              <div>
                <p className="text-[12px] font-medium text-foreground">{r.title}</p>
                <p className="text-[10px] text-muted-foreground">{r.desc}</p>
              </div>
              <ExternalLink size={12} className="text-muted-foreground ml-auto shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
