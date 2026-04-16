import React, { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Search, Bell, ChevronRight, Wallet, Sun, Moon, Menu } from 'lucide-react';
import PortalSidebar from '@/components/PortalSidebar';
import { partnerInfo } from '@/data/mockData';
import { useTheme } from '@/components/ThemeProvider';
import { OnboardingProvider } from '@/hooks/use-onboarding';
import GlobalSearch from '@/components/GlobalSearch';

export default function PortalLayout() {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);
  const { theme, setTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <OnboardingProvider>
      <div className="flex min-h-screen w-full bg-background transition-colors duration-200 overflow-x-hidden">
        <PortalSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Topbar */}
          <header className="h-16 border-b border-border flex items-center px-3 md:px-6 gap-2 sm:gap-4 shrink-0 bg-surface">
            {/* Mobile Sidebar Toggle */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="xl:hidden p-2 rounded-xl border border-border bg-surface-2 text-muted-foreground hover:text-foreground transition-all shrink-0"
            >
              <Menu size={20} />
            </button>

            <div className="hidden lg:flex items-center gap-1 text-[13px] text-muted-foreground shrink-0">
              <span>DeLEN Protocol</span>
              {pathParts.slice(1).map((part, i) => (
                <React.Fragment key={i}>
                  <ChevronRight size={14} />
                  <span className="capitalize text-foreground">{part.replace(/-/g, ' ')}</span>
                </React.Fragment>
              ))}
            </div>

            <div className="flex-1 flex justify-center px-1 sm:px-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center justify-between gap-2 px-2.5 sm:px-3 py-2 rounded-xl bg-surface-2 border border-border w-full max-w-96 text-muted-foreground hover:border-primary/50 hover:bg-surface-3 transition-all group"
              >
                <div className="flex items-center gap-2">
                  <Search size={15} className="group-hover:text-primary transition-colors shrink-0" />
                  <span className="text-[13px] hidden lg:inline">Search projects, nodes, documents...</span>
                  <span className="text-[13px] hidden sm:inline lg:hidden">Search...</span>
                </div>
                <div className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded border border-border bg-surface text-[10px] font-bold select-none shrink-0">
                  {navigator.platform.indexOf('Mac') > -1 ? '⌘K' : 'Ctrl+K'}
                </div>
              </button>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              {/* Network Chip - Hidden on mobile */}
              <div className="hidden xl:flex items-center gap-2 bg-green-soft border border-status-green/20 px-3.5 py-1.5 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-status-green"></div>
                <span className="text-xs text-status-green font-medium">Ethereum Mainnet</span>
              </div>

              {/* Wallet Address - Shortened on mobile, hidden on very small screens */}
              <div className="hidden sm:flex items-center gap-2 font-mono text-[12px] px-2 md:px-3.5 py-1.5 rounded-full bg-surface-2 border border-border text-muted-foreground shrink-0 border-dashed md:border-solid">
                <Wallet size={14} className="text-muted-foreground shrink-0" />
                <span className="hidden xl:inline">{partnerInfo.wallet}</span>
                <span className="xl:hidden">{partnerInfo.wallet.slice(0, 4)}...{partnerInfo.wallet.slice(-4)}</span>
              </div>

              <div className="flex items-center gap-1">
                {/* Wallet Link -> Settings - Hidden on mobile */}
                <Link to="/partner/settings" className="hidden sm:inline-flex p-2 rounded-full hover:bg-surface-2 transition-colors text-muted-foreground hover:text-foreground shrink-0">
                  <Wallet size={18} />
                </Link>

                {/* Notification Dropdown */}
                <div className="relative group">
                  <button className="relative p-2 rounded-full hover:bg-surface-2 transition-colors text-muted-foreground hover:text-foreground shrink-0">
                    <Bell size={18} />
                    <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-primary text-[9px] text-primary-foreground flex items-center justify-center font-bold">2</span>
                  </button>

                  {/* Minified Notifications Dropdown */}
                  <div className="absolute top-full right-0 mt-2 w-80 bg-surface border border-border rounded-xl shadow-surface-hover opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                    <div className="p-3 border-b border-border flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">Notifications</span>
                      <button className="text-[10px] text-primary hover:underline">Mark all as read</button>
                    </div>
                    <div className="flex flex-col">
                      <div className="p-3 hover:bg-surface-2 cursor-pointer transition-colors border-b border-border border-l-2 border-l-primary flex gap-3">
                        <div className="w-8 h-8 rounded-lg bg-orange-soft flex items-center justify-center shrink-0">
                          <Bell size={14} className="text-status-orange" />
                        </div>
                        <div>
                          <p className="text-[12px] font-medium text-foreground">Node NR-007 offline</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">Nellore RE Park — 2h ago</p>
                        </div>
                      </div>
                      <div className="p-3 hover:bg-surface-2 cursor-pointer transition-colors border-b border-border border-l-2 border-l-primary flex gap-3">
                        <div className="w-8 h-8 rounded-lg bg-green-soft flex items-center justify-center shrink-0">
                          <Wallet size={14} className="text-status-green" />
                        </div>
                        <div>
                          <p className="text-[12px] font-medium text-foreground">DLN Distribution</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">18,400 DLN credited — 1d ago</p>
                        </div>
                      </div>
                    </div>
                    <Link to="/partner/notifications" className="block w-full p-3 text-center text-xs text-muted-foreground hover:bg-surface-2 hover:text-foreground transition-colors">
                      View all notifications
                    </Link>
                  </div>
                </div>
              </div>

              {/* Actions Divider - Hidden on mobile */}
              <div className="hidden sm:block w-[1px] h-5 bg-border mx-1"></div>

              <div className="flex items-center gap-1 sm:gap-3">
                {/* Theme Toggle */}
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-1.5 sm:p-2 rounded-full hover:bg-surface-2 transition-colors text-muted-foreground hover:text-foreground shrink-0"
                >
                  {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
                </button>

                {/* User Avatar -> Settings */}
                <Link to="/partner/settings" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-accent-soft border border-primary/20 hover:border-primary transition-colors flex items-center justify-center font-display font-medium text-[11px] sm:text-[13px] text-primary shrink-0">
                  {partnerInfo.avatar}
                </Link>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>

      <GlobalSearch open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </OnboardingProvider>
  );
}
