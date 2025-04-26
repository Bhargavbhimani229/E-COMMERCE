module.exports = (req, res, next) => {
  // Ensure that req.user is available
  if (req.user) {
    res.locals.user = req.user; // Set user to locals for the view
  } else {
    res.locals.user = null; // No user, nullify
  }
  next();
};
