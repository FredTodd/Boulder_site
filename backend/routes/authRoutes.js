const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { register, login } = require('../controllers/authController');
const User = require('../models/User');

router.post('/register', register);
router.post('/login', login);

// Profile route
router.get('/profile', authMiddleware, async (req, res) => {
  console.log('Received request for /profile'); // Log the request
  try {
    const { userId } = req.user;
    console.log(`Fetching profile for user ID: ${userId}`); // Add logging
    const user = await User.findByPk(userId, {
      attributes: ['username', 'bio', 'profile_picture']
    });
    if (!user) {
      console.log('User not found'); // Add logging
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error.message); // Add error logging
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

// Update profile route
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.user;
    const { username, bio, profile_picture } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.username = username || user.username;
    user.bio = bio || user.bio;
    user.profile_picture = profile_picture || user.profile_picture;

    await user.save();

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error.message);
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
});

module.exports = router;
