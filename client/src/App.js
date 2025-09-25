import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import WantToHire from './LandingPage/WantToHire';
import WantToWork from './LandingPage/WantToWork';
import LoginUi from './LoginPage/LoginUi';
import SignupUi from './SignupPage/SignupUi';
import ContactPage from './LandingPage/contact_page';
import Dashboard from './Dashboard/dashboard';
import MyFinances from './Dashboard/MyFinances/myfinances';
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
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<WantToHire />} />
          <Route path="/work" element={<WantToWork />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Auth routes (redirect to dashboard if already logged in) */}
          <Route 
            path="/login" 
            element={
              <ProtectedRoute requireAuth={false}>
                <LoginUi />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/signup" 
            element={
              <ProtectedRoute requireAuth={false}>
                <SignupUi />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/add-jobseeker" 
            element={
              <ProtectedRoute requireAuth={false}>
                <AddJobSeeker />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/clientsignup" 
            element={
              <ProtectedRoute requireAuth={false}>
                <ClientSignup />
              </ProtectedRoute>
            } 
          />
          
          {/* Protected routes (require authentication) */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/my-finances" 
            element={
              <ProtectedRoute>
                <MyFinances />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <FreelancerProfile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/client-profile" 
            element={
              <ProtectedRoute>
                <ClientProfile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/add-project" 
            element={
              <ProtectedRoute>
                <AddProject />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/project-description" 
            element={
              <ProtectedRoute>
                <ProjectDescription />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/project-review" 
            element={
              <ProtectedRoute>
                <ProjectReview />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/my-projects" 
            element={
              <ProtectedRoute>
                <MyProjects />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/find-freelancers" 
            element={
              <ProtectedRoute>
                <FindFreelancers />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/find-work" 
            element={
              <ProtectedRoute>
                <FindWork />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;