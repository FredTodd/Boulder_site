const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Friend = require('../models/Friend'); // Assuming you have a Friend model

// Add a friend
router.post('/add', authMiddleware, async (req, res) => {
  const { friend_id } = req.body;
  const user_id = req.user.userId; // Current user's ID

  try {
    // Check if the friend relationship already exists
    const existingFriend = await Friend.findOne({
      where: {
        user_id: user_id,
        friend_id: friend_id,
      },
    });

    if (existingFriend) {
      return res.status(400).json({ message: 'You are already friends with this user' });
    }

    // Add the friend relationship
    await Friend.create({ user_id, friend_id });
    res.status(200).json({ message: 'Friend added successfully' });
  } catch (error) {
    console.error('Error adding friend:', error);
    res.status(500).json({ message: 'Error adding friend' });
  }
});

module.exports = router;
