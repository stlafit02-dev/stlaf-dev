import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";

import DashboardPage from "./pages/dashboard/DashboardPage";
import LoginPage from "./pages/auth/LoginPage";

import TicketListPage from "./pages/tickets/TicketListPage";
import CreateTicketPage from "./pages/tickets/CreateTicketPage";
import TicketDetailsPage from "./pages/tickets/TicketDetailsPage";
import EditTicketPage from "./pages/tickets/EditTicketPage";

function App() {
  return (
    <Routes>
      {/* Redirect root */}
      <Route
        path="/"
        element={<Navigate to="/dashboard" replace />}
      />

      {/* Login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Tickets */}
        <Route path="/tickets" element={<TicketListPage />} />
        <Route path="/tickets/new" element={<CreateTicketPage />} />
        <Route path="/tickets/:id" element={<TicketDetailsPage />} />
        <Route path="/tickets/:id/edit" element={<EditTicketPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default App;