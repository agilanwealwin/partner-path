import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import OnboardingLayout from "@/layouts/OnboardingLayout";
import PortalLayout from "@/layouts/PortalLayout";
import WelcomePage from "@/pages/onboarding/WelcomePage";
import TerritoryRegistryPage from "@/pages/onboarding/TerritoryRegistryPage";
import UnifiedOnboardingPage from "@/pages/onboarding/UnifiedOnboardingPage";
import TerritoryMapPage from "@/pages/onboarding/TerritoryMapPage";
import TerritoryDetailPage from "@/pages/onboarding/TerritoryDetailPage";
import ScoringFrameworkPage from "@/pages/onboarding/ScoringFrameworkPage";
import ProtocolSupportPage from "@/pages/onboarding/ProtocolSupportPage";
import DashboardPage from "@/pages/partner/DashboardPage";
import ProjectsListPage from "@/pages/partner/ProjectsListPage";
import ProjectDetailPage from "@/pages/partner/ProjectDetailPage";
import NodeManagementPage from "@/pages/partner/NodeManagementPage";
import NodeDetailPage from "@/pages/partner/NodeDetailPage";
import MonitoringPage from "@/pages/partner/MonitoringPage";
import RewardsPage from "@/pages/partner/RewardsPage";
import GovernancePage from "@/pages/partner/GovernancePage";
import DocumentsPage from "@/pages/partner/DocumentsPage";
import SettingsPage from "@/pages/partner/SettingsPage";
import MyRequestsPage from "@/pages/partner/MyRequestsPage";
import SupportPage from "@/pages/partner/SupportPage";
import NotificationsPage from "@/pages/partner/NotificationsPage";
import TeamPage from "@/pages/partner/TeamPage";
import PlaceholderPage from "@/pages/PlaceholderPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/auth/LoginPage";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light" storageKey="delen-theme">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Onboarding */}
            <Route path="/onboarding/infra-partner" element={<OnboardingLayout />}>
              <Route index element={<Navigate to="welcome" replace />} />
              <Route path="welcome" element={<WelcomePage />} />
              <Route path="documents" element={<UnifiedOnboardingPage />} />
              <Route path="pre-qualification" element={<UnifiedOnboardingPage />} />
              <Route path="select-territory" element={<UnifiedOnboardingPage />} />
              <Route path="status" element={<UnifiedOnboardingPage />} />
              <Route path="territories" element={<TerritoryRegistryPage />} />
              <Route path="territories/:id" element={<TerritoryDetailPage />} />
              <Route path="territory-map" element={<TerritoryMapPage />} />
              <Route path="scoring" element={<ScoringFrameworkPage />} />
              <Route path="support" element={<ProtocolSupportPage />} />
            </Route>

            {/* Portal */}
            <Route path="/partner" element={<PortalLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="projects" element={<ProjectsListPage />} />
              <Route path="projects/:id" element={<ProjectDetailPage />} />
              <Route path="nodes" element={<NodeManagementPage />} />
              <Route path="nodes/:id" element={<NodeDetailPage />} />
              <Route path="monitoring" element={<MonitoringPage />} />
              <Route path="rewards" element={<RewardsPage />} />
              <Route path="territory-map" element={<TerritoryMapPage />} />
              <Route path="territories" element={<TerritoryRegistryPage />} />
              <Route path="territories/my-requests" element={<MyRequestsPage />} />
              <Route path="territories/:id" element={<TerritoryDetailPage />} />
              <Route path="documents" element={<DocumentsPage />} />
              <Route path="governance" element={<GovernancePage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="team" element={<TeamPage />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="support" element={<SupportPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
