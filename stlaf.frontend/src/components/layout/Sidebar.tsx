import {
  Box,
  Typography,
  Avatar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ConfirmationNumberRoundedIcon from "@mui/icons-material/ConfirmationNumberRounded";
import ComputerRoundedIcon from "@mui/icons-material/ComputerRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import { NavLink, useNavigate } from "react-router-dom";

const menuItems = [
  {
    text: "Dashboard",
    icon: <DashboardRoundedIcon />,
    path: "/dashboard",
  },
  {
    text: "Tickets",
    icon: <ConfirmationNumberRoundedIcon />,
    path: "/tickets",
  },
  {
    text: "IT Assets",
    icon: <ComputerRoundedIcon />,
    path: "/assets",
  },
  {
    text: "Users",
    icon: <GroupRoundedIcon />,
    path: "/users",
  },
  {
    text: "Settings",
    icon: <SettingsRoundedIcon />,
    path: "/settings",
  },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box
      sx={{
        width: 350,
        height: "100vh",
        bgcolor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #ECECEC",
        boxShadow: "4px 0 20px rgba(0,0,0,.05)",
      }}
    >
      {/* Logo */}
      <Box sx={{ p: 3 }}>
        <Typography
          variant="h5"
          fontWeight={800}
          color="#123765"
        >
          STLAF
        </Typography>
      </Box>

      {/* User */}
      <Box
        sx={{
          mx: 2,
          mb: 3,
          p: 2,
          borderRadius: 3,
          bgcolor: "#F7F8FA",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Avatar sx={{ bgcolor: "#123765" }}>
          A
        </Avatar>

        <Box>
          <Typography fontWeight={700}>
            Administrator
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            IT Administrator
          </Typography>
        </Box>
      </Box>

      <List sx={{ px: 2, flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            sx={{
              borderRadius: 3,
              mb: 1,

              color: "#5F6B7A",

              "&.active": {
                bgcolor: "#EAF3FF",
                color: "#1565C0",
                fontWeight: 200,
              },

              "&.active .MuiListItemIcon-root": {
                color: "#1565C0",
              },

              "&:hover": {
                bgcolor: "#F5F8FC",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "inherit",
                minWidth: 42,
              }}
            >
              {item.icon}
            </ListItemIcon>

            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>

      <Divider />

      <Box p={2}>
        <ListItemButton
          onClick={logout}
          sx={{
            borderRadius: 1,
            color: "#D32F2F",

            "&:hover": {
              bgcolor: "#FFF3F3",
            },
          }}
        >
          <ListItemIcon sx={{ color: "#D32F2F" }}>
            <LogoutRoundedIcon />
          </ListItemIcon>

          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Box>
  );
}