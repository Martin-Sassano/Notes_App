
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Box,
  Snackbar,
  Alert
} from "@mui/material";

const Register = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [openSuccess, setOpenSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/register", credentials);
      setOpenSuccess(true);
      setTimeout(() => navigate("/login"), 3000); 
    } catch (error) {
      alert("Error at sign up: " + (error.response?.data?.message || "Try again"));
    } 
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ 
        mt: 8, 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center",
        gap: 2
      }}>
        <Typography variant="h5" component="h1">
          Sign Up
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
          
          <Button
  fullWidth
  variant="contained"
  color="primary"
  type="submit"
  sx={{ mt: 2, mb: 2 }}
>
  Sign Up
</Button>
</form>
<Box sx={{
  position: 'absolute',
  top: 'calc(50% + 100px)', 
  left: '50%',
  transform: 'translateX(-50%)', 
  width: '500px', 
  maxWidth: '90%', 
}}>
  <Snackbar
    open={openSuccess}
    autoHideDuration={3000}
    onClose={() => setOpenSuccess(false)}
  >
    <Alert 
      severity="success" 
      sx={{
        width: '100%',
        fontSize: '1.2rem', 
        padding: '20px', 
        whiteSpace: 'normal', 
        wordWrap: 'break-word', 
      }}
    >
      ¡Successfully registered! Redirecting to login...
    </Alert>
  </Snackbar>
</Box>
      </Box>
    </Container>
  );
};

export default Register;

