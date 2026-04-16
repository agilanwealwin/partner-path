import React from 'react';
import { NavLink as RouterNavLink, useLocation, Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import {
  Home, FileText, ClipboardList, CheckCircle2, Globe2, Map,
  BarChart3, LifeBuoy, Clock, Lock, X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useOnboarding, ONBOARDING_STEPS } from '@/hooks/use-onboarding';
import { ThemeToggle } from './ThemeToggle';

type NavSection = { label: string; type: 'section' };
type NavItem = { to: string; icon: LucideIcon; label: string; badge?: string; id?: string };
type NavEntry = NavSection | NavItem;

const navItems: NavEntry[] = [
  { label: 'ONBOARDING FLOW', type: 'section' },
  { id: 'welcome', to: '/onboarding/infra-partner/welcome', icon: Home, label: 'Welcome & Tiers' },
  { id: 'application', to: '/onboarding/infra-partner/documents', icon: FileText, label: 'Application Progress' },
  { label: 'NETWORK', type: 'section' },
  { to: '/onboarding/infra-partner/territories', icon: Globe2, label: 'Territory Registry', badge: 'NEW' },
  { to: '/onboarding/infra-partner/territory-map', icon: Map, label: 'Territory Map' },
];

interface OnboardingSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function OnboardingSidebar({ isOpen, onClose }: OnboardingSidebarProps) {
  const location = useLocation();
  const { currentStepIndex, completedSteps } = useOnboarding();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/90 backdrop-blur-md z-[60] xl:hidden animate-in fade-in duration-300"
          onClick={onClose}
        />
      )}

      <aside className={cn(
        "fixed inset-y-0 left-0 z-[70] w-[232px] bg-surface border-r border-border flex flex-col shrink-0 transition-transform duration-500 xl:relative xl:translate-x-0 cubic-bezier(0.4, 0, 0.2, 1)",
        isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="px-4 py-5 border-b border-border flex items-center justify-between">
          <Link to="/onboarding/infra-partner/welcome" onClick={onClose} className="flex items-center text-primary group transition-all">
            <img src="/delen-logo.webp" alt="DeLEN Logo" className="h-8 w-auto group-hover:opacity-80 transition-opacity" />
          </Link>
          {onClose && (
            <button onClick={onClose} className="xl:hidden p-1.5 rounded-lg hover:bg-surface-2 text-muted-foreground transition-colors border border-border/50">
              <span className="sr-only">Close sidebar</span>
              <X size={18} />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto custom-scrollbar">
          {navItems.map((item, i) => {
            if ('type' in item && item.type === 'section') {
              return (
                <p key={i} className="section-label px-3 pt-5 pb-1.5 font-bold uppercase text-[9px] text-muted-foreground/60 tracking-[0.15em]">{item.label}</p>
              );
            }
            const navItem = item as NavItem;
            let to = navItem.to;
            if (navItem.id === 'application') {
              to = ONBOARDING_STEPS[currentStepIndex === 0 ? 1 : currentStepIndex].path;
            }
            const isActive = location.pathname.startsWith(to);
            const isCompleted = navItem.id && completedSteps.includes(navItem.id);

            return (
              <RouterNavLink
                key={navItem.to}
                to={to}
                onClick={onClose}
                state={{ fromSidebar: true }}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] transition-all duration-200 group relative",
                  isActive
                    ? "bg-primary/10 text-primary font-bold shadow-sm border border-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface-2"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 w-1 h-4 bg-primary rounded-full" />
                )}
                {isCompleted ? (
                  <CheckCircle2 size={14} className="text-status-green" />
                ) : (
                  <navItem.icon size={14} className={isActive ? 'text-primary' : 'group-hover:text-foreground'} />
                )}
                <span className="truncate">{navItem.label}</span>
                {navItem.badge && (
                  <span className={cn(
                    "ml-auto text-[9px] px-1.5 py-0.5 rounded-md font-mono font-black tracking-tighter",
                    navItem.badge === 'NEW'
                      ? "bg-primary text-primary-foreground animate-pulse"
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
        <div className="px-3 py-3 border-t border-border mt-auto bg-surface-2/30">
          <div className="flex items-center justify-between mb-3 px-1">
            <ThemeToggle />
            <span className={cn(
              "text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider",
              currentStepIndex === 3
                ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                : "bg-orange-500/10 text-orange-500 border border-orange-500/20"
            )}>
              {currentStepIndex === 3 ? 'Reviewing' : 'In Progress'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="font-mono text-[9px] px-3 py-1.5 rounded-lg bg-surface-2 text-muted-foreground w-full text-center border border-border/50 uppercase tracking-widest font-bold">
              IFP-2026-0087
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
