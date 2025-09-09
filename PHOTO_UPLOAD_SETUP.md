# Photo Upload Setup Guide

## Problem Fixed
The photo upload functionality was returning an error "PayloadTooLargeError: request entity too large" because the server couldn't handle large image files. This has been fixed by:

1. **Increased server payload limits** to 50MB
2. **Added image compression** on the client side to reduce file sizes
3. **Improved error handling** for file upload issues

## What I've Done

### 1. Enhanced Error Handling
- Added server connection testing before making API calls
- Added better error messages to help diagnose issues
- Added content-type checking to ensure JSON responses

### 2. Updated Files
- `client/src/Dashboard/freelancerProfile/freelancerProfile.js` - Enhanced profile save functionality
- `client/src/Dashboard/clientProfile/clientProfile.js` - Enhanced photo upload functionality
- Created `start-dev.bat` - Easy startup script for development

### 3. Photo Upload Features
- ✅ File validation (image types only, max 10MB)
- ✅ **Image compression** to reduce file sizes automatically
- ✅ Image preview before upload
- ✅ Base64 encoding for storage in MongoDB
- ✅ Real-time preview in profile
- ✅ Error handling and user feedback
- ✅ **Server payload limits increased** to handle larger files

## How to Use

### Step 1: Start MongoDB
Make sure MongoDB is running on your system:
```bash
# If MongoDB is installed as a service, it should start automatically
# Otherwise, start it manually:
mongod
```

### Step 2: Start the Server
```bash
cd server
npm install  # if not already done
npm start
```

**OR** use the restart script:
```bash
restart-server.bat
```

### Step 3: Start the Client
```bash
cd client
npm install  # if not already done
npm start
```

### Step 4: Test Photo Upload
1. Go to your profile page
2. Click the edit button (pencil icon) on your profile photo
3. Click "Choose Photo" and select an image
4. Click "Save Changes"
5. The photo should be saved to MongoDB and displayed in your profile

## Alternative: Use the Startup Script
Double-click `start-dev.bat` to start both server and client automatically.

## Troubleshooting

### If you get "Server is not responding" error:
1. Make sure the server is running on port 5000
2. Check the server console for any error messages
3. Verify MongoDB is running

### If you get "Cannot connect to server" error:
1. Check if the server is running: http://localhost:5000/api/jobseekers/test
2. Make sure no other application is using port 5000
3. Check firewall settings

### If the photo doesn't save:
1. Check the browser console for error messages
2. Verify the user is logged in and has a valid user ID
3. Check the server console for any database errors

## Technical Details

### Photo Storage
- Photos are converted to base64 strings
- Stored in the `profilePhoto` field of the Job_Seeker model
- No file upload to server - everything is stored as text in MongoDB

### API Endpoints Used
- `GET /api/jobseekers/test` - Test server connection
- `PUT /api/jobseekers/update-profile/:id` - Update profile with photo

### Database Schema
The `profilePhoto` field in the Job_Seeker model stores the base64 string:
```javascript
profilePhoto: {
    type: String,
    default: '',
}
```

## Troubleshooting

### Common Issues Fixed:
1. **"PayloadTooLargeError"**: ✅ Fixed with increased server limits (50MB) and image compression
2. **Large image uploads**: ✅ Images are now automatically compressed to reduce file size
3. **File size errors**: ✅ Maximum file size increased to 10MB with compression

### If you still encounter issues:
1. **Server not responding**: Make sure MongoDB is running and restart the server
2. **CORS errors**: Check that the server is running on port 5000
3. **Database connection**: Verify MongoDB connection string in server/db/connect.js
4. **Photo not saving**: Check browser console for errors and server logs
5. **Image processing errors**: Try with a smaller image or different format

## Next Steps
1. Start the server and client
2. Test the photo upload functionality
3. If everything works, the photos will be saved to MongoDB and displayed in your profile
