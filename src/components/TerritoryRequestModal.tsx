import React, { useState } from 'react';
import { X, Send, CheckCircle2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { territories, type Territory, statusConfig } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { useOnboarding } from '@/hooks/use-onboarding';

interface Props {
  open: boolean;
  onClose: () => void;
  territory: Territory | null;
}

export default function TerritoryRequestModal({ open, onClose, territory }: Props) {
  const { onboardingData, updateData, qualifyTerritory } = useOnboarding();
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
      if (selected) {
        qualifyTerritory(selected.id);
      }
      onClose();
    }, 1200);
  };

  const availableTerritories = territories.filter(t => t.status === 'available');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={onClose}>
      <div className="w-[520px] rounded-card bg-surface border border-border shadow-surface-hover animate-fade-in" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <h3 className="font-display font-bold text-foreground">Request Territory Registration</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">Submit a request — DeLEN admin will review within 5 business days</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-surface-2"><X size={16} className="text-muted-foreground" /></button>
        </div>

        <div className="p-5 space-y-4">
          {/* Territory Select */}
          <div>
            <label className="text-[11px] text-muted-foreground mb-1 block">Selected Territory</label>
            <input
              value={selected ? `${selected.id} · ${selected.name} (${selected.state})` : ''}
              readOnly
              className="w-full px-3 py-2 rounded-lg bg-surface-3 border border-border text-sm text-foreground outline-none cursor-not-allowed opacity-80"
            />
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

        </div>

        <div className="flex items-center justify-end gap-3 p-5 border-t border-border">
          <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
          <Button size="sm" onClick={handleSubmit} disabled={!selected || submitting}>
            {submitting ? (
              <span className="flex items-center gap-2"><span className="w-3 h-3 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> Registering...</span>
            ) : (
              <><Send size={14} /> Select Territory</>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
