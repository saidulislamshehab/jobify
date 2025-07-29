import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WantToHire from './LandingPage/WantToHire';
import WantToWork from './LandingPage/WantToWork';
import LoginUi from './LoginPage/LoginUi';
import './LandingPage/WantToHire.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WantToHire />} />
        <Route path="/work" element={<WantToWork />} />
        <Route path="/login" element={<LoginUi />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;