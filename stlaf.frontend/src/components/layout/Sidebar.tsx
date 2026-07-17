import {
  Drawer,
  Toolbar,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import ComputerIcon from "@mui/icons-material/Computer";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";

const drawerWidth = 260;

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          bgcolor: "#1A2634",
          color: "#fff",
        },
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          fontWeight="bold"
        >
          STLAF
        </Typography>
      </Toolbar>

      <List>

        <ListItemButton>
          <ListItemIcon sx={{ color: "white" }}>
            <DashboardIcon />
          </ListItemIcon>

          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon sx={{ color: "white" }}>
            <ConfirmationNumberIcon />
          </ListItemIcon>

          <ListItemText primary="Ticketing" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon sx={{ color: "white" }}>
            <ComputerIcon />
          </ListItemIcon>

          <ListItemText primary="IT Assets" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon sx={{ color: "white" }}>
            <PeopleIcon />
          </ListItemIcon>

          <ListItemText primary="Users" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon sx={{ color: "white" }}>
            <SettingsIcon />
          </ListItemIcon>

          <ListItemText primary="Settings" />
        </ListItemButton>

      </List>
    </Drawer>
  );
}