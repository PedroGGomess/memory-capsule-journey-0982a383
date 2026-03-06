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
import AcademyProtectedRoute from "./components/academy/AcademyProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { GymAccessProvider } from "./contexts/GymAccessContext";
import { AcademyAuthProvider } from "./contexts/AcademyAuthContext";

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
const ModuleAIAssistant = lazy(() => import("./pages/academy/ModuleAIAssistant"));
const AcademyLogin = lazy(() => import("./pages/academy/AcademyLogin"));

const AdminLogin = lazy(() => import("./pages/gym/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/gym/AdminDashboard"));
const AccessLogs = lazy(() => import("./pages/gym/AccessLogs"));
const GymAIChat = lazy(() => import("./pages/gym/GymAIChat"));
const AccessVerification = lazy(() => import("./pages/gym/AccessVerification"));
const AdminAnalytics = lazy(() => import("./pages/gym/AdminAnalytics"));
const AdminQuestions = lazy(() => import("./pages/gym/AdminQuestions"));

const queryClient = new QueryClient();

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-primary/40 text-sm tracking-[0.3em] uppercase animate-pulse">Loading...</div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AcademyAuthProvider>
            <GymAccessProvider>
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/" element={<Index />} />

                  {/* Academy login - public, no layout */}
                  <Route path="/academy/login" element={<AcademyLogin />} />

                  {/* Protected academy routes */}
                  <Route
                    path="/academy"
                    element={
                      <AcademyProtectedRoute>
                        <AcademyLayout />
                      </AcademyProtectedRoute>
                    }
                  >
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
                    <Route path="module/ai-assistant" element={<ModuleAIAssistant />} />
                  </Route>

                  {/* Public gym access terminal */}
                  <Route path="/gym-access" element={<AccessVerification />} />

                  {/* Gym admin login */}
                  <Route path="/gym-admin/login" element={<AdminLogin />} />

                  {/* Protected gym admin routes */}
                  <Route
                    path="/gym-admin"
                    element={
                      <ProtectedRoute>
                        <GymAdminLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<AdminDashboard />} />
                    <Route path="analytics" element={<AdminAnalytics />} />
                    <Route path="questions" element={<AdminQuestions />} />
                    <Route path="logs" element={<AccessLogs />} />
                    <Route path="chat" element={<GymAIChat />} />
                  </Route>

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </GymAccessProvider>
          </AcademyAuthProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
