import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Search, Bell, ChevronRight } from 'lucide-react';
import PortalSidebar from '@/components/PortalSidebar';
import { partnerInfo } from '@/data/mockData';

export default function PortalLayout() {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <PortalSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-14 border-b border-border flex items-center px-5 gap-4 shrink-0 bg-surface">
          <div className="flex items-center gap-1 text-[12px] text-muted-foreground">
            <span>DeLEN Protocol</span>
            {pathParts.slice(1).map((part, i) => (
              <React.Fragment key={i}>
                <ChevronRight size={12} />
                <span className="capitalize text-foreground">{part.replace(/-/g, ' ')}</span>
              </React.Fragment>
            ))}
          </div>

          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-2 border border-border w-80">
              <Search size={14} className="text-muted-foreground" />
              <span className="text-[12px] text-muted-foreground">Search projects, nodes, documents...</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-1.5 rounded-lg hover:bg-surface-2 transition-colors">
              <Bell size={18} className="text-muted-foreground" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-status-red text-[9px] text-primary-foreground flex items-center justify-center font-mono">3</span>
            </button>
            <div className="font-mono text-[11px] px-2.5 py-1 rounded-lg bg-surface-2 border border-border text-muted-foreground">
              {partnerInfo.wallet}
            </div>
            <div className="w-8 h-8 rounded-lg bg-surface-3 flex items-center justify-center font-display font-bold text-xs text-foreground">
              {partnerInfo.avatar}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
