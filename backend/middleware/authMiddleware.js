const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log('No token provided');
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Received Token:', token); // Log the received token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('Invalid token', err); // Log the error
      return res.status(401).json({ message: 'Invalid token' });
    }
    console.log('Token Decoded:', decoded); // Log the decoded token
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
