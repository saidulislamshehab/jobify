// Simple test script to verify authentication endpoints
const axios = require('axios');

const API_BASE = 'http://localhost:5000/api/jobseekers';

async function testAuthentication() {
  console.log('🧪 Testing Authentication System...\n');

  try {
    // Test 1: Register a new user
    console.log('1️⃣ Testing user registration...');
    const registerData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };

    const registerResponse = await axios.post(`${API_BASE}/register`, registerData);
    console.log('✅ Registration successful:', registerResponse.data.message);
    console.log('   User ID:', registerResponse.data.user._id);
    console.log('   Access Token:', registerResponse.data.accessToken ? 'Present' : 'Missing');
    console.log('   Refresh Token:', registerResponse.data.refreshToken ? 'Present' : 'Missing');

    const { accessToken, refreshToken } = registerResponse.data;

    // Test 2: Get current user profile (protected route)
    console.log('\n2️⃣ Testing protected route access...');
    const profileResponse = await axios.get(`${API_BASE}/me`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    console.log('✅ Profile access successful:', profileResponse.data.user.name);

    // Test 3: Login with existing user
    console.log('\n3️⃣ Testing user login...');
    const loginResponse = await axios.post(`${API_BASE}/login`, {
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('✅ Login successful:', loginResponse.data.message);

    // Test 4: Refresh token
    console.log('\n4️⃣ Testing token refresh...');
    const refreshResponse = await axios.post(`${API_BASE}/refresh-token`, {
      refreshToken: loginResponse.data.refreshToken
    });
    console.log('✅ Token refresh successful:', refreshResponse.data.message);

    // Test 5: Logout
    console.log('\n5️⃣ Testing logout...');
    const logoutResponse = await axios.post(`${API_BASE}/logout`, {
      refreshToken: refreshResponse.data.refreshToken
    });
    console.log('✅ Logout successful:', logoutResponse.data.message);

    console.log('\n🎉 All authentication tests passed!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data?.message || error.message);
    if (error.response?.data) {
      console.error('   Response data:', error.response.data);
    }
  }
}

// Run the test
testAuthentication();






