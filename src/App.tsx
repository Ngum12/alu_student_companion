import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Settings from "./pages/settings";
import Documents from "./pages/documents";
import News from "./pages/News";
import Opportunities from "./pages/Opportunities";
import { Toaster } from "sonner";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { MiniChatbot } from "./components/mini-chatbot/MiniChatbot";
import { MobileTabBar } from "./components/mobile/MobileTabBar";
import AnalyticsDashboard from "./pages/admin/AnalyticsDashboard";
import ApiDocumentation from "./pages/admin/ApiDocumentation";
import FeedbackDashboard from "./pages/admin/FeedbackDashboard";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import "./App.css";

const APP_ROUTES = ["/chat", "/news", "/opportunities", "/documents", "/profile", "/settings"];

const Chrome = () => {
  const { pathname } = useLocation();
  const showTabs = APP_ROUTES.some((r) => pathname === r || pathname.startsWith(r + "/"));
  return (
    <>
      {/* Mini chatbot is only useful on the landing/marketing surface; the real chat owns mobile */}
      {!showTabs && <MiniChatbot />}
      {showTabs && <MobileTabBar />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <NextThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <Router>
          <Routes>
            {/* Public marketing page is the root */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/landing" element={<Navigate to="/" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected app routes */}
            <Route path="/chat" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/chatbot" element={<Navigate to="/chat" replace />} />
            <Route path="/news" element={
              <ProtectedRoute>
                <News />
              </ProtectedRoute>
            } />
            <Route path="/opportunities" element={
              <ProtectedRoute>
                <Opportunities />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="/documents" element={
              <ProtectedRoute>
                <Documents />
              </ProtectedRoute>
            } />

            {/* Admin routes */}
            <Route path="/admin/analytics" element={
              <ProtectedRoute>
                <AnalyticsDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/api-docs" element={
              <ProtectedRoute>
                <ApiDocumentation />
              </ProtectedRoute>
            } />
            <Route path="/admin/feedback" element={
              <ProtectedRoute>
                <FeedbackDashboard />
              </ProtectedRoute>
            } />
          </Routes>
          <Chrome />
          <Toaster position="top-center" richColors />
        </Router>
      </NextThemeProvider>
    </AuthProvider>
  );
}

export default App;
