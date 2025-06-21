import React, { useState } from 'react';
import { ListItem, ListItemText, IconButton, Checkbox, Rating, Box, TextField, Button, Paper, Avatar, Typography, Chip, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';

const defaultCover = 'https://cdn.pixabay.com/photo/2016/11/29/09/32/animal-1866808_1280.jpg';

const statusColors = {
  Watching: 'primary',
  Completed: 'success',
  Dropped: 'error',
  'Plan to Watch': 'warning',
};

const statusOptions = ['Watching', 'Completed', 'Dropped', 'Plan to Watch'];

const AnimeItem = ({ anime, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(anime.title);
  const [status, setStatus] = useState(anime.status);
  const [rating, setRating] = useState(anime.rating);
  const [coverUrl, setCoverUrl] = useState(anime.coverUrl || '');
  const [watched, setWatched] = useState(anime.status === 'Completed');

  const handleDelete = async () => {
    await axios.delete(`/api/anime/${anime._id}`);
    onUpdate();
  };

  const handleSave = async () => {
    await axios.put(`/api/anime/${anime._id}`, { title, status, rating, coverUrl });
    setEditing(false);
    onUpdate();
  };

  const handleWatchedToggle = async () => {
    const newStatus = watched ? 'Watching' : 'Completed';
    setWatched(!watched);
    setStatus(newStatus);
    await axios.put(`/api/anime/${anime._id}`, { title, status: newStatus, rating, coverUrl });
    onUpdate();
  };

  return (
    <Paper elevation={3} sx={{ mb: 2, p: 2, display: 'flex', alignItems: 'center', gap: 2, background: 'linear-gradient(90deg, #fbc2eb 0%, #a6c1ee 100%)', boxShadow: 6, border: '2px solid #8f94fb', opacity: 0.97 }}>
      <Checkbox checked={watched} onChange={handleWatchedToggle} />
      <Avatar
        variant="rounded"
        src={coverUrl || defaultCover}
        alt={title}
        sx={{ width: 64, height: 90, mr: 2, border: '2px solid #fff', boxShadow: 4 }}
      />
      {editing ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
          <TextField value={title} onChange={e => setTitle(e.target.value)} size="small" label="Title" />
          <TextField select value={status} onChange={e => setStatus(e.target.value)} size="small" label="Status">
            {statusOptions.map(option => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>
          <TextField value={coverUrl} onChange={e => setCoverUrl(e.target.value)} size="small" label="Cover URL" />
          <Rating value={rating} max={10} onChange={(_, v) => setRating(v)} />
        </Box>
      ) : (
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#4e54c8', textShadow: '1px 1px 6px #fff' }}>{title}</Typography>
          <Chip label={status} color={statusColors[status]} size="small" sx={{ mb: 1, mt: 1, fontWeight: 700, fontSize: 14, letterSpacing: 1 }} />
          <Typography variant="body2" sx={{ color: '#333', fontWeight: 500 }}>Rating: <b>{rating ?? 'N/A'}</b></Typography>
        </Box>
      )}
      {editing ? (
        <IconButton edge="end" onClick={handleSave} color="primary">
          <SaveIcon />
        </IconButton>
      ) : (
        <>
          <IconButton edge="end" onClick={() => setEditing(true)} color="info">
            <EditIcon />
          </IconButton>
          <IconButton edge="end" onClick={handleDelete} color="error">
            <DeleteIcon />
          </IconButton>
        </>
      )}
    </Paper>
  );
};

export default AnimeItem;
