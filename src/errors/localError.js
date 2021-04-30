function localError(err, req, res, next) {
  const { status = 500, message = "Something went wrong on our end!" } = err;
  res.status(status).json({ error: message });
}

module.exports = localError;
