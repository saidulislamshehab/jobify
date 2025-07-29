import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WantToHire from './LandingPage/WantToHire';
import WantToWork from './LandingPage/WantToWork';
import LoginUi from './LoginPage/LoginUi';
import ContactPage from './LandingPage/contact_page';
import './LandingPage/WantToHire.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WantToHire />} />
        <Route path="/work" element={<WantToWork />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;