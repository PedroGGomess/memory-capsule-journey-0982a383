import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AcademyLayout from "./layouts/AcademyLayout";
import GymAdminLayout from "./layouts/GymAdminLayout";
import ProtectedRoute from "./components/gym/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { GymAccessProvider } from "./contexts/GymAccessContext";

const Dashboard = lazy(() => import("./pages/academy/Dashboard"));
const ModuleStory = lazy(() => import("./pages/academy/ModuleStory"));
const ModulePhilosophy = lazy(() => import("./pages/academy/ModulePhilosophy"));
const ModuleProducts = lazy(() => import("./pages/academy/ModuleProducts"));
const ModuleGift = lazy(() => import("./pages/academy/ModuleGift"));
const ModuleStore = lazy(() => import("./pages/academy/ModuleStore"));
const ModuleBrandVoice = lazy(() => import("./pages/academy/ModuleBrandVoice"));
const ModuleCustomerExperience = lazy(() => import("./pages/academy/ModuleCustomerExperience"));
const ModuleAskTeam = lazy(() => import("./pages/academy/ModuleAskTeam"));
const ModuleResources = lazy(() => import("./pages/academy/ModuleResources"));
const ModuleCertification = lazy(() => import("./pages/academy/ModuleCertification"));

const AdminLogin = lazy(() => import("./pages/gym/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/gym/AdminDashboard"));
const AccessLogs = lazy(() => import("./pages/gym/AccessLogs"));
const AccessVerification = lazy(() => import("./pages/gym/AccessVerification"));

const queryClient = new QueryClient();

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-primary/40 text-sm tracking-[0.3em] uppercase animate-pulse">Loading...</div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <GymAccessProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/academy" element={<AcademyLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="module/story" element={<ModuleStory />} />
                  <Route path="module/philosophy" element={<ModulePhilosophy />} />
                  <Route path="module/products" element={<ModuleProducts />} />
                  <Route path="module/gift" element={<ModuleGift />} />
                  <Route path="module/store" element={<ModuleStore />} />
                  <Route path="module/brand-voice" element={<ModuleBrandVoice />} />
                  <Route path="module/customer-experience" element={<ModuleCustomerExperience />} />
                  <Route path="module/ask-team" element={<ModuleAskTeam />} />
                  <Route path="module/resources" element={<ModuleResources />} />
                  <Route path="module/certification" element={<ModuleCertification />} />
                </Route>
                {/* Gym Access Verification — public terminal */}
                <Route path="/gym-access" element={<AccessVerification />} />
                {/* Gym Admin routes */}
                <Route path="/gym-admin/login" element={<AdminLogin />} />
                <Route
                  path="/gym-admin"
                  element={
                    <ProtectedRoute>
                      <GymAdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="logs" element={<AccessLogs />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </GymAccessProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
