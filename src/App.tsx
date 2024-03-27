import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import RedirectPage from './RedirectPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/redirect" element={<RedirectPage />} />
      </Routes>
    </Router>
  );
}

export default App;
