import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import SuccessPage from './SuccessPage';

function App() {
    return (
         <Router basename="/spotify_delete_unavailable">
            <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
}

export default App;
