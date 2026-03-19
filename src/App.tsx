import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import OnboardingLayout from "@/layouts/OnboardingLayout";
import PortalLayout from "@/layouts/PortalLayout";
import WelcomePage from "@/pages/onboarding/WelcomePage";
import TerritoryRegistryPage from "@/pages/onboarding/TerritoryRegistryPage";
import DashboardPage from "@/pages/partner/DashboardPage";
import PlaceholderPage from "@/pages/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/onboarding/infra-partner/welcome" replace />} />

          {/* Onboarding */}
          <Route path="/onboarding/infra-partner" element={<OnboardingLayout />}>
            <Route index element={<Navigate to="welcome" replace />} />
            <Route path="welcome" element={<WelcomePage />} />
            <Route path="documents" element={<PlaceholderPage title="Document Upload" />} />
            <Route path="pre-qualification" element={<PlaceholderPage title="Pre-Qualification Assessment" />} />
            <Route path="status" element={<PlaceholderPage title="Application Status" />} />
            <Route path="territories" element={<TerritoryRegistryPage />} />
            <Route path="territory-map" element={<PlaceholderPage title="Territory Map" />} />
            <Route path="scoring" element={<PlaceholderPage title="Scoring Framework" />} />
            <Route path="support" element={<PlaceholderPage title="Protocol Support" />} />
          </Route>

          {/* Portal */}
          <Route path="/partner" element={<PortalLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="projects" element={<PlaceholderPage title="Projects" />} />
            <Route path="nodes" element={<PlaceholderPage title="Node Management" />} />
            <Route path="monitoring" element={<PlaceholderPage title="O&M Monitoring" />} />
            <Route path="rewards" element={<PlaceholderPage title="Rewards" />} />
            <Route path="territory-map" element={<PlaceholderPage title="Territory Map" />} />
            <Route path="territories" element={<TerritoryRegistryPage />} />
            <Route path="documents" element={<PlaceholderPage title="Documents" />} />
            <Route path="governance" element={<PlaceholderPage title="Governance" />} />
            <Route path="settings" element={<PlaceholderPage title="Settings" />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
