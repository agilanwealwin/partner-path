import React from 'react';
import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import {
  Home, FileText, ClipboardList, CheckCircle2, Globe2, Map,
  BarChart3, LifeBuoy, Clock, Lock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useOnboarding } from '@/hooks/use-onboarding';
import { ThemeToggle } from './ThemeToggle';

type NavSection = { label: string; type: 'section' };
type NavItem = { to: string; icon: LucideIcon; label: string; badge?: string; id?: string };
type NavEntry = NavSection | NavItem;

const navItems: NavEntry[] = [
  { label: 'ONBOARDING FLOW', type: 'section' },
  { id: 'welcome', to: '/onboarding/infra-partner/welcome', icon: Home, label: 'Welcome & Tiers' },
  { id: 'documents', to: '/onboarding/infra-partner/documents', icon: FileText, label: 'Documents Upload' },
  { id: 'pre-qualification', to: '/onboarding/infra-partner/pre-qualification', icon: ClipboardList, label: 'Pre-Qualification' },
  { id: 'status', to: '/onboarding/infra-partner/status', icon: CheckCircle2, label: 'Application Status' },
  { label: 'NETWORK', type: 'section' },
  { to: '/onboarding/infra-partner/territories', icon: Globe2, label: 'Territory Registry', badge: 'NEW' },
  { to: '/onboarding/infra-partner/territory-map', icon: Map, label: 'Territory Map' },
  { label: 'REFERENCE', type: 'section' },
  { to: '/onboarding/infra-partner/scoring', icon: BarChart3, label: 'Scoring Framework' },
  { to: '/onboarding/infra-partner/support', icon: LifeBuoy, label: 'Protocol Support' },
];

export default function OnboardingSidebar() {
  const location = useLocation();
  const { currentStepIndex, completedSteps } = useOnboarding();

  return (
    <aside className="w-[200px] min-h-screen bg-surface border-r border-border flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-border">
        <div className="flex items-center">
          <img src="/delen-logo.webp" alt="DeLEN Logo" className="h-8 w-auto" />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item, i) => {
          if ('type' in item && item.type === 'section') {
            return (
              <p key={i} className="section-label px-3 pt-4 pb-1.5">{item.label}</p>
            );
          }
          const navItem = item as NavItem;
          const isActive = location.pathname.startsWith(navItem.to);

          // Logic for onboarding steps status
          const isCompleted = navItem.id && completedSteps.includes(navItem.id);
          const isOnboardingStep = !!navItem.id;

          return (
            <RouterNavLink
              key={navItem.to}
              to={navItem.to}
              state={{ fromSidebar: true }}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-colors duration-150",
                isActive
                  ? "bg-accent-soft text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface-2"
              )}
            >
              {isCompleted ? (
                <CheckCircle2 size={14} className="text-status-green" />
              ) : (
                <navItem.icon size={14} className={isActive ? 'text-primary' : ''} />
              )}
              <span className="truncate">{navItem.label}</span>
              {navItem.badge && (
                <span className={cn(
                  "ml-auto text-[10px] px-1.5 py-0.5 rounded-md font-mono",
                  navItem.badge === 'NEW'
                    ? "bg-accent-soft text-primary"
                    : "bg-surface-3 text-muted-foreground"
                )}>
                  {navItem.badge}
                </span>
              )}
            </RouterNavLink>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-3 border-t border-border mt-auto">
        <div className="flex items-center justify-between mb-3">
          <ThemeToggle />
          <span className={cn(
            "text-[10px] px-1.5 py-0.5 rounded-md",
            currentStepIndex === 3
              ? "bg-green-soft text-status-green"
              : "bg-orange-soft text-status-orange"
          )}>
            {currentStepIndex === 3 ? 'Reviewing' : 'In Progress'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="font-mono text-[10px] px-2 py-1 rounded-md bg-surface-2 text-muted-foreground w-full text-center">
            IFP-2026-0087
          </div>
        </div>
      </div>
    </aside>
  );
}
