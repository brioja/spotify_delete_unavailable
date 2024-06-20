import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import GetPlaylistsPage from './GetPlaylistsPage';
import DeleteUnavailableTracksInPlaylist from './DeleteUnavailableTracksInPlaylist';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/spotify_delete_unavailable" element={<LoginPage />} />
        <Route path="/get_playlists" element={<GetPlaylistsPage />} />
        <Route path="/delete/:id" element={<DeleteUnavailableTracksInPlaylist />} />
      </Routes>
    </Router>
  );
};

export default App;
