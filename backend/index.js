const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');
const authMiddleware = require('./middleware/authMiddleware');
const IndoorClimb = require('./models/IndoorClimb');
const OutdoorClimb = require('./models/OutdoorClimb');
const User = require('./models/User');

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', methods: 'GET,POST,PUT,DELETE', allowedHeaders: 'Content-Type,Authorization' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sync database
sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
}).catch(error => {
  console.error('Error creating database & tables:', error);
});

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

// Add routes for logging climbs
app.post('/climbs/indoor', authMiddleware, async (req, res) => {
  const { userId } = req.user;
  const { location, grade, personal_rating, notes, climb_date } = req.body;
  try {
    const climb = await IndoorClimb.create({ user_id: userId, location, grade, personal_rating, notes, climb_date });
    res.status(201).json(climb);
  } catch (error) {
    console.error('Error logging indoor climb:', error);
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
    console.error('Error logging outdoor climb:', error);
    res.status(400).json({ message: 'Error logging outdoor climb', error: error.message });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
