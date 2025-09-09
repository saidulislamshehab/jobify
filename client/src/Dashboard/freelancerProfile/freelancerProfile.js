import React, { useState, useEffect } from 'react';
import './freelancerProfile.css';
import Footer from '../../LandingPage/footer';
import DashboardNav from '../DashboardNav';
import pencilIcon from '../pencil.png';

const FreelancerProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('freelancer');
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [newSkillExperience, setNewSkillExperience] = useState('1 year');
  const [saving, setSaving] = useState(false);
  const [profileCompleteness, setProfileCompleteness] = useState(68);
  const [isEditingAboutMe, setIsEditingAboutMe] = useState(false);
  const [aboutMeText, setAboutMeText] = useState('');
  const [savingAboutMe, setSavingAboutMe] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', githubLink: '', description: '' });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileEditData, setProfileEditData] = useState({
    name: '',
    jobTitle: '',
    country: '',
    hourlyRate: '',
    profilePhoto: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [isEditingExperience, setIsEditingExperience] = useState(false);
  const [isEditingEducation, setIsEditingEducation] = useState(false);
  const [isEditingLanguages, setIsEditingLanguages] = useState(false);
  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
    current: false
  });
  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    description: ''
  });
  const [newLanguage, setNewLanguage] = useState({
    language: '',
    proficiency: 'Intermediate'
  });

  useEffect(() => {
    // Get user data from localStorage or sessionStorage
    const getUserData = async () => {
      try {
        const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          console.log('User data loaded:', parsedUser);
          setUser(parsedUser);
          
          // Initialize skills from user data
          if (parsedUser.skills && Array.isArray(parsedUser.skills)) {
            setSkills(parsedUser.skills.map(skill => ({
              name: skill,
              experience: '1 year',
              certifications: '-',
              projects: '-'
            })));
          }
          
          // Initialize about me text
          if (parsedUser.freelancerAboutMe) {
            setAboutMeText(parsedUser.freelancerAboutMe);
          } else if (parsedUser.clientAboutMe) {
            setAboutMeText(parsedUser.clientAboutMe);
          }
          
          // Note: Experience, education, and languages are now loaded from MongoDB below
          
          // Load projects from database
          const userId = parsedUser._id || parsedUser.id;
          if (userId) {
            try {
              console.log('Fetching user data from MongoDB for user ID:', userId);
              
              // First, try to migrate user data if needed
              try {
                const migrateResponse = await fetch(`http://localhost:5000/api/jobseekers/migrate-user-data/${userId}`, {
                  method: 'PUT'
                });
                if (migrateResponse.ok) {
                  console.log('User data migration completed');
                }
              } catch (migrateError) {
                console.log('Migration failed or not needed:', migrateError);
              }
              
              const response = await fetch(`http://localhost:5000/api/jobseekers/${userId}`);
              console.log('Response status:', response.status);
              
              if (response.ok) {
                const userDataFromDB = await response.json();
                console.log('User data from DB:', userDataFromDB);
                console.log('Experience from DB:', userDataFromDB.experience);
                console.log('Education from DB:', userDataFromDB.education);
                console.log('Languages from DB:', userDataFromDB.languages);
                
                // Load GitHub projects
                if (userDataFromDB.githubProjects && Array.isArray(userDataFromDB.githubProjects)) {
                  // Add unique IDs to projects for local state management
                  const projectsWithIds = userDataFromDB.githubProjects.map((project, index) => ({
                    ...project,
                    id: project._id || `project_${Date.now()}_${index}`
                  }));
                  setProjects(projectsWithIds);
                  console.log('Projects loaded from DB:', projectsWithIds);
                }
                
                // Load experience data
                if (userDataFromDB.experience && Array.isArray(userDataFromDB.experience) && userDataFromDB.experience.length > 0) {
                  const experienceWithIds = userDataFromDB.experience.map((exp, index) => ({
                    ...exp,
                    id: exp._id || `exp_${Date.now()}_${index}`
                  }));
                  setExperience(experienceWithIds);
                  console.log('Experience loaded from DB:', experienceWithIds);
                } else {
                  console.log('No experience data found in DB, initializing empty array');
                  setExperience([]);
                }
                
                // Load education data
                if (userDataFromDB.education && Array.isArray(userDataFromDB.education) && userDataFromDB.education.length > 0) {
                  const educationWithIds = userDataFromDB.education.map((edu, index) => ({
                    ...edu,
                    id: edu._id || `edu_${Date.now()}_${index}`
                  }));
                  setEducation(educationWithIds);
                  console.log('Education loaded from DB:', educationWithIds);
                } else {
                  console.log('No education data found in DB, initializing empty array');
                  setEducation([]);
                }
                
                // Load languages data
                if (userDataFromDB.languages && Array.isArray(userDataFromDB.languages) && userDataFromDB.languages.length > 0) {
                  const languagesWithIds = userDataFromDB.languages.map((lang, index) => ({
                    ...lang,
                    id: lang._id || `lang_${Date.now()}_${index}`
                  }));
                  setLanguages(languagesWithIds);
                  console.log('Languages loaded from DB:', languagesWithIds);
                } else {
                  console.log('No languages data found in DB, initializing with default English');
                  setLanguages([{ language: 'English', proficiency: 'Native', id: 'default_english' }]);
                }
              } else {
                console.log('Could not fetch user data from database, using local data');
                const errorText = await response.text();
                console.log('Error response:', errorText);
              }
            } catch (dbError) {
              console.log('Database fetch failed, using local data:', dbError);
              console.error('Full error:', dbError);
              // Initialize with empty arrays if DB fetch fails
              setExperience([]);
              setEducation([]);
              setLanguages([{ language: 'English', proficiency: 'Native', id: 'default_english' }]);
            }
          } else {
            // No userId, initialize with empty arrays
            console.log('No userId found, initializing with empty arrays');
            setExperience([]);
            setEducation([]);
            setLanguages([{ language: 'English', proficiency: 'Native', id: 'default_english' }]);
          }
        } else {
          console.log('No user data found, redirecting to login');
          window.location.href = '/login';
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        window.location.href = '/login';
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  const handleEditSkills = () => {
    setIsEditingSkills(true);
  };

  const handleCancelSkills = () => {
    setIsEditingSkills(false);
    setNewSkill('');
    setNewSkillExperience('1 year');
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && skills.length < 3) {
      const skillToAdd = {
        name: newSkill.trim(),
        experience: newSkillExperience,
        certifications: '-',
        projects: '-'
      };
      setSkills([...skills, skillToAdd]);
      setNewSkill('');
      setNewSkillExperience('1 year');
    }
  };

  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleUpdateSkillExperience = (index, experience) => {
    const updatedSkills = [...skills];
    updatedSkills[index].experience = experience;
    setSkills(updatedSkills);
  };

  const handleSaveSkills = async () => {
    setSaving(true);
    try {
      const skillNames = skills.map(skill => skill.name);
      const response = await fetch(`http://localhost:5000/api/jobseekers/update-skills/${user.id || user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ skills: skillNames })
      });

      if (response.ok) {
        // Update local user data
        const updatedUser = { ...user, skills: skillNames };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditingSkills(false);
        alert('Skills updated successfully!');
      } else {
        const errorData = await response.json();
        alert('Failed to update skills: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error updating skills:', error);
      alert('Network error: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEditAboutMe = () => {
    setIsEditingAboutMe(true);
  };

  const handleCancelAboutMe = () => {
    setIsEditingAboutMe(false);
    // Reset to original text
    if (user.freelancerAboutMe) {
      setAboutMeText(user.freelancerAboutMe);
    } else if (user.clientAboutMe) {
      setAboutMeText(user.clientAboutMe);
    } else {
      setAboutMeText('');
    }
  };

  const handleSaveAboutMe = async () => {
    setSavingAboutMe(true);
    try {
      const fieldToUpdate = activeTab === 'freelancer' ? 'freelancerAboutMe' : 'clientAboutMe';
      const response = await fetch(`http://localhost:5000/api/jobseekers/update-about-me/${user.id || user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          [fieldToUpdate]: aboutMeText.trim()
        })
      });

      if (response.ok) {
        // Update local user data
        const updatedUser = { 
          ...user, 
          [fieldToUpdate]: aboutMeText.trim()
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditingAboutMe(false);
        alert('About me updated successfully!');
      } else {
        const errorData = await response.json();
        alert('Failed to update about me: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error updating about me:', error);
      alert('Network error: ' + error.message);
    } finally {
      setSavingAboutMe(false);
    }
  };

  const handleAddProject = () => {
    setIsAddingProject(true);
  };

  const handleCancelAddProject = () => {
    setIsAddingProject(false);
    setNewProject({ name: '', githubLink: '', description: '' });
  };

  const handleSaveProject = async () => {
    if (newProject.name.trim() && newProject.githubLink.trim()) {
      const project = {
        name: newProject.name.trim(),
        githubLink: newProject.githubLink.trim(),
        description: newProject.description.trim()
      };
      
      const updatedProjects = [...projects, project];
      
      try {
        // Test server connection first
        const testResponse = await fetch('http://localhost:5000/api/jobseekers/test');
        if (!testResponse.ok) {
          throw new Error('Server is not responding. Please make sure the server is running on port 5000.');
        }

        // Save to MongoDB
        const userId = user._id || user.id;
        if (!userId) {
          alert('User ID not found. Please log in again.');
          return;
        }

        const response = await fetch(`http://localhost:5000/api/jobseekers/update-github-projects/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ githubProjects: updatedProjects })
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Projects update result:', result);
          
          // Update local state
          setProjects(updatedProjects);
          setNewProject({ name: '', githubLink: '', description: '' });
          setIsAddingProject(false);
          alert('Project added successfully!');
        } else {
          const errorData = await response.json();
          alert(`Error saving project: ${errorData.message || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error saving project:', error);
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
          alert('Cannot connect to server. Please make sure the server is running on port 5000.');
        } else {
          alert(`Error saving project: ${error.message}`);
        }
      }
    } else {
      alert('Please fill in project name and GitHub link');
    }
  };

  const handleRemoveProject = async (projectId) => {
    const updatedProjects = projects.filter(project => project.id !== projectId);
    
    try {
      // Test server connection first
      const testResponse = await fetch('http://localhost:5000/api/jobseekers/test');
      if (!testResponse.ok) {
        throw new Error('Server is not responding. Please make sure the server is running on port 5000.');
      }

      // Save to MongoDB
      const userId = user._id || user.id;
      if (!userId) {
        alert('User ID not found. Please log in again.');
        return;
      }

      const response = await fetch(`http://localhost:5000/api/jobseekers/update-github-projects/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ githubProjects: updatedProjects })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Projects update result:', result);
        
        // Update local state
        setProjects(updatedProjects);
        alert('Project removed successfully!');
      } else {
        const errorData = await response.json();
        alert(`Error removing project: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error removing project:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        alert('Cannot connect to server. Please make sure the server is running on port 5000.');
      } else {
        alert(`Error removing project: ${error.message}`);
      }
    }
  };

  const handleEditProfile = () => {
    setIsEditingProfile(true);
    setProfileEditData({
      name: user.name || '',
      jobTitle: user.jobTitle || '',
      country: user.country || '',
      hourlyRate: user.hourlyRate || '',
      profilePhoto: user.profilePhoto || ''
    });
  };

  const handleCancelProfileEdit = () => {
    setIsEditingProfile(false);
    setProfileEditData({
      name: '',
      jobTitle: '',
      country: '',
      hourlyRate: '',
      profilePhoto: ''
    });
  };

  const handleProfileInputChange = (field, value) => {
    setProfileEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const compressImage = (file, maxWidth = 800, quality = 0.8) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Validate file size (max 10MB before compression)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      
      setSelectedFile(file);
      
      try {
        // Compress the image
        const compressedDataUrl = await compressImage(file);
        setPreviewUrl(compressedDataUrl);
        setProfileEditData(prev => ({
          ...prev,
          profilePhoto: compressedDataUrl
        }));
      } catch (error) {
        console.error('Error compressing image:', error);
        alert('Error processing image. Please try again.');
      }
    }
  };

  const handleRemovePhoto = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setProfileEditData(prev => ({
      ...prev,
      profilePhoto: ''
    }));
  };

  const handleSaveProfile = async () => {
    setSavingProfile(true);
    try {
      const userId = user._id || user.id;
      console.log('Updating profile for user ID:', userId);
      console.log('User object:', user);
      console.log('Profile data:', profileEditData);
      
      if (!userId) {
        alert('User ID not found. Please log in again.');
        return;
      }
      
      // Test server connection first
      const testResponse = await fetch('http://localhost:5000/api/jobseekers/test');
      if (!testResponse.ok) {
        throw new Error('Server is not responding. Please make sure the server is running on port 5000.');
      }
      
      const response = await fetch(`http://localhost:5000/api/jobseekers/update-profile/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileEditData)
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.error('Non-JSON response:', textResponse);
        throw new Error(`Server returned non-JSON response: ${textResponse.substring(0, 200)}...`);
      }
      
      if (response.ok) {
        const result = await response.json();
        console.log('Update result:', result);
        
        // Update local user data
        const updatedUser = { 
          ...user, 
          ...profileEditData
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditingProfile(false);
        alert('Profile updated successfully!');
      } else {
        const errorData = await response.json();
        console.error('Update error:', errorData);
        console.error('Response status:', response.status);
        alert(`Error updating profile: ${errorData.message || `HTTP ${response.status} - ${response.statusText}`}`);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        alert('Cannot connect to server. Please make sure the server is running on port 5000.');
      } else if (error.message.includes('Server is not responding')) {
        alert(error.message);
      } else if (error.message.includes('non-JSON response')) {
        alert(error.message);
      } else {
        alert(`Error updating profile: ${error.message}`);
      }
    } finally {
      setSavingProfile(false);
    }
  };

  // Experience handlers
  const handleAddExperience = () => {
    if (newExperience.company && newExperience.position && newExperience.startDate) {
      const experienceToAdd = {
        ...newExperience,
        id: Date.now().toString()
      };
      setExperience([...experience, experienceToAdd]);
      setNewExperience({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
        current: false
      });
    }
  };

  const handleRemoveExperience = (id) => {
    setExperience(experience.filter(exp => exp.id !== id));
  };

  const handleSaveExperience = async () => {
    try {
      const userId = user._id || user.id;
      console.log('Saving experience for user ID:', userId);
      console.log('Experience data to save:', experience);
      
      // Test server connection first
      const testResponse = await fetch('http://localhost:5000/api/jobseekers/test');
      if (!testResponse.ok) {
        throw new Error('Server is not responding. Please make sure the server is running on port 5000.');
      }
      
      // Test data sending
      const testUpdateResponse = await fetch('http://localhost:5000/api/jobseekers/test-update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ testData: experience })
      });
      
      if (testUpdateResponse.ok) {
        const testResult = await testUpdateResponse.json();
        console.log('Test update successful:', testResult);
      }
      
      const response = await fetch(`http://localhost:5000/api/jobseekers/update-experience/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ experience })
      });

      console.log('Experience update response status:', response.status);
      
      if (response.ok) {
        const result = await response.json();
        console.log('Experience update result:', result);
        const updatedUser = { ...user, experience: result.experience };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditingExperience(false);
        alert('Experience updated successfully!');
      } else {
        const errorData = await response.json();
        console.error('Experience update error:', errorData);
        alert('Failed to update experience: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error updating experience:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        alert('Cannot connect to server. Please make sure the server is running on port 5000.');
      } else {
        alert('Network error: ' + error.message);
      }
    }
  };

  // Education handlers
  const handleAddEducation = () => {
    if (newEducation.institution && newEducation.degree && newEducation.startDate) {
      const educationToAdd = {
        ...newEducation,
        id: Date.now().toString()
      };
      setEducation([...education, educationToAdd]);
      setNewEducation({
        institution: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        description: ''
      });
    }
  };

  const handleRemoveEducation = (id) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const handleSaveEducation = async () => {
    try {
      const userId = user._id || user.id;
      console.log('Saving education for user ID:', userId);
      console.log('Education data to save:', education);
      
      // Test server connection first
      const testResponse = await fetch('http://localhost:5000/api/jobseekers/test');
      if (!testResponse.ok) {
        throw new Error('Server is not responding. Please make sure the server is running on port 5000.');
      }
      
      const response = await fetch(`http://localhost:5000/api/jobseekers/update-education/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ education })
      });

      console.log('Education update response status:', response.status);
      
      if (response.ok) {
        const result = await response.json();
        console.log('Education update result:', result);
        const updatedUser = { ...user, education: result.education };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditingEducation(false);
        alert('Education updated successfully!');
      } else {
        const errorData = await response.json();
        console.error('Education update error:', errorData);
        alert('Failed to update education: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error updating education:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        alert('Cannot connect to server. Please make sure the server is running on port 5000.');
      } else {
        alert('Network error: ' + error.message);
      }
    }
  };

  // Language handlers
  const handleAddLanguage = () => {
    if (newLanguage.language) {
      const languageToAdd = {
        ...newLanguage,
        id: Date.now().toString()
      };
      setLanguages([...languages, languageToAdd]);
      setNewLanguage({
        language: '',
        proficiency: 'Intermediate'
      });
    }
  };

  const handleRemoveLanguage = (id) => {
    setLanguages(languages.filter(lang => lang.id !== id));
  };

  const handleSaveLanguages = async () => {
    try {
      const userId = user._id || user.id;
      console.log('Saving languages for user ID:', userId);
      console.log('Languages data to save:', languages);
      
      // Test server connection first
      const testResponse = await fetch('http://localhost:5000/api/jobseekers/test');
      if (!testResponse.ok) {
        throw new Error('Server is not responding. Please make sure the server is running on port 5000.');
      }
      
      const response = await fetch(`http://localhost:5000/api/jobseekers/update-languages/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ languages })
      });

      console.log('Languages update response status:', response.status);
      
      if (response.ok) {
        const result = await response.json();
        console.log('Languages update result:', result);
        const updatedUser = { ...user, languages: result.languages };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditingLanguages(false);
        alert('Languages updated successfully!');
      } else {
        const errorData = await response.json();
        console.error('Languages update error:', errorData);
        alert('Failed to update languages: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error updating languages:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        alert('Cannot connect to server. Please make sure the server is running on port 5000.');
      } else {
        alert('Network error: ' + error.message);
      }
    }
  };


  if (loading) {
    return (
      <div className="profile-page">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '18px',
          color: '#6b7280'
        }}>
          Loading...
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-page">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '18px',
          color: '#6b7280'
        }}>
          Please log in to view your profile
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* Shared Dashboard Navigation */}
      <DashboardNav user={user} />

      <div className="profile-content">
        {/* Main Content */}
        <main className="profile-main">
        {/* Profile Tabs */}
        <div className="profile-tabs">
          <button 
            className={`tab-button ${activeTab === 'freelancer' ? 'active' : ''}`}
            onClick={() => setActiveTab('freelancer')}
          >
            My Profile As Freelancer
          </button>
          <button 
            className={`tab-button ${activeTab === 'client' ? 'active' : ''}`}
            onClick={() => setActiveTab('client')}
          >
            My Profile As Client
          </button>
        </div>

          {/* Main Profile Card */}
          {activeTab === 'freelancer' ? (
            <div className="main-profile-card">
              {!isEditingProfile ? (
                <>
                  <div className="profile-photo-section">
                    <div className="profile-photo">
                      <img 
                        src={profileEditData.profilePhoto || user.profilePhoto || "/man.png"} 
                        alt="Profile" 
                      />
                      
                    </div>
                  </div>

                  <div className="profile-info-section">
                    <div className="profile-header-info">
                      <div className="profile-name-section">
                        <h1 className="profile-name">{user.name || 'SAIDUL ISLAM SHEHAB'}</h1>
                        <button className="edit-icon" onClick={handleEditProfile}>
                          <img src={pencilIcon} alt="Edit" className="edit-icon-img" />
                        </button>
                      </div>

                      <div className="profile-role">
                        <span className="role-badge">{user.jobTitle || 'Front-end Developer'}</span>
                      </div>
                    </div>

                    <div className="profile-details">
                      <div className="location-section">
                        <span className="location-text">{user.country || 'United States'}</span>
                      </div>
                    </div>

                    <div className="profile-actions">
                      <div className="hourly-rate-section">
                        <div className="rate-label">Hourly rate</div>
                        <div className="rate-value">
                          <span className="rate-dash">${user.hourlyRate || '0'}/hr</span>
                          <button className="edit-icon" onClick={handleEditProfile}>
                            <img src={pencilIcon} alt="Edit" className="edit-icon-img" />
                          </button>
                        </div>
                      </div>

                      <div className="profile-visibility">
                        <div className="visibility-option">
                          <label className="toggle-switch">
                            <input type="checkbox" />
                            <span className="slider"></span>
                          </label>
                          <span className="visibility-label">Agency Profile</span>
                        </div>
                        <div className="visibility-option">
                          <label className="toggle-switch">
                            <input type="checkbox" defaultChecked />
                            <span className="slider"></span>
                          </label>
                          <span className="visibility-label">Public Profile</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="profile-edit-form">
                  <div className="edit-form-header">
                    <h3>Edit Profile Information</h3>
                    <div className="edit-form-actions">
                      <button 
                        className="cancel-edit-btn" 
                        onClick={handleCancelProfileEdit}
                        disabled={savingProfile}
                      >
                        Cancel
                      </button>
                      <button 
                        className="save-edit-btn" 
                        onClick={handleSaveProfile}
                        disabled={savingProfile}
                      >
                        {savingProfile ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </div>

                  <div className="edit-form-content">
                    <div className="form-row">
                      <div className="form-group">
                        <label>Profile Photo</label>
                        <div className="photo-upload-container">
                          <div className="photo-preview">
                        {previewUrl ? (
                          <img src={previewUrl} alt="Preview" className="preview-image" />
                        ) : (
                          <img src="/man.png" alt="Default Profile" className="preview-image" />
                        )}
                          </div>
                          <div className="photo-upload-controls">
                            <input
                              type="file"
                              id="photo-upload"
                              accept="image/*"
                              onChange={handleFileSelect}
                              style={{ display: 'none' }}
                            />
                            <label htmlFor="photo-upload" className="upload-btn">
                              Choose Photo
                            </label>
                            {previewUrl && (
                              <button
                                type="button"
                                onClick={handleRemovePhoto}
                                className="remove-btn"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                          <p className="upload-hint">Max file size: 10MB. Supported formats: JPG, PNG, GIF</p>
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Full Name</label>
                        <input
                          type="text"
                          value={profileEditData.name}
                          onChange={(e) => handleProfileInputChange('name', e.target.value)}
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="form-group">
                        <label>Job Title</label>
                        <input
                          type="text"
                          value={profileEditData.jobTitle}
                          onChange={(e) => handleProfileInputChange('jobTitle', e.target.value)}
                          placeholder="e.g., Front-end Developer"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Country</label>
                        <input
                          type="text"
                          value={profileEditData.country}
                          onChange={(e) => handleProfileInputChange('country', e.target.value)}
                          placeholder="Enter your country"
                        />
                      </div>
                      <div className="form-group">
                        <label>Hourly Rate (USD)</label>
                        <input
                          type="number"
                          value={profileEditData.hourlyRate}
                          onChange={(e) => handleProfileInputChange('hourlyRate', e.target.value)}
                          placeholder="Enter hourly rate"
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="main-profile-card client-profile">
              <div className="profile-photo-section">
                <div className="profile-photo">
                  <img 
                    src={user.profilePhoto || "/man.png"} 
                    alt="Profile" 
                  />
                  
                </div>
              </div>

              <div className="profile-info-section">
                <div className="profile-name-section">
                  <h1 className="profile-name">{user.name || 'SAIDUL ISLAM SHEHAB'}</h1>
                  <button className="edit-icon">
                    <img src={pencilIcon} alt="Edit" className="edit-icon-img" />
                  </button>
                </div>


                <div className="location-section">
                  <span className="location-text">{user.country }</span>
                </div>

                <div className="client-stats">
                  <div className="stat-row">
                    <span className="stat-label">Projects published:</span>
                    <span className="stat-value">0</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Projects paid:</span>
                    <span className="stat-value">0 (0%)</span>
                  </div>
                </div>

                <div className="account-activity">
                  <div className="activity-row">
                    <span className="activity-label">Last login:</span>
                    <span className="activity-value">23 hours ago</span>
                  </div>
                  <div className="activity-row">
                    <span className="activity-label">Registered since:</span>
                    <span className="activity-value">July 2025</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Conditional Content Based on Active Tab */}
          {activeTab === 'freelancer' ? (
            <>

              {/* Skills Section */}
              <div className="skills-section">
                <div className="skills-header">
                  <h3>Skills (Maximum: 3)</h3>
                  <div className="skills-actions">
                    {isEditingSkills ? (
                      <>
                        <button className="cancel-button" onClick={handleCancelSkills}>
                          Cancel
                        </button>
                        <button 
                          className="save-button" 
                          onClick={handleSaveSkills}
                          disabled={saving}
                        >
                          {saving ? 'Saving...' : 'Save'}
                        </button>
                      </>
                    ) : (
                      <button className="edit-button" onClick={handleEditSkills}>
                        Edit
                      </button>
                    )}
                  </div>
                </div>

                {isEditingSkills ? (
                  <div className="skills-edit-container">
                    {/* Skills Table */}
                    <div className="skills-table">
                      <div className="skills-table-header">
                        <div className="table-column">Skills</div>
                        <div className="table-column">Certifications</div>
                        <div className="table-column">Projects worked</div>
                        <div className="table-column">Experience years</div>
                        <div className="table-column">Actions</div>
                      </div>
                      
                      {skills.map((skill, index) => (
                        <div key={index} className="skills-table-row">
                          <div className="table-column skill-name">{skill.name}</div>
                          <div className="table-column">{skill.certifications}</div>
                          <div className="table-column">{skill.projects}</div>
                          <div className="table-column">
                            <select
                              value={skill.experience}
                              onChange={(e) => handleUpdateSkillExperience(index, e.target.value)}
                              className="experience-dropdown"
                            >
                              <option value="1 year">1 year</option>
                              <option value="2 years">2 years</option>
                              <option value="3 years">3 years</option>
                              <option value="4 years">4 years</option>
                              <option value="5+ years">5+ years</option>
                            </select>
                          </div>
                          <div className="table-column">
                            <button 
                              className="delete-skill-btn"
                              onClick={() => handleRemoveSkill(index)}
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add New Skill Section */}
                    <div className="add-skill-section">
                      <div className="skill-limit-message">
                        <span>You can only choose 3 elements</span>
                        <span className="search-icon">🔍</span>
                      </div>
                      
                      <div className="add-skill-inputs">
                        <div className="skill-input-group">
                          <label>Experience</label>
                          <select
                            value={newSkillExperience}
                            onChange={(e) => setNewSkillExperience(e.target.value)}
                            className="experience-select"
                          >
                            <option value="1 year">1 year</option>
                            <option value="2 years">2 years</option>
                            <option value="3 years">3 years</option>
                            <option value="4 years">4 years</option>
                            <option value="5+ years">5+ years</option>
                          </select>
                        </div>
                        
                        <div className="skill-input-group">
                          <input
                            type="text"
                            placeholder="Enter skill name"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            className="skill-name-input"
                            disabled={skills.length >= 3}
                          />
                          <button
                            className={`add-skill-btn ${skills.length >= 3 ? 'disabled' : ''}`}
                            onClick={handleAddSkill}
                            disabled={skills.length >= 3 || !newSkill.trim()}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="skills-display">
                    {skills.length > 0 ? (
                      <div className="skills-list">
                        {skills.map((skill, index) => (
                          <div key={index} className="skill-item">
                            <span className="skill-name">{skill.name}</span>
                            <span className="skill-experience">{skill.experience}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="no-skills">No skills added yet. Click Edit to add skills.</p>
                    )}
                  </div>
                )}
              </div>

              {/* Featured Projects Section */}
              <div className="featured-projects-section">
                <div className="section-header">
                  <h3>Featured Projects</h3>
                  <button className="edit-icon" onClick={handleAddProject}>
                    <img src={pencilIcon} alt="Add Project" className="edit-icon-img" />
                  </button>
                </div>
                <div className="section-description">
                  <p>In this section, you can include the projects you've worked on</p>
                </div>
                
                {isAddingProject && (
                  <div className="add-project-form">
                    <div className="form-group">
                      <label>Project Name</label>
                      <input
                        type="text"
                        value={newProject.name}
                        onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                        placeholder="Enter project name"
                        className="project-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>GitHub Link</label>
                      <input
                        type="url"
                        value={newProject.githubLink}
                        onChange={(e) => setNewProject({...newProject, githubLink: e.target.value})}
                        placeholder="https://github.com/username/repository"
                        className="project-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Description (Optional)</label>
                      <textarea
                        value={newProject.description}
                        onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                        placeholder="Brief description of the project"
                        className="project-textarea"
                        rows="3"
                      />
                    </div>
                    <div className="form-actions">
                      <button className="cancel-button" onClick={handleCancelAddProject}>
                        Cancel
                      </button>
                      <button className="save-button" onClick={handleSaveProject}>
                        Save Project
                      </button>
                    </div>
                  </div>
                )}

                <div className="projects-cards">
                  {projects.map((project) => (
                    <div key={project.id} className="project-card">
                      <div className="project-header">
                        <h4 className="project-name">{project.name}</h4>
                        <button 
                          className="remove-project-btn"
                          onClick={() => handleRemoveProject(project.id)}
                        >
                          ×
                        </button>
                      </div>
                      <p className="project-description">{project.description}</p>
                      <a 
                        href={project.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        View on GitHub
                      </a>
                    </div>
                  ))}
                  
                  {!isAddingProject && (
                    <div className="project-card add-project" onClick={handleAddProject}>
                      <div className="project-icon">+</div>
                      <span className="project-text">Add project</span>
                    </div>
                  )}
                  
                  <div className="project-card link-account">
                    <div className="project-icon behance">Bē</div>
                    <span className="project-text">Link account</span>
                  </div>
                </div>
              </div>

              {/* About Me Section */}
              <div className="about-section">
                <div className="section-header">
                  <h3>About me</h3>
                  <div className="about-me-actions">
                    {isEditingAboutMe ? (
                      <>
                        <button className="cancel-button" onClick={handleCancelAboutMe}>
                          Cancel
                        </button>
                        <button 
                          className="save-button" 
                          onClick={handleSaveAboutMe}
                          disabled={savingAboutMe}
                        >
                          {savingAboutMe ? 'Saving...' : 'Save'}
                        </button>
                      </>
                    ) : (
                      <button className="edit-icon" onClick={handleEditAboutMe}>
                        <img src={pencilIcon} alt="Edit" className="edit-icon-img" />
                      </button>
                    )}
                  </div>
                </div>

                {isEditingAboutMe ? (
                  <div className="about-me-edit-container">
                    <textarea
                      value={aboutMeText}
                      onChange={(e) => setAboutMeText(e.target.value)}
                      className="about-me-textarea"
                      placeholder="Tell us about yourself as a freelancer..."
                      rows={6}
                    />
                    <div className="character-count">
                      {aboutMeText.length}/1000 characters
                    </div>
                  </div>
                ) : (
                  <div className="about-me-content">
                    {aboutMeText ? (
                      <p className="about-me-text">{aboutMeText}</p>
                    ) : (
                      <p className="no-about-me">No about me information yet. Click the edit button to add your story.</p>
                    )}
                  </div>
                )}
              </div>

              {/* Experience Section */}
              <div className="work-history-section">
                <div className="section-header">
                  <h3>Experience</h3>
                  <div className="section-actions">
                    {isEditingExperience ? (
                      <>
                        <button className="cancel-button" onClick={() => setIsEditingExperience(false)}>
                          Cancel
                        </button>
                        <button className="save-button" onClick={handleSaveExperience}>
                          Save
                        </button>
                      </>
                    ) : (
                      <button className="edit-icon" onClick={() => setIsEditingExperience(true)}>
                        <img src={pencilIcon} alt="Edit" className="edit-icon-img" />
                      </button>
                    )}
                  </div>
                </div>

                {isEditingExperience ? (
                  <div className="experience-edit-container">
                    {/* Add New Experience Form */}
                    <div className="add-experience-form">
                      <h4>Add New Experience</h4>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Company</label>
                          <input
                            type="text"
                            value={newExperience.company}
                            onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
                            placeholder="Company name"
                          />
                        </div>
                        <div className="form-group">
                          <label>Position</label>
                          <input
                            type="text"
                            value={newExperience.position}
                            onChange={(e) => setNewExperience({...newExperience, position: e.target.value})}
                            placeholder="Job title"
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Start Date</label>
                          <input
                            type="month"
                            value={newExperience.startDate}
                            onChange={(e) => setNewExperience({...newExperience, startDate: e.target.value})}
                          />
                        </div>
                        <div className="form-group">
                          <label>End Date</label>
                          <input
                            type="month"
                            value={newExperience.endDate}
                            onChange={(e) => setNewExperience({...newExperience, endDate: e.target.value})}
                            disabled={newExperience.current}
                          />
                        </div>
                        <div className="form-group">
                          <label>
                            <input
                              type="checkbox"
                              checked={newExperience.current}
                              onChange={(e) => setNewExperience({...newExperience, current: e.target.checked})}
                            />
                            Currently working here
                          </label>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <textarea
                          value={newExperience.description}
                          onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
                          placeholder="Describe your role and achievements"
                          rows="3"
                        />
                      </div>
                      <button className="add-button" onClick={handleAddExperience}>
                        Add Experience
                      </button>
                    </div>

                    {/* Experience List */}
                    <div className="experience-list">
                      {experience.map((exp) => (
                        <div key={exp.id} className="experience-item">
                          <div className="experience-header">
                            <h4>{exp.position} at {exp.company}</h4>
                            <button 
                              className="remove-btn"
                              onClick={() => handleRemoveExperience(exp.id)}
                            >
                              ×
                            </button>
                          </div>
                          <p className="experience-dates">
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          </p>
                          {exp.description && (
                            <p className="experience-description">{exp.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="experience-display">
                    {experience.length > 0 ? (
                      <div className="experience-list">
                        {experience.map((exp) => (
                          <div key={exp.id} className="experience-item">
                            <h4>{exp.position} at {exp.company}</h4>
                            <p className="experience-dates">
                              {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                            </p>
                            {exp.description && (
                              <p className="experience-description">{exp.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="no-experience">No experience added yet. Click Edit to add your work experience.</p>
                    )}
                  </div>
                )}
              </div>

              {/* Education Section */}
              <div className="certifications-section">
                <div className="section-header">
                  <h3>Education</h3>
                  <div className="section-actions">
                    {isEditingEducation ? (
                      <>
                        <button className="cancel-button" onClick={() => setIsEditingEducation(false)}>
                          Cancel
                        </button>
                        <button className="save-button" onClick={handleSaveEducation}>
                          Save
                        </button>
                      </>
                    ) : (
                      <button className="edit-icon" onClick={() => setIsEditingEducation(true)}>
                        <img src={pencilIcon} alt="Edit" className="edit-icon-img" />
                      </button>
                    )}
                  </div>
                </div>

                {isEditingEducation ? (
                  <div className="education-edit-container">
                    {/* Add New Education Form */}
                    <div className="add-education-form">
                      <h4>Add New Education</h4>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Institution</label>
                          <input
                            type="text"
                            value={newEducation.institution}
                            onChange={(e) => setNewEducation({...newEducation, institution: e.target.value})}
                            placeholder="University/School name"
                          />
                        </div>
                        <div className="form-group">
                          <label>Degree</label>
                          <input
                            type="text"
                            value={newEducation.degree}
                            onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
                            placeholder="e.g., Bachelor's, Master's"
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Field of Study</label>
                          <input
                            type="text"
                            value={newEducation.fieldOfStudy}
                            onChange={(e) => setNewEducation({...newEducation, fieldOfStudy: e.target.value})}
                            placeholder="e.g., Computer Science"
                          />
                        </div>
                        <div className="form-group">
                          <label>Start Date</label>
                          <input
                            type="month"
                            value={newEducation.startDate}
                            onChange={(e) => setNewEducation({...newEducation, startDate: e.target.value})}
                          />
                        </div>
                        <div className="form-group">
                          <label>End Date</label>
                          <input
                            type="month"
                            value={newEducation.endDate}
                            onChange={(e) => setNewEducation({...newEducation, endDate: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <textarea
                          value={newEducation.description}
                          onChange={(e) => setNewEducation({...newEducation, description: e.target.value})}
                          placeholder="Additional details about your education"
                          rows="3"
                        />
                      </div>
                      <button className="add-button" onClick={handleAddEducation}>
                        Add Education
                      </button>
                    </div>

                    {/* Education List */}
                    <div className="education-list">
                      {education.map((edu) => (
                        <div key={edu.id} className="education-item">
                          <div className="education-header">
                            <h4>{edu.degree} in {edu.fieldOfStudy}</h4>
                            <button 
                              className="remove-btn"
                              onClick={() => handleRemoveEducation(edu.id)}
                            >
                              ×
                            </button>
                          </div>
                          <p className="education-institution">{edu.institution}</p>
                          <p className="education-dates">
                            {edu.startDate} - {edu.endDate}
                          </p>
                          {edu.description && (
                            <p className="education-description">{edu.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="education-display">
                    {education.length > 0 ? (
                      <div className="education-list">
                        {education.map((edu) => (
                          <div key={edu.id} className="education-item">
                            <h4>{edu.degree} in {edu.fieldOfStudy}</h4>
                            <p className="education-institution">{edu.institution}</p>
                            <p className="education-dates">
                              {edu.startDate} - {edu.endDate}
                            </p>
                            {edu.description && (
                              <p className="education-description">{edu.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="no-education">No education added yet. Click Edit to add your educational background.</p>
                    )}
                  </div>
                )}
              </div>

              {/* Languages Section */}
              <div className="languages-section">
                <div className="section-header">
                  <h3>Languages</h3>
                  <div className="section-actions">
                    {isEditingLanguages ? (
                      <>
                        <button className="cancel-button" onClick={() => setIsEditingLanguages(false)}>
                          Cancel
                        </button>
                        <button className="save-button" onClick={handleSaveLanguages}>
                          Save
                        </button>
                      </>
                    ) : (
                      <button className="edit-icon" onClick={() => setIsEditingLanguages(true)}>
                        <img src={pencilIcon} alt="Edit" className="edit-icon-img" />
                      </button>
                    )}
                  </div>
                </div>

                {isEditingLanguages ? (
                  <div className="languages-edit-container">
                    {/* Add New Language Form */}
                    <div className="add-language-form">
                      <h4>Add New Language</h4>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Language</label>
                          <input
                            type="text"
                            value={newLanguage.language}
                            onChange={(e) => setNewLanguage({...newLanguage, language: e.target.value})}
                            placeholder="e.g., Spanish, French"
                          />
                        </div>
                        <div className="form-group">
                          <label>Proficiency</label>
                          <select
                            value={newLanguage.proficiency}
                            onChange={(e) => setNewLanguage({...newLanguage, proficiency: e.target.value})}
                          >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Native">Native</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <button className="add-button" onClick={handleAddLanguage}>
                            Add Language
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Languages List */}
                    <div className="languages-list">
                      {languages.map((lang) => (
                        <div key={lang.id} className="language-item">
                          <div className="language-header">
                            <span className="language-name">{lang.language}</span>
                            <span className="language-proficiency">{lang.proficiency}</span>
                            <button 
                              className="remove-btn"
                              onClick={() => handleRemoveLanguage(lang.id)}
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="languages-display">
                    {languages.length > 0 ? (
                      <div className="languages-list">
                        {languages.map((lang) => (
                          <div key={lang.id} className="language-item">
                            <span className="language-name">{lang.language}</span>
                            <span className="language-proficiency">{lang.proficiency}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="no-languages">No languages added yet. Click Edit to add your languages.</p>
                    )}
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* About Me Section for Client */}
              <div className="about-section">
                <div className="section-header">
                  <h3>About me</h3>
                  <div className="about-me-actions">
                    {isEditingAboutMe ? (
                      <>
                        <button className="cancel-button" onClick={handleCancelAboutMe}>
                          Cancel
                        </button>
                        <button 
                          className="save-button" 
                          onClick={handleSaveAboutMe}
                          disabled={savingAboutMe}
                        >
                          {savingAboutMe ? 'Saving...' : 'Save'}
                        </button>
                      </>
                    ) : (
                      <button className="edit-icon" onClick={handleEditAboutMe}>
                        <img src={pencilIcon} alt="Edit" className="edit-icon-img" />
                      </button>
                    )}
                  </div>
                </div>

                {isEditingAboutMe ? (
                  <div className="about-me-edit-container">
                    <textarea
                      value={aboutMeText}
                      onChange={(e) => setAboutMeText(e.target.value)}
                      className="about-me-textarea"
                      placeholder="Tell us about yourself as a client..."
                      rows={6}
                    />
                    <div className="character-count">
                      {aboutMeText.length}/1000 characters
                    </div>
                  </div>
                ) : (
                  <div className="about-me-content">
                    {aboutMeText ? (
                      <p className="about-me-text">{aboutMeText}</p>
                    ) : (
                      <p className="no-about-me">No about me information yet. Click the edit button to add your story.</p>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </main>

      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FreelancerProfile;
