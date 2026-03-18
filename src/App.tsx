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
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";

const Dashboard = lazy(() => import("./pages/academy/Dashboard"));
const Profile = lazy(() => import("./pages/academy/Profile"));
const ModuleStory = lazy(() => import("./pages/academy/ModuleStory"));
const ModulePhilosophy = lazy(() => import("./pages/academy/ModulePhilosophy"));
const ModuleProducts = lazy(() => import("./pages/academy/ModuleProducts"));
const ModuleGift = lazy(() => import("./pages/academy/ModuleGift"));
const ModuleStore = lazy(() => import("./pages/academy/ModuleStore"));
const ModuleBrandVoice = lazy(() => import("./pages/academy/ModuleBrandVoice"));
const ModuleCustomerExperience = lazy(() => import("./pages/academy/ModuleCustomerExperience"));
const ModuleBusinessModel = lazy(() => import("./pages/academy/ModuleBusinessModel"));
const ModuleTastingGuide = lazy(() => import("./pages/academy/ModuleTastingGuide"));
const ModuleGlossary = lazy(() => import("./pages/academy/ModuleGlossary"));
const ModuleCrossSelling = lazy(() => import("./pages/academy/ModuleCrossSelling"));
const ModuleVisualMerchandising = lazy(() => import("./pages/academy/ModuleVisualMerchandising"));
const ModuleAskTeam = lazy(() => import("./pages/academy/ModuleAskTeam"));
const ModuleResources = lazy(() => import("./pages/academy/ModuleResources"));
const ModuleCertification = lazy(() => import("./pages/academy/ModuleCertification"));
const ModuleAIAssistant = lazy(() => import("./pages/academy/ModuleAIAssistant"));
const ModuleClientProfiles = lazy(() => import("./pages/academy/ModuleClientProfiles"));
const ModuleClientCulture = lazy(() => import("./pages/academy/ModuleClientCulture"));
const ModuleConduct = lazy(() => import("./pages/academy/ModuleConduct"));
const ModuleTransport = lazy(() => import("./pages/academy/ModuleTransport"));
const ModuleDigitalSystems = lazy(() => import("./pages/academy/ModuleDigitalSystems"));
const ModuleUVPrinter = lazy(() => import("./pages/academy/ModuleUVPrinter"));
const ModuleVocabulary = lazy(() => import("./pages/academy/ModuleVocabulary"));
const ModuleLeadership = lazy(() => import("./pages/academy/ModuleLeadership"));
const ModuleTeamOps = lazy(() => import("./pages/academy/ModuleTeamOps"));
const AcademyLogin = lazy(() => import("./pages/academy/AcademyLogin"));
const AdminEmployees = lazy(() => import("./pages/academy/AdminEmployees"));

const AdminLogin = lazy(() => import("./pages/gym/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/gym/AdminDashboard"));
const AccessLogs = lazy(() => import("./pages/gym/AccessLogs"));
const GymAIChat = lazy(() => import("./pages/gym/GymAIChat"));
const AccessVerification = lazy(() => import("./pages/gym/AccessVerification"));
const AdminAnalytics = lazy(() => import("./pages/gym/AdminAnalytics"));
const AdminQuestions = lazy(() => import("./pages/gym/AdminQuestions"));
const AdminManagement = lazy(() => import("./pages/gym/AdminManagement"));

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
              <LanguageProvider>
                <ThemeProvider>
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
                    <Route path="profile" element={<Profile />} />
                    <Route path="module/story" element={<ModuleStory />} />
                    <Route path="module/philosophy" element={<ModulePhilosophy />} />
                    <Route path="module/products" element={<ModuleProducts />} />
                    <Route path="module/gift" element={<ModuleGift />} />
                    <Route path="module/store" element={<ModuleStore />} />
                    <Route path="module/brand-voice" element={<ModuleBrandVoice />} />
                    <Route path="module/customer-experience" element={<ModuleCustomerExperience />} />
                    <Route path="module/business-model" element={<ModuleBusinessModel />} />
                    <Route path="module/tasting-guide" element={<ModuleTastingGuide />} />
                    <Route path="module/glossary" element={<ModuleGlossary />} />
                    <Route path="module/cross-selling" element={<ModuleCrossSelling />} />
                    <Route path="module/visual-merchandising" element={<ModuleVisualMerchandising />} />
                    <Route path="module/ask-team" element={<ModuleAskTeam />} />
                    <Route path="module/resources" element={<ModuleResources />} />
                    <Route path="module/certification" element={<ModuleCertification />} />
                    <Route path="module/ai-assistant" element={<ModuleAIAssistant />} />
                    <Route path="module/client-profiles" element={<ModuleClientProfiles />} />
                    <Route path="module/client-culture" element={<ModuleClientCulture />} />
                    <Route path="module/conduct" element={<ModuleConduct />} />
                    <Route path="module/transport-rules" element={<ModuleTransport />} />
                    <Route path="module/digital-systems" element={<ModuleDigitalSystems />} />
                    <Route path="module/uv-printer" element={<ModuleUVPrinter />} />
                    <Route path="module/vocabulary" element={<ModuleVocabulary />} />
                    <Route path="module/leadership" element={<ModuleLeadership />} />
                    <Route path="module/team-ops" element={<ModuleTeamOps />} />
                    <Route path="admin/employees" element={<AdminEmployees />} />
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
                    <Route path="admins" element={<AdminManagement />} />
                  </Route>

                  <Route path="*" element={<NotFound />} />
                </Routes>
                  </Suspense>
                </ThemeProvider>
              </LanguageProvider>
            </GymAccessProvider>
          </AcademyAuthProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
