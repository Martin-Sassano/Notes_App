

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Box,
  CircularProgress,
  Alert 
} from "@mui/material";

const Login = () => {
  const [credentials, setCredentials] = useState({ 
    username: "", 
    password: "" 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await login(credentials.username, credentials.password);
      navigate("/notes"); 
    } catch (error) {
      setError("Invalid credentials or connection error");
      console.error("Error in login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box 
        sx={{ 
          mt: 8, 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center",
          gap: 2
        }}
      >
        <Typography variant="h4" component="h1">
          Sign in
        </Typography>
        
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField 
            fullWidth
            margin="normal"
            label="Username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
            autoFocus
          />
          
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          
          <Button 
            fullWidth 
            variant="contained" 
            color="primary" 
            type="submit"
            disabled={loading}
            sx={{ mt: 3 }}
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;