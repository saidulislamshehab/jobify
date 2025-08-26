import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WantToHire from './LandingPage/WantToHire';
import WantToWork from './LandingPage/WantToWork';
import LoginUi from './LoginPage/LoginUi';
import SignupUi from './SignupPage/SignupUi';
import ContactPage from './LandingPage/contact_page';
import Dashboard from './Dashboard/dashboard';
import AddJobSeeker from './SignupPage/AddJobSeeker';
import ListJobSeeker from './Components/ListJobSeeker';
import ClientSignup from './SignupPage/clientsignup';
import './LandingPage/WantToHire.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WantToHire />} />
        <Route path="/work" element={<WantToWork />} />
        <Route path="/login" element={<LoginUi />} />
        <Route path="/signup" element={<SignupUi />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/profile" element={<Dashboard />} />
        <Route path="/add-jobseeker" element={<AddJobSeeker />} />
        <Route path="/list-jobseekers" element={<ListJobSeeker />} />
        <Route path="/clientsignup" element={<ClientSignup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;