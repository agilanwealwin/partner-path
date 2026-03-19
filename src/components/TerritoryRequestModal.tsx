import React, { useState } from 'react';
import { X, Send, CheckCircle2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { territories, type Territory, statusConfig } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface Props {
  open: boolean;
  onClose: () => void;
  territory: Territory | null;
}

export default function TerritoryRequestModal({ open, onClose, territory }: Props) {
  const [selected, setSelected] = useState<Territory | null>(territory);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  React.useEffect(() => {
    setSelected(territory);
    setSubmitted(false);
    setMessage('');
  }, [territory, open]);

  if (!open) return null;

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const availableTerritories = territories.filter(t => t.status === 'available');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={onClose}>
      <div className="w-[520px] rounded-card bg-surface border border-border shadow-surface-hover animate-fade-in" onClick={e => e.stopPropagation()}>
        {submitted ? (
          <div className="p-8 text-center">
            <CheckCircle2 size={32} className="text-status-green mx-auto mb-4" />
            <h3 className="font-display font-bold text-lg text-foreground">Request Submitted Successfully!</h3>
            <p className="font-mono text-sm text-primary mt-2">Reference: TRQ-2026-0047</p>
            <p className="text-sm text-muted-foreground mt-3">DeLEN admin will review within 5 business days. You'll receive an email notification.</p>
            <div className="flex gap-3 mt-6 justify-center">
              <Button variant="outline" size="sm">View My Requests</Button>
              <Button size="sm" onClick={onClose}>Close</Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div>
                <h3 className="font-display font-bold text-foreground">Request Territory</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">Submit a request — DeLEN admin will review within 5 business days</p>
              </div>
              <button onClick={onClose} className="p-1 rounded-lg hover:bg-surface-2"><X size={16} className="text-muted-foreground" /></button>
            </div>

            <div className="p-5 space-y-4">
              {/* Territory Select */}
              <div>
                <label className="text-[11px] text-muted-foreground mb-1 block">Territory *</label>
                <select
                  value={selected?.id || ''}
                  onChange={(e) => setSelected(territories.find(t => t.id === e.target.value) || null)}
                  className="w-full px-3 py-2 rounded-lg bg-surface-2 border border-border text-sm text-foreground outline-none"
                >
                  <option value="">Select territory...</option>
                  {availableTerritories.map(t => (
                    <option key={t.id} value={t.id}>{t.id} · {t.name} ({t.state})</option>
                  ))}
                </select>
              </div>

              {selected && (
                <div className="p-3 rounded-lg bg-surface-2 border border-border space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-surface-3 text-muted-foreground">{selected.id}</span>
                    <span className={cn("inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px]", statusConfig[selected.status].bgClass, statusConfig[selected.status].textClass)}>
                      <CheckCircle2 size={8} /> {statusConfig[selected.status].label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{selected.state} · {selected.adoption} Adoption · {selected.mwPotential} MW · {selected.irradiance} kWh/m²</p>
                </div>
              )}

              {/* Auto-filled fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-muted-foreground mb-1 block">Partner Name</label>
                  <input value="SunVolt EPC Ltd." readOnly className="w-full px-3 py-2 rounded-lg bg-surface-3 border border-border text-sm text-muted-foreground" />
                </div>
                <div>
                  <label className="text-[11px] text-muted-foreground mb-1 block">Partner ID</label>
                  <input value="SV-2024-001" readOnly className="w-full px-3 py-2 rounded-lg bg-surface-3 border border-border text-sm text-foreground font-mono" />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-muted-foreground mb-1 block">Contact Email *</label>
                <input defaultValue="contact@sunvolt.in" className="w-full px-3 py-2 rounded-lg bg-surface-2 border border-border text-sm text-foreground outline-none focus:border-primary" />
              </div>

              <div>
                <label className="text-[11px] text-muted-foreground mb-1 block">Message / Notes</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, 500))}
                  placeholder="Briefly describe your interest and deployment plan for this territory..."
                  className="w-full px-3 py-2 rounded-lg bg-surface-2 border border-border text-sm text-foreground outline-none focus:border-primary h-20 resize-none"
                />
                <p className="text-[10px] text-muted-foreground text-right mt-0.5">{message.length}/500</p>
              </div>

              {/* Info note */}
              <div className="p-3 rounded-lg bg-orange-soft border border-status-orange/20 flex gap-2">
                <Info size={13} className="text-status-orange shrink-0 mt-0.5" />
                <p className="text-[11px] text-status-orange leading-relaxed">
                  Submitting a request does not allocate the territory. Our admin team reviews all requests and approves or objects within 5 business days. Territory status will change to 'Allocated' only after admin approval.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-5 border-t border-border">
              <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
              <Button size="sm" onClick={handleSubmit} disabled={!selected || submitting}>
                {submitting ? (
                  <span className="flex items-center gap-2"><span className="w-3 h-3 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> Submitting...</span>
                ) : (
                  <><Send size={14} /> Submit Request</>
                )}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
