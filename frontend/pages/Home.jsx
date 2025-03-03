import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

    return (
      <Container maxWidth="xs">

        <Typography variant="h4" component="h1">
          Welcome to NotesApp
        </Typography>
        <Typography variant="body1">
          To use this application, please sign in to access your notes.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {

            navigate('/login');
          }}
          sx={{ mt: 3 }}
        >
          Sign In
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {

            navigate('/register');
          }}
          sx={{ mt: 3, ml: 10 }}
        >
          Register
        </Button>
      </Container>
    );
  };
  
  export default Home;