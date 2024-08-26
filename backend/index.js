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

// Setup CORS middleware
app.use(cors({
  origin: 'http://localhost:3000',  // Allow requests from this origin
  methods: 'GET,POST,PUT,DELETE',  // Allow these HTTP methods
  allowedHeaders: 'Content-Type,Authorization'  // Allow these headers
}));

// Setup middleware for parsing JSON and URL-encoded data
app.use(express.json({ limit: '10kb' }));  // Set JSON body size limit
app.use(express.urlencoded({ extended: true, limit: '10kb' }));  // Set URL-encoded body size limit

// Sync the database
sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');  // Log success message
}).catch(error => {
  console.error('Error creating database & tables:', error);  // Log error message
});

// Register auth routes
app.use('/auth', authRoutes);

// Register friend routes
app.use('/friends', friendRoutes);

// Route for fetching all climbs for a specific user
app.get('/climbs/user/:userId', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;  // Get userId from route parameters
    const indoorClimbs = await IndoorClimb.findAll({ where: { user_id: userId } });  // Fetch indoor climbs
    const outdoorClimbs = await OutdoorClimb.findAll({ where: { user_id: userId } });  // Fetch outdoor climbs
    const allClimbs = [...indoorClimbs, ...outdoorClimbs];  // Combine indoor and outdoor climbs
    res.json(allClimbs);  // Respond with combined climbs
  } catch (error) {
    console.error('Error fetching climbs:', error);  // Log error message
    res.status(500).json({ error: 'Internal server error' });  // Respond with error message
  }
});

// Route for fetching indoor climbs by userId
app.get('/climbs/indoor/:userId', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;  // Get userId from route parameters
    const indoorClimbs = await IndoorClimb.findAll({ where: { user_id: userId } });  // Fetch indoor climbs
    res.json(indoorClimbs);  // Respond with indoor climbs
  } catch (error) {
    console.error('Error fetching indoor climbs:', error);  // Log error message
    res.status(500).json({ error: 'Internal server error' });  // Respond with error message
  }
});

// Route for fetching outdoor climbs by userId
app.get('/climbs/outdoor/:userId', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;  // Get userId from route parameters
    const outdoorClimbs = await OutdoorClimb.findAll({ where: { user_id: userId } });  // Fetch outdoor climbs
    res.json(outdoorClimbs);  // Respond with outdoor climbs
  } catch (error) {
    console.error('Error fetching outdoor climbs:', error);  // Log error message
    res.status(500).json({ error: 'Internal server error' });  // Respond with error message
  }
});

// Route for logging an indoor climb
app.post('/climbs/indoor', authMiddleware, async (req, res) => {
  const { userId } = req.user;  // Get userId from token
  const { location, grade, personal_rating, notes, climb_date } = req.body;  // Get climb data from request body
  console.log('Received climb data:', { user_id: userId, location, grade, personal_rating, notes, climb_date });  // Log received data
  try {
    const climb = await IndoorClimb.create({ user_id: userId, location, grade, personal_rating, notes, climb_date });  // Create new indoor climb
    res.status(201).json(climb);  // Respond with the created climb
  } catch (error) {
    console.error('Error logging indoor climb:', error);  // Log error message
    res.status(400).json({ message: 'Error logging indoor climb', error: error.message });  // Respond with error message
  }
});

// Route for logging an outdoor climb
app.post('/climbs/outdoor', authMiddleware, async (req, res) => {
  const { userId } = req.user;  // Get userId from token
  const { location, route_name, grade, personal_rating, notes, climb_date } = req.body;  // Get climb data from request body
  console.log('Received outdoor climb data:', { user_id: userId, location, route_name, grade, personal_rating, notes, climb_date });  // Log received data
  try {
    const climb = await OutdoorClimb.create({ user_id: userId, location, route_name, grade, personal_rating, notes, climb_date });  // Create new outdoor climb
    res.status(201).json(climb);  // Respond with the created climb
  } catch (error) {
    console.error('Error logging outdoor climb:', error);  // Log error message
    res.status(400).json({ message: 'Error logging outdoor climb', error: error.message });  // Respond with error message
  }
});

// Start server on specified port
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
