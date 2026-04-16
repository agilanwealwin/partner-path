import React from 'react';
import { NavLink as RouterNavLink, useLocation, Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard, FolderKanban, Server, Activity, Coins,
  Globe2, ClipboardList, FileText, BarChart3, Settings, X, Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { partnerInfo } from '@/data/mockData';

type NavSection = { label: string; type: 'section' };
type NavItem = { to: string; icon: LucideIcon; label: string; badge?: string };
type NavEntry = NavSection | NavItem;

const navItems: NavEntry[] = [
  { label: 'CORE', type: 'section' },
  { to: '/partner/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/partner/projects', icon: FolderKanban, label: 'Projects', badge: '14' },
  { to: '/partner/nodes', icon: Server, label: 'Node Management' },
  { to: '/partner/territory-explorer', icon: Globe2, label: 'Territories' },
  { label: 'OPERATIONS', type: 'section' },
  { to: '/partner/monitoring', icon: Activity, label: 'O&M Monitoring' },
  { to: '/partner/rewards', icon: Coins, label: 'Rewards', badge: 'NEW' },
  { label: 'CONTROL TOWER', type: 'section' },
  { to: '/partner/documents', icon: FileText, label: 'Documents' },
  { to: '/partner/governance', icon: BarChart3, label: 'Governance' },
  { to: '/partner/settings', icon: Settings, label: 'Settings' },
];

interface PortalSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function PortalSidebar({ isOpen, onClose }: PortalSidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile Backdrop - strictly overlays everything below z-50 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/90 backdrop-blur-md z-[60] xl:hidden animate-in fade-in duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar - fixed on everything below xl, relative on xl+ */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-[70] w-[232px] bg-surface border-r border-border flex flex-col shrink-0 transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) xl:relative xl:translate-x-0",
        isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="px-4 py-4 border-b border-border flex items-center justify-between">
          <Link to="/partner/dashboard" onClick={onClose} className="flex items-center">
            <img src="/delen-logo.webp" alt="DeLEN Logo" className="h-9 w-auto" />
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
            if ('type' in item) {
              return <p key={i} className="section-label px-3 pt-5 pb-1.5 font-bold uppercase text-[9px] text-muted-foreground/60 tracking-[0.15em]">{item.label}</p>;
            }
            const navItem = item as NavItem;
            const isActive = location.pathname === navItem.to || location.pathname.startsWith(navItem.to + '/');
            return (
              <RouterNavLink
                key={navItem.to}
                to={navItem.to}
                onClick={onClose} // Ensure sidebar closes on mobile when link is clicked
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
                <navItem.icon size={16} className={cn("transition-colors", isActive ? 'text-primary' : 'group-hover:text-foreground')} />
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

        {/* Bottom User Profile */}
        <div className="px-3 py-4 border-t border-border bg-surface-2/30">
          <Link
            to="/partner/settings"
            onClick={onClose}
            className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-surface-2 transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center font-display font-bold text-xs text-primary border border-primary/20 group-hover:scale-105 transition-transform">
              {partnerInfo.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-bold text-foreground truncate">{partnerInfo.name}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-tight font-medium opacity-70 italic">SunVolt EPC</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] shrink-0" />
          </Link>
        </div>
      </aside>
    </>
  );
}
