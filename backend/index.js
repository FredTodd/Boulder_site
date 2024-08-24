const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');
const authMiddleware = require('./middleware/authMiddleware');
const friendRoutes = require('./routes/friendRoutes');
const authRoutes = require('./routes/authRoutes');
const IndoorClimb = require('./models/IndoorClimb');
const OutdoorClimb = require('./models/OutdoorClimb');

const app = express();

// Middleware setup
app.use(cors({
  origin: 'http://localhost:3000',  // Adjust this if your frontend is hosted elsewhere
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));
app.use(express.json({ limit: '10kb' }));  // Set JSON body limit
app.use(express.urlencoded({ extended: true, limit: '10kb' }));  // Set URL-encoded body limit

// Sync database
sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
}).catch(error => {
  console.error('Error creating database & tables:', error);
});

// Register auth routes
app.use('/auth', authRoutes);

// Register friend routes
app.use('/friends', friendRoutes);

// Route for fetching all climbs for a specific user (both indoor and outdoor)
app.get('/climbs/user/:userId', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    const indoorClimbs = await IndoorClimb.findAll({ where: { user_id: userId } });
    const outdoorClimbs = await OutdoorClimb.findAll({ where: { user_id: userId } });
    const allClimbs = [...indoorClimbs, ...outdoorClimbs];
    res.json(allClimbs);
  } catch (error) {
    console.error('Error fetching climbs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route for fetching indoor climbs by userId
app.get('/climbs/indoor/:userId', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    const indoorClimbs = await IndoorClimb.findAll({ where: { user_id: userId } });
    res.json(indoorClimbs);
  } catch (error) {
    console.error('Error fetching indoor climbs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route for fetching outdoor climbs by userId
app.get('/climbs/outdoor/:userId', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    const outdoorClimbs = await OutdoorClimb.findAll({ where: { user_id: userId } });
    res.json(outdoorClimbs);
  } catch (error) {
    console.error('Error fetching outdoor climbs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
