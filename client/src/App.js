import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WantToHire from './LandingPage/WantToHire';
import WantToWork from './LandingPage/WantToWork';
import LoginUi from './LoginPage/LoginUi';
import SignupUi from './SignupPage/SignupUi';
import ContactPage from './LandingPage/contact_page';
import ProfilePage from './ProfilePage/ProfilePage';
import AddJobSeeker from './Components/AddJobSeeker';
import ListJobSeeker from './Components/ListJobSeeker';
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
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/add-jobseeker" element={<AddJobSeeker />} />
        <Route path="/list-jobseekers" element={<ListJobSeeker />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;