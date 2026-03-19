import React from 'react';
import { Outlet } from 'react-router-dom';
import OnboardingSidebar from '@/components/OnboardingSidebar';

export default function OnboardingLayout() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <OnboardingSidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
