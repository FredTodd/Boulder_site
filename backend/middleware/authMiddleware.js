const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization; // Get the authorization header
  if (!authHeader) {
    console.log('No token provided'); // Log when no token is provided
    return res.status(401).json({ message: 'No token provided' }); // Return 401 if no token
  }

  const token = authHeader.split(' ')[1]; // Extract the token from the header
  console.log('Received Token:', token); // Log the received token
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('Invalid token', err); // Log the error if token verification fails
      return res.status(401).json({ message: 'Invalid token' }); // Return 401 for invalid token
    }
    console.log('Token Decoded:', decoded); // Log the decoded token data
    req.user = decoded; // Attach decoded token data to the request
    console.log('req.user:', req.user); // Log the user object attached to the request
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authMiddleware;
