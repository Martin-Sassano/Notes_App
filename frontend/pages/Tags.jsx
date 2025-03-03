import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Tags = () => {
  const { user, token } = useContext(AuthContext);
  const [tags, setTags] = useState([]);
  const [open, setOpen] = useState(false);
  const [tag, setTag] = useState({ name: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (!token || !user) return;


    const fetchTags = async () => {
        try {
          const res = await axios.get("http://localhost:8080/api/v1/tag", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setTags(Array.isArray(res.data) ? res.data : []); 
        } catch (error) {
          console.error("Error retrieving tags:", error);
          setTags([]); 
        }
      };

    fetchTags();
  }, [token, user]);

  const handleOpen = (currentTag = { name: "" }, id = null) => {
    setTag(currentTag);
    setEditingId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTag({ name: "" });
    setEditingId(null);
  };

  const handleChange = (e) => {
    setTag({ ...tag, [e.target.name]: e.target.value });
  };



const handleSubmit = async () => {
    if (!token || !user) return;
  
    try {
      const newTag = { name: tag.name, userId: user.id }; 
  
      if (editingId) {
        await axios.put(`http://localhost:8080/api/v1/tag/${editingId}`, newTag, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTags((prev) =>
          prev.map((t) => (t.id === editingId ? { ...t, ...newTag } : t))
        );
      } else {
        const response = await axios.post("http://localhost:8080/api/v1/tag", newTag, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTags((prev) => [...prev, response.data]);
      }
  
      handleClose();
    } catch (error) {
      console.error("Error at saving tag:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!token) return;

    try {
      await axios.delete(`http://localhost:8080/api/v1/tag/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTags((prev) => prev.filter((tag) => tag.id !== id));
    } catch (error) {
      console.error("Error deleting tag:", error);
    }
  };

  if (!token) {
    return (
      <Container>
        <Typography variant="h5" sx={{ mt: 4 }}>
          You must log in to see the tags.
        </Typography>
        <Button
          component={Link}
          to="/login"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Go to Login
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Typography variant="h4">My Tags</Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Add Tag
        </Button>
      </Box>

      <List>
        {tags.map((tag) => (
          <ListItem
            key={tag.id}
            secondaryAction={
              <>
                <IconButton
                  edge="end"
                  onClick={() => handleOpen(tag, tag.id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => handleDelete(tag.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={tag.name} />
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingId ? "Edit Tag" : "New Tag"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={tag.name}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Tags;