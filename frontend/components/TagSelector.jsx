import { Autocomplete, TextField, Chip } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

const TagSelector = ({ selectedTags, setSelectedTags }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/tag');
        setTags(response.data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };
    fetchTags();
  }, []);

  return (
    <Autocomplete
      multiple
      options={tags}
      getOptionLabel={(option) => option.name}
      value={selectedTags}
      onChange={(_, newValue) => setSelectedTags(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Tags"
          placeholder="Select tags"
        />
      )}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            label={option.name}
            {...getTagProps({ index })}
            key={option.id}
          />
        ))
      }
    />
  );
};

export default TagSelector;