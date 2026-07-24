import { useState, useContext } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { login } from "../../api/authApi";
import { AuthContext } from "../../contexts/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();

  const { login: saveToken } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    try {
      setLoading(true);

      const result = await login({
        email,
        password,
      });

      saveToken(result.token);

      navigate("/dashboard");
    } catch {
      alert("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#F5F7FA"
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          width: 420,
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={4}
          textAlign="center"
        >
          STLAF
        </Typography>

        <TextField
          label="Company Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            bgcolor: "#1A2634",
          }}
          onClick={handleLogin}
          disabled={loading}
        >
          Sign In
        </Button>
      </Paper>
    </Box>
  );
}