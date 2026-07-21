import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";

export default function AdminLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#F5F7FA",
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Page Content */}
      <Box
        sx={{
          flex: 1,
          p: 3,
          overflow: "auto",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}