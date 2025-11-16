// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = function authMiddleware(req, res, next) {
  console.log('🔒 authMiddleware called for:', req.method, req.originalUrl);

  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (!authHeader) {
    console.log('❌ No authorization header');
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  if (!authHeader.startsWith('Bearer ')) {
    console.log('❌ Bad Authorization format:', authHeader);
    return res.status(401).json({ error: "Unauthorized: Format must be 'Bearer <token>'" });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    console.log('❌ No token after Bearer');
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    // attach user info to req for handlers
    req.user = decoded;
    console.log('✅ Auth successful for user:', decoded);
    next();
  } catch (err) {
    console.log('❌ Token verification failed:', err.message);
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Unauthorized: Token expired' });
    }
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};
