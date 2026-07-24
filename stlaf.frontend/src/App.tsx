import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";

import DashboardPage from "./shared/pages/dashboard/DashboardPage";
import LoginPage from "./shared/pages/auth/LoginPage";

import TicketListPage from "./departments/IT/pages/tickets/TicketListPage";
import CreateTicketPage from "./departments/IT/pages/tickets/CreateTicketPage";
import TicketDetailsPage from "./departments/IT/pages/tickets/TicketDetailsPage";
import EditTicketPage from "./departments/IT/pages/tickets/EditTicketPage";
import PublicTicketPage from "./shared/pages/public/PublicTicketPage";
// import AssetListPage from "./departments/IT/pages/assets/AssetListPage";
// import UserListPage from "./shared/pages/users/UserListPage";
// import SettingsPage from "./shared/pages/settings/SettingsPage";

function App() {
  return (
    <Routes>
      {/* Redirect root */}
      <Route path="/" element={<PublicTicketPage />} />

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
      {/* PAGES */}
      {/* <Route path="/assets" element={<AssetListPage />} />
      <Route path="/users" element={<UserListPage />} />
      <Route path="/settings" element={<SettingsPage />} /> */}

      {/* 404 */}
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
