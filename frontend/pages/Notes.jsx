

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
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
  Chip,
  FormControlLabel,
  Switch
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Autocomplete from "@mui/material/Autocomplete";

const Notes = () => {
  const { user, token } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState({ title: "", content: "", tags: [], archived: false });
  const [editingId, setEditingId] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const [selectedFilterTags, setSelectedFilterTags] = useState([]);
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    if (!token || !user) return;

    const fetchNotes = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/v1/note/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error retrieving notes:", error);
      }
    };

    const fetchTags = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/tag", {
          headers: { 
            Authorization: `Bearer ${token}` 
          }
        });
        setAllTags(res.data);
      } catch (error) {
        console.error("Error retrieving tags:", error);
      }
    };

    fetchNotes();
    fetchTags();
  }, [token, user]);

  const handleOpen = (currentNote = { title: "", content: "", tags: [], archived: false }, id = null) => {
    setNote(currentNote);
    setEditingId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNote({ title: "", content: "", tags: [], archived: false });
    setEditingId(null);
  };

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!token || !user) return;

    try {
      const noteData = {
        title: note.title,
        content: note.content,
        archived: note.archived,
        tags: note.tags.map(tag => ({ id: tag.id }))
      };

      let response;
      if (editingId) {
        response = await axios.put(`http://localhost:8080/api/v1/note/${editingId}`, noteData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        response = await axios.post("http://localhost:8080/api/v1/note", noteData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setNotes(prev => editingId 
        ? prev.map(n => n.id === editingId ? response.data : n) 
        : [...prev, response.data]);
      
      handleClose();
    } catch (error) {
      console.error("Error at saving note:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!token) return;

    try {
      await axios.delete(`http://localhost:8080/api/v1/note/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(prev => prev.filter(note => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const filteredNotes = notes.filter(note => {
    const matchesArchived = note.archived === showArchived;
    const matchesTags = selectedFilterTags.length === 0 || 
      selectedFilterTags.every(tag => 
        note.tags.some(noteTag => noteTag.id === tag.id)
      );
    return matchesArchived && matchesTags;
  });

  if (!token) {
    return (
      <Container>
        <Typography variant="h5" sx={{ mt: 4 }}>
          You must log in to see the notes.
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Typography variant="h4">My Notes</Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Add Note
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button 
          variant={!showArchived ? "contained" : "outlined"}
          onClick={() => setShowArchived(false)}
        >
          Active
        </Button>
        <Button
          variant={showArchived ? "contained" : "outlined"}
          onClick={() => setShowArchived(true)}
        >
          Archived
        </Button>
        
        <Autocomplete
          multiple
          options={allTags}
          getOptionLabel={(option) => option.name}
          value={selectedFilterTags}
          onChange={(_, newValue) => setSelectedFilterTags(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Filter by tags"
              placeholder="Select tags"
            />
          )}
          sx={{ width: 300 }}
        />
      </Box>

      <List>
  {filteredNotes.map((note) => (
    <ListItem 
      key={note.id}
      secondaryAction={
        <>
          <IconButton edge="end" onClick={() => handleOpen(note, note.id)}>
            <EditIcon />
          </IconButton>
          <IconButton edge="end" onClick={() => handleDelete(note.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      }
    >
      <ListItemText
        primary={note.title}
        secondary={
          <>
            <Typography 
              component="span" 
              variant="body2" 
              display="block" 
              color="text.secondary"
            >
              {note.content}
            </Typography>
            <Box 
              component="span"
              sx={{ 
                display: 'inline-flex', 
                gap: 1, 
                mt: 1, 
                flexWrap: 'wrap' 
              }}
            >
              {note.tags?.map(tag => (
                <Chip 
                  label={tag.name}
                  size="small"
                  key={tag.id}
                  color="primary"
                  variant="outlined"
                  component="span"
                />
              ))}
            </Box>
          </>
        }
        secondaryTypographyProps={{
          component: "div",
          variant: "body2",
          color: "text.secondary"
        }}
      />
    </ListItem>
  ))}
</List>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>{editingId ? "Edit Note" : "New Note"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Title"
            name="title"
            value={note.title}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Content"
            name="content"
            multiline
            rows={4}
            value={note.content}
            onChange={handleChange}
          />
          
          <Autocomplete
            multiple
            options={allTags}
            getOptionLabel={(option) => option.name}
            value={note.tags}
            onChange={(_, newValue) => setNote({ ...note, tags: newValue })}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tags"
                placeholder="Select tags"
                margin="normal"
              />
            )}
          />
          
          <FormControlLabel
            control={
              <Switch
                checked={note.archived}
                onChange={(e) => setNote({ ...note, archived: e.target.checked })}
              />
            }
            label="Archived"
            sx={{ mt: 2 }}
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

export default Notes;