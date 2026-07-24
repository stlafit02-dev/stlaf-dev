import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
} from "@mui/material";

export default function Topbar() {
  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={1}
    >
      <Toolbar>

        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
        >
          STLAF Internal System
        </Typography>

        <Box display="flex" gap={2}>
          <Avatar>U</Avatar>
        </Box>

      </Toolbar>
    </AppBar>
  );
}