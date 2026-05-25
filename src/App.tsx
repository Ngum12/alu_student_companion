import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Settings from "./pages/settings";
import Documents from "./pages/documents";
import { Toaster } from "sonner";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { MiniChatbot } from "./components/mini-chatbot/MiniChatbot";
import AnalyticsDashboard from "./pages/admin/AnalyticsDashboard";
import ApiDocumentation from "./pages/admin/ApiDocumentation";
import FeedbackDashboard from "./pages/admin/FeedbackDashboard";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import "./App.css";

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
          <MiniChatbot />
          <Toaster position="top-center" richColors />
        </Router>
      </NextThemeProvider>
    </AuthProvider>
  );
}

export default App;
