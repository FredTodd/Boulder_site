const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Friend = require('../models/Friend');
const User = require('../models/User');

// Add a friend
router.post('/add', authMiddleware, async (req, res) => {
  const { friend_id } = req.body;
  const user_id = req.user.userId; // Current user's ID

  try {
    const existingFriend = await Friend.findOne({
      where: {
        user_id: user_id,
        friend_id: friend_id,
      },
    });

    if (existingFriend) {
      return res.status(400).json({ message: 'You are already friends with this user' });
    }

    await Friend.create({ user_id, friend_id });
    res.status(200).json({ message: 'Friend added successfully' });
  } catch (error) {
    console.error('Error adding friend:', error);
    res.status(500).json({ message: 'Error adding friend' });
  }
});

// Get friends list for the authenticated user
router.get('/list', authMiddleware, async (req, res) => {
  const user_id = req.user.userId;

  try {
    const friends = await Friend.findAll({
      where: { user_id },
      include: [{
        model: User,
        as: 'friendDetails',  // This alias should match the alias defined in the Friend model association
        attributes: ['user_id', 'username', 'profile_picture']
      }],
    });

    res.status(200).json(friends);
  } catch (error) {
    console.error('Error fetching friends list:', error);
    res.status(500).json({ message: 'Error fetching friends list' });
  }
});

// Check friendship status with another user
router.get('/status/:userId', authMiddleware, async (req, res) => {
  const user_id = req.user.userId;
  const friend_id = req.params.userId;

  try {
    const friendship = await Friend.findOne({
      where: { user_id, friend_id }
    });

    res.status(200).json({ isFriend: !!friendship });
  } catch (error) {
    console.error('Error checking friendship status:', error);
    res.status(500).json({ message: 'Error checking friendship status' });
  }
});

module.exports = router;