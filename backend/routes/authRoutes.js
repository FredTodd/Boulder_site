const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');  // Add this line
const User = require('../models/User');
const IndoorClimb = require('../models/IndoorClimb');
const OutdoorClimb = require('../models/OutdoorClimb');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);
router.get('/check-username', authMiddleware, authController.checkUsername);



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

// Fetch all climbs for the authenticated user
router.get('/climbs', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.user; // Assuming req.user is populated by the auth middleware

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

    // Combine both types of climbs into one array
    const climbs = [...indoorClimbs, ...outdoorClimbs];

    console.log('Combined Climbs:', climbs); // Log combined climbs

    res.json(climbs);
  } catch (error) {
    console.error('Error fetching climbs:', error);
    res.status(500).json({ message: 'Error fetching climbs' });
  }
});


module.exports = router;
