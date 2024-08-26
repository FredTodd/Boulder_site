const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new user
exports.register = async (req, res) => {
  const { username, email, password } = req.body; // Extract username, email, password from request body

  // Regex to check for special characters in the username
  const regex = /^[a-zA-Z0-9_]+$/;
  if (!regex.test(username)) {
    return res.status(400).json({ message: 'Username cannot contain special characters.' }); // Return error if username contains special characters
  }

  try {
    // Check if the username is already taken
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists. Please choose another one.' }); // Return error if username is taken
    }

    // Hash the password and create the user
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with salt
    await User.create({ username, email, password: hashedPassword }); // Create new user
    res.status(201).json({ message: 'User registered successfully' }); // Send success response
  } catch (error) {
    console.error('Error registering user:', error); // Log error
    res.status(400).json({ message: 'Error registering user', error: error.message }); // Send error response
  }
};

// Check username availability
exports.checkUsername = async (req, res) => {
  const { username } = req.query; // Extract username from query parameters

  // Regex to check for special characters in the username
  const regex = /^[a-zA-Z0-9_]+$/;
  if (!regex.test(username)) {
    return res.status(400).json({ message: 'Username cannot contain special characters.' }); // Return error if username contains special characters
  }

  try {
    // Check if the username is already taken
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.json({ isUnique: false }); // Return false if username is taken
    }

    res.json({ isUnique: true }); // Return true if username is unique
  } catch (error) {
    console.error('Error checking username:', error); // Log error
    res.status(500).json({ message: 'Server error' }); // Send error response
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body; // Extract email and password from request body
  try {
    const user = await User.findOne({ where: { email } }); // Find user by email
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' }); // Return error if user not found
    }
    const isMatch = await bcrypt.compare(password, user.password); // Compare passwords
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' }); // Return error if passwords do not match
    }
    // Generate both access token and refresh token
    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Generate access token
    const refreshToken = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '7d' }); // Generate refresh token
    res.json({ token, refreshToken }); // Send tokens to client
  } catch (error) {
    console.error('Error logging in:', error); // Log error
    res.status(500).json({ message: 'Error logging in', error: error.message }); // Send error response
  }
};

// Refresh Token
exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body; // Extract refresh token from request body
  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token provided' }); // Return error if no token provided
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET); // Verify refresh token
    const newToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Generate new access token
    res.json({ token: newToken }); // Send new token to client
  } catch (error) {
    console.error('Error refreshing token:', error); // Log error
    res.status(401).json({ message: 'Invalid refresh token' }); // Send error response
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { userId } = req.user; // Extract userId from request
    const { username, bio, profile_picture } = req.body; // Extract profile fields from request body

    console.log(`Update request: userId=${userId}, username=${username}, bio=${bio}, profile_picture=${profile_picture}`);

    const user = await User.findByPk(userId); // Find user by primary key
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' }); // Return error if user not found
    }

    console.log(`Current username in DB: ${user.username}`);

    // Check if the username is being changed
    if (username && username !== user.username) {
      console.log(`Attempting to change username to: ${username}`);
      const regex = /^[a-zA-Z0-9_]+$/; // Regex to check for special characters
      if (!regex.test(username)) {
        console.log('Username contains special characters');
        return res.status(400).json({ message: 'Username cannot contain special characters.' }); // Return error if username has special characters
      }

      const usernameExists = await User.findOne({ where: { username } }); // Check if username already exists
      if (usernameExists && usernameExists.user_id !== userId) {
        console.log('Username is already taken by another user');
        return res.status(400).json({ message: 'Username is already taken' }); // Return error if username is taken
      }
      user.username = username; // Update the username if it's not taken
    }

    // Update other fields
    user.bio = bio || user.bio; // Update bio if provided
    user.profile_picture = profile_picture || user.profile_picture; // Update profile picture if provided

    await user.save(); // Save updated user

    console.log('Profile updated successfully');
    res.json({ message: 'Profile updated successfully' }); // Send success response
  } catch (error) {
    console.error('Error updating profile:', error.message); // Log error
    res.status(500).json({ message: 'Error updating profile', error: error.message }); // Send error response
  }
};
