import React from 'react';
import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, FolderKanban, Server, Activity, Coins,
  Globe2, ClipboardList, FileText, BarChart3, Settings, Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { partnerInfo } from '@/data/mockData';

type NavSection = { label: string; type: 'section' };
type NavItem = { to: string; icon: React.ComponentType<{ size?: number; className?: string }>; label: string; badge?: string };
type NavEntry = NavSection | NavItem;

const navItems: NavEntry[] = [
  { label: 'CORE', type: 'section' },
  { to: '/partner/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/partner/projects', icon: FolderKanban, label: 'Projects', badge: '14' },
  { to: '/partner/nodes', icon: Server, label: 'Node Management' },
  { label: 'OPERATIONS', type: 'section' },
  { to: '/partner/monitoring', icon: Activity, label: 'O&M Monitoring' },
  { to: '/partner/rewards', icon: Coins, label: 'Rewards', badge: 'NEW' },
  { label: 'NETWORK', type: 'section' },
  { to: '/partner/territory-map', icon: Globe2, label: 'Territory Map' },
  { to: '/partner/territories', icon: ClipboardList, label: 'Territory Registry' },
  { label: 'ADMIN', type: 'section' },
  { to: '/partner/documents', icon: FileText, label: 'Documents' },
  { to: '/partner/governance', icon: BarChart3, label: 'Governance' },
  { to: '/partner/settings', icon: Settings, label: 'Settings' },
];

export default function PortalSidebar() {
  const location = useLocation();

  return (
    <aside className="w-[232px] min-h-screen bg-surface border-r border-border flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center">
            <span className="font-display font-bold text-sm text-primary-foreground">D</span>
          </div>
          <div>
            <p className="font-display font-bold text-sm text-foreground">DeLEN Protocol</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-status-green" />
              <span className="text-[10px] text-muted-foreground font-mono">v2.4 · Mainnet</span>
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item, i) => {
          if ('type' in item) {
            return <p key={i} className="section-label px-3 pt-4 pb-1.5">{item.label}</p>;
          }
          const navItem = item as NavItem;
          const isActive = location.pathname === navItem.to || location.pathname.startsWith(navItem.to + '/');
          return (
            <RouterNavLink
              key={navItem.to}
              to={navItem.to}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-colors duration-150",
                isActive
                  ? "bg-accent-soft text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface-2"
              )}
            >
              <navItem.icon size={16} className={isActive ? 'text-primary' : ''} />
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
      <div className="px-3 py-3 border-t border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-surface-3 flex items-center justify-center font-display font-bold text-xs text-foreground">
            {partnerInfo.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-medium text-foreground truncate">{partnerInfo.name}</p>
            <p className="text-[10px] text-muted-foreground">Infrastructure Partner</p>
          </div>
          <span className="w-2 h-2 rounded-full bg-status-green shrink-0" />
        </div>
      </div>
    </aside>
  );
}
