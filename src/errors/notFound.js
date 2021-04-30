function notFound(req, res, next) {
  next({
    status: 404,
    message: "That page doesn't exist",
  });
}

module.exports = notFound;