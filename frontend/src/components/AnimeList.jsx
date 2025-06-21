import React from 'react';
import { List, Typography, CircularProgress, Box, Fade } from '@mui/material';
import AnimeItem from './AnimeItem';

const AnimeList = ({ anime, loading, onUpdate }) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!anime || anime.length === 0) {
    return <Typography align="center">No anime in your checklist yet.</Typography>;
  }

  return (
    <List sx={{ width: '100%', bgcolor: 'transparent' }}>
      {anime.map((item, idx) => (
        <Fade in timeout={500 + idx * 100} key={item._id}>
          <div>
            <AnimeItem anime={item} onUpdate={onUpdate} />
          </div>
        </Fade>
      ))}
    </List>
  );
};

export default AnimeList;
