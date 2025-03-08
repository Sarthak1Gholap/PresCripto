const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "production" ? "Internal server error" : err.message,
  });
};

module.exports = errorHandler; // Export as a function