const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');
const User = require('../models/User');
const IndoorClimb = require('../models/IndoorClimb');
const OutdoorClimb = require('../models/OutdoorClimb');
const { Sequelize } = require('sequelize');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);
router.get('/check-username', authMiddleware, authController.checkUsername);

// Profile route
router.get('/profile', authMiddleware, async (req, res) => {
  console.log('Received request for /profile');
  try {
    const { userId } = req.user; // Extract userId from the request
    console.log(`Fetching profile for user ID: ${userId}`);
    const user = await User.findByPk(userId, {
      attributes: ['username', 'bio', 'profile_picture'] // Fetch specific user attributes
    });
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user); // Return user data in response
  } catch (error) {
    console.error('Error fetching profile:', error.message);
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

// Update profile route
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.user;
    const { username, bio, profile_picture } = req.body;

    const user = await User.findByPk(userId); // Find user by primary key
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.username = username || user.username; // Update fields only if provided
    user.bio = bio || user.bio;
    user.profile_picture = profile_picture || user.profile_picture;

    await user.save(); // Save updated user data

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error.message);
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
});

// Fetch all climbs for the authenticated user
router.get('/climbs', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.user;

    // Fetch both indoor and outdoor climbs asynchronously
    const indoorClimbs = await IndoorClimb.findAll({
      where: { user_id: userId },
      attributes: ['grade', 'location', 'climb_date', 'personal_rating', 'notes', 'type']
    });

    console.log('Indoor Climbs:', indoorClimbs); // Log indoor climbs

    const outdoorClimbs = await OutdoorClimb.findAll({
      where: { user_id: userId },
      attributes: ['grade', 'location', 'route_name', 'climb_date', 'personal_rating', 'notes', 'type']
    });

    console.log('Outdoor Climbs:', outdoorClimbs); // Log outdoor climbs

    const climbs = [...indoorClimbs, ...outdoorClimbs]; // Combine indoor and outdoor climbs

    console.log('Combined Climbs:', climbs); // Log combined climbs

    res.json(climbs); // Send combined climbs in response
  } catch (error) {
    console.error('Error fetching climbs:', error);
    res.status(500).json({ message: 'Error fetching climbs' });
  }
});

// Search users by username
router.get('/search', authMiddleware, async (req, res) => {
  try {
    const { query } = req.query; // Get search query from request

    const users = await User.findAll({
      where: {
        username: {
          [Sequelize.Op.like]: `%${query}%` // Use LIKE operator for search
        }
      },
      attributes: ['user_id', 'username', 'profile_picture'] // Return specific user fields
    });

    res.json(users); // Send matching users in response
  } catch (error) {
    console.error('Error searching for users:', error.message);
    res.status(500).json({ message: 'Error searching for users' });
  }
});

// Fetch another user's profile
router.get('/profile/:userId', authMiddleware, async (req, res) => {
  const { userId } = req.params; // Extract userId from route parameters
  console.log(`Fetching profile for userId: ${userId}`);

  try {
    const user = await User.findByPk(userId, {
      attributes: ['username', 'bio', 'profile_picture']
    });
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('User found:', user); // Log the found user
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    res.status(500).json({ message: 'Error fetching user profile' });
  }
});

// Fetch all climbs for another user
router.get('/climbs/:userId', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    const indoorClimbs = await IndoorClimb.findAll({ where: { user_id: userId } });
    const outdoorClimbs = await OutdoorClimb.findAll({ where: { user_id: userId } });
    const climbs = [...indoorClimbs, ...outdoorClimbs]; // Combine indoor and outdoor climbs
    res.json(climbs); // Send combined climbs in response
  } catch (error) {
    console.error('Error fetching user climbs:', error.message);
    res.status(500).json({ message: 'Error fetching user climbs' });
  }
});

module.exports = router;
