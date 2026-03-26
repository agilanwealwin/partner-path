import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2, Users, Wrench, DollarSign, Globe2, Zap, Sun, Wind,
  BatteryCharging, Radio, BarChart3, ChevronDown, ChevronUp, Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useOnboarding } from '@/hooks/use-onboarding';
import { territories } from '@/data/mockData';

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

export default function PreQualificationPage() {
  const navigate = useNavigate();
  const { nextStep, onboardingData, updateData } = useOnboarding();
  const [selectedTier, setSelectedTier] = useState(1);
  const [showScoring, setShowScoring] = useState(true);
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>(['Rajasthan', 'Gujarat']);
  const [declarations, setDeclarations] = useState<boolean[]>([false, false, false, false]);

  const totalEst = scoringCriteria.reduce((s, c) => s + c.est, 0);

  const toggleAsset = (label: string) => {
    setSelectedAssets(prev => prev.includes(label) ? prev.filter(a => a !== label) : [...prev, label]);
  };

  const toggleState = (state: string) => {
    setSelectedStates(prev => prev.includes(state) ? prev.filter(s => s !== state) : [...prev, state]);
  };

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-foreground">Pre-Qualification Assessment</h1>
        <p className="text-sm text-muted-foreground mt-1 font-mono">DLN/PQ/2026/001 — Section 4: Technical & Financial Scoring</p>
      </div>

      <div className="flex gap-6">
        <div className="flex-1 space-y-6 min-w-0">
          {/* Block 1 — Company Information */}
          <div className="rounded-card bg-surface p-5 shadow-surface space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <Building2 size={16} className="text-muted-foreground" />
              <span className="section-label">Block 1 — Company Information</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-[11px] text-muted-foreground">Company/Entity Name *</label><Input className="mt-1 h-9 text-sm bg-surface-2 border-border" defaultValue="SunVolt EPC Ltd." /></div>
              <div><label className="text-[11px] text-muted-foreground">Registration Number *</label><Input className="mt-1 h-9 text-sm bg-surface-2 border-border" /></div>
              <div><label className="text-[11px] text-muted-foreground">Company Type *</label>
                <select className="mt-1 w-full h-9 rounded-md border border-border bg-surface-2 px-3 text-sm text-foreground">
                  <option>Private Limited</option><option>LLP</option><option>Partnership</option><option>Proprietorship</option>
                </select>
              </div>
              <div><label className="text-[11px] text-muted-foreground">Year of Incorporation *</label><Input className="mt-1 h-9 text-sm bg-surface-2 border-border" type="number" /></div>
              <div><label className="text-[11px] text-muted-foreground">Website URL</label><Input className="mt-1 h-9 text-sm bg-surface-2 border-border" /></div>
              <div><label className="text-[11px] text-muted-foreground">LinkedIn URL</label><Input className="mt-1 h-9 text-sm bg-surface-2 border-border" /></div>
              <div className="col-span-2"><label className="text-[11px] text-muted-foreground">Registered Office Address *</label><Textarea className="mt-1 text-sm bg-surface-2 border-border min-h-[60px]" /></div>
              <div><label className="text-[11px] text-muted-foreground">City *</label><Input className="mt-1 h-9 text-sm bg-surface-2 border-border" /></div>
              <div><label className="text-[11px] text-muted-foreground">State *</label><Input className="mt-1 h-9 text-sm bg-surface-2 border-border" /></div>
              <div><label className="text-[11px] text-muted-foreground">Pincode *</label><Input className="mt-1 h-9 text-sm bg-surface-2 border-border" /></div>
              <div><label className="text-[11px] text-muted-foreground">GST Number *</label><Input className="mt-1 h-9 text-sm bg-surface-2 border-border" /></div>
              <div><label className="text-[11px] text-muted-foreground">PAN Number *</label><Input className="mt-1 h-9 text-sm bg-surface-2 border-border" /></div>
            </div>
          </div>

          {/* Block 2 — Contact Person */}
          <div className="rounded-card bg-surface p-5 shadow-surface space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <Users size={16} className="text-muted-foreground" />
              <span className="section-label">Block 2 — Contact Person</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-[11px] text-muted-foreground">Authorised Signatory Name *</label><Input className="mt-1 h-9 text-sm bg-surface-2 border-border" /></div>
              <div><label className="text-[11px] text-muted-foreground">Designation *</label><Input className="mt-1 h-9 text-sm bg-surface-2 border-border" /></div>
              <div><label className="text-[11px] text-muted-foreground">Mobile *</label><Input className="mt-1 h-9 text-sm bg-surface-2 border-border" /></div>
              <div><label className="text-[11px] text-muted-foreground">Email *</label><Input className="mt-1 h-9 text-sm bg-surface-2 border-border" /></div>
              <div><label className="text-[11px] text-muted-foreground">Alternate Contact</label><Input className="mt-1 h-9 text-sm bg-surface-2 border-border" /></div>
              <div><label className="text-[11px] text-muted-foreground">Alternate Mobile</label><Input className="mt-1 h-9 text-sm bg-surface-2 border-border" /></div>
            </div>
          </div>

          {/* Block 3 — Technical Credentials */}
          <div className="rounded-card bg-surface p-5 shadow-surface space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <Wrench size={16} className="text-muted-foreground" />
              <span className="section-label">Block 3 — Technical Credentials</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-[11px] text-muted-foreground">Total Solar EPC Experience (years) *</label><Input className="mt-1 h-9 text-sm bg-surface-2 border-border" type="number" /></div>
              <div><label className="text-[11px] text-muted-foreground">Total MW Deployed *</label><Input className="mt-1 h-9 text-sm bg-surface-2 border-border" type="number" /></div>
              <div><label className="text-[11px] text-muted-foreground">Number of Projects Completed *</label><Input className="mt-1 h-9 text-sm bg-surface-2 border-border" type="number" /></div>
              <div><label className="text-[11px] text-muted-foreground">Largest Single Project (MWp)</label><Input className="mt-1 h-9 text-sm bg-surface-2 border-border" type="number" /></div>
            </div>
            <div>
              <label className="text-[11px] text-muted-foreground">Asset Types</label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {assetTypes.map((a) => (
                  <button
                    key={a.label}
                    onClick={() => toggleAsset(a.label)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg border text-[11px] transition-all",
                      selectedAssets.includes(a.label) ? 'border-primary bg-accent-soft text-foreground' : 'border-border bg-surface-2 text-muted-foreground hover:border-primary/30'
                    )}
                  >
                    <a.icon size={14} /> {a.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {['SCADA Experience', 'IoT/Edge Experience', 'Grid-connected'].map(label => (
                <div key={label} className="flex items-center justify-between p-2.5 rounded-lg bg-surface-2 border border-border">
                  <span className="text-[11px] text-muted-foreground">{label}</span>
                  <button className="w-9 h-5 rounded-full bg-surface-3 relative transition-colors">
                    <span className="absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-muted-foreground transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Block 4 — Financial */}
          <div className="rounded-card bg-surface p-5 shadow-surface space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign size={16} className="text-muted-foreground" />
              <span className="section-label">Block 4 — Financial Strength</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-[11px] text-muted-foreground">Annual Turnover (Lakhs) *</label><Input className="mt-1 h-9 text-sm bg-surface-2 border-border" type="number" /></div>
              <div><label className="text-[11px] text-muted-foreground">Net Worth (Lakhs) *</label><Input className="mt-1 h-9 text-sm bg-surface-2 border-border" type="number" /></div>
              <div><label className="text-[11px] text-muted-foreground">Credit Rating</label><Input className="mt-1 h-9 text-sm bg-surface-2 border-border" /></div>
              <div><label className="text-[11px] text-muted-foreground">Banker Name</label><Input className="mt-1 h-9 text-sm bg-surface-2 border-border" /></div>
            </div>
          </div>

          {/* Block 5 — References */}
          <div className="rounded-card bg-surface p-5 shadow-surface space-y-4">
            <span className="section-label">Block 5 — References</span>
            {[1, 2].map(i => (
              <div key={i} className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-surface-2 border border-border">
                <div><label className="text-[11px] text-muted-foreground">Organisation</label><Input className="mt-1 h-9 text-sm bg-surface border-border" /></div>
                <div><label className="text-[11px] text-muted-foreground">Contact Person</label><Input className="mt-1 h-9 text-sm bg-surface border-border" /></div>
                <div><label className="text-[11px] text-muted-foreground">Phone</label><Input className="mt-1 h-9 text-sm bg-surface border-border" /></div>
                <div><label className="text-[11px] text-muted-foreground">Relationship</label><Input className="mt-1 h-9 text-sm bg-surface border-border" /></div>
              </div>
            ))}
          </div>

          {/* Block 6 — Territory Interest */}
          <div className="rounded-card bg-surface p-5 shadow-surface space-y-4">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Globe2 size={16} className="text-muted-foreground" />
                <span className="section-label">Block 6 — Territory Interest</span>
              </div>
              <Button
                variant="outline"
                size="xs"
                className="text-primary border-primary hover:bg-accent-soft"
                onClick={() => navigate('/onboarding/infra-partner/territories', { state: { selectionMode: true } })}
              >
                Browse Specific Territories
              </Button>
            </div>

            {/* Specific Territories Display */}
            {onboardingData.selectedTerritories?.length > 0 && (
              <div className="space-y-2">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Selected Specific Territories</p>
                <div className="flex flex-wrap gap-1.5">
                  {onboardingData.selectedTerritories.map((tid: string) => {
                    const t = territories.find(item => item.id === tid);
                    return (
                      <span key={tid} className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-accent-soft text-primary text-[10px] border border-primary/10">
                        {t?.name || tid}
                        <button
                          onClick={() => updateData({
                            selectedTerritories: onboardingData.selectedTerritories.filter((id: string) => id !== tid)
                          })}
                          className="hover:text-foreground transition-colors ml-1"
                        >
                          ×
                        </button>
                      </span>
                    );
                  })}
                </div>
                <div className="h-px bg-border my-2" />
              </div>
            )}

            <p className="text-[11px] text-muted-foreground">Which states are you interested in deploying projects?</p>
            <div className="flex gap-2 mb-2">
              <Button variant="outline" size="xs" onClick={() => setSelectedStates(indianStates)}>Select All</Button>
              <Button variant="outline" size="xs" onClick={() => setSelectedStates([])}>Deselect All</Button>
            </div>
            <div className="grid grid-cols-4 gap-1.5 max-h-[200px] overflow-y-auto pr-2">
              {indianStates.map(s => (
                <button
                  key={s}
                  onClick={() => toggleState(s)}
                  className={cn(
                    "px-2 py-1.5 rounded-md text-[10px] text-left transition-all",
                    selectedStates.includes(s) ? 'bg-accent-soft text-primary border border-primary/20' : 'bg-surface-2 text-muted-foreground border border-transparent hover:border-border'
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Block 7 — Tier Confirmation */}
          <div className="rounded-card bg-surface p-5 shadow-surface space-y-4">
            <span className="section-label">Block 7 — Tier Selection Confirmation</span>
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: 'Spark', fee: '₹5L', tokens: '75K DLN' },
                { name: 'Pulse', fee: '₹10L', tokens: '150K DLN' },
                { name: 'Prime', fee: '₹20L', tokens: '450K DLN' },
              ].map((t, i) => (
                <button
                  key={t.name}
                  onClick={() => setSelectedTier(i)}
                  className={cn(
                    "p-3 rounded-lg border text-left transition-all",
                    selectedTier === i ? 'border-primary bg-accent-soft' : 'border-border bg-surface-2 hover:border-primary/30'
                  )}
                >
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-[10px] text-muted-foreground">{t.fee} · {t.tokens}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Block 8 — Declarations */}
          <div className="rounded-card bg-surface p-5 shadow-surface space-y-3">
            <span className="section-label">Block 8 — Declarations</span>
            {[
              'I confirm all information provided is accurate and complete.',
              'I agree to the DeLEN Partner Agreement terms and conditions.',
              'I consent to background verification checks.',
              'I acknowledge that the decision of DeLEN Protocol is final.',
            ].map((text, i) => (
              <label key={i} className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" checked={declarations[i]} onChange={() => setDeclarations(prev => { const n = [...prev]; n[i] = !n[i]; return n; })}
                  className="mt-0.5 rounded border-border bg-surface-2" />
                <span className="text-[11px] text-muted-foreground">{text}</span>
              </label>
            ))}
          </div>

          <div className="flex gap-3">
            <Button variant="outline" size="lg">Save Progress</Button>
            <Button size="lg" disabled={!declarations.every(Boolean)} onClick={() => {
              updateData({ ...onboardingData, isSubmitted: true });
              nextStep();
            }}>Submit Pre-Qualification</Button>
          </div>
        </div>

        {/* Scoring Sidebar */}
        <div className="w-[280px] shrink-0">
          <div className="rounded-card bg-surface p-5 shadow-surface sticky top-6">
            <div className="flex items-center justify-between mb-3 cursor-pointer" onClick={() => setShowScoring(!showScoring)}>
              <div className="flex items-center gap-2">
                <BarChart3 size={14} className="text-muted-foreground" />
                <span className="text-xs font-medium text-foreground">Scoring Framework</span>
              </div>
              {showScoring ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
            </div>
            {showScoring && (
              <>
                <table className="w-full text-[10px] mb-3">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-1.5 text-muted-foreground font-medium">Criteria</th>
                      <th className="text-right py-1.5 text-muted-foreground font-medium">Max</th>
                      <th className="text-right py-1.5 text-primary font-medium">Est.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scoringCriteria.map(c => (
                      <tr key={c.criteria} className="border-b border-border last:border-0">
                        <td className="py-1.5 text-muted-foreground">{c.criteria}</td>
                        <td className="py-1.5 text-right text-foreground font-mono">{c.max}</td>
                        <td className="py-1.5 text-right text-primary font-mono">{c.est}</td>
                      </tr>
                    ))}
                    <tr className="font-medium">
                      <td className="pt-2 text-foreground">Total</td>
                      <td className="pt-2 text-right text-foreground font-mono">100</td>
                      <td className="pt-2 text-right text-primary font-mono">~{totalEst}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="text-[9px] text-muted-foreground space-y-0.5 mb-3">
                  <p>Spark: 40–59 · Pulse: 60–79 · Prime: 80+</p>
                </div>

                <div className="p-2.5 rounded-lg bg-accent-soft">
                  <p className="text-[10px] text-primary">Your estimated score qualifies for <strong>PULSE</strong> tier</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
