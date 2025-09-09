import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WantToHire from './LandingPage/WantToHire';
import WantToWork from './LandingPage/WantToWork';
import LoginUi from './LoginPage/LoginUi';
import SignupUi from './SignupPage/SignupUi';
import ContactPage from './LandingPage/contact_page';
import Dashboard from './Dashboard/dashboard';
import AddJobSeeker from './SignupPage/AddJobSeeker';
import ClientSignup from './SignupPage/clientsignup';
import FreelancerProfile from './Dashboard/freelancerProfile/freelancerProfile';
import ClientProfile from './Dashboard/clientProfile/clientProfile';
import AddProject from './Dashboard/clientProfile/addProject';
import ProjectDescription from './Dashboard/clientProfile/projectDescription';
import ProjectReview from './Dashboard/clientProfile/projectReview';
import MyProjects from './Dashboard/clientProfile/myProjects';
import FindFreelancers from './Dashboard/FindFreelancers/findfreelancer';
import FindWork from './Dashboard/FindWork/findwork';
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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-jobseeker" element={<AddJobSeeker />} />
        <Route path="/clientsignup" element={<ClientSignup />} />
        <Route path="/profile" element={<FreelancerProfile />} />
        <Route path="/client-profile" element={<ClientProfile />} />
        <Route path="/add-project" element={<AddProject />} />
        <Route path="/project-description" element={<ProjectDescription />} />
        <Route path="/project-review" element={<ProjectReview />} />
        <Route path="/my-projects" element={<MyProjects />} />
        <Route path="/find-freelancers" element={<FindFreelancers />} />
        <Route path="/find-work" element={<FindWork />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;