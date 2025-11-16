// Admin middleware to check if user is admin
// This should be used AFTER authentication middleware
const isAdmin = (req, res, next) => {
  // Check if user is admin (req.user should already be set by authentication middleware)
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }
};

module.exports = isAdmin;

