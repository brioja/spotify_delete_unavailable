import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import GetPlaylistsPage from './GetPlaylistsPage';

function App() {
    return (
         <Router basename="/spotify_delete_unavailable">
            <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/success" element={<GetPlaylistsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
