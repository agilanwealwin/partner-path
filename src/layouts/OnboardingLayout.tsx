import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import OnboardingSidebar from '@/components/OnboardingSidebar';
import { OnboardingProvider } from '@/hooks/use-onboarding';
import { Menu } from 'lucide-react';

export default function OnboardingLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <OnboardingProvider>
      <div className="flex h-screen w-full bg-background transition-colors duration-300 overflow-hidden relative">
        <OnboardingSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Mobile Header for Onboarding */}
          <header className="xl:hidden h-14 border-b border-border flex items-center px-4 shrink-0 bg-surface">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-lg border border-border bg-surface-2 text-muted-foreground hover:text-foreground transition-all"
            >
              <Menu size={18} />
            </button>
            <div className="ml-3 flex items-center">
              <img src="/delen-logo.webp" alt="DeLEN Logo" className="h-6 w-auto" />
            </div>
          </header>

          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </OnboardingProvider>
  );
}
