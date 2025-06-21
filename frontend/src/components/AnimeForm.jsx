import React, { useState } from 'react';
import { TextField, Button, Box, MenuItem, Rating, Paper, Typography, InputAdornment, CircularProgress } from '@mui/material';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';

const statusOptions = ['Watching', 'Completed', 'Dropped', 'Plan to Watch'];
const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const AnimeForm = ({ onSuccess, onAdd }) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('Watching');
  const [rating, setRating] = useState(0);
  const [coverUrl, setCoverUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch cover image automatically from Unsplash
  const fetchCover = async (animeTitle) => {
    if (!UNSPLASH_KEY) return;
    setImgLoading(true);
    try {
      const res = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: { query: animeTitle + ' anime', per_page: 1 },
        headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
      });
      if (res.data.results && res.data.results[0]) {
        setCoverUrl(res.data.results[0].urls.regular);
      } else {
        setCoverUrl('');
      }
    } catch {
      setCoverUrl('');
    } finally {
      setImgLoading(false);
    }
  };

  const handleTitleBlur = () => {
    if (title) fetchCover(title);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/anime', { title, status, rating, coverUrl });
      setTitle('');
      setStatus('Watching');
      setRating(0);
      setCoverUrl('');
      if (onAdd) onAdd(res.data);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add anime.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={2} sx={{ mb: 4, p: 2, background: 'linear-gradient(90deg, #fbc2eb 0%, #a6c1ee 100%)', boxShadow: 6, border: '2px solid #8f94fb', opacity: 0.97 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, fontFamily: 'monospace', letterSpacing: 1, color: '#4e54c8', textShadow: '1px 1px 6px #fff' }}>Add New Anime</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          label="Anime Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleTitleBlur}
          required
          sx={{ flex: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {imgLoading ? <CircularProgress size={18} /> : <SearchIcon />}
              </InputAdornment>
            ),
          }}
        />
        <TextField
          select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          sx={{ flex: 1 }}
        >
          {statusOptions.map((option) => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
        </TextField>
        <Rating
          name="rating"
          value={rating}
          onChange={(_, newValue) => setRating(newValue)}
          max={10}
        />
        <TextField
          label="Cover Image URL"
          value={coverUrl}
          onChange={(e) => setCoverUrl(e.target.value)}
          sx={{ flex: 2 }}
          placeholder="https://..."
        />
        <Button type="submit" variant="contained" disabled={loading} sx={{ flex: 1, minWidth: 100, background: 'linear-gradient(90deg,#8f94fb,#4e54c8)', color: '#fff', fontWeight: 700 }}>
          Add
        </Button>
      </Box>
      {error && <Box sx={{ color: 'red', width: '100%', mt: 1 }}>{error}</Box>}
    </Paper>
  );
};

export default AnimeForm;
