import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardLayout from '@/layout/DashboardLayout';
import Account from '@/pages/Account';
import Customers from '@/pages/Customers';
import Dashboard from '@/pages/Dashboard';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Reports from '@/pages/Reports';
import Tickets from '@/pages/Tickets';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import type { ReactNode } from 'react';

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<DashboardLayout />}>
      <Route
        path="dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="tickets"
        element={
          <RequireAuth>
            <Tickets />
          </RequireAuth>
        }
      />
      <Route
        path="customers"
        element={
          <RequireAuth>
            <Customers />
          </RequireAuth>
        }
      />
      <Route
        path="reports"
        element={
          <RequireAuth>
            <Reports />
          </RequireAuth>
        }
      />
      <Route
        path="account"
        element={
          <RequireAuth>
            <Account />
          </RequireAuth>
        }
      />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <AuthProvider>
    <AppRoutes />
  </AuthProvider>
);

export default App;
