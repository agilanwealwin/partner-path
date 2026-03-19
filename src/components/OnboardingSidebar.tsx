import React from 'react';
import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import {
  Home, FileText, ClipboardList, CheckCircle2, Globe2, Map,
  BarChart3, LifeBuoy
} from 'lucide-react';
import { cn } from '@/lib/utils';

type NavSection = { label: string; type: 'section' };
type NavItem = { to: string; icon: React.ComponentType<{ size?: number; className?: string }>; label: string; badge?: string };
type NavEntry = NavSection | NavItem;

const navItems: NavEntry[] = [
  { label: 'ONBOARDING FLOW', type: 'section' },
  { to: '/onboarding/infra-partner/welcome', icon: Home, label: 'Welcome & Tiers' },
  { to: '/onboarding/infra-partner/documents', icon: FileText, label: 'Documents Upload', badge: '18' },
  { to: '/onboarding/infra-partner/pre-qualification', icon: ClipboardList, label: 'Pre-Qualification' },
  { to: '/onboarding/infra-partner/status', icon: CheckCircle2, label: 'Application Status' },
  { label: 'NETWORK', type: 'section' },
  { to: '/onboarding/infra-partner/territories', icon: Globe2, label: 'Territory Registry', badge: 'NEW' },
  { to: '/onboarding/infra-partner/territory-map', icon: Map, label: 'Territory Map' },
  { label: 'REFERENCE', type: 'section' },
  { to: '/onboarding/infra-partner/scoring', icon: BarChart3, label: 'Scoring Framework' },
  { to: '/onboarding/infra-partner/support', icon: LifeBuoy, label: 'Protocol Support' },
];

export default function OnboardingSidebar() {
  const location = useLocation();

  return (
    <aside className="w-[200px] min-h-screen bg-surface border-r border-border flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg gradient-accent flex items-center justify-center">
            <span className="font-display font-bold text-xs text-primary-foreground">D</span>
          </div>
          <div>
            <p className="font-display font-bold text-sm text-foreground">DeLEN</p>
            <p className="text-[10px] text-muted-foreground">Partner Onboarding</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item, i) => {
          if (item.type === 'section') {
            return (
              <p key={i} className="section-label px-3 pt-4 pb-1.5">{item.label}</p>
            );
          }
          const isActive = location.pathname === item.to;
          return (
            <RouterNavLink
              key={item.to}
              to={item.to!}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-colors duration-150",
                isActive
                  ? "bg-accent-soft text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface-2"
              )}
            >
              {item.icon && <item.icon size={14} className={isActive ? 'text-primary' : ''} />}
              <span className="truncate">{item.label}</span>
              {item.badge && (
                <span className={cn(
                  "ml-auto text-[10px] px-1.5 py-0.5 rounded-md font-mono",
                  item.badge === 'NEW'
                    ? "bg-accent-soft text-primary"
                    : "bg-surface-3 text-muted-foreground"
                )}>
                  {item.badge}
                </span>
              )}
            </RouterNavLink>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-3 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="font-mono text-[10px] px-2 py-1 rounded-md bg-surface-2 text-muted-foreground">
            IFP-2026-0087
          </div>
          <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-md bg-orange-soft text-status-orange">
            Pending
          </span>
        </div>
      </div>
    </aside>
  );
}
