const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const authMiddleware = require('./middleware/authMiddleware.js');
const IndoorClimb = require('./models/IndoorClimb');
const OutdoorClimb = require('./models/OutdoorClimb');

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', methods: 'GET,POST,PUT,DELETE', allowedHeaders: 'Content-Type,Authorization' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/protected-route', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route', userId: req.user });
});

// Sequelize setup
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

// Import the User model
const User = require('./models/User');

// Sync database
sequelize.sync().then(() => {
  console.log('Database & tables created!');
});

// Routes
app.post('/auth/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user', error: error.message });
  }
});

app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
      const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  });
  

// Add profile route
app.get('/profile', authMiddleware, async (req, res) => {
    console.log('Request headers:', req.headers); // Log the request headers
    try {
      const user = await User.findByPk(req.user.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({
        username: user.username,
        bio: user.bio,
        profile_picture: user.profile_picture,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching profile', error: error.message });
    }
  });
  

// Add routes for logging climbs
app.post('/climbs/indoor', authMiddleware, async (req, res) => {
  const { userId } = req.user;
  const { location, grade, personal_rating, notes, climb_date } = req.body;
  try {
    const climb = await IndoorClimb.create({ user_id: userId, location, grade, personal_rating, notes, climb_date });
    res.status(201).json(climb);
  } catch (error) {
    res.status(400).json({ message: 'Error logging indoor climb', error: error.message });
  }
});

app.post('/climbs/outdoor', authMiddleware, async (req, res) => {
  const { userId } = req.user;
  const { location, route_name, grade, personal_rating, notes, climb_date } = req.body;
  try {
    const climb = await OutdoorClimb.create({ user_id: userId, location, route_name, grade, personal_rating, notes, climb_date });
    res.status(201).json(climb);
  } catch (error) {
    res.status(400).json({ message: 'Error logging outdoor climb', error: error.message });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
