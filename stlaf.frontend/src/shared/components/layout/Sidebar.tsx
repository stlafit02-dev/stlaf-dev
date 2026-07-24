import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ConfirmationNumberRoundedIcon from "@mui/icons-material/ConfirmationNumberRounded";
import ComputerRoundedIcon from "@mui/icons-material/ComputerRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

const drawerWidth = 240;

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const toggleDrawer = () => setOpen((prev) => !prev);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const drawerContent = (
    <Box
      sx={{
        width: drawerWidth,
        height: "100%",
        bgcolor: "rgba(26,38,52,0.95)",
        backdropFilter: "blur(8px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          py: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src="/stlaf.png"
          alt="STLAF Logo"
          style={{
            width: 110,
            height: 55,
          }}
        />

        <Typography
          sx={{
            mt: 1,
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: 1,
          }}
        >
          IT HELPDESK
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,.1)" }} />

      {/* Menu */}
      <List sx={{ px: 2, py: 2, flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            sx={{
              borderRadius: 3,
              mb: 1,
              color: "#CCCCCC",
              transition: "0.2s",

              "&.active": {
                bgcolor: "rgba(204,170,73,0.2)",
                color: "#FFFFFF",
              },

              "&.active .MuiListItemIcon-root": {
                color: "#FFFFFF",
              },

              "&:hover": {
                bgcolor: "rgba(204,170,73,0.1)",
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

      <Divider sx={{ borderColor: "rgba(255,255,255,.1)" }} />

      {/* Logout */}
      <Box sx={{ p: 2 }}>
        <ListItemButton
          onClick={logout}
          sx={{
            borderRadius: 3,
            color: "#EF5350",

            "&:hover": {
              bgcolor: "rgba(239,83,80,.1)",
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: "#EF5350",
              minWidth: 42,
            }}
          >
            <LogoutRoundedIcon />
          </ListItemIcon>

          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <IconButton
          onClick={toggleDrawer}
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: theme.zIndex.drawer + 1,
            bgcolor: "#123765",
            color: "#fff",

            "&:hover": {
              bgcolor: "#0E2D52",
            },
          }}
        >
          <MenuRoundedIcon />
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? open : true}
        onClose={toggleDrawer}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            border: "none",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}