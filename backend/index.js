const express = require('express');
const sequelize = require('./config/database');
require('dotenv').config();
const cors = require('cors');
const { router: authRoutes, authenticateToken } = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
