const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const { is_showing = false } = req.query;
  res.json({ data: await service.list(Boolean(is_showing)) });
}

async function read(req, res) {
  res.json({ data: res.locals.movie });
}

async function readMovie(req, res, next) {
  const { movieId } = req.params;

  const data = await service.readMovie(movieId);
  res.json({ data });
}

async function validateMovieId(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.read(Number(movieId));

  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({
    status: 404,
    message: "Movie cannot be found.",
  });
}

module.exports = {
  list,
  read: [asyncErrorBoundary(validateMovieId), read],
  readMovie: [asyncErrorBoundary(validateMovieId), asyncErrorBoundary(readMovie)],
  validateMovieId,
};
