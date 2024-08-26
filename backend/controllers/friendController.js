const Friend = require('../models/Friend');
const User = require('../models/User');

// Check if two users are friends
exports.checkFriendStatus = async (req, res) => {
  try {
    const user_id = req.user.userId;
    const { friendId } = req.params;

    if (!user_id || !friendId) {
      return res.status(400).json({ message: 'Invalid user or friend ID.' }); // Ensure both user IDs are provided
    }

    const friendship = await Friend.findOne({
      where: {
        user_id,
        friend_id: friendId,
      },
    });

    res.json({ isFriend: !!friendship }); // Respond with true if friendship exists
  } catch (error) {
    console.error('Error checking friend status:', error.message);
    res.status(500).json({ message: 'Error checking friend status', error: error.message });
  }
};

// Add a friend
exports.addFriend = async (req, res) => {
  try {
    const user_id = req.user.userId;
    const { friend_id } = req.body;

    if (!user_id || !friend_id) {
      return res.status(400).json({ message: 'Invalid user or friend ID.' }); // Validate user IDs
    }

    const existingFriendship = await Friend.findOne({
      where: {
        user_id,
        friend_id,
      },
    });

    if (existingFriendship) {
      return res.status(400).json({ message: 'You are already friends with this user.' }); // Check if friendship already exists
    }

    await Friend.create({ user_id, friend_id });
    await Friend.create({ user_id: friend_id, friend_id: user_id }); // Create reciprocal friendship for mutual connection

    res.json({ message: 'Friend added successfully.' });
  } catch (error) {
    console.error('Error adding friend:', error.message);
    res.status(500).json({ message: 'Error adding friend', error: error.message });
  }
};

// Get list of friends for a user
exports.getFriends = async (req, res) => {
  try {
    const user_id = req.user.userId;

    const friends = await Friend.findAll({
      where: {
        user_id,
      },
      include: [{
        model: User,
        attributes: ['user_id', 'username', 'profile_picture'], // Fetch only necessary user details
      }]
    });

    res.json(friends);
  } catch (error) {
    console.error('Error fetching friends:', error.message);
    res.status(500).json({ message: 'Error fetching friends', error: error.message });
  }
};
