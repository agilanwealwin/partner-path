import React from 'react';
import { Outlet } from 'react-router-dom';
import OnboardingSidebar from '@/components/OnboardingSidebar';
import { OnboardingProvider } from '@/hooks/use-onboarding';
import { ThemeProvider } from '@/components/ThemeProvider';

export default function OnboardingLayout() {
  return (
    <OnboardingProvider>
      <div className="flex h-screen w-full bg-background transition-colors duration-300 overflow-hidden">
        <OnboardingSidebar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </OnboardingProvider>
  );
}
