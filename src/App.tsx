import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import RedirectPage from './RedirectPage';

function App() {
    return (
         <Router basename="/spotify_delete_unavailable">
            <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/redirect" element={<RedirectPage />} />
      </Routes>
    </Router>
  );
}

export default App;
