import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Box, AppBar, Toolbar, Avatar, Tabs, Tab, Button, Fade } from '@mui/material';
import AnimeList from '../components/AnimeList';
import AnimeForm from '../components/AnimeForm';
import axios from 'axios';

const backgroundImages = [
  'https://wallpapercave.com/wp/wp4923997.jpg',
  'https://images6.alphacoders.com/909/909604.jpg',
  'https://images8.alphacoders.com/100/1005536.jpg',
  'https://images2.alphacoders.com/582/582438.jpg',
  'https://images.alphacoders.com/120/1206531.jpg',
  'https://images3.alphacoders.com/100/1006617.jpg',
  'https://images4.alphacoders.com/100/1006632.jpg',
  'https://images5.alphacoders.com/100/1006637.jpg',
  'https://images7.alphacoders.com/100/1006642.jpg',
  'https://images8.alphacoders.com/100/1006647.jpg',
];
const bannerUrl = 'https://uchi.imgix.net/properties/anime2.png?crop=focalpoint&domain=uchi.imgix.net&fit=crop&fm=pjpg&fp-x=0.5&fp-y=0.5&h=558&ixlib=php-3.3.1&q=82&usm=20&w=992'; // One Piece anime banner
const logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Anime_eye.svg';
const pageBg = 'https://img.etimg.com/thumb/width-1600,height-900,imgsize-2581504,resizemode-75,msid-106644690/news/international/us/one-piece-anime-how-many-seasons-are-there-on-netflix.jpg'; // One Piece background

const menuTabs = [
  { label: 'My List', value: 0 },
  { label: 'Discover', value: 1 },
  { label: 'Stats', value: 2 },
];

const Home = () => {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(0);

  const fetchAnime = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/anime');
      setAnime(res.data);
    } catch (err) {
      // Optionally handle error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnime();
  }, [fetchAnime]);

  const handleAddAnime = (newAnime) => {
    setAnime((prev) => [newAnime, ...prev]);
  };

  // Discover: show trending anime from Jikan API (MyAnimeList)
  const [discover, setDiscover] = useState([]);
  const [discoverLoading, setDiscoverLoading] = useState(false);
  const [discoverPage, setDiscoverPage] = useState(1);
  useEffect(() => {
    if (tab === 1) {
      setDiscoverLoading(true);
      fetch(`https://api.jikan.moe/v4/top/anime?limit=10&page=${discoverPage}`)
        .then(res => res.json())
        .then(data => setDiscover(data.data || []))
        .finally(() => setDiscoverLoading(false));
    }
  }, [tab, discoverPage]);

  // Add anime from Discover to checklist
  const handleAddFromDiscover = async (animeObj) => {
    const animeToAdd = {
      title: animeObj.title,
      status: 'Plan to Watch',
      rating: animeObj.score || 0,
      coverUrl: animeObj.images?.jpg?.large_image_url || '',
    };
    try {
      const res = await axios.post('/api/anime', animeToAdd);
      setAnime((prev) => [res.data, ...prev]);
      setTab(0); // Switch to My List after adding
    } catch (err) {
      // Optionally show error
    }
  };

  // Stats: calculate stats from anime list
  const stats = {
    total: anime.length,
    completed: anime.filter(a => a.status === 'Completed').length,
    watching: anime.filter(a => a.status === 'Watching').length,
    dropped: anime.filter(a => a.status === 'Dropped').length,
    plan: anime.filter(a => a.status === 'Plan to Watch').length,
    avgRating: anime.length ? (anime.reduce((sum, a) => sum + (a.rating || 0), 0) / anime.length).toFixed(2) : 0,
  };

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative' }}>
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        background: `url(${pageBg}) center/cover no-repeat fixed`,
        opacity: 0.25,
      }} />
      <AppBar position="static" sx={{ background: 'linear-gradient(90deg, #8f94fb 0%, #4e54c8 100%)', boxShadow: 6, opacity: 0.98 }}>
        <Toolbar>
          <Avatar src={logoUrl} alt="Anime Logo" sx={{ mr: 2, width: 48, height: 48, boxShadow: 3 }} />
          <Typography variant="h4" sx={{ flexGrow: 1, fontWeight: 900, letterSpacing: 2, fontFamily: 'monospace', color: '#fff', textShadow: '2px 2px 8px #4e54c8' }}>
            Anime Checklist
          </Typography>
          <Button color="inherit" sx={{ fontWeight: 700, fontSize: 16, background: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>Login</Button>
        </Toolbar>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} centered textColor="inherit" indicatorColor="secondary" sx={{ background: 'rgba(255,255,255,0.10)', fontWeight: 700 }}>
          {menuTabs.map((t) => <Tab key={t.value} label={t.label} />)}
        </Tabs>
      </AppBar>
      <Box
        sx={{
          width: '100vw',
          height: 260,
          backgroundImage: `url(${bannerUrl})`,
          backgroundSize: 'fill',
          backgroundPosition: 'center',
          borderRadius: 0,
          mb: 4,
          boxShadow: 8,
          opacity: 0.97,
        }}
      />
      <Container maxWidth={false} disableGutters sx={{ mt: -8, mb: 4, background: 'rgba(255,255,255,0.92)', borderRadius: 4, boxShadow: 4, p: 4, width: '98vw', maxWidth: '1600px !important', minWidth: '320px', backdropFilter: 'blur(2px)' }}>
        {tab === 0 && <>
          <AnimeForm onSuccess={fetchAnime} onAdd={handleAddAnime} />
          <AnimeList anime={anime} loading={loading} onUpdate={fetchAnime} />
        </>}
        {tab === 1 && (
          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, fontFamily: 'monospace' }}>Trending Anime</Typography>
            {discoverLoading ? <Fade in><Box sx={{ textAlign: 'center', mt: 4 }}><img src="https://i.gifer.com/ZZ5H.gif" alt="Loading..." width={80} /></Box></Fade> :
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
                {discover.map(anime => (
                  <Box key={anime.mal_id} sx={{ width: 220, p: 2, borderRadius: 3, boxShadow: 2, background: 'linear-gradient(120deg,#fbc2eb 0%,#a6c1ee 100%)', textAlign: 'center', position: 'relative' }}>
                    <img src={anime.images.jpg.large_image_url} alt={anime.title} style={{ width: '100%', borderRadius: 8, marginBottom: 8, boxShadow: '0 4px 16px #a6c1ee55' }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{anime.title}</Typography>
                    <Typography variant="body2">Score: {anime.score || 'N/A'}</Typography>
                    <Button variant="contained" size="small" sx={{ mt: 1, fontWeight: 700, background: 'linear-gradient(90deg,#8f94fb,#4e54c8)', color: '#fff' }} onClick={() => handleAddFromDiscover(anime)}>
                      + Add to Checklist
                    </Button>
                  </Box>
                ))}
              </Box>}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button variant="outlined" onClick={() => setDiscoverPage(p => p + 1)} sx={{ fontWeight: 700, fontSize: 16, background: 'linear-gradient(90deg,#fbc2eb,#a6c1ee)', color: '#333' }}>Next</Button>
            </Box>
          </Box>
        )}
        {tab === 2 && (
          <Box sx={{ textAlign: 'center', p: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, fontFamily: 'monospace' }}>My Anime Stats</Typography>
            <Typography>Total: <b>{stats.total}</b></Typography>
            <Typography>Completed: <b>{stats.completed}</b></Typography>
            <Typography>Watching: <b>{stats.watching}</b></Typography>
            <Typography>Dropped: <b>{stats.dropped}</b></Typography>
            <Typography>Plan to Watch: <b>{stats.plan}</b></Typography>
            <Typography>Average Rating: <b>{stats.avgRating}</b></Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Home;
