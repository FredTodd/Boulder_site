const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Friend = require('../models/Friend');
const User = require('../models/User');

// Route to add a friend
router.post('/add', authMiddleware, async (req, res) => {
  const { friend_id } = req.body; // Get friend ID from request body
  const user_id = req.user.userId; // Get current user's ID from the token

  try {
    // Check if the friendship already exists
    const existingFriend = await Friend.findOne({
      where: {
        user_id: user_id,
        friend_id: friend_id,
      },
    });

    if (existingFriend) {
      // If friendship exists, return an error
      return res.status(400).json({ message: 'You are already friends with this user' });
    }

    // Create a new friendship if it doesn't exist
    await Friend.create({ user_id, friend_id });
    res.status(200).json({ message: 'Friend added successfully' });
  } catch (error) {
    console.error('Error adding friend:', error);
    res.status(500).json({ message: 'Error adding friend' });
  }
});

// Route to get the friends list for the authenticated user
router.get('/list', authMiddleware, async (req, res) => {
  const user_id = req.user.userId; // Get current user's ID from the token

  try {
    // Find all friends of the user
    const friends = await Friend.findAll({
      where: { user_id },
      include: [{
        model: User,
        as: 'friendDetails', // Include friend details
        attributes: ['user_id', 'username', 'profile_picture']
      }],
    });

    res.status(200).json(friends); // Return the list of friends
  } catch (error) {
    console.error('Error fetching friends list:', error);
    res.status(500).json({ message: 'Error fetching friends list' });
  }
});

// Route to check friendship status with another user
router.get('/status/:userId', authMiddleware, async (req, res) => {
  const user_id = req.user.userId; // Get current user's ID from the token
  const friend_id = req.params.userId; // Get the other user's ID from the route parameters

  try {
    // Check if the friendship exists
    const friendship = await Friend.findOne({
      where: { user_id, friend_id }
    });

    // Return friendship status
    res.status(200).json({ isFriend: !!friendship });
  } catch (error) {
    console.error('Error checking friendship status:', error);
    res.status(500).json({ message: 'Error checking friendship status' });
  }
});

module.exports = router;
