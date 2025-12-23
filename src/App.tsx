import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { StudentProvider } from "@/contexts/StudentContext";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import About from "./pages/About";
import AIAssistance from "./pages/AIAssistance";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/dashboard/Profile";
import Universities from "./pages/dashboard/Universities";
import Applications from "./pages/dashboard/Applications";
import Deadlines from "./pages/dashboard/Deadlines";
import Documents from "./pages/dashboard/Documents";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-background">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/auth" element={<Auth />} />
    <Route path="/about" element={<About />} />
    <Route path="/ai-assistance" element={<AIAssistance />} />
    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    <Route path="/dashboard/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    <Route path="/dashboard/universities" element={<ProtectedRoute><Universities /></ProtectedRoute>} />
    <Route path="/dashboard/applications" element={<ProtectedRoute><Applications /></ProtectedRoute>} />
    <Route path="/dashboard/deadlines" element={<ProtectedRoute><Deadlines /></ProtectedRoute>} />
    <Route path="/dashboard/documents" element={<ProtectedRoute><Documents /></ProtectedRoute>} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <StudentProvider>
            <AppRoutes />
          </StudentProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
